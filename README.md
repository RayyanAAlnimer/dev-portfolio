# DevPortfolio

A cloud-hosted developer portfolio built on AWS as an implementation of the Cloud Resume Challenge.

The project focuses on designing and deploying a serverless AWS architecture, managing infrastructure with Terraform, and automating testing and deployment through GitHub Actions.

## Architecture

```text
                         Internet
                            |
                        Route 53
                            |
                        CloudFront
                            |
                       Private S3
                       (Frontend)

Visitor Counter:

Browser
   |
API Gateway
   |
Lambda
   |
DynamoDB
```

### AWS Services

- **Amazon S3** hosts the static frontend in a private bucket.
- **Amazon CloudFront** distributes and caches the website globally using Origin Access Control.
- **Amazon Route 53** provides DNS for the custom domain.
- **AWS Certificate Manager** provides the TLS certificate used by CloudFront.
- **Amazon API Gateway** exposes the visitor counter API.
- **AWS Lambda** implements the serverless visitor counter backend.
- **Amazon DynamoDB** stores the visitor count.
- **AWS IAM** provides least-privilege access between services and for CI/CD.

## Infrastructure as Code

The backend infrastructure is managed using **Terraform** rather than being configured manually.

Terraform provisions and manages resources including:

- DynamoDB
- Lambda
- IAM roles and policies
- API Gateway

Terraform state is stored remotely in Amazon S3 so infrastructure state is persistent and can be safely accessed by the CI/CD pipeline.

## CI/CD

GitHub Actions provides automated testing and deployment whenever changes are pushed to `main`.

```text
Push to main
     |
     +-- Backend Tests
     |
     +-- Terraform Checks
              |
              +-- Deploy Backend
              |
              +-- Deploy Frontend
```

The pipeline:

1. Runs Python unit tests for the Lambda backend.
2. Checks Terraform formatting and configuration.
3. Generates a Terraform execution plan.
4. Applies validated infrastructure changes to AWS.
5. Synchronizes frontend files with Amazon S3.
6. Invalidates the CloudFront cache so new frontend changes are immediately available.

GitHub Actions authenticates to AWS using **OpenID Connect (OIDC)** and IAM roles instead of storing long-lived AWS access keys in GitHub.

## Repository Structure

```text
.
├── .github/
│   └── workflows/
│       └── ci.yml
├── backend/
│   ├── lambda_function.py
│   └── tests/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── terraform/
    ├── main.tf
    ├── providers.tf
    ├── variables.tf
    └── outputs.tf
```

## Technologies

**AWS:** S3, CloudFront, Route 53, ACM, API Gateway, Lambda, DynamoDB, IAM

**Infrastructure:** Terraform

**CI/CD:** GitHub Actions, GitHub OIDC

**Backend:** Python, boto3, pytest

**Frontend:** HTML, CSS, JavaScript
