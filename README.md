# DevPortfolio

A cloud-hosted developer portfolio built on AWS with a serverless backend, Infrastructure as Code, and automated CI/CD.

## Architecture

The portfolio uses a serverless AWS architecture designed for low operational overhead and clear separation between the frontend and backend.

### Frontend

Static site files are stored in a private Amazon S3 bucket and served through Amazon CloudFront using Origin Access Control. Route 53 provides DNS for the custom domain, with an ACM certificate providing HTTPS.

### Backend

The visitor counter is implemented as a serverless API:

Browser → API Gateway → AWS Lambda → DynamoDB

API Gateway exposes the visitor endpoint, Lambda handles the application logic, and DynamoDB stores the visitor count.

### Infrastructure as Code

The backend infrastructure is managed with Terraform. Terraform state is stored remotely in Amazon S3 so infrastructure changes can be managed consistently outside a local development environment.

### CI/CD

GitHub Actions provides the CI/CD pipeline.

On changes to the main branch, the pipeline:

1. Runs the Python backend tests
2. Validates and plans the Terraform configuration
3. Authenticates to AWS using GitHub OIDC
4. Applies approved infrastructure changes
5. Deploys frontend changes to S3
6. Invalidates the CloudFront cache

AWS authentication uses temporary credentials through OIDC rather than storing long-lived AWS access keys in GitHub.

## AWS Architecture

Route 53
↓
CloudFront
↓
Private S3 Bucket
↓
Browser
↓
API Gateway
↓
Lambda
↓
DynamoDB

Infrastructure: Terraform + S3 Remote State
CI/CD: GitHub Actions + AWS IAM OIDC

## Technologies

AWS: S3, CloudFront, Route 53, ACM, API Gateway, Lambda, DynamoDB, IAM

DevOps: Terraform, GitHub Actions, Git, GitHub OIDC

Backend: Python, boto3, pytest

Frontend: HTML, CSS, JavaScript
