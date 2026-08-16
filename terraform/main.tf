resource "aws_dynamodb_table" "visitors" {
  name         = "dev-portfolio-visitors-tf"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  deletion_protection_enabled = true
}

resource "aws_iam_role" "lambda_execution_role" {
  name = "dev-portfolio-lambda-role-tf"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Service = "lambda.amazonaws.com"
        }

        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "dynamodb_counter" {
  name = "dev-portfolio-dynamodb-counter-policy-tf"
  role = aws_iam_role.lambda_execution_role.id

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Action = [
          "dynamodb:UpdateItem"
        ]

        Resource = aws_dynamodb_table.visitors.arn
      }
    ]
  })
}

data "archive_file" "lambda" {
  type        = "zip"
  source_file = "${path.module}/../backend/lambda_function.py"
  output_path = "${path.module}/lambda_function.zip"
}

resource "aws_lambda_function" "visitor_counter" {
  function_name = "dev-portfolio-visitor-counter-tf"

  filename         = data.archive_file.lambda.output_path
  source_code_hash = data.archive_file.lambda.output_base64sha256

  role    = aws_iam_role.lambda_execution_role.arn
  handler = "lambda_function.lambda_handler"
  runtime = "python3.13"

  timeout     = 3
  memory_size = 128

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.visitors.name
    }
  }
}

resource "aws_apigatewayv2_api" "portfolio_api" {
  name          = "dev-portfolio-api-tf"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["https://ralnimer.dev"]
    allow_methods = ["GET"]
    allow_headers = ["Content-Type"]
  }
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = aws_apigatewayv2_api.portfolio_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.visitor_counter.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "visitors" {
  api_id = aws_apigatewayv2_api.portfolio_api.id

  route_key = "GET /visitors"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id = aws_apigatewayv2_api.portfolio_api.id

  name        = "$default"
  auto_deploy = true
}

resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.visitor_counter.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.portfolio_api.execution_arn}/*/*"
}