output "api_url" {
  description = "Base URL for the DevPortfolio HTTP API"
  value       = aws_apigatewayv2_api.portfolio_api.api_endpoint
}