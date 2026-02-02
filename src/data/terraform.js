export default {
    id: 'terraform',
    name: 'Terraform',
    icon: '🏗️',
    description: 'Infrastructure as Code tool for building, changing, and versioning cloud infrastructure.',
    concepts: [
        {
            title: 'HCL Basics',
            content: `HashiCorp Configuration Language (HCL) is Terraform's configuration syntax. Key constructs: resources (define infrastructure), data sources (read existing), variables, outputs, locals.

Blocks have types, labels, and body. Arguments assign values. Expressions compute values.`,
            codeExample: {
                language: 'hcl', code: `resource "aws_instance" "web" {
  ami           = var.ami_id
  instance_type = "t3.micro"
  tags = { Name = "WebServer" }
}` }
        },
        {
            title: 'Providers',
            content: `Providers are plugins for interacting with APIs. Major providers: AWS, Azure, GCP, Kubernetes. Each provider has its own resources and data sources.

Version constraints in required_providers block. Multiple provider configurations with aliases for multi-region deployments.`,
            codeExample: {
                language: 'hcl', code: `terraform {
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
}
provider "aws" { region = "us-east-1" }
provider "aws" { alias = "west", region = "us-west-2" }` }
        },
        {
            title: 'State Management',
            content: `State tracks real-world resources. By default, stored locally in terraform.tfstate. Production: use remote backends (S3, GCS, Azure Blob, Terraform Cloud).

State locking prevents concurrent modifications. State contains sensitive data - encrypt and restrict access.`,
            codeExample: {
                language: 'hcl', code: `terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}` }
        },
        {
            title: 'Modules',
            content: `Modules are containers for multiple resources. Root module = main configuration. Child modules can be local or remote (registry, Git, S3).

Inputs via variables, outputs to expose values. Module versioning for stability. Terraform Registry has community modules.`,
            codeExample: {
                language: 'hcl', code: `module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"
  name    = "my-vpc"
  cidr    = "10.0.0.0/16"
  azs     = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
}` }
        },
        {
            title: 'Terraform Workflow',
            content: `Core workflow: terraform init (download providers), plan (preview changes), apply (make changes), destroy (remove all).

Plan output shows: + create, - destroy, ~ update. Always review plans before applying. Use -auto-approve only in automation.`,
            codeExample: {
                language: 'bash', code: `terraform init          # Initialize working directory
terraform plan          # Preview changes
terraform apply         # Apply changes
terraform destroy       # Remove all resources
terraform fmt           # Format code
terraform validate      # Validate configuration` }
        },
        {
            title: 'Variables & Outputs',
            content: `Variables parameterize configurations. Types: string, number, bool, list, map, object, tuple. Defaults optional. Mark sensitive to hide values.

Outputs expose values for use by other configurations or users. Use depends_on for explicit dependencies.`,
            codeExample: {
                language: 'hcl', code: `variable "instance_type" {
  type        = string
  default     = "t3.micro"
  description = "EC2 instance type"
}
output "instance_ip" {
  value = aws_instance.web.public_ip
}` }
        },
        {
            title: 'Resource Dependencies',
            content: `Implicit dependencies from attribute references. Explicit via depends_on for hidden dependencies. Terraform builds dependency graph for parallel execution.

Data sources fetch existing infrastructure. Lifecycle rules: create_before_destroy, prevent_destroy, ignore_changes.`,
            codeExample: {
                language: 'hcl', code: `resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
  subnet_id     = aws_subnet.main.id  # implicit dependency
  lifecycle {
    create_before_destroy = true
  }
}` }
        },
        {
            title: 'Workspaces',
            content: `Workspaces manage multiple environments with single configuration. Default workspace on init. Each has separate state.

Better for similar environments. For very different environments, consider separate configurations with modules.`,
            codeExample: {
                language: 'bash', code: `terraform workspace new dev
terraform workspace new prod
terraform workspace select prod
terraform workspace list` }
        },
        {
            title: 'Terraform Cloud',
            content: `HashiCorp's SaaS for Terraform. Features: Remote state storage, remote execution, VCS integration, policy as code (Sentinel), private registry.

Free tier for small teams. Team governance features in paid tiers.`,
            codeExample: {
                language: 'hcl', code: `terraform {
  cloud {
    organization = "my-org"
    workspaces { name = "my-workspace" }
  }
}` }
        },
        {
            title: 'Best Practices',
            content: `Structure: environments/ and modules/ directories. One resource per file or logical groupings. Use consistent naming.

Pin provider versions. Use modules for reusability. Store state remotely with locking. Keep sensitive data out of version control.`,
            codeExample: {
                language: 'bash', code: `project/
├── environments/
│   ├── dev/
│   │   └── main.tf
│   └── prod/
│       └── main.tf
└── modules/
    └── vpc/
        ├── main.tf
        ├── variables.tf
        └── outputs.tf` }
        }
    ],
    questions: [
        { question: 'What is Terraform state and why is it important?', answer: `State maps configuration to real resources.
Stores metadata, tracks dependencies, improves performance.
Without state, Terraform can't know what exists.
Store remotely in production for collaboration and locking.` },
        { question: 'Explain plan vs apply.', answer: `Plan: Dry run showing what will change (+create, ~update, -destroy).
No changes made.
Apply: Executes the plan to create/update/destroy resources.
Always review plan before apply.` },
        { question: 'What is a Terraform provider?', answer: `Plugin that interacts with an API.
Translates HCL to API calls.
Examples: AWS, Azure, GCP, Kubernetes.
Specified in required_providers block with version constraints.` },
        { question: 'How do you manage secrets in Terraform?', answer: `Mark variables as sensitive.
Use environment variables (TF_VAR_name).
Integrate with secret managers (Vault, AWS Secrets Manager).
Never commit secrets to VCS.` },
        { question: 'What are Terraform modules?', answer: `Reusable packages of Terraform configs.
Encapsulate resources, accept inputs, produce outputs.
Use registry modules or write custom.
Version for stability.` },
        { question: 'Explain state locking.', answer: `Prevents concurrent modifications.
DynamoDB for S3 backend, built-in for Terraform Cloud.
Avoids race conditions.
Force-unlock if needed (dangerous).` },
        { question: 'What is terraform import?', answer: `Imports existing resources into state.
Doesn't generate configuration - you must write matching HCL.
Use for brownfield adoption.
Import block (1.5+) generates config.` },
        { question: 'How do workspaces differ from directories?', answer: `Workspaces: Same config, separate state.
Good for similar environments.
Directories: Separate configs entirely.
Better for significantly different environments.` },
        { question: 'What is a data source?', answer: `Reads information from provider without creating resources.
Fetch AMI IDs, existing VPCs, remote state.
Read-only, doesn't manage lifecycle.` },
        { question: 'Explain depends_on.', answer: `Explicit dependency when Terraform can't detect from references.
Rare - usually implicit is sufficient.
Needed for hidden dependencies like IAM policies.` },
        { question: 'What is Terraform drift?', answer: `When real infrastructure differs from state.
Caused by manual changes.
Detect with terraform plan.
Fix by applying or importing.
Prevent with CI/CD.` },
        { question: 'How do you handle multiple environments?', answer: `Options: Workspaces (same config), -var-file per environment, separate directories with modules, Terragrunt.
Remote backends per environment for isolation.` },
        { question: 'What is the for_each argument?', answer: `Creates multiple instances from map or set.
Better than count for non-sequential resources.
Removes by key, not index shift.
Use for resources needing unique identifiers.` },
        { question: 'Explain lifecycle rules.', answer: `create_before_destroy: New resource before destroying old. prevent_destroy: Blocks destruction. ignore_changes: Exclude attributes from plan. replace_triggered_by: Force replacement.` },
        { question: 'What is Terraform Cloud vs Enterprise?', answer: `Cloud: SaaS, free tier, remote state/run, VCS integration, Sentinel.
Enterprise: Self-hosted, air-gapped support, audit logging, SSO, advanced features.` }
    ]
};
