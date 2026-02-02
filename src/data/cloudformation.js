const cloudformationData = {
    name: 'AWS CloudFormation',
    icon: '📋',
    description: 'AWS Infrastructure as Code service for provisioning and managing AWS resources using templates.',
    concepts: [
        {
            title: 'Templates',
            content: 'CloudFormation templates are JSON or YAML files that declare AWS resources. Templates have sections: AWSTemplateFormatVersion, Description, Parameters, Mappings, Conditions, Resources, and Outputs.',
            codeExample: {
                language: 'yaml',
                code: `AWSTemplateFormatVersion: '2010-09-09'
Description: Simple EC2 instance

Parameters:
  InstanceType:
    Type: String
    Default: t3.micro

Resources:
  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: !Ref InstanceType
      ImageId: ami-0abcdef1234567890

Outputs:
  InstanceId:
    Value: !Ref MyEC2Instance`
            }
        },
        {
            title: 'Stacks',
            content: 'A stack is a collection of AWS resources managed as a single unit. Create, update, or delete stacks to manage resources. Stack operations are atomic - all succeed or all fail.',
            codeExample: {
                language: 'bash',
                code: `# Create stack
aws cloudformation create-stack \\
  --stack-name my-stack \\
  --template-body file://template.yaml \\
  --parameters ParameterKey=InstanceType,ParameterValue=t3.micro

# Update stack
aws cloudformation update-stack \\
  --stack-name my-stack \\
  --template-body file://template.yaml

# Delete stack
aws cloudformation delete-stack --stack-name my-stack`
            }
        },
        {
            title: 'Intrinsic Functions',
            content: 'Built-in functions for dynamic values: Ref, GetAtt, Join, Sub, Split, Select, If, Equals, And, Or, Not, ImportValue, FindInMap, and more.',
            codeExample: {
                language: 'yaml',
                code: `Resources:
  MyBucket:
    Type: AWS::S3::Bucket

  MyFunction:
    Type: AWS::Lambda::Function
    Properties:
      Environment:
        Variables:
          # Reference another resource
          BUCKET_NAME: !Ref MyBucket
          # Get attribute
          BUCKET_ARN: !GetAtt MyBucket.Arn
          # String substitution
          REGION: !Sub '\${AWS::Region}'
          # Join strings
          ENDPOINT: !Join ['', ['https://', !Ref MyBucket, '.s3.amazonaws.com']]`
            }
        },
        {
            title: 'Parameters',
            content: 'Parameters let you input custom values when creating or updating a stack. Support types: String, Number, List, CommaDelimitedList, AWS SSM Parameter, and AWS-specific types.',
            codeExample: {
                language: 'yaml',
                code: `Parameters:
  Environment:
    Type: String
    AllowedValues: [dev, staging, prod]
    Default: dev
  
  VpcId:
    Type: AWS::EC2::VPC::Id
    Description: Select a VPC
  
  SubnetIds:
    Type: List<AWS::EC2::Subnet::Id>
    Description: Select subnets
  
  DBPassword:
    Type: String
    NoEcho: true  # Hide in console
    MinLength: 8`
            }
        },
        {
            title: 'Mappings and Conditions',
            content: 'Mappings create lookup tables (like AMI IDs per region). Conditions control resource creation based on parameter values or environment.',
            codeExample: {
                language: 'yaml',
                code: `Mappings:
  RegionAMI:
    us-east-1:
      AMI: ami-0abcdef1234567890
    us-west-2:
      AMI: ami-0fedcba0987654321

Conditions:
  IsProd: !Equals [!Ref Environment, prod]

Resources:
  MyInstance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: !FindInMap [RegionAMI, !Ref 'AWS::Region', AMI]
      InstanceType: !If [IsProd, t3.large, t3.micro]`
            }
        },
        {
            title: 'Nested Stacks',
            content: 'Break large templates into smaller, reusable components. Parent stack references child stacks using AWS::CloudFormation::Stack resource type.',
            codeExample: {
                language: 'yaml',
                code: `Resources:
  VPCStack:
    Type: AWS::CloudFormation::Stack
    Properties:
      TemplateURL: https://s3.amazonaws.com/bucket/vpc.yaml
      Parameters:
        Environment: !Ref Environment

  AppStack:
    Type: AWS::CloudFormation::Stack
    Properties:
      TemplateURL: https://s3.amazonaws.com/bucket/app.yaml
      Parameters:
        VpcId: !GetAtt VPCStack.Outputs.VpcId
        SubnetId: !GetAtt VPCStack.Outputs.SubnetId`
            }
        },
        {
            title: 'Change Sets',
            content: 'Preview changes before applying them. Change sets show which resources will be added, modified, or replaced, helping prevent unintended changes.',
            codeExample: {
                language: 'bash',
                code: `# Create change set
aws cloudformation create-change-set \\
  --stack-name my-stack \\
  --change-set-name my-changes \\
  --template-body file://template.yaml

# Describe change set
aws cloudformation describe-change-set \\
  --stack-name my-stack \\
  --change-set-name my-changes

# Execute change set
aws cloudformation execute-change-set \\
  --stack-name my-stack \\
  --change-set-name my-changes`
            }
        },
        {
            title: 'StackSets',
            content: 'Deploy stacks across multiple AWS accounts and regions from a single template. Useful for organization-wide standards and compliance.',
            codeExample: {
                language: 'bash',
                code: `# Create stack set
aws cloudformation create-stack-set \\
  --stack-set-name security-baseline \\
  --template-body file://security.yaml \\
  --permission-model SERVICE_MANAGED

# Add stack instances to accounts/regions
aws cloudformation create-stack-instances \\
  --stack-set-name security-baseline \\
  --deployment-targets OrganizationalUnitIds=ou-xxxx \\
  --regions us-east-1 us-west-2`
            }
        },
        {
            title: 'Drift Detection',
            content: 'Detect when actual resource configuration differs from the template. Drift can occur from manual console changes or other tools.',
            codeExample: {
                language: 'bash',
                code: `# Initiate drift detection
aws cloudformation detect-stack-drift \\
  --stack-name my-stack

# Check drift detection status
aws cloudformation describe-stack-drift-detection-status \\
  --stack-drift-detection-id xxx

# Get detailed drift results
aws cloudformation describe-stack-resource-drifts \\
  --stack-name my-stack \\
  --stack-resource-drift-status-filters MODIFIED DELETED`
            }
        },
        {
            title: 'Custom Resources',
            content: 'Extend CloudFormation with custom logic using Lambda functions or SNS topics. Handle resources CloudFormation doesn\'t natively support.',
            codeExample: {
                language: 'yaml',
                code: `Resources:
  CustomResource:
    Type: Custom::MyResource
    Properties:
      ServiceToken: !GetAtt CustomLambda.Arn
      CustomProperty: some-value

  CustomLambda:
    Type: AWS::Lambda::Function
    Properties:
      Handler: index.handler
      Runtime: python3.9
      Code:
        ZipFile: |
          import cfnresponse
          def handler(event, context):
            # Custom logic here
            cfnresponse.send(event, context, cfnresponse.SUCCESS, {})`
            }
        }
    ],
    questions: [
        { question: 'What is AWS CloudFormation?', answer: `CloudFormation is AWS's Infrastructure as Code service.
Define resources in YAML/JSON templates, and CloudFormation provisions and manages them as stacks.
It handles dependencies, rollbacks on failure, and tracks resource state.` },
        { question: 'What is the difference between CloudFormation and Terraform?', answer: `CloudFormation is AWS-only, free, tightly integrated with AWS.
Terraform is multi-cloud, has larger community, uses HCL syntax.
CloudFormation has StackSets for multi-account; Terraform needs workspaces or separate configs.` },
        { question: 'How do you handle secrets in CloudFormation?', answer: `Use NoEcho parameter (hides in console), reference Secrets Manager/SSM Parameter Store via dynamic references ({{resolve:secretsmanager:...}}), or pass ARN and retrieve in application.
Never hardcode secrets in templates.` },
        { question: 'What is a change set and why use it?', answer: `Change sets preview stack updates before applying.
They show: resources added, modified (with replacement risk), or deleted.
Essential for production to avoid accidental data loss or service disruption.` },
        { question: 'How does CloudFormation handle rollback?', answer: `On stack creation failure, CloudFormation deletes created resources by default.
On update failure, it rolls back to previous state.
Can disable rollback for debugging.
Stack events show failure reasons.` },
        { question: 'What is drift detection?', answer: `Drift detection compares actual resource configuration to template definition.
Detects manual changes made outside CloudFormation.
Shows MODIFIED, DELETED, or IN_SYNC status.
Not all resource types supported.` },
        { question: 'How do you organize large CloudFormation templates?', answer: `Use nested stacks for modularity.
Use cross-stack references (Export/ImportValue).
Use AWS CDK for complex logic.
Follow single-responsibility principle.
Keep templates under 1MB limit.` },
        { question: 'What are StackSets used for?', answer: `StackSets deploy stacks across multiple accounts and regions simultaneously.
Use for: security baselines, compliance standards, shared services.
Supports AWS Organizations integration for automatic deployment.` },
        { question: 'How do intrinsic functions work?', answer: `Intrinsic functions compute values at runtime: !Ref (reference), !GetAtt (get attribute), !Sub (substitute), !Join (concatenate), !If (conditional), !FindInMap (lookup).
They enable dynamic, reusable templates.` },
        { question: 'What happens when you delete a stack?', answer: `CloudFormation deletes all resources in the stack (unless they have DeletionPolicy: Retain).
Deletion respects dependencies (reverse order).
Some resources (like non-empty S3 buckets) may cause deletion to fail.` },
        { question: 'How do you implement blue-green deployments?', answer: `Create new resources alongside old (AutoScalingReplacingUpdate), use weighted routing in Route 53, or update ALB target groups.
CodeDeploy integration for EC2.
Step Functions for orchestration.` },
        { question: 'What is UpdateReplacePolicy vs DeletionPolicy?', answer: `DeletionPolicy: controls what happens when stack is deleted (Delete, Retain, Snapshot).
UpdateReplacePolicy: controls what happens when resource is replaced during update.
Both can preserve data.` },
        { question: 'How do you handle circular dependencies?', answer: `Circular dependencies occur when resources reference each other.
Solutions: use DependsOn to order, break into separate stacks with exports, use Lambda custom resource to configure after creation.` },
        { question: 'What is AWS CDK and how does it relate to CloudFormation?', answer: `CDK lets you define infrastructure in programming languages (TypeScript, Python, Java).
It synthesizes to CloudFormation templates.
Provides higher level constructs, loops, conditionals.
CloudFormation executes the synthesized templates.` },
        { question: 'How do you import existing resources into a stack?', answer: `Use resource import feature: create template with existing resource, specify identifiers, import.
CloudFormation adopts the resource.
Requires: resource supports import, template matches current config, identifier is unique.` }
    ]
};

export default cloudformationData;
