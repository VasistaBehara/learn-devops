export default {
    id: 'aws',
    name: 'Amazon Web Services',
    icon: '☁️',
    description: 'The leading cloud platform offering 200+ services for compute, storage, networking, databases, analytics, and machine learning.',
    concepts: [
        {
            title: 'EC2 (Elastic Compute Cloud)',
            content: `EC2 provides resizable virtual servers. Instance types: General purpose (T3, M5), Compute optimized (C5), Memory optimized (R5), Storage optimized (I3), GPU (P3, G4).

Pricing: On-Demand, Reserved (1-3 year), Spot (up to 90% off), Savings Plans. AMIs are pre-configured templates.`,
            codeExample: {
                language: 'bash', code: `aws ec2 run-instances --image-id ami-0abcdef \\
  --instance-type t3.micro --key-name my-key \\
  --security-group-ids sg-123 --count 1` }
        },
        {
            title: 'S3 (Simple Storage Service)',
            content: `Object storage with unlimited scalability. Storage classes: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier, Glacier Deep Archive.

Features: Versioning, lifecycle policies, bucket policies, replication, event notifications.`,
            codeExample: {
                language: 'bash', code: `aws s3 mb s3://my-bucket
aws s3 cp file.txt s3://my-bucket/ --sse AES256
aws s3 sync ./local s3://my-bucket/` }
        },
        {
            title: 'IAM (Identity and Access Management)',
            content: `Manages access to AWS. Components: Users, Groups, Roles, Policies. Roles provide temporary credentials.

Best practice: Least privilege, use roles over access keys, enable MFA.`,
            codeExample: {
                language: 'json', code: `{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::my-bucket/*"
  }]
}` }
        },
        {
            title: 'Lambda (Serverless)',
            content: `Run code without servers. Triggers: API Gateway, S3, DynamoDB, SNS, SQS, CloudWatch. Runtimes: Node.js, Python, Java, Go, Ruby, .NET.

Cold starts on first invocation. Provisioned Concurrency for consistent latency. Pay per request and compute time.`,
            codeExample: {
                language: 'python', code: `def lambda_handler(event, context):
    name = event.get('name', 'World')
    return {
        'statusCode': 200,
        'body': f'Hello, {name}!'
    }` }
        },
        {
            title: 'VPC (Virtual Private Cloud)',
            content: `Isolated network. Public subnets route to Internet Gateway. Private subnets use NAT Gateway. Security Groups (stateful) vs NACLs (stateless).

VPC Peering connects VPCs. Transit Gateway for hub-and-spoke. PrivateLink for service access.`,
            codeExample: {
                language: 'bash', code: `aws ec2 create-vpc --cidr-block 10.0.0.0/16
aws ec2 create-subnet --vpc-id vpc-xxx --cidr-block 10.0.1.0/24` }
        },
        {
            title: 'RDS (Relational Database Service)',
            content: `Managed databases: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Aurora. Multi-AZ for HA. Read replicas for scaling.

Aurora: 5x MySQL performance, auto-scaling storage, up to 15 read replicas. Automated backups with PITR.`,
            codeExample: {
                language: 'bash', code: `aws rds create-db-instance --db-instance-identifier mydb \\
  --db-instance-class db.t3.micro --engine mysql \\
  --master-username admin --allocated-storage 20` }
        },
        {
            title: 'DynamoDB',
            content: `Serverless NoSQL database. Key-value and document. Single-digit ms latency. Auto-scaling. Global tables for multi-region.

Capacity modes: On-demand (pay per request) or Provisioned (RCU/WCU). DAX for caching.`,
            codeExample: {
                language: 'bash', code: `aws dynamodb create-table --table-name Users \\
  --attribute-definitions AttributeName=id,AttributeType=S \\
  --key-schema AttributeName=id,KeyType=HASH \\
  --billing-mode PAY_PER_REQUEST` }
        },
        {
            title: 'CloudFormation',
            content: `Infrastructure as Code. YAML/JSON templates. Stacks manage resources. Change sets preview changes. Nested stacks for modularity.

StackSets for multi-account/region. Drift detection identifies manual changes.`,
            codeExample: {
                language: 'yaml', code: `Resources:
  MyBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: my-bucket
      VersioningConfiguration:
        Status: Enabled` }
        },
        {
            title: 'ECS & EKS (Container Services)',
            content: `ECS: AWS-native container orchestration. Task definitions, services, clusters. Fargate for serverless.

EKS: Managed Kubernetes. Better for K8s ecosystem. Both integrate with ALB, CloudWatch, IAM.`,
            codeExample: {
                language: 'bash', code: `aws ecs create-cluster --cluster-name my-cluster
aws eks create-cluster --name my-eks \\
  --role-arn arn:aws:iam::123:role/eks-role \\
  --resources-vpc-config subnetIds=subnet-xxx` }
        },
        {
            title: 'Route 53 (DNS)',
            content: `Scalable DNS service. Hosted zones for domains. Record types: A, AAAA, CNAME, MX, TXT, Alias.

Routing policies: Simple, Weighted, Latency, Geolocation, Failover, Multi-value. Health checks for failover.`,
            codeExample: {
                language: 'bash', code: `aws route53 create-hosted-zone --name example.com \\
  --caller-reference 2024-unique` }
        },
        {
            title: 'CloudWatch (Monitoring)',
            content: `Metrics, logs, alarms, dashboards. Log Insights for queries. EventBridge (formerly CloudWatch Events) for event-driven automation.

Application Insights for automatic monitoring. Synthetics for canary testing.`,
            codeExample: {
                language: 'bash', code: `aws cloudwatch put-metric-alarm --alarm-name HighCPU \\
  --metric-name CPUUtilization --namespace AWS/EC2 \\
  --threshold 80 --comparison-operator GreaterThanThreshold` }
        },
        {
            title: 'SNS & SQS (Messaging)',
            content: `SNS: Pub/sub messaging, push-based. Topics, subscriptions (email, SMS, Lambda, SQS). Fan-out pattern.

SQS: Message queues, pull-based. Standard (at-least-once) or FIFO (exactly-once). Dead letter queues.`,
            codeExample: {
                language: 'bash', code: `aws sns create-topic --name my-topic
aws sqs create-queue --queue-name my-queue
aws sns subscribe --topic-arn arn:aws:sns:... \\
  --protocol sqs --notification-endpoint arn:aws:sqs:...` }
        },
        {
            title: 'API Gateway',
            content: `Managed API service. REST, HTTP, WebSocket APIs. Integrates with Lambda, HTTP backends, AWS services.

Features: Throttling, caching, authentication (IAM, Cognito, Lambda authorizers), usage plans.`,
            codeExample: {
                language: 'bash', code: `aws apigateway create-rest-api --name my-api
aws apigateway create-resource --rest-api-id xxx \\
  --parent-id xxx --path-part users` }
        },
        {
            title: 'Elastic Load Balancing',
            content: `ALB: Layer 7 (HTTP/HTTPS), path/host routing, WebSocket. NLB: Layer 4 (TCP/UDP), ultra-low latency. GLB: Layer 3, third-party appliances.

Target groups, health checks, sticky sessions, SSL termination.`,
            codeExample: {
                language: 'bash', code: `aws elbv2 create-load-balancer --name my-alb \\
  --type application --subnets subnet-xxx subnet-yyy` }
        },
        {
            title: 'CloudFront (CDN)',
            content: `Global CDN. Edge locations cache content. Origins: S3, ALB, custom HTTP. HTTPS, custom domains.

Lambda@Edge and CloudFront Functions for edge computing. Origin Access Control for S3.`,
            codeExample: {
                language: 'bash', code: `aws cloudfront create-distribution \\
  --origin-domain-name my-bucket.s3.amazonaws.com` }
        },
        {
            title: 'ElastiCache',
            content: `Managed Redis or Memcached. In-memory caching for low latency. Cluster mode for sharding. Replication for HA.

Use cases: Session storage, database caching, real-time analytics, leaderboards.`,
            codeExample: {
                language: 'bash', code: `aws elasticache create-cache-cluster \\
  --cache-cluster-id my-cache \\
  --engine redis --cache-node-type cache.t3.micro \\
  --num-cache-nodes 1` }
        },
        {
            title: 'Secrets Manager & Parameter Store',
            content: `Secrets Manager: Rotate credentials automatically. Database integration. More expensive.

Parameter Store (SSM): Hierarchical storage. Standard (free) or Advanced. SecureString with KMS. Better for config.`,
            codeExample: {
                language: 'bash', code: `aws secretsmanager create-secret --name my-secret \\
  --secret-string '{"user":"admin","pass":"secret"}'
aws ssm put-parameter --name /app/config \\
  --value "value" --type SecureString` }
        },
        {
            title: 'Kinesis (Streaming)',
            content: `Data Streams: Real-time streaming, shards for throughput. Firehose: Load to S3, Redshift, Elasticsearch. Analytics: SQL on streams.

Use for: Log aggregation, real-time analytics, IoT data, clickstreams.`,
            codeExample: {
                language: 'bash', code: `aws kinesis create-stream --stream-name my-stream \\
  --shard-count 1
aws kinesis put-record --stream-name my-stream \\
  --data "Hello" --partition-key key1` }
        },
        {
            title: 'Step Functions',
            content: `Orchestrate serverless workflows. Visual workflow designer. State machines with JSON. Standard (long-running) or Express (high-volume).

Integrates with 200+ AWS services. Error handling, retries, parallel execution.`,
            codeExample: {
                language: 'json', code: `{
  "StartAt": "ProcessOrder",
  "States": {
    "ProcessOrder": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...",
      "End": true
    }
  }
}` }
        },
        {
            title: 'EventBridge',
            content: `Serverless event bus. Connect applications with events. Rules route events to targets. Schema registry for discovery.

Sources: AWS services, SaaS apps, custom apps. Targets: Lambda, SQS, Step Functions, etc.`,
            codeExample: {
                language: 'bash', code: `aws events put-rule --name my-rule \\
  --event-pattern '{"source":["aws.ec2"]}'
aws events put-targets --rule my-rule \\
  --targets Id=1,Arn=arn:aws:lambda:...` }
        }
    ],
    questions: [
        { question: 'What is the difference between Security Groups and NACLs?', answer: `Security Groups: Instance level, stateful, allow rules only, all rules evaluated. NACLs: Subnet level, stateless, allow/deny rules, rules processed in order. Use SGs as primary defense.` },
        { question: 'Explain horizontal vs vertical scaling.', answer: `Vertical: Increase instance size (scale up). Requires restart. Has limits. Horizontal: Add more instances (scale out). Use Auto Scaling + Load Balancer. Preferred for HA.` },
        { question: 'What are S3 storage classes?', answer: `Standard (frequent), Intelligent-Tiering (unknown patterns), Standard-IA (infrequent), One Zone-IA (reproducible), Glacier Instant (ms retrieval), Glacier Flexible (min-hours), Deep Archive (12-48h).` },
        { question: 'How does Lambda cold start work?', answer: `First invocation: Download code, start environment, init runtime. Adds 100ms-seconds. Mitigate: Provisioned Concurrency, smaller packages, lighter runtimes, SnapStart (Java).` },
        { question: 'Explain least privilege in IAM.', answer: `Grant only permissions needed. Start with none, add as required. Specific resources over wildcards. Use conditions. Regular audits with Access Analyzer. Prefer roles over users.` },
        { question: 'What is VPC Peering and its limitations?', answer: `Private IP connectivity between VPCs. No transitive peering (A-B, B-C doesn't give A-C). No overlapping CIDRs. Doesn't extend to VPN/Direct Connect. Use Transit Gateway for hub-and-spoke.` },
        { question: 'How do you implement RDS high availability?', answer: `Multi-AZ: Synchronous standby, automatic failover (60-120s). Read replicas for read scaling (async). Aurora: 6 copies across 3 AZs, <30s failover.` },
        { question: 'What is the difference between ECS and EKS?', answer: `ECS: AWS-native, simpler, free control plane, deep AWS integration. EKS: Managed Kubernetes, portable, larger ecosystem, control plane cost. Choose ECS for simplicity, EKS for K8s compatibility.` },
        { question: 'How does Auto Scaling work?', answer: `Launch Template + Auto Scaling Group + Scaling Policies. Policies: Target Tracking (maintain metric), Step (threshold-based), Scheduled, Predictive. Spans AZs. Health checks replace unhealthy.` },
        { question: 'What are the Well-Architected Framework pillars?', answer: `Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability. Each has design principles and best practices. Use Well-Architected Tool for review.` },
        { question: 'Explain Direct Connect vs VPN.', answer: `Direct Connect: Dedicated fiber, consistent bandwidth, lower latency, weeks to provision, higher cost. VPN: Over internet, variable bandwidth, quick setup, lower cost. Use VPN as DC backup.` },
        { question: 'What is CloudTrail?', answer: `Records API calls across account. Management events (control plane) and data events (S3/Lambda). Store in S3, analyze with Athena. Enable multi-region, log file validation! for security auditing.` },
        { question: 'How do you optimize AWS costs?', answer: `Right-sizing with Compute Optimizer. Reserved Instances/Savings Plans (up to 72%). Spot for fault-tolerant. S3 lifecycle policies. Turn off non-prod. Use Cost Explorer and Budgets.` },
        { question: 'What is the shared responsibility model?', answer: `AWS: Security OF cloud (physical, infrastructure, managed services). Customer: Security IN cloud (data, access, OS patching, firewall). Varies by service type (IaaS vs PaaS vs SaaS).` },
        { question: 'Explain ALB vs NLB.', answer: `ALB: Layer 7 (HTTP/S), path/host routing, WebSocket, Lambda targets. NLB: Layer 4 (TCP/UDP), ultra-low latency, static IP, TLS passthrough. Use ALB for web, NLB for non-HTTP or extreme performance.` },
        { question: 'What is DynamoDB and when to use it?', answer: `Serverless NoSQL. Key-value/document. Single-digit ms. Auto-scales. Use for: Session data, gaming leaderboards, IoT, real-time apps. Not for: Complex queries, transactions across items, ACID requirements.` },
        { question: 'How does S3 replication work?', answer: `Cross-Region (CRR) or Same-Region (SRR). Requires versioning. Replicates new objects. Can replicate delete markers. Use for: DR, compliance, latency reduction, log aggregation.` },
        { question: 'What is AWS Organizations?', answer: `Centrally manage multiple accounts. Consolidated billing, volume discounts. SCPs (Service Control Policies) restrict account permissions. OUs for hierarchical organization.` },
        { question: 'Explain SNS vs SQS.', answer: `SNS: Pub/sub, push-based, fan-out to multiple subscribers. SQS: Queue, pull-based, decouple producers/consumers. Use together: SNS to SQS for reliable fan-out with buffering.` },
        { question: 'What are Reserved Instances vs Savings Plans?', answer: `RIs: Specific instance type/region, up to 72% discount, 1-3 years. Savings Plans: Committed spend/hour, more flexible, applies to EC2/Lambda/Fargate. Savings Plans generally preferred.` },
        { question: 'How does CloudFront work?', answer: `CDN with edge locations worldwide. Caches content near users. Origins: S3, ALB, custom. TTL controls caching. Lambda@Edge for edge compute. OAC secures S3 access.` },
        { question: 'What is EventBridge?', answer: `Serverless event bus. Connect AWS services, SaaS, custom apps via events. Rules filter and route. Targets: Lambda, SQS, Step Functions. Schema registry. Better than CloudWatch Events.` },
        { question: 'Explain KMS vs CloudHSM.', answer: `KMS: Managed, multi-tenant, integrated with AWS services, $1/key/month. CloudHSM: Dedicated hardware, single-tenant, FIPS 140-2 Level 3, compliance requirements. KMS for most, CloudHSM for strict compliance.` },
        { question: 'What is AWS WAF?', answer: `Web Application Firewall. Protects CloudFront, ALB, API Gateway. Rules: SQL injection, XSS, rate limiting, IP filtering. Managed rule groups available. Use with Shield for DDoS.` },
        { question: 'How do you secure data at rest in AWS?', answer: `S3: SSE-S3, SSE-KMS, SSE-C, client-side. EBS: Encrypted volumes. RDS: Encryption at creation. KMS manages keys. Enable encryption by default. Can't encrypt unencrypted resources in-place.` }
    ]
};
