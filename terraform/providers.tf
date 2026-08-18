# This is the file for Terraform itself + AWS provider configuration

terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }

    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.7"
    }
  }

  backend "s3" {
    bucket       = "dev-portfolio-terraform-state-1"
    key          = "dev-portfolio/backend/terraform.tfstate"
    region       = "eu-north-1"
    encrypt      = true
    use_lockfile = true
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "DevPortfolio"
      Environment = "Production"
      ManagedBy   = "Terraform"
    }
  }
}