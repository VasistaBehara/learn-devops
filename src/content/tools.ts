export type Note = {
  id: string;
  title: string;
  bullets: string[];
  codeBlocks?: string[];
};

export type QA = {
  id: string;
  question: string;
  answer: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
};

export type Tool = {
  id: string;
  name: string;
  description: string;
  officialSite: string;
  officialDocs: string;
  notes: Note[];
  qa: QA[];
};

export const tools: Tool[] = [
  {
    id: 'aws',
    name: 'AWS',
    description: 'Core AWS services: IAM, EC2, S3, VPC, RDS, Lambda, and automation for cloud infrastructure.',
    officialSite: 'https://aws.amazon.com',
    officialDocs: 'https://docs.aws.amazon.com',
    notes: [
      {
        id: 'aws-iam-basics',
        title: 'IAM fundamentals',
        bullets: [
          'Prefer IAM roles for compute (EC2, Lambda) instead of storing access keys on disk.',
          'Identity policies attach to users/roles; resource policies (S3 bucket) allow cross-account access.',
          'Use condition keys (aws:MultiFactorAuthPresent, aws:SourceIp) to enforce MFA and IP ranges.',
        ],
        codeBlocks: ['aws sts get-caller-identity'],
      },
      {
        id: 'aws-networking',
        title: 'VPC and networking',
        bullets: [
          'Public subnets route to an Internet Gateway; private subnets reach out via NAT Gateway/Instance.',
          'Security Groups are stateful; NACLs are stateless and evaluated per subnet.',
          'Use VPC Endpoints (Gateway for S3/DynamoDB, Interface for most services) to keep traffic private.',
        ],
        codeBlocks: ['aws ec2 describe-vpcs --query "Vpcs[].{id:VpcId,cidr:CidrBlock}" --output table'],
      },
      {
        id: 'aws-ec2',
        title: 'Compute (EC2)',
        bullets: [
          'User data scripts run as root at first boot; use cloud-init for idempotent provisioning.',
          'Use placement groups for low-latency clusters; Auto Scaling Groups manage capacity and health.',
          'Instance metadata requires IMDSv2 token; limit hop count to reduce exposure to proxies.',
        ],
        codeBlocks: ['curl -H "X-aws-ec2-metadata-token: $(curl -X PUT -H \"X-aws-ec2-metadata-token-ttl-seconds: 21600\" -s http://169.254.169.254/latest/api/token)" http://169.254.169.254/latest/meta-data/'],
      },
      {
        id: 'aws-s3',
        title: 'S3 storage',
        bullets: [
          'Block Public Access at account and bucket levels; combine with bucket policies for sharing.',
          'Versioning protects against deletes/overwrites; lifecycle rules move infrequent data to Glacier classes.',
          'For static sites, enable static hosting and pair with CloudFront for HTTPS + caching.',
        ],
        codeBlocks: ['aws s3 sync ./site s3://my-static-site --delete --acl public-read'],
      },
      {
        id: 'aws-database',
        title: 'RDS & serverless data',
        bullets: [
          'RDS Multi-AZ provides standby failover; read replicas offload reads and support blue/green.',
          'Enable automated backups and performance insights; use parameter groups per workload.',
          'For serverless, DynamoDB scales automatically; use on-demand for spiky traffic.',
        ],
        codeBlocks: ['aws rds describe-db-instances --query "DBInstances[].{id:DBInstanceIdentifier,status:DBInstanceStatus}"'],
      },
      {
        id: 'aws-lambda',
        title: 'Lambda & eventing',
        bullets: [
          'Package dependencies in layers; keep functions small and single-purpose.',
          'Use reserved concurrency to protect downstream services; provisioned concurrency for cold-start sensitive paths.',
          'Integrate via EventBridge for decoupled events; use DLQs on async invokes.',
        ],
      },
      {
        id: 'aws-observability',
        title: 'CloudWatch & logging',
        bullets: [
          'Metrics are per-namespace; detailed monitoring increases granularity to 1 minute.',
          'Metric filters on log groups extract values for alarms; Logs Insights queries JSON quickly.',
          'Use embedded metric format to emit structured metrics from applications.',
        ],
        codeBlocks: ['fields @timestamp, @message | filter @message like /ERROR/ | sort @timestamp desc | limit 20'],
      },
      {
        id: 'aws-cost',
        title: 'Cost controls',
        bullets: [
          'Use budgets with alerts; enable Cost Anomaly Detection.',
          'Right-size EC2 with instance scheduler and compute optimizer recommendations.',
          'S3 Intelligent-Tiering and GP3 EBS can reduce storage cost without migrations.',
        ],
      },
    ],
    qa: [
      {
        id: 'aws-qa-1',
        question: 'How do you secure an S3 bucket that stores app artifacts?',
        answer:
          'Enable Block Public Access, attach a restrictive bucket policy scoped to principals, and require SSE (S3 or KMS). Use VPC Gateway Endpoints with a condition on aws:sourceVpce to block internet paths.',
        tags: ['storage', 'security'],
        difficulty: 'Beginner',
      },
      {
        id: 'aws-qa-2',
        question: 'When would you choose a NAT Gateway versus a VPC endpoint?',
        answer:
          'NAT Gateways allow private subnets to reach any internet endpoint (patching, mirrors). VPC endpoints keep traffic private for AWS services; they are cheaper for heavy AWS API/S3 traffic and avoid public egress.',
        tags: ['networking', 'cost'],
        difficulty: 'Intermediate',
      },
      {
        id: 'aws-qa-3',
        question: 'How can you roll out EC2 configuration changes safely?',
        answer:
          'Bake changes into launch templates, update Auto Scaling Groups with rolling/immutable updates, and use health checks plus minimum healthy percent. Use SSM documents for in-place patches when rebuilds are not possible.',
        tags: ['compute', 'release'],
        difficulty: 'Intermediate',
      },
      {
        id: 'aws-qa-4',
        question: 'What is the benefit of IMDSv2?',
        answer:
          'IMDSv2 requires a session token, which mitigates SSRF-style metadata theft. It also supports hop limits to reduce risk of exposed metadata through proxies or containers.',
        tags: ['security'],
        difficulty: 'Beginner',
      },
      {
        id: 'aws-qa-5',
        question: 'How do you structure IAM roles for CI/CD?',
        answer:
          'Create roles scoped to pipelines with conditions on the OIDC provider or IAM user. Use least privilege policies, short session durations, and separate roles per environment (dev/stage/prod) to limit blast radius.',
        tags: ['iam', 'ci'],
        difficulty: 'Intermediate',
      },
      {
        id: 'aws-qa-6',
        question: 'What is a CloudWatch metric filter?',
        answer:
          'It scans log events in a log group and extracts values that become custom metrics. Useful for turning text logs into alarms without modifying the application code.',
        tags: ['observability'],
        difficulty: 'Beginner',
      },
      {
        id: 'aws-qa-7',
        question: 'How do you prevent drift between manual changes and Terraform?',
        answer:
          'Use IAM boundaries to block out-of-band edits, restrict console write access, and run `terraform plan` in CI to detect differences. Periodically apply to reconcile and enable S3 bucket versioning for state history.',
        tags: ['governance', 'terraform'],
        difficulty: 'Intermediate',
      },
      {
        id: 'aws-qa-8',
        question: 'When should you pick spot instances?',
        answer:
          'Use spot for fault-tolerant or batch workloads where interruptions are acceptable. Combine with capacity-optimized allocation and multiple instance types to reduce interruption rates.',
        tags: ['cost', 'compute'],
        difficulty: 'Beginner',
      },
      {
        id: 'aws-qa-9',
        question: 'How do you share parameters or secrets between services?',
        answer:
          'Store configuration in SSM Parameter Store or Secrets Manager. Grant read via IAM roles, enable automatic rotation, and use encryption with customer-managed KMS keys.',
        tags: ['security', 'config'],
        difficulty: 'Intermediate',
      },
      {
        id: 'aws-qa-10',
        question: 'What is the difference between CloudFormation change sets and stack policies?',
        answer:
          'Change sets preview resource modifications before you apply them. Stack policies protect critical resources from updates; together they let you see changes and block accidental replacements.',
        tags: ['iac'],
        difficulty: 'Intermediate',
      },
      {
        id: 'aws-qa-11',
        question: 'How do you run Lambda functions inside a VPC without losing internet access?',
        answer:
          'Place Lambdas in private subnets with a NAT Gateway or NAT instance for egress. Add VPC endpoints for AWS APIs to reduce NAT costs and keep traffic private.',
        tags: ['lambda', 'networking'],
        difficulty: 'Intermediate',
      },
      {
        id: 'aws-qa-12',
        question: 'How do you achieve blue/green for RDS?',
        answer:
          'Use RDS Blue/Green deployments or clone a snapshot to a staging instance, apply changes, then switch endpoints. Alternatively, promote a read replica after validation.',
        tags: ['database', 'release'],
        difficulty: 'Advanced',
      },
    ],
  },
  {
    id: 'gcp',
    name: 'GCP',
    description: 'Google Cloud basics: IAM, networking, compute, serverless, data, and delivery tooling.',
    officialSite: 'https://cloud.google.com',
    officialDocs: 'https://cloud.google.com/docs',
    notes: [
      {
        id: 'gcp-iam',
        title: 'IAM and projects',
        bullets: [
          'Principals live at org/folder/project levels; roles can be basic, predefined, or custom.',
          'Service Accounts are identities for workloads; avoid key files when Workload Identity is available.',
          'Use labels and billing export for cost allocation; set quotas to control usage.',
        ],
        codeBlocks: ['gcloud projects get-iam-policy $PROJECT --format="table(bindings.role)"'],
      },
      {
        id: 'gcp-networking',
        title: 'VPC networking',
        bullets: [
          'VPCs are global; subnets are regional. Firewall rules are stateful and apply at the VPC level.',
          'Use Shared VPC to centralize networking and let service projects attach workloads.',
          'Private Google Access allows private subnets to reach Google APIs without public IPs.',
        ],
        codeBlocks: ['gcloud compute networks list --format="table(name,subnetMode)"'],
      },
      {
        id: 'gcp-compute',
        title: 'Compute Engine',
        bullets: [
          'Instance templates + managed instance groups provide autoscaling and rolling updates.',
          'Use OS Login to avoid shared SSH keys; enable IAP for bastion-less SSH.',
          'Preemptible VMs are the spot equivalent; design workloads to handle termination signals.',
        ],
        codeBlocks: ['gcloud compute instances create demo --zone=us-central1-a --machine-type=e2-medium --subnet=default'],
      },
      {
        id: 'gcp-serverless',
        title: 'Cloud Run and Functions',
        bullets: [
          'Deploy container images with fast scale-to-zero; concurrency defaults to 80 requests per instance.',
          'Use revisions for rollbacks; traffic splitting enables canaries by percent.',
          'Use minimum instances to reduce cold starts; apply CPU always-on for background tasks.',
        ],
      },
      {
        id: 'gcp-build',
        title: 'Cloud Build & Artifact Registry',
        bullets: [
          'Cloud Build runs steps in containers defined in cloudbuild.yaml; supports build triggers from Git.',
          'Artifact Registry stores images and language packages; prefer regional repos near workloads.',
          'Use service accounts per trigger to limit permissions (build, deploy, read secrets).',
        ],
        codeBlocks: ['gcloud builds submit --config cloudbuild.yaml .'],
      },
      {
        id: 'gcp-observability',
        title: 'Logging & Monitoring',
        bullets: [
          'Cloud Logging uses log-based metrics for alerting; enable exclusions to cut noisy logs.',
          'Cloud Monitoring dashboards are per-project but can include multiple projects via metrics scope.',
          'Error Reporting aggregates stack traces; Trace samples latency across services.',
        ],
      },
      {
        id: 'gcp-data',
        title: 'Data & messaging',
        bullets: [
          'Pub/Sub is global messaging with push/pull; use ordering keys when needed.',
          'Cloud SQL offers managed relational DBs; use private IP and automatic backups.',
          'GCS lifecycle rules transition objects; signed URLs grant temporary access.',
        ],
        codeBlocks: ['gsutil lifecycle set rules.json gs://my-bucket'],
      },
      {
        id: 'gcp-security',
        title: 'Security posture',
        bullets: [
          'Organization policies enforce constraints like allowed regions or disallowing SA key creation.',
          'VPC Service Controls create perimeters around managed services to reduce data exfiltration.',
          'Use CMEK for sensitive data stores and rotate keys regularly.',
        ],
      },
    ],
    qa: [
      {
        id: 'gcp-qa-1',
        question: 'How do you lock down a service account used by Cloud Run?',
        answer:
          'Grant only required roles (e.g., Cloud SQL Client), disable key creation, and bind via --service-account on deploy. For CI, use Workload Identity Federation instead of JSON keys.',
        tags: ['security', 'cloud-run'],
        difficulty: 'Intermediate',
      },
      {
        id: 'gcp-qa-2',
        question: 'What is the purpose of VPC Service Controls?',
        answer:
          'They create a security perimeter around Google-managed APIs to reduce data exfiltration. Resources inside must be accessed from authorized networks or identities, adding defense in depth.',
        tags: ['security', 'networking'],
        difficulty: 'Advanced',
      },
      {
        id: 'gcp-qa-3',
        question: 'How do you enable zero-downtime deploys on Cloud Run?',
        answer:
          'Deploy a new revision and gradually shift traffic using the --traffic flag. If health checks fail, shift traffic back to the prior revision for rollback.',
        tags: ['release', 'cloud-run'],
        difficulty: 'Beginner',
      },
      {
        id: 'gcp-qa-4',
        question: 'When would you use Cloud Functions over Cloud Run?',
        answer:
          'Use Cloud Functions for single-purpose event handlers with minimal container concerns. Choose Cloud Run when you need full container control, custom runtimes, or HTTP/long-running requests.',
        tags: ['serverless'],
        difficulty: 'Beginner',
      },
      {
        id: 'gcp-qa-5',
        question: 'How do you share a VPC across projects?',
        answer:
          'Create a host project with a Shared VPC and attach service projects. Grant Network User role to service project service accounts so they can create resources using shared subnets.',
        tags: ['networking', 'multi-project'],
        difficulty: 'Intermediate',
      },
      {
        id: 'gcp-qa-6',
        question: 'What is a log-based metric?',
        answer:
          'A metric derived from log entries matching a filter. It lets you alert on patterns (like error codes) without modifying code to emit metrics.',
        tags: ['observability'],
        difficulty: 'Beginner',
      },
      {
        id: 'gcp-qa-7',
        question: 'How can you reduce egress costs from GCS?',
        answer:
          'Keep compute near storage, enable Cloud CDN for public assets, and use requester pays when sharing data externally so consumers cover egress.',
        tags: ['cost', 'storage'],
        difficulty: 'Intermediate',
      },
      {
        id: 'gcp-qa-8',
        question: 'How do you rotate secrets in GCP?',
        answer:
          'Store secrets in Secret Manager, use automatic rotation via Cloud Functions or Cloud Run jobs, and grant access via IAM bindings to service accounts. Disable old versions after rollout.',
        tags: ['security', 'secrets'],
        difficulty: 'Intermediate',
      },
      {
        id: 'gcp-qa-9',
        question: 'What are organization policies?',
        answer:
          'Constraints enforced at org/folder/project level (e.g., restrict regions, disallow SA key creation). They propagate down to enforce guardrails across teams.',
        tags: ['governance'],
        difficulty: 'Advanced',
      },
      {
        id: 'gcp-qa-10',
        question: 'How do you troubleshoot a failing instance group rollout?',
        answer:
          'Check the instance template, health check status, and recent serial logs. Pause the rolling action, fix the template, and resume or recreate the group if needed.',
        tags: ['compute', 'release'],
        difficulty: 'Intermediate',
      },
      {
        id: 'gcp-qa-11',
        question: 'How do you access private GCS from a private subnet?',
        answer:
          'Enable Private Google Access on the subnet or use a Cloud NAT plus restricted egress. For tighter control, add VPC Service Controls around the project.',
        tags: ['networking', 'storage'],
        difficulty: 'Intermediate',
      },
      {
        id: 'gcp-qa-12',
        question: 'How do you secure Cloud SQL connections?',
        answer:
          'Use private IP connectivity, enforce SSL/TLS, and restrict user privileges. For serverless, use the Cloud SQL Auth Proxy sidecar/connector and limit authorized networks.',
        tags: ['database', 'security'],
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'azure',
    name: 'Azure',
    description: 'Azure resource groups, compute, networking, storage, and monitoring fundamentals.',
    officialSite: 'https://azure.microsoft.com',
    officialDocs: 'https://learn.microsoft.com/azure',
    notes: [
      {
        id: 'azure-resource',
        title: 'Resource groups & governance',
        bullets: [
          'Resource Groups act as lifecycle containers; delete the group to remove contained resources.',
          'Management Groups provide hierarchy for policy and RBAC inheritance above subscriptions.',
          'Use tags for cost and environment metadata; policies can enforce required tags.',
        ],
        codeBlocks: ['az group create -n rg-recap -l eastus'],
      },
      {
        id: 'azure-identity',
        title: 'Identity & access',
        bullets: [
          'Azure AD (Entra ID) provides identities; assign role assignments at subscription/group/resource scope.',
          'Managed Identities (system or user-assigned) let services access resources without secrets.',
          'Privileged Identity Management enables just-in-time elevation for admins.',
        ],
      },
      {
        id: 'azure-compute',
        title: 'Compute options',
        bullets: [
          'VM Scale Sets manage VM pools with autoscale; use custom images from Shared Image Gallery.',
          'App Service is PaaS for web apps with deployment slots for staging swaps.',
          'Container Apps and AKS run containers; Container Apps is simpler for microservices with Dapr support.',
        ],
        codeBlocks: ['az webapp up --name recap-web --resource-group rg-recap --runtime "NODE:18LTS"'],
      },
      {
        id: 'azure-network',
        title: 'Networking',
        bullets: [
          'VNets are regional; subnets can have NSGs for traffic rules. NSGs are stateful like AWS SGs.',
          'Service Endpoints or Private Endpoints keep PaaS traffic on the Microsoft backbone.',
          'Azure Firewall or Application Gateway provides L7 protection and WAF.',
        ],
      },
      {
        id: 'azure-storage',
        title: 'Storage',
        bullets: [
          'Storage accounts support blobs, queues, tables, and files; choose redundancy (LRS/ZRS/GRS).',
          'Static website hosting on Blob Storage is simple; enable Azure CDN for caching.',
          'SAS tokens provide scoped, time-limited access without exposing account keys.',
        ],
        codeBlocks: ['az storage blob upload-batch -s ./dist -d "$web" --account-name mystorage'],
      },
      {
        id: 'azure-monitor',
        title: 'Monitoring',
        bullets: [
          'Azure Monitor centralizes metrics/logs; Log Analytics workspaces store queryable data with Kusto.',
          'Application Insights collects distributed traces; enable sampling to control costs.',
          'Alerts can be metric or log-based; action groups route notifications to email/webhook/ITSM.',
        ],
        codeBlocks: ['requests | where resultCode == "500" | summarize count() by bin(timestamp, 5m)'],
      },
      {
        id: 'azure-cicd',
        title: 'Pipelines & artifacts',
        bullets: [
          'Azure DevOps Pipelines or GitHub Actions run YAML workflows; use environments for approvals.',
          'Artifacts feeds store packages; cache restores to speed builds.',
          'Use managed identities for deployments to avoid PAT secrets.',
        ],
      },
      {
        id: 'azure-security',
        title: 'Security controls',
        bullets: [
          'Use Azure Policy to enforce allowed SKUs/regions and tag requirements.',
          'Defender for Cloud provides posture management and recommendations.',
          'Key Vault stores secrets/keys; integrate with managed identity to fetch at runtime.',
        ],
      },
    ],
    qa: [
      {
        id: 'azure-qa-1',
        question: 'How do you lock down deployments to certain regions?',
        answer:
          'Use Azure Policy with Allowed Locations at subscription or management group scope. Deny effects prevent creating resources in disallowed regions.',
        tags: ['governance'],
        difficulty: 'Beginner',
      },
      {
        id: 'azure-qa-2',
        question: 'When would you pick Private Endpoint vs Service Endpoint?',
        answer:
          'Private Endpoints assign a private IP to the PaaS resource for stronger isolation. Service Endpoints keep traffic on the backbone but still use public IPs; simpler but less isolated.',
        tags: ['networking', 'security'],
        difficulty: 'Intermediate',
      },
      {
        id: 'azure-qa-3',
        question: 'How do deployment slots reduce downtime?',
        answer:
          'Deploy to a staging slot, warm it up, then swap with production. Swap preserves sticky settings and enables quick rollback by swapping back.',
        tags: ['release'],
        difficulty: 'Beginner',
      },
      {
        id: 'azure-qa-4',
        question: 'What is a Managed Identity and why use it?',
        answer:
          'Managed Identities are service principals managed by Azure. They remove secret management; workloads authenticate to Azure resources using federated tokens from the metadata service.',
        tags: ['security', 'identity'],
        difficulty: 'Beginner',
      },
      {
        id: 'azure-qa-5',
        question: 'How do you centralize logs from multiple subscriptions?',
        answer:
          'Send diagnostics to a shared Log Analytics workspace. Use Diagnostic Settings to push metrics/logs into that workspace, then query across them.',
        tags: ['observability'],
        difficulty: 'Intermediate',
      },
      {
        id: 'azure-qa-6',
        question: 'What is the role of an NSG?',
        answer:
          'Network Security Groups filter inbound/outbound traffic based on rules. They are stateful and applied to subnets or NICs; defaults allow intra-VNet traffic.',
        tags: ['networking'],
        difficulty: 'Beginner',
      },
      {
        id: 'azure-qa-7',
        question: 'How can you ensure team apps have required tags?',
        answer:
          'Create an Azure Policy that requires specific tags (like costCenter). Apply it at subscription/management group so any deployment missing tags fails or gets appended.',
        tags: ['governance'],
        difficulty: 'Intermediate',
      },
      {
        id: 'azure-qa-8',
        question: 'How do you secure secrets for apps?',
        answer:
          'Store secrets in Key Vault, grant access via managed identities, and use Key Vault references or SDKs. Enable soft-delete and purge protection.',
        tags: ['security', 'secrets'],
        difficulty: 'Beginner',
      },
      {
        id: 'azure-qa-9',
        question: 'How do you isolate environments within a subscription?',
        answer:
          'Use separate resource groups, role assignments, and policies per environment. Optionally separate subscriptions for prod vs non-prod to improve blast-radius.',
        tags: ['governance'],
        difficulty: 'Intermediate',
      },
      {
        id: 'azure-qa-10',
        question: 'How do you troubleshoot a VM boot issue?',
        answer:
          'Enable boot diagnostics for console logs/screenshots, check activity logs for policy denials, and use Serial Console. If needed, mount the OS disk on a recovery VM to fix configuration.',
        tags: ['compute', 'troubleshooting'],
        difficulty: 'Intermediate',
      },
      {
        id: 'azure-qa-11',
        question: 'How do you connect AKS to private resources?',
        answer:
          'Use private clusters with authorized IPs, Azure CNI for VNet integration, and private endpoints for backing services. Add UDRs/NAT for egress control.',
        tags: ['kubernetes', 'networking'],
        difficulty: 'Advanced',
      },
      {
        id: 'azure-qa-12',
        question: 'What is the benefit of Availability Zones?',
        answer:
          'They are separate datacenters in a region. Deploying across zones improves resilience; zone-redundant services survive single-zone failures.',
        tags: ['resilience'],
        difficulty: 'Beginner',
      },
    ],
  },
  {
    id: 'terraform',
    name: 'Terraform',
    description: 'Provision infrastructure as code with state management, modules, and workflows.',
    officialSite: 'https://www.terraform.io',
    officialDocs: 'https://developer.hashicorp.com/terraform/docs',
    notes: [
      {
        id: 'tf-init',
        title: 'Init, plan, apply',
        bullets: [
          'terraform init downloads providers and configures the backend; rerun after adding providers or modules.',
          'Always run terraform plan to preview changes; use -out to save a plan for later apply.',
          'Use terraform apply -auto-approve only in CI after review to avoid mistakes.',
        ],
        codeBlocks: ['terraform plan -out plan.tfplan'],
      },
      {
        id: 'tf-state',
        title: 'State management',
        bullets: [
          'State maps resources to real infrastructure; never hand-edit unless recovering carefully.',
          'Remote state (S3 + DynamoDB, GCS, AzureRM) enables locking and collaboration.',
          'Use terraform state rm/import to reconcile drift without recreating resources.',
        ],
        codeBlocks: ['terraform state list'],
      },
      {
        id: 'tf-variables',
        title: 'Inputs and outputs',
        bullets: [
          'Define variables with type and description; defaults help new users run quickly.',
          'Use tfvars files or environment variables (TF_VAR_name) to inject values; never commit secrets.',
          'Outputs export IDs/URLs to other modules or users; mark as sensitive to hide in CLI.',
        ],
        codeBlocks: ['variable "region" {\n  type = string\n  default = "us-east-1"\n}'],
      },
      {
        id: 'tf-modules',
        title: 'Modules',
        bullets: [
          'Modules encapsulate resources with inputs/outputs; keep them small and composable.',
          'Pin module versions via source ref (tag/commit) to avoid accidental upgrades.',
          'Use terraform get -update or re-run init to fetch updates.',
        ],
      },
      {
        id: 'tf-backend',
        title: 'Backend configuration',
        bullets: [
          'Backend settings are configured in the root module; changing them can migrate state.',
          'Locking prevents concurrent writes; DynamoDB for S3 backend, built-in for GCS/Azure.',
          'Store backend credentials securely (env vars, profiles) rather than in code.',
        ],
      },
      {
        id: 'tf-workspaces',
        title: 'Workspaces & environments',
        bullets: [
          'Workspaces separate state within the same configuration; good for light env separation.',
          'Name environments consistently (dev/stage/prod); avoid mixing region-specific settings in one workspace.',
          'Separate root modules for drastically different stacks for clearer isolation.',
        ],
        codeBlocks: ['terraform workspace new stage'],
      },
      {
        id: 'tf-quality',
        title: 'Quality gates',
        bullets: [
          'terraform fmt enforces style; terraform validate catches syntax issues early.',
          'Add pre-commit hooks to run fmt/validate and security scanners (tfsec).',
          'Plan/apply in CI with remote state; require approvals for production workspaces.',
        ],
      },
      {
        id: 'tf-testing',
        title: 'Testing & policy',
        bullets: [
          'Use terraform plan in PRs and store the artifact for review.',
          'Policy as code (OPA/Sentinel) can block dangerous actions like deletions.',
          'For modules, add unit tests with terratest or kitchen-terraform.',
        ],
      },
    ],
    qa: [
      {
        id: 'tf-qa-1',
        question: 'How do you handle secrets in Terraform?',
        answer:
          'Avoid committing secrets. Pass via environment variables or secret managers, and use data sources (e.g., SSM Parameter Store). Mark outputs as sensitive so they do not display.',
        tags: ['security'],
        difficulty: 'Beginner',
      },
      {
        id: 'tf-qa-2',
        question: 'What causes a provider version mismatch?',
        answer:
          'If .terraform.lock.hcl pins a version and your config or registry has a different constraint, init fails. Update constraints or run terraform init -upgrade after reviewing release notes.',
        tags: ['providers'],
        difficulty: 'Intermediate',
      },
      {
        id: 'tf-qa-3',
        question: 'When should you split resources into multiple modules?',
        answer:
          'Split when resources form reusable blocks (network, database, compute) or when teams own separate layers. Keep root modules thin.',
        tags: ['modules'],
        difficulty: 'Intermediate',
      },
      {
        id: 'tf-qa-4',
        question: 'How do you preview destructive changes safely?',
        answer:
          'Use terraform plan and inspect. In CI, run policies to block deletions; require human approval before apply for production.',
        tags: ['safety'],
        difficulty: 'Intermediate',
      },
      {
        id: 'tf-qa-5',
        question: 'What is drift and how do you detect it?',
        answer:
          'Drift is when real resources differ from state, usually due to manual changes. Detect with terraform plan and restrict manual IAM access.',
        tags: ['drift'],
        difficulty: 'Beginner',
      },
      {
        id: 'tf-qa-6',
        question: 'Why use -target sparingly?',
        answer:
          'Resource targeting applies partial plans and can leave dependencies unsatisfied. Use for break-glass fixes, then run a full plan soon after.',
        tags: ['best-practice'],
        difficulty: 'Intermediate',
      },
      {
        id: 'tf-qa-7',
        question: 'How do you migrate state to a new backend?',
        answer:
          'Update the backend block and run terraform init -migrate-state. Terraform copies the state; ensure backups and locking.',
        tags: ['state'],
        difficulty: 'Intermediate',
      },
      {
        id: 'tf-qa-8',
        question: 'How can you share outputs with another team?',
        answer:
          'Expose outputs in the root module and consume them via remote state data sources. Publish to parameter stores for non-Terraform consumers.',
        tags: ['collaboration'],
        difficulty: 'Beginner',
      },
      {
        id: 'tf-qa-9',
        question: 'What is the purpose of .terraform.lock.hcl?',
        answer:
          'It locks provider checksums/versions to ensure repeatable builds. Commit it so all environments use identical providers.',
        tags: ['providers'],
        difficulty: 'Beginner',
      },
      {
        id: 'tf-qa-10',
        question: 'How do workspaces differ from separate directories?',
        answer:
          'Workspaces share configuration but keep separate state. Directories allow divergent config per environment. Use workspaces for light envs; separate roots for major differences.',
        tags: ['environments'],
        difficulty: 'Intermediate',
      },
      {
        id: 'tf-qa-11',
        question: 'How do you speed up Terraform plans in CI?',
        answer:
          'Cache .terraform provider downloads, run parallel linting, and scope plans to changed stacks. Keep modules small to limit graph size.',
        tags: ['performance'],
        difficulty: 'Intermediate',
      },
      {
        id: 'tf-qa-12',
        question: 'How do you handle conditional resources?',
        answer:
          'Use count or for_each with a boolean/map to create resources conditionally. Set lifecycle prevent_destroy when deletion should be blocked.',
        tags: ['hcl'],
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'ansible',
    name: 'Ansible',
    description: 'Agentless automation using playbooks, inventories, and reusable roles.',
    officialSite: 'https://www.ansible.com',
    officialDocs: 'https://docs.ansible.com',
    notes: [
      {
        id: 'ansible-inventory',
        title: 'Inventory',
        bullets: [
          'Inventory defines hosts and groups; can be static (ini/yaml) or dynamic plugins.',
          'Group vars apply to all hosts in a group; host vars override; children nest groups.',
          'ansible-inventory --list to view resolved data.',
        ],
        codeBlocks: ['[web]\n10.0.1.5\n10.0.1.6\n\n[web:vars]\nansible_user=ubuntu'],
      },
      {
        id: 'ansible-playbook',
        title: 'Playbook structure',
        bullets: [
          'Plays target hosts with tasks and handlers; handlers run once at the end when notified.',
          'Use become: true for privilege escalation; set serial for rolling updates.',
          'Tags allow partial runs: ansible-playbook site.yml --tags "deploy".',
        ],
        codeBlocks: ['- hosts: web\n  become: true\n  roles:\n    - nginx'],
      },
      {
        id: 'ansible-modules',
        title: 'Common modules',
        bullets: [
          'apt/yum for packages, service/systemd for services, copy/template for files.',
          'user manages accounts; authorized_key adds SSH keys idempotently.',
          'Use shell/command only when no module fits; prefer creates/removes to keep idempotent.',
        ],
      },
      {
        id: 'ansible-roles',
        title: 'Roles and reuse',
        bullets: [
          'Roles split tasks, handlers, templates, defaults, and vars into predictable folders.',
          'Defaults are lowest precedence; inventory vars override role vars.',
          'Galaxy installs roles/collections; pin versions in requirements.yml.',
        ],
        codeBlocks: ['ansible-galaxy install -r requirements.yml'],
      },
      {
        id: 'ansible-templating',
        title: 'Templating & vault',
        bullets: [
          'Jinja2 templates allow conditionals/loops; use default filter to avoid failures.',
          'Ansible Vault encrypts sensitive files; edit with ansible-vault edit.',
          'Vault passwords can be passed via files or prompt; avoid committing unencrypted secrets.',
        ],
        codeBlocks: ['ansible-vault encrypt group_vars/prod/secrets.yml'],
      },
      {
        id: 'ansible-testing',
        title: 'Linting & testing',
        bullets: [
          'Use ansible-lint to catch bad patterns; add Molecule for role testing.',
          'Dry-run with --check to see changes without applying.',
          'Set gather_facts: true when tasks rely on system facts; cache facts to speed runs.',
        ],
      },
      {
        id: 'ansible-performance',
        title: 'Performance & scale',
        bullets: [
          'Set forks to increase parallelism; tune SSH control persist for reuse.',
          'Use fact caching (jsonfile/redis) to reduce setup time.',
          'Limit hosts with --limit for targeted runs; batch with serial.',
        ],
      },
      {
        id: 'ansible-windows',
        title: 'Windows specifics',
        bullets: [
          'WinRM is required; configure with ansible_winrm_transport and certs.',
          'Use win_* modules instead of Unix equivalents; avoid shell unless necessary.',
          'Chocolatey module manages packages; reboot module handles safe restarts.',
        ],
      },
    ],
    qa: [
      {
        id: 'ansible-qa-1',
        question: 'How do handlers work?',
        answer:
          'Handlers are tasks triggered by notifications from other tasks (e.g., restart service). They run once at the end of a play, regardless of how many notifications they receive.',
        tags: ['handlers'],
        difficulty: 'Beginner',
      },
      {
        id: 'ansible-qa-2',
        question: 'When would you use serial in a play?',
        answer:
          'Use serial for rolling updates to avoid taking all hosts down. Example: serial: 2 updates two hosts at a time.',
        tags: ['availability'],
        difficulty: 'Intermediate',
      },
      {
        id: 'ansible-qa-3',
        question: 'How do you pass secrets to Ansible safely?',
        answer:
          'Encrypt secrets with Ansible Vault or pull from a secret manager. Avoid plain-text in inventories; require vault passwords via CI secrets.',
        tags: ['security'],
        difficulty: 'Beginner',
      },
      {
        id: 'ansible-qa-4',
        question: 'What is idempotency and why does it matter?',
        answer:
          'Idempotent tasks can run multiple times without changing the system after the first run. It ensures repeatable, safe automation.',
        tags: ['fundamentals'],
        difficulty: 'Beginner',
      },
      {
        id: 'ansible-qa-5',
        question: 'How do you debug a failing task?',
        answer:
          'Use -vvv for verbose output, add debug tasks to print variables, and run with --check to simulate. Inspect ansible_facts and run modules ad-hoc if needed.',
        tags: ['troubleshooting'],
        difficulty: 'Intermediate',
      },
      {
        id: 'ansible-qa-6',
        question: 'When to use dynamic inventory?',
        answer:
          'Use dynamic inventory for cloud environments where hosts change frequently. Plugins exist for AWS, GCP, Azure to pull instances based on tags.',
        tags: ['inventory'],
        difficulty: 'Intermediate',
      },
      {
        id: 'ansible-qa-7',
        question: 'How do you reuse tasks across projects?',
        answer:
          'Package common logic into roles and collections. Publish to a private Galaxy server or Git URL and reference in requirements.yml to version control them.',
        tags: ['reuse'],
        difficulty: 'Intermediate',
      },
      {
        id: 'ansible-qa-8',
        question: 'What is become?',
        answer:
          'Ansible privilege escalation flag. Set become: true to run tasks with elevated privileges (sudo), optionally specifying become_user and become_method.',
        tags: ['privileges'],
        difficulty: 'Beginner',
      },
      {
        id: 'ansible-qa-9',
        question: 'Why might a template task always show as changed?',
        answer:
          'If the rendered output differs each run (timestamps, ordering) or file permissions/owner mismatch. Ensure deterministic templates and set correct mode/owner/group.',
        tags: ['templating'],
        difficulty: 'Intermediate',
      },
      {
        id: 'ansible-qa-10',
        question: 'How do collections differ from roles?',
        answer:
          'Collections bundle roles, modules, and plugins together. Roles focus on tasks/files/handlers, while collections can include multiple roles plus modules and docs.',
        tags: ['collections'],
        difficulty: 'Intermediate',
      },
      {
        id: 'ansible-qa-11',
        question: 'How do you speed up Ansible over many hosts?',
        answer:
          'Increase forks, enable pipelining, use persistent SSH connections, and batch with serial. Cache facts and avoid gather_facts when not needed.',
        tags: ['performance'],
        difficulty: 'Intermediate',
      },
      {
        id: 'ansible-qa-12',
        question: 'How do you enforce linting in CI?',
        answer:
          'Add ansible-lint to CI pipelines, fail on warnings, and keep a base config (.ansible-lint) committed. Combine with yamllint for playbook formatting.',
        tags: ['quality'],
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'git',
    name: 'Git',
    description: 'Source control workflows, branching, and recovery commands used in DevOps pipelines.',
    officialSite: 'https://git-scm.com',
    officialDocs: 'https://git-scm.com/doc',
    notes: [
      {
        id: 'git-basics',
        title: 'Commits & branches',
        bullets: [
          'Commits snapshot tracked files; keep them small and focused with meaningful messages.',
          'Branches are lightweight; use feature branches and protect main with required checks.',
          'Use .gitignore to avoid committing build artifacts or secrets.',
        ],
        codeBlocks: ['git switch -c feature/deploy-hooks'],
      },
      {
        id: 'git-remotes',
        title: 'Remotes & fetch',
        bullets: [
          'git remote -v shows configured remotes. Fetch updates tracking branches without merging.',
          'Use git pull --rebase to keep history linear; configure pull.rebase per branch.',
          'Tags are immutable pointers for releases; sign them for integrity.',
        ],
      },
      {
        id: 'git-rebase',
        title: 'Rebase vs merge',
        bullets: [
          'Rebase rewrites commits onto a new base for linear history; avoid rebasing shared branches.',
          'Merge preserves commit topology; good for large collaborative branches.',
          'Interactive rebase (-i) lets you reorder, squash, or edit commits.',
        ],
        codeBlocks: ['git rebase -i origin/main'],
      },
      {
        id: 'git-recover',
        title: 'Recovery tools',
        bullets: [
          'git reflog tracks branch tip history; use it to recover lost commits.',
          'git revert creates a new commit that undoes a commit without rewriting history.',
          'Stash changes before context switches; name them with git stash push -m.',
        ],
        codeBlocks: ['git stash push -m "wip: update deployment script"'],
      },
      {
        id: 'git-ci',
        title: 'CI/CD considerations',
        bullets: [
          'Use shallow clones in CI for speed but fetch tags when building releases.',
          'Pin actions/scripts to SHAs to avoid supply-chain surprises.',
          'Require status checks and reviews before merging to protected branches.',
        ],
      },
      {
        id: 'git-submodules',
        title: 'Submodules & monorepos',
        bullets: [
          'Submodules link to specific commits of external repos; run git submodule update --init after clone.',
          'Monorepos may use sparse checkout to limit files. Git worktrees allow multiple branches checked out simultaneously.',
          'Choose clear repo layout for infra code vs app code to reduce conflicts.',
        ],
      },
      {
        id: 'git-hooks',
        title: 'Hooks & automation',
        bullets: [
          'Client-side hooks (pre-commit) can enforce linting and tests.',
          'Server-side hooks (pre-receive) guard protected branches in self-hosted Git.',
          'Use pre-commit frameworks to share hook configs across teams.',
        ],
      },
      {
        id: 'git-large',
        title: 'Large repos & binaries',
        bullets: [
          'Use Git LFS for large binary assets to avoid bloating repo history.',
          'Prune unreachable objects (git gc) and use partial clone/sparse-checkout for big repos.',
          'Archive tags/releases to avoid long fetch times in CI.',
        ],
      },
    ],
    qa: [
      {
        id: 'git-qa-1',
        question: 'How do you undo the last commit but keep the changes staged?',
        answer:
          'Run git reset --soft HEAD~1 to move HEAD back one commit while leaving changes staged.',
        tags: ['reset'],
        difficulty: 'Beginner',
      },
      {
        id: 'git-qa-2',
        question: 'What is the danger of force pushing?',
        answer:
          'Force pushing rewrites remote history and can orphan others’ work. Only force push private branches and avoid on shared protected branches.',
        tags: ['collaboration'],
        difficulty: 'Beginner',
      },
      {
        id: 'git-qa-3',
        question: 'When should you use git revert versus git reset?',
        answer:
          'Use revert on shared branches to create a new commit that undoes changes safely. Use reset for local history edits before sharing, since it rewrites history.',
        tags: ['safety'],
        difficulty: 'Beginner',
      },
      {
        id: 'git-qa-4',
        question: 'How do you resolve a merge conflict quickly?',
        answer:
          'Open conflicting files, decide which lines to keep, remove conflict markers, then git add and continue. git checkout --theirs/--ours can pick sides per file.',
        tags: ['conflicts'],
        difficulty: 'Beginner',
      },
      {
        id: 'git-qa-5',
        question: 'What is a detached HEAD?',
        answer:
          'HEAD points directly to a commit instead of a branch (e.g., after checkout <SHA>). Commits made here can be lost unless you create a branch before moving away.',
        tags: ['concepts'],
        difficulty: 'Beginner',
      },
      {
        id: 'git-qa-6',
        question: 'Why use signed commits or tags?',
        answer:
          'Signing with GPG/SSH proves authorship and integrity. Release pipelines may require signed tags to ensure artifacts trace back to trusted commits.',
        tags: ['security'],
        difficulty: 'Intermediate',
      },
      {
        id: 'git-qa-7',
        question: 'How do shallow clones affect CI builds?',
        answer:
          'Shallow clones reduce download time but might omit tags/history needed for changelog generation. Fetch tags when necessary and increase depth for release jobs.',
        tags: ['ci'],
        difficulty: 'Intermediate',
      },
      {
        id: 'git-qa-8',
        question: 'What is the purpose of .gitignore?',
        answer:
          'It tells Git which files to ignore, preventing accidental commits of build artifacts, secrets, or local config.',
        tags: ['hygiene'],
        difficulty: 'Beginner',
      },
      {
        id: 'git-qa-9',
        question: 'How do worktrees help productivity?',
        answer:
          'Git worktrees let you check out multiple branches simultaneously in separate directories, avoiding constant stashing and switching.',
        tags: ['workflow'],
        difficulty: 'Intermediate',
      },
      {
        id: 'git-qa-10',
        question: 'How do you cherry-pick safely?',
        answer:
          'Use git cherry-pick <sha> to copy a commit onto your branch. Resolve conflicts carefully and consider -x to record the original SHA for traceability.',
        tags: ['cherry-pick'],
        difficulty: 'Intermediate',
      },
      {
        id: 'git-qa-11',
        question: 'How do you clean large files from history?',
        answer:
          'Use git filter-repo (or filter-branch) to rewrite history and remove blobs, then force push after coordination. Consider Git LFS for future large assets.',
        tags: ['cleanup'],
        difficulty: 'Advanced',
      },
      {
        id: 'git-qa-12',
        question: 'How do you verify a repo before releasing?',
        answer:
          'Run git fsck to check integrity, verify signed tags, ensure CI is green, and generate release notes from conventional commits or tags.',
        tags: ['release'],
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'docker',
    name: 'Docker',
    description: 'Containerize apps, optimize images, and run multi-service stacks with Compose.',
    officialSite: 'https://www.docker.com',
    officialDocs: 'https://docs.docker.com',
    notes: [
      {
        id: 'dockerfile-basics',
        title: 'Dockerfile essentials',
        bullets: [
          'Prefer small base images (alpine, distroless) when compatible; pin versions for reproducibility.',
          'Use multi-stage builds to keep runtime images small and copy only needed artifacts.',
          'Set WORKDIR, expose ports via EXPOSE, and declare healthchecks for readiness.',
        ],
        codeBlocks: ['FROM node:18-alpine AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM nginx:1.25-alpine\nCOPY --from=build /app/dist /usr/share/nginx/html'],
      },
      {
        id: 'docker-compose',
        title: 'Docker Compose',
        bullets: [
          'Compose files define services, networks, and volumes. Use profiles to toggle optional services.',
          'Set restart policies and healthchecks for dependencies.',
          'Named volumes persist data across recreations; bind mounts suit local dev.',
        ],
        codeBlocks: ['docker compose up -d --build'],
      },
      {
        id: 'docker-networking',
        title: 'Networking',
        bullets: [
          'Bridge network is default; user-defined bridges provide DNS-based service discovery.',
          'Publish ports with -p host:container; avoid host network unless necessary.',
          'Use docker network inspect to debug connectivity and service names.',
        ],
      },
      {
        id: 'docker-storage',
        title: 'Storage & caching',
        bullets: [
          'Leverage build cache by ordering Dockerfile steps from least to most frequently changing.',
          'Use .dockerignore to avoid copying unnecessary files into build context.',
          'Volume mounts are great for databases; tmpfs volumes provide ephemeral in-memory storage.',
        ],
      },
      {
        id: 'docker-security',
        title: 'Security basics',
        bullets: [
          'Run as non-root when possible using USER directive.',
          'Scan images for CVEs and keep base images patched.',
          'Limit capabilities and add read-only root filesystem for hardened deployments.',
        ],
      },
      {
        id: 'docker-debug',
        title: 'Debugging containers',
        bullets: [
          'Use docker logs -f and docker exec -it <ctr> /bin/sh to inspect runtime issues.',
          'Healthcheck scripts should exit non-zero on failure to trigger restarts.',
          'For networking issues, exec and use curl/ping within the container to verify DNS and routes.',
        ],
      },
      {
        id: 'docker-buildkit',
        title: 'BuildKit & performance',
        bullets: [
          'Enable BuildKit for parallel builds, cache mounts, and secrets handling.',
          'Use build args for infrequently changing values to keep cache hits.',
          'Export/import cache in CI to speed up rebuilds.',
        ],
      },
      {
        id: 'docker-registry',
        title: 'Registries',
        bullets: [
          'Use registry mirrors to speed pulls; authenticate with docker login.',
          'Tag images with semantic versions and immutable digests for deploys.',
          'Clean old images with retention policies to save space.',
        ],
      },
    ],
    qa: [
      {
        id: 'docker-qa-1',
        question: 'How do multi-stage builds help?',
        answer:
          'They let you compile/test in earlier stages and copy only artifacts to the final image, reducing size and attack surface.',
        tags: ['build'],
        difficulty: 'Beginner',
      },
      {
        id: 'docker-qa-2',
        question: 'When would you use bind mounts versus volumes?',
        answer:
          'Bind mounts mirror a host directory (good for dev). Volumes are managed by Docker and safer for production data because they are isolated from host path changes.',
        tags: ['storage'],
        difficulty: 'Beginner',
      },
      {
        id: 'docker-qa-3',
        question: 'How do you reduce image rebuild times?',
        answer:
          'Order Dockerfile instructions to maximize cache hits, pin dependencies, use build args for infrequent changes, and leverage BuildKit cache export/import in CI.',
        tags: ['performance'],
        difficulty: 'Intermediate',
      },
      {
        id: 'docker-qa-4',
        question: 'What is the difference between CMD and ENTRYPOINT?',
        answer:
          'ENTRYPOINT defines the main executable; CMD provides default arguments. Combining both gives sensible defaults with flexibility.',
        tags: ['dockerfile'],
        difficulty: 'Beginner',
      },
      {
        id: 'docker-qa-5',
        question: 'How do healthchecks work in Docker?',
        answer:
          'A healthcheck command runs inside the container at intervals; repeated failures mark the container unhealthy, allowing orchestrators to restart or delay dependencies.',
        tags: ['healthcheck'],
        difficulty: 'Intermediate',
      },
      {
        id: 'docker-qa-6',
        question: 'Why is running as root discouraged?',
        answer:
          'Root inside containers can map to host root if privileges escalate. Running as non-root plus dropping capabilities limits blast radius.',
        tags: ['security'],
        difficulty: 'Beginner',
      },
      {
        id: 'docker-qa-7',
        question: 'How do you share environment configuration between services in Compose?',
        answer:
          'Use .env files or env_file entries, and YAML anchors to avoid repetition. Keep secrets out of images; pass via environment variables or secret mounts.',
        tags: ['compose'],
        difficulty: 'Intermediate',
      },
      {
        id: 'docker-qa-8',
        question: 'What steps harden container networking?',
        answer:
          'Use user-defined networks with only necessary services attached, avoid exposing ports publicly, and restrict ingress with firewalls or reverse proxies.',
        tags: ['networking', 'security'],
        difficulty: 'Intermediate',
      },
      {
        id: 'docker-qa-9',
        question: 'How can you inspect layers of an image?',
        answer:
          'docker history <image> shows layer commands and sizes. docker image inspect reveals metadata and digests.',
        tags: ['debugging'],
        difficulty: 'Intermediate',
      },
      {
        id: 'docker-qa-10',
        question: 'What is BuildKit and why use it?',
        answer:
          'BuildKit is the modern Docker build engine that supports parallel builds, cache mounts, and safer secret handling, speeding up builds and improving security.',
        tags: ['build'],
        difficulty: 'Intermediate',
      },
      {
        id: 'docker-qa-11',
        question: 'How do you reduce image size further?',
        answer:
          'Use distroless/alpine bases, multi-stage builds, remove package caches, and vendor dependencies. Use docker-slim or dive to analyze layers.',
        tags: ['optimization'],
        difficulty: 'Intermediate',
      },
      {
        id: 'docker-qa-12',
        question: 'How do you debug DNS issues inside containers?',
        answer:
          'Inspect /etc/resolv.conf, check embedded DNS (127.0.0.11 on bridge), and test with dig/nslookup inside the container. Ensure the network is attached and service names resolve.',
        tags: ['networking'],
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    description: 'Cluster orchestration: workloads, services, configuration, and troubleshooting.',
    officialSite: 'https://kubernetes.io',
    officialDocs: 'https://kubernetes.io/docs/home/',
    notes: [
      {
        id: 'k8s-workloads',
        title: 'Pods & deployments',
        bullets: [
          'Pods are the smallest schedulable unit; Deployments manage replica sets and rollouts.',
          'Rolling updates use maxUnavailable/maxSurge; set strategy to Recreate for stateful apps needing downtime.',
          'Use resource requests/limits to help the scheduler and prevent noisy neighbors.',
        ],
        codeBlocks: ['kubectl rollout status deployment/api'],
      },
      {
        id: 'k8s-services',
        title: 'Service types',
        bullets: [
          'ClusterIP exposes internally; NodePort opens a port on each node; LoadBalancer provisions external LB (cloud).',
          'Ingress controllers handle HTTP routing with host/path rules and TLS termination.',
          'Headless services (clusterIP: None) allow direct pod DNS records for stateful apps.',
        ],
      },
      {
        id: 'k8s-config',
        title: 'Config & secrets',
        bullets: [
          'ConfigMaps store non-secret configuration; mount as env vars or files.',
          'Secrets are base64 encoded; enable encryption at rest and restrict RBAC access.',
          'Use envFrom with prefixing to avoid verbose env mapping.',
        ],
        codeBlocks: ['kubectl create configmap app-config --from-literal=LOG_LEVEL=info'],
      },
      {
        id: 'k8s-health',
        title: 'Probes',
        bullets: [
          'Liveness probes restart hung containers; readiness probes gate traffic until ready.',
          'Startup probes are for slow-boot apps to avoid failing liveness too early.',
          'Keep thresholds tuned; consider gRPC or TCP probes for non-HTTP apps.',
        ],
      },
      {
        id: 'k8s-namespaces',
        title: 'Namespaces & RBAC',
        bullets: [
          'Namespaces isolate resources logically; use ResourceQuotas and LimitRanges to control usage.',
          'RBAC roles bind verbs/resources to subjects within a namespace or cluster-wide.',
          'ServiceAccounts represent in-cluster identities for pods; keep tokens minimal.',
        ],
      },
      {
        id: 'k8s-storage',
        title: 'Storage',
        bullets: [
          'PersistentVolumeClaims request storage from available PVs or dynamic provisioners.',
          'StatefulSets maintain stable identities and volume claims per replica.',
          'Choose access modes (ReadWriteOnce/Many) based on workload needs.',
        ],
      },
      {
        id: 'k8s-ops',
        title: 'Operations & debugging',
        bullets: [
          'Use kubectl describe for events and conditions; kubectl logs -f with --previous for crash loops.',
          'kubectl top requires metrics-server; investigate evictions via node conditions.',
          'Port-forward to debug services quickly without exposing them.',
        ],
        codeBlocks: ['kubectl port-forward svc/api 8080:80'],
      },
      {
        id: 'k8s-addons',
        title: 'Add-ons & policy',
        bullets: [
          'Use admission controllers/OPA Gatekeeper/Kyverno for policy enforcement.',
          'Cluster autoscaler adjusts nodes; HPA/VPA scale pods based on metrics.',
          'Service Mesh (Istio/Linkerd) adds mTLS, retries, and traffic shaping.',
        ],
      },
    ],
    qa: [
      {
        id: 'k8s-qa-1',
        question: 'How do you roll back a deployment?',
        answer:
          'Use kubectl rollout undo deployment/<name> to revert to the previous replica set. Check rollout history and status to ensure stability.',
        tags: ['release'],
        difficulty: 'Beginner',
      },
      {
        id: 'k8s-qa-2',
        question: 'What causes CrashLoopBackOff and how to debug it?',
        answer:
          'It indicates a container is repeatedly failing. Check container logs, inspect exit codes, verify config/secrets, and use --previous logs for the prior attempt.',
        tags: ['troubleshooting'],
        difficulty: 'Beginner',
      },
      {
        id: 'k8s-qa-3',
        question: 'When to use a StatefulSet instead of a Deployment?',
        answer:
          'Use StatefulSets for applications needing stable network IDs or storage (databases, queues). Deployments suit stateless services.',
        tags: ['stateful'],
        difficulty: 'Intermediate',
      },
      {
        id: 'k8s-qa-4',
        question: 'How do NetworkPolicies work?',
        answer:
          'NetworkPolicies define allowed ingress/egress traffic between pods/IP blocks, enforced by the CNI. Default deny requires explicit allow rules.',
        tags: ['security', 'networking'],
        difficulty: 'Intermediate',
      },
      {
        id: 'k8s-qa-5',
        question: 'How can you inject config without rebuilding images?',
        answer:
          'Mount ConfigMaps or Secrets as env vars or volumes. Reload apps via SIGHUP or use a sidecar reloader that watches for file changes.',
        tags: ['config'],
        difficulty: 'Beginner',
      },
      {
        id: 'k8s-qa-6',
        question: 'What is the role of kube-proxy?',
        answer:
          'kube-proxy programs iptables/IPVS rules so Service cluster IPs route to pod endpoints, load balancing connections across ready endpoints.',
        tags: ['networking'],
        difficulty: 'Intermediate',
      },
      {
        id: 'k8s-qa-7',
        question: 'How do you perform a canary release?',
        answer:
          'Create a second Deployment with fewer replicas and split traffic via Service selectors, Ingress rules, or a mesh. Monitor metrics, then scale canary up or roll back.',
        tags: ['release'],
        difficulty: 'Intermediate',
      },
      {
        id: 'k8s-qa-8',
        question: 'What does ImagePullBackOff mean?',
        answer:
          'The kubelet failed to pull the image. Check image name/tag, registry credentials (imagePullSecrets), and registry availability. Describe the pod for exact error.',
        tags: ['troubleshooting'],
        difficulty: 'Beginner',
      },
      {
        id: 'k8s-qa-9',
        question: 'How do you limit CPU and memory per namespace?',
        answer:
          'Use ResourceQuotas to cap total resources and LimitRanges to set default/request/limit per container. Apply them in the namespace.',
        tags: ['governance'],
        difficulty: 'Intermediate',
      },
      {
        id: 'k8s-qa-10',
        question: 'What is a DaemonSet used for?',
        answer:
          'DaemonSets ensure a pod runs on every (or selected) node, often for logging agents, monitoring, or node-level services.',
        tags: ['workloads'],
        difficulty: 'Beginner',
      },
      {
        id: 'k8s-qa-11',
        question: 'How do you debug scheduling issues?',
        answer:
          'Check kubectl describe pod for events, ensure resource requests fit nodes, inspect taints/tolerations and node selectors/affinity rules.',
        tags: ['scheduling'],
        difficulty: 'Intermediate',
      },
      {
        id: 'k8s-qa-12',
        question: 'How do you secure cluster access?',
        answer:
          'Use RBAC with least privilege, enable audit logging, restrict kubeconfig distribution, and prefer OIDC or SSO for authentication. Rotate certificates regularly.',
        tags: ['security'],
        difficulty: 'Advanced',
      },
    ],
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    description: 'Pipelines, build strategies, testing, and deployment patterns.',
    officialSite: 'https://cd.foundation',
    officialDocs: 'https://cd.foundation/resources/',
    notes: [
      {
        id: 'cicd-pipelines',
        title: 'Pipeline basics',
        bullets: [
          'Break pipelines into stages: lint, test, build, scan, deploy.',
          'Cache dependencies/artifacts to speed builds; restore cache early.',
          'Use environment-specific variables and secrets per stage.',
        ],
        codeBlocks: ['# GitHub Actions example\n- uses: actions/cache@v3\n  with:\n    path: node_modules\n    key: ${{ runner.os }}-npm-${{ hashFiles(\"**/package-lock.json\") }}'],
      },
      {
        id: 'cicd-tests',
        title: 'Testing strategies',
        bullets: [
          'Unit tests run fast; integration tests may need services via docker-compose.',
          'Contract tests and smoke tests catch API breakage before rollout.',
          'Use feature flags for gradual exposure and safe rollback.',
        ],
      },
      {
        id: 'cicd-deploy',
        title: 'Deployment patterns',
        bullets: [
          'Blue/green swaps traffic between old/new stacks with quick rollback.',
          'Canary releases shift traffic gradually; monitor metrics before full cutover.',
          'Rolling updates replace pods incrementally; pause on failure.',
        ],
      },
      {
        id: 'cicd-secrets',
        title: 'Secrets & supply chain',
        bullets: [
          'Store secrets in managed vaults; inject at runtime via env or mounts.',
          'Sign artifacts/images (cosign, sigstore) and verify before deploy.',
          'Pin actions/plugins to SHAs; restrict self-hosted runners.',
        ],
      },
      {
        id: 'cicd-observability',
        title: 'Observability in pipelines',
        bullets: [
          'Emit build metadata (commit, build id, artifact digest) into logs and metrics.',
          'Annotate deployments with git sha and build time for traceability.',
          'Alert on failing trends and rising queue times for workers.',
        ],
      },
      {
        id: 'cicd-branching',
        title: 'Branching & release',
        bullets: [
          'Trunk-based development with short-lived branches reduces merge pain.',
          'Release branches allow stabilization; hotfix branches for urgent fixes.',
          'Use semantic versioning and automated changelog generation.',
        ],
      },
      {
        id: 'cicd-infra',
        title: 'Infra in pipelines',
        bullets: [
          'Use workspaces/accounts per environment with least privilege credentials.',
          'Isolate infra pipelines from app pipelines when access differs.',
          'Run terraform/ansible in CI with remote state and locks.',
        ],
      },
      {
        id: 'cicd-performance',
        title: 'Performance tuning',
        bullets: [
          'Parallelize independent jobs; matrix builds for multi-version tests.',
          'Use incremental builds (e.g., Nx, Turborepo) to skip untouched packages.',
          'Reuse runners or warm caches where secure.',
        ],
      },
    ],
    qa: [
      {
        id: 'cicd-qa-1',
        question: 'How do you keep pipelines fast as they grow?',
        answer:
          'Cache dependencies, run jobs in parallel, split critical vs optional checks, and measure stage durations. Remove redundant steps and gate long tests behind labels.',
        tags: ['performance'],
        difficulty: 'Intermediate',
      },
      {
        id: 'cicd-qa-2',
        question: 'How do you secure CI secrets?',
        answer:
          'Store secrets in managed vaults or CI secret stores, scope per environment, and avoid echoing them. Use OIDC federation to cloud roles instead of long-lived keys.',
        tags: ['security'],
        difficulty: 'Intermediate',
      },
      {
        id: 'cicd-qa-3',
        question: 'What is artifact provenance?',
        answer:
          'Metadata proving how/when an artifact was built (commit, builder, dependencies). Sign artifacts and store provenance with SBOMs to verify integrity before deployment.',
        tags: ['supply-chain'],
        difficulty: 'Advanced',
      },
      {
        id: 'cicd-qa-4',
        question: 'When to use blue/green vs rolling?',
        answer:
          'Blue/green enables instant rollback at higher cost; rolling minimizes capacity needs but rollbacks take longer. Choose based on uptime needs and traffic patterns.',
        tags: ['release'],
        difficulty: 'Intermediate',
      },
      {
        id: 'cicd-qa-5',
        question: 'How do you prevent flaky tests from blocking deploys?',
        answer:
          'Quarantine flaky tests, track flake rates, rerun-once with limits, and fix root causes. Avoid auto-retries hiding real issues.',
        tags: ['testing'],
        difficulty: 'Intermediate',
      },
      {
        id: 'cicd-qa-6',
        question: 'How do you deploy infrastructure safely via CI?',
        answer:
          'Use separate credentials per environment, run plan + manual approval for prod, enable state locking, and log all changes. Use change windows and rollback playbooks.',
        tags: ['iac', 'governance'],
        difficulty: 'Intermediate',
      },
      {
        id: 'cicd-qa-7',
        question: 'How do you handle monorepo builds efficiently?',
        answer:
          'Use change detection to build only affected packages, share caches, and split pipelines per workspace. Keep dependency graphs up to date.',
        tags: ['monorepo'],
        difficulty: 'Intermediate',
      },
      {
        id: 'cicd-qa-8',
        question: 'How do you promote artifacts between environments?',
        answer:
          'Publish immutable artifacts with digests, store in a registry, and deploy the same artifact to stage/prod. Avoid rebuilding for each environment.',
        tags: ['release'],
        difficulty: 'Beginner',
      },
      {
        id: 'cicd-qa-9',
        question: 'What metrics matter for CI/CD health?',
        answer:
          'Build duration, queue time, success rate, flake rate, MTTR for broken pipelines, and deployment frequency/change failure rate for CD.',
        tags: ['metrics'],
        difficulty: 'Intermediate',
      },
      {
        id: 'cicd-qa-10',
        question: 'How do you roll back a bad release quickly?',
        answer:
          'Automate rollbacks with previous artifact digests, keep DB migrations reversible, and maintain runbooks. Monitor key signals and gate rollouts with canaries.',
        tags: ['release', 'reliability'],
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'observability',
    name: 'Observability',
    description: 'Logging, metrics, tracing, alerting, and SLOs for production systems.',
    officialSite: 'https://opentelemetry.io',
    officialDocs: 'https://opentelemetry.io/docs/',
    notes: [
      {
        id: 'obs-telemetry',
        title: 'Telemetry pillars',
        bullets: [
          'Metrics for trends and fast alerts; logs for detail; traces for request flows.',
          'Structured logs improve search; include request id, user id, and trace id.',
          'Adopt OpenTelemetry for vendor-neutral instrumentation.',
        ],
      },
      {
        id: 'obs-metrics',
        title: 'Metrics & alerts',
        bullets: [
          'Use RED/USE or Four Golden Signals as a baseline (latency, traffic, errors, saturation).',
          'Prefer ratio alerts (error rate) over absolute counts; add burn-rate alerts for SLOs.',
          'Downsample high-cardinality metrics; avoid unbounded labels.',
        ],
        codeBlocks: ['sum(rate(http_requests_total{status=~"5.."}[5m])) by (service)'],
      },
      {
        id: 'obs-tracing',
        title: 'Distributed tracing',
        bullets: [
          'Propagate trace context (W3C traceparent) across services.',
          'Span attributes should include method, endpoint, status, and key resource ids.',
          'Sampling strategies: head-based for low cost, tail-based for high-value traces.',
        ],
      },
      {
        id: 'obs-logging',
        title: 'Logging',
        bullets: [
          'Emit JSON logs for machine parsing; avoid multiline where possible.',
          'Scrub PII/secrets; use log levels consistently.',
          'Centralize logs (ELK, Loki, Cloud Logging) with retention policies.',
        ],
      },
      {
        id: 'obs-alerts',
        title: 'Alert design',
        bullets: [
          'Alert on symptoms users feel, not just causes; avoid noisy flapping alerts.',
          'Use multi-window, multi-burn-rate alerts for SLOs to catch fast and slow burns.',
          'Include runbook links and clear ownership on every alert.',
        ],
      },
      {
        id: 'obs-dashboards',
        title: 'Dashboards',
        bullets: [
          'Keep a primary service dashboard with core SLOs and golden signals.',
          'Use templating for environments and regions; avoid excessive panels.',
          'Add deployment markers to correlate changes with metrics.',
        ],
      },
      {
        id: 'obs-profiling',
        title: 'Profiling & debugging',
        bullets: [
          'Continuous profiling identifies CPU/memory hot paths in production safely.',
          'Enable request/response sampling only when needed; guard high-volume traces.',
          'Capture exemplars to link metrics to traces for slow requests.',
        ],
      },
      {
        id: 'obs-resilience',
        title: 'Resilience signals',
        bullets: [
          'Track queue depths, retry counts, and circuit breaker state.',
          'Measure dependency SLIs separately; surface client vs server errors.',
          'Record saturation for critical resources (threads, DB connections).',
        ],
      },
    ],
    qa: [
      {
        id: 'obs-qa-1',
        question: 'What are the Four Golden Signals?',
        answer:
          'Latency, traffic, errors, and saturation. Monitoring these gives a baseline for service health.',
        tags: ['metrics'],
        difficulty: 'Beginner',
      },
      {
        id: 'obs-qa-2',
        question: 'How do you design an SLO?',
        answer:
          'Pick a user-facing SLI (availability or latency), set a target (e.g., 99.9%), and choose a rolling window. Derive error budgets and alert on burn rate.',
        tags: ['slo'],
        difficulty: 'Intermediate',
      },
      {
        id: 'obs-qa-3',
        question: 'Why avoid high-cardinality labels?',
        answer:
          'Labels with many unique values (user id, request id) explode metric storage and slow queries. Use tracing or logging for those dimensions instead.',
        tags: ['metrics'],
        difficulty: 'Intermediate',
      },
      {
        id: 'obs-qa-4',
        question: 'What is a burn-rate alert?',
        answer:
          'It measures how fast you consume your error budget. Multi-window burn-rate alerts catch both fast outages and slow leaks while reducing noise.',
        tags: ['slo', 'alerts'],
        difficulty: 'Intermediate',
      },
      {
        id: 'obs-qa-5',
        question: 'How do you correlate metrics and traces?',
        answer:
          'Emit exemplars or include trace ids in metric labels/logs. Use shared trace context to jump from a spike to specific traces.',
        tags: ['tracing'],
        difficulty: 'Intermediate',
      },
      {
        id: 'obs-qa-6',
        question: 'When to sample traces?',
        answer:
          'Sample when volume is high or cost is a concern. Head-based sampling is simple; tail-based sampling keeps the most interesting (e.g., slow/error) traces.',
        tags: ['tracing'],
        difficulty: 'Intermediate',
      },
      {
        id: 'obs-qa-7',
        question: 'How to reduce alert fatigue?',
        answer:
          'Deduplicate alerts, focus on user-impacting symptoms, use proper thresholds, include auto-resolve, and review alert quality regularly.',
        tags: ['alerts'],
        difficulty: 'Intermediate',
      },
      {
        id: 'obs-qa-8',
        question: 'How to monitor background workers?',
        answer:
          'Track queue depth, age, throughput, error rate, and handler latency. Alert when backlog grows faster than drain or when retries spike.',
        tags: ['queues'],
        difficulty: 'Intermediate',
      },
      {
        id: 'obs-qa-9',
        question: 'How to log securely?',
        answer:
          'Avoid secrets/PII, use structured JSON, set retention and access controls, and redact sensitive fields at source or via processors.',
        tags: ['security', 'logging'],
        difficulty: 'Beginner',
      },
      {
        id: 'obs-qa-10',
        question: 'What is an exemplar?',
        answer:
          'An exemplar links a metric data point to a trace id. It lets you pivot from a metrics spike to a representative trace quickly.',
        tags: ['metrics', 'tracing'],
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'linux',
    name: 'Linux & Shell',
    description: 'Essential Linux, shell, and troubleshooting skills for DevOps.',
    officialSite: 'https://www.kernel.org',
    officialDocs: 'https://man7.org/linux/man-pages/',
    notes: [
      {
        id: 'linux-process',
        title: 'Processes & services',
        bullets: [
          'Use ps, top, and htop to inspect processes; journalctl for logs on systemd hosts.',
          'systemctl start/stop/status to manage services; enable for boot.',
          'Use nice/renice for priorities; kill -9 only as last resort.',
        ],
        codeBlocks: ['journalctl -u nginx -n 50 --no-pager'],
      },
      {
        id: 'linux-network',
        title: 'Networking',
        bullets: [
          'Use ip a/ip r for interfaces/routes; ss -tulpn to see listening sockets.',
          'curl -v and dig/nslookup to debug DNS and HTTP.',
          'iptables/nftables manage firewall rules; firewalld is a wrapper.',
        ],
        codeBlocks: ['ss -tulpn | grep LISTEN'],
      },
      {
        id: 'linux-files',
        title: 'Files & permissions',
        bullets: [
          'Use ls -l for permissions; chown/chmod to adjust ownership/mode.',
          'setfacl/getfacl manage ACLs for granular access.',
          'Find large files with du -sh and cleanup with caution.',
        ],
      },
      {
        id: 'linux-shell',
        title: 'Shell scripting',
        bullets: [
          'Use set -euo pipefail for safer scripts.',
          'Quote variables to avoid globbing; prefer $(...) over backticks.',
          'Use traps for cleanup on exit signals.',
        ],
        codeBlocks: ['set -euo pipefail\ntrap "cleanup" EXIT'],
      },
      {
        id: 'linux-packages',
        title: 'Packages & repos',
        bullets: [
          'apt/yum/dnf manage packages; pin versions for reproducibility.',
          'Use unattended-upgrades or dnf-automatic for security patches where appropriate.',
          'Verify package signatures; maintain minimal repositories.',
        ],
      },
      {
        id: 'linux-storage',
        title: 'Storage & filesystems',
        bullets: [
          'Use lsblk/df to view disks; mount and fstab for persistence.',
          'LVM provides snapshots and flexible resizing; RAID for redundancy.',
          'Monitor inode exhaustion; it can break writes even with free space.',
        ],
      },
      {
        id: 'linux-security',
        title: 'Security basics',
        bullets: [
          'Use sudoers with least privilege; log sudo usage.',
          'SSH hardening: disable root login/password auth, use keys, and fail2ban.',
          'Use auditd for tracking sensitive access; enable SELinux/AppArmor where supported.',
        ],
      },
      {
        id: 'linux-troubleshoot',
        title: 'Troubleshooting',
        bullets: [
          'dmesg for kernel logs; check OOM killer events for memory issues.',
          'strace/ltrace for syscall debugging; tcpdump for packet captures.',
          'Check resource limits (ulimit) and open files (lsof).',
        ],
      },
    ],
    qa: [
      {
        id: 'linux-qa-1',
        question: 'How do you see which process is listening on a port?',
        answer:
          'Use ss -tulpn or lsof -i :<port>. It shows the PID/program bound to the port.',
        tags: ['networking'],
        difficulty: 'Beginner',
      },
      {
        id: 'linux-qa-2',
        question: 'How do you tail logs for a systemd service?',
        answer:
          'journalctl -u <service> -f streams live logs. Add -n for last N lines.',
        tags: ['logging'],
        difficulty: 'Beginner',
      },
      {
        id: 'linux-qa-3',
        question: 'What does set -euo pipefail do?',
        answer:
          'It makes bash exit on errors (-e), treat unset vars as errors (-u), and fail pipelines if any command fails (pipefail), improving script safety.',
        tags: ['shell'],
        difficulty: 'Beginner',
      },
      {
        id: 'linux-qa-4',
        question: 'How do you check for disk space issues?',
        answer:
          'Use df -h for filesystem usage, du -sh to find large directories, and check inode usage with df -i.',
        tags: ['storage'],
        difficulty: 'Beginner',
      },
      {
        id: 'linux-qa-5',
        question: 'How do you investigate high CPU usage?',
        answer:
          'Use top/htop to find processes, ps -o pid,pcpu,cmd for details, and perf/strace if needed to see syscalls or hotspots.',
        tags: ['performance'],
        difficulty: 'Intermediate',
      },
      {
        id: 'linux-qa-6',
        question: 'How do you harden SSH?',
        answer:
          'Disable root login, disable password auth, use key-based auth, change default port cautiously, use AllowUsers/Groups, and enable fail2ban.',
        tags: ['security'],
        difficulty: 'Intermediate',
      },
      {
        id: 'linux-qa-7',
        question: 'What is SELinux enforcing vs permissive?',
        answer:
          'Enforcing blocks actions that violate policy; permissive only logs denials. Use getenforce/setenforce to view/change runtime mode.',
        tags: ['security'],
        difficulty: 'Intermediate',
      },
      {
        id: 'linux-qa-8',
        question: 'How to capture packets on an interface?',
        answer:
          'Use tcpdump -i <iface> -nn -s0 -c <count> to capture. Apply filters (host/port) to reduce volume.',
        tags: ['networking'],
        difficulty: 'Intermediate',
      },
      {
        id: 'linux-qa-9',
        question: 'How do you find files recently modified?',
        answer:
          'Use find /path -mtime -1 to find files modified in the last day, or -mmin for minutes.',
        tags: ['files'],
        difficulty: 'Beginner',
      },
      {
        id: 'linux-qa-10',
        question: 'How do you check open file limits?',
        answer:
          'ulimit -n shows shell limits; cat /proc/<pid>/limits for a process. Adjust via /etc/security/limits.conf or systemd unit settings.',
        tags: ['limits'],
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'network-security',
    name: 'Networking & Security',
    description: 'Network design, TLS, zero trust, and security controls for cloud workloads.',
    officialSite: 'https://owasp.org',
    officialDocs: 'https://owasp.org/www-project-top-ten/',
    notes: [
      {
        id: 'net-basics',
        title: 'Core concepts',
        bullets: [
          'CIDR notation defines networks; VPC/VNet subnets segment traffic.',
          'Use least privilege security groups/firewalls; default deny inbound.',
          'Plan IP ranges to avoid overlap across environments/peering.',
        ],
      },
      {
        id: 'net-dns',
        title: 'DNS & routing',
        bullets: [
          'Split-horizon DNS serves different answers internally vs externally.',
          'Route tables control next hops; use NVA/Transit Gateway/Hub-Spoke for shared services.',
          'Use health-checked DNS (weighted/latency) for failover.',
        ],
      },
      {
        id: 'net-tls',
        title: 'TLS & certificates',
        bullets: [
          'Use managed certificates when possible; automate renewals (ACME/Let’s Encrypt).',
          'Enforce TLS versions/ciphers; redirect HTTP to HTTPS.',
          'Mutual TLS for service-to-service auth; manage trust bundles centrally.',
        ],
      },
      {
        id: 'net-zero-trust',
        title: 'Zero trust patterns',
        bullets: [
          'Authenticate and authorize every request; avoid implicit trust by network location.',
          'Use identity-aware proxies/bastions instead of flat VPNs.',
          'Segment workloads and monitor east-west traffic.',
        ],
      },
      {
        id: 'net-firewalls',
        title: 'Firewalls & WAF',
        bullets: [
          'Layer 4 firewalls protect ports/IPs; WAFs inspect HTTP for OWASP threats.',
          'Geo/IP reputation filters help but tune to reduce false positives.',
          'Use rate limiting and bot protection for public endpoints.',
        ],
      },
      {
        id: 'net-secrets',
        title: 'Secrets & identity',
        bullets: [
          'Prefer short-lived credentials/OIDC to long-lived keys.',
          'Rotate keys/secrets regularly; audit access and use hardware-backed HSM where available.',
          'Use IAM conditions (source IP/VPC) to scope access paths.',
        ],
      },
      {
        id: 'net-monitor',
        title: 'Monitoring & detection',
        bullets: [
          'Flow logs/VPC flow logs show connections; enable and ship to SIEM.',
          'Use IDS/IPS where required; monitor DNS queries for anomalies.',
          'Set guardrails with policies to prevent public exposure of sensitive resources.',
        ],
      },
      {
        id: 'net-dr',
        title: 'Resilience & DR',
        bullets: [
          'Design multi-AZ/region with health checks and failover.',
          'Test failover regularly and document RTO/RPO.',
          'Use BGP/Anycast or DNS failover for global services.',
        ],
      },
    ],
    qa: [
      {
        id: 'net-qa-1',
        question: 'How do you prevent overlapping CIDRs in multi-account setups?',
        answer:
          'Plan IP ranges centrally, reserve blocks per environment, and enforce with automation/policies before VPC creation. Use IPv6 where possible to ease overlap.',
        tags: ['networking'],
        difficulty: 'Intermediate',
      },
      {
        id: 'net-qa-2',
        question: 'What is split-horizon DNS and why use it?',
        answer:
          'It serves different answers for the same domain internally vs externally. Useful for keeping private endpoints hidden while still using friendly names.',
        tags: ['dns'],
        difficulty: 'Beginner',
      },
      {
        id: 'net-qa-3',
        question: 'How do you secure service-to-service traffic?',
        answer:
          'Use mTLS with per-service identities, enforce TLS 1.2+, and restrict network policies/firewalls. Add rate limiting and authz at the edge or mesh.',
        tags: ['security', 'mtls'],
        difficulty: 'Intermediate',
      },
      {
        id: 'net-qa-4',
        question: 'How do you handle certificate rotation safely?',
        answer:
          'Automate issuance via ACME or managed certs, deploy new certs alongside old ones, reload services gracefully, and monitor expiry with alerts.',
        tags: ['tls'],
        difficulty: 'Intermediate',
      },
      {
        id: 'net-qa-5',
        question: 'When do you need a WAF?',
        answer:
          'When exposing public HTTP services needing protection from common attacks (SQLi, XSS). Also helpful for rate limiting, bot detection, and virtual patching.',
        tags: ['waf'],
        difficulty: 'Beginner',
      },
      {
        id: 'net-qa-6',
        question: 'How do you audit network flows?',
        answer:
          'Enable VPC/flow logs, centralize them in a SIEM, and alert on unusual ports, geo, or denied connections. Correlate with auth logs for investigations.',
        tags: ['observability'],
        difficulty: 'Intermediate',
      },
      {
        id: 'net-qa-7',
        question: 'What is zero trust in practice?',
        answer:
          'No implicit trust from network location. Every request is authenticated/authorized, devices are verified, and least privilege access is enforced with continuous evaluation.',
        tags: ['zero-trust'],
        difficulty: 'Intermediate',
      },
      {
        id: 'net-qa-8',
        question: 'How do you protect against data exfiltration?',
        answer:
          'Use egress controls (NAT + firewall rules), VPC endpoints, DLP scanning, service control policies, and alert on anomalous data transfers.',
        tags: ['security'],
        difficulty: 'Advanced',
      },
      {
        id: 'net-qa-9',
        question: 'How do you design for multi-region?',
        answer:
          'Use global DNS with health checks, replicate data with clear RPO/RTO, handle session affinity via cookies or global load balancers, and test failover.',
        tags: ['resilience'],
        difficulty: 'Advanced',
      },
      {
        id: 'net-qa-10',
        question: 'How do you safely expose internal tools to employees?',
        answer:
          'Use identity-aware proxies or SSO, enforce MFA, restrict by device posture, and avoid broad VPN access. Add logging and least-privilege policies.',
        tags: ['security'],
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'sre',
    name: 'SRE Practices',
    description: 'Reliability, incident response, capacity, and operational excellence.',
    officialSite: 'https://sre.google',
    officialDocs: 'https://sre.google/books/',
    notes: [
      {
        id: 'sre-slo',
        title: 'SLOs & error budgets',
        bullets: [
          'Define SLIs that reflect user experience (availability, latency).',
          'Set SLO targets and track error budgets; use them to govern release speed.',
          'Burn-rate alerts catch both fast outages and slow leaks.',
        ],
      },
      {
        id: 'sre-incidents',
        title: 'Incident response',
        bullets: [
          'Establish on-call rotations with clear escalation policies.',
          'Use chat/bridge plus an incident commander/roles to avoid chaos.',
          'Time-box mitigation vs diagnosis; favor restoring service quickly.',
        ],
        codeBlocks: ['# Example timeline\nT+0 detect\nT+5 page acknowledged\nT+10 mitigation in progress'],
      },
      {
        id: 'sre-postmortems',
        title: 'Postmortems',
        bullets: [
          'Blameless write-ups focusing on timeline, impact, root causes, and actions.',
          'Assign action items with owners/dates; track completion.',
          'Include detection gaps and what worked well.',
        ],
      },
      {
        id: 'sre-capacity',
        title: 'Capacity planning',
        bullets: [
          'Forecast using historical demand and growth; validate with load testing.',
          'Set headroom targets (e.g., 30%) for failover events.',
          'Track saturation of shared resources (DB connections, queues).',
        ],
      },
      {
        id: 'sre-change',
        title: 'Change management',
        bullets: [
          'Use progressive delivery (canary, feature flags) to reduce blast radius.',
          'Freeze windows for critical periods; require rollback plans.',
          'Measure change failure rate and MTTR as key DevOps metrics.',
        ],
      },
      {
        id: 'sre-runbooks',
        title: 'Runbooks & automation',
        bullets: [
          'Document common failure modes with steps and diagnostics.',
          'Automate well-understood fixes (auto-heal) with safeguards.',
          'Keep runbooks versioned and tested regularly.',
        ],
      },
      {
        id: 'sre-chaos',
        title: 'Resilience testing',
        bullets: [
          'Run game days and chaos experiments to validate recovery assumptions.',
          'Start small (single instance kill) before region-level tests.',
          'Measure time to detect and time to mitigate as experiment outputs.',
        ],
      },
      {
        id: 'sre-oncall',
        title: 'On-call health',
        bullets: [
          'Rotate fairly, track alert volume per person, and cap interrupts.',
          'Use follow-the-sun to reduce fatigue; ensure secondary coverage.',
          'Provide recovery time after major incidents.',
        ],
      },
    ],
    qa: [
      {
        id: 'sre-qa-1',
        question: 'What is an SLO and why use it?',
        answer:
          'A Service Level Objective is a target for a user-centric metric (e.g., 99.9% availability). It guides reliability decisions and balances innovation vs stability via error budgets.',
        tags: ['slo'],
        difficulty: 'Beginner',
      },
      {
        id: 'sre-qa-2',
        question: 'What is an error budget policy?',
        answer:
          'Rules on how teams behave when the error budget is consumed (slow releases, extra reviews). It ensures reliability targets are respected.',
        tags: ['slo'],
        difficulty: 'Intermediate',
      },
      {
        id: 'sre-qa-3',
        question: 'How do you run incidents effectively?',
        answer:
          'Page the right on-call, assign roles (IC, comms, ops), keep a live timeline, and prioritize mitigation. Communicate internally and externally with status updates.',
        tags: ['incidents'],
        difficulty: 'Intermediate',
      },
      {
        id: 'sre-qa-4',
        question: 'What makes a good postmortem?',
        answer:
          'Blameless tone, clear impact, timeline, contributing factors, root causes, lessons learned, and prioritized action items with owners.',
        tags: ['postmortem'],
        difficulty: 'Beginner',
      },
      {
        id: 'sre-qa-5',
        question: 'How do you decide alert thresholds?',
        answer:
          'Base them on SLOs and user impact, use burn-rate for error budgets, and avoid static CPU-only alerts. Tune to minimize noise while catching real issues.',
        tags: ['alerts'],
        difficulty: 'Intermediate',
      },
      {
        id: 'sre-qa-6',
        question: 'How do you ensure on-call is sustainable?',
        answer:
          'Track alert load, fix noisy alerts, offer compensation/recovery time, rotate fairly, and maintain good runbooks to reduce stress.',
        tags: ['oncall'],
        difficulty: 'Intermediate',
      },
      {
        id: 'sre-qa-7',
        question: 'What is toil and how to reduce it?',
        answer:
          'Toil is manual, repetitive, automatable work that scales with service. Reduce by automating, improving tooling, and eliminating unnecessary processes.',
        tags: ['toil'],
        difficulty: 'Beginner',
      },
      {
        id: 'sre-qa-8',
        question: 'How do you plan capacity?',
        answer:
          'Use historical usage, growth forecasts, and load testing. Maintain headroom for failover and seasonality; revisit regularly.',
        tags: ['capacity'],
        difficulty: 'Intermediate',
      },
      {
        id: 'sre-qa-9',
        question: 'How do feature flags help reliability?',
        answer:
          'They decouple deploy from release, enable gradual rollouts, fast disable on issues, and reduce need for hotfix deploys.',
        tags: ['release'],
        difficulty: 'Beginner',
      },
      {
        id: 'sre-qa-10',
        question: 'What should be in an incident runbook?',
        answer:
          'Triggering symptoms, quick mitigation steps, diagnostics, rollback commands, owners, and links to dashboards/logs.',
        tags: ['runbooks'],
        difficulty: 'Intermediate',
      },
    ],
  },
];
