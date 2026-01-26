export default {
    id: 'azure',
    name: 'Microsoft Azure',
    icon: '🔷',
    description: 'Microsoft\'s cloud platform with 200+ services for compute, storage, databases, AI, and enterprise integration.',
    concepts: [
        {
            title: 'Virtual Machines',
            content: `Azure VMs. Series: B (burstable), D (general), E (memory), F (compute), N (GPU). Availability Sets (FD+UD) and Availability Zones (99.99% SLA).

Scale Sets for auto-scaling. Spot VMs for up to 90% discount.`,
            codeExample: {
                language: 'bash', code: `az vm create -g myRG -n myVM --image UbuntuLTS \\
  --size Standard_B2s --admin-username azureuser \\
  --generate-ssh-keys` }
        },
        {
            title: 'Azure Storage',
            content: `Blob (objects), Files (SMB), Queue (messaging), Table (NoSQL), Disk (VM). Access tiers: Hot, Cool, Archive.

Redundancy: LRS, ZRS, GRS, RA-GRS, GZRS.`,
            codeExample: {
                language: 'bash', code: `az storage account create -n mystorageacct -g myRG \\
  -l eastus --sku Standard_LRS
az storage blob upload -f file.txt -c container -n blob.txt` }
        },
        {
            title: 'Azure Active Directory',
            content: `Identity platform (now Entra ID). SSO, MFA, Conditional Access, identity protection. Service Principals for apps. Managed Identities eliminate credentials.

PIM for just-in-time admin access.`,
            codeExample: {
                language: 'bash', code: `az ad sp create-for-rbac --name myApp \\
  --role Contributor --scopes /subscriptions/{id}/resourceGroups/myRG` }
        },
        {
            title: 'Azure Functions',
            content: `Serverless compute. Triggers: HTTP, Timer, Queue, Blob, Event Hub. Plans: Consumption (scale to zero), Premium (warm), Dedicated.

Durable Functions for stateful workflows.`,
            codeExample: {
                language: 'javascript', code: `module.exports = async function (context, req) {
    const name = req.query.name || "World";
    context.res = { body: "Hello " + name };
};` }
        },
        {
            title: 'Virtual Networks',
            content: `VNets for network isolation. Subnets, NSGs (Network Security Groups). VNet Peering, VPN Gateway, ExpressRoute.

Private Endpoints for PaaS services. Service Endpoints for optimized routing.`,
            codeExample: {
                language: 'bash', code: `az network vnet create -g myRG -n myVNet \\
  --address-prefix 10.0.0.0/16 --subnet-name default \\
  --subnet-prefix 10.0.0.0/24` }
        },
        {
            title: 'Azure SQL Database',
            content: `Managed SQL Server. Tiers: Basic, Standard, Premium (DTU) or vCore (General, Business Critical, Hyperscale).

Geo-replication, failover groups, elastic pools for multi-tenant.`,
            codeExample: {
                language: 'bash', code: `az sql server create -n myserver -g myRG \\
  --admin-user myadmin --admin-password Pass123!
az sql db create -g myRG -s myserver -n mydb --tier Standard` }
        },
        {
            title: 'Cosmos DB',
            content: `Globally distributed NoSQL. APIs: SQL, MongoDB, Cassandra, Gremlin, Table. Single-digit ms latency. Five consistency levels.

Request Units (RU/s) for throughput. Serverless or provisioned.`,
            codeExample: {
                language: 'bash', code: `az cosmosdb create -n mycosmos -g myRG \\
  --kind GlobalDocumentDB --default-consistency-level Session` }
        },
        {
            title: 'AKS (Kubernetes Service)',
            content: `Managed Kubernetes. Azure AD integration, Azure CNI networking, Container Insights, Defender for Containers.

Virtual Nodes for serverless pods. KEDA for event-driven scaling.`,
            codeExample: {
                language: 'bash', code: `az aks create -g myRG -n myAKS --node-count 3 \\
  --enable-managed-identity --generate-ssh-keys
az aks get-credentials -g myRG -n myAKS` }
        },
        {
            title: 'Azure DevOps',
            content: `DevOps platform: Repos (Git), Pipelines (CI/CD), Boards (work tracking), Artifacts (packages), Test Plans.

YAML pipelines for IaC. Environments for deployment approvals.`,
            codeExample: {
                language: 'yaml', code: `trigger: [main]
pool: { vmImage: 'ubuntu-latest' }
steps:
  - script: npm install && npm test
  - task: AzureWebApp@1
    inputs: { appName: 'myApp' }` }
        },
        {
            title: 'ARM Templates & Bicep',
            content: `ARM Templates: JSON IaC for Azure. Bicep: DSL that compiles to ARM, cleaner syntax.

What-if preview, complete/incremental modes. Azure Blueprints for governance.`,
            codeExample: {
                language: 'bash', code: `// Bicep
resource storage 'Microsoft.Storage/storageAccounts@2021-02-01' = {
  name: 'mystorageacct'
  location: 'eastus'
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
}` }
        },
        {
            title: 'Azure Monitor',
            content: `Unified monitoring. Metrics, Logs (KQL queries), Alerts, Dashboards. Application Insights for APM.

Log Analytics workspace. Action Groups for notifications. Workbooks for visualization.`,
            codeExample: {
                language: 'bash', code: `az monitor metrics alert create -n HighCPU -g myRG \\
  --scopes /subscriptions/{id}/resourceGroups/myRG/... \\
  --condition "avg Percentage CPU > 80" --window-size 5m` }
        },
        {
            title: 'App Service',
            content: `Managed web hosting. Languages: .NET, Java, Node.js, Python, PHP, Ruby. Deployment slots for staging.

Plans: Free, Shared, Basic, Standard (scaling), Premium, Isolated (VNet).`,
            codeExample: {
                language: 'bash', code: `az webapp create -g myRG -p myPlan -n myWebApp \\
  --runtime "NODE|18-lts"` }
        },
        {
            title: 'Azure Key Vault',
            content: `Secrets management. Store: Secrets (strings), Keys (encryption), Certificates. HSM-backed available.

RBAC or access policies. Managed Identity integration. Soft delete protection.`,
            codeExample: {
                language: 'bash', code: `az keyvault create -n myVault -g myRG -l eastus
az keyvault secret set --vault-name myVault \\
  --name mySecret --value "secretValue"` }
        },
        {
            title: 'Azure Front Door',
            content: `Global HTTP load balancer with CDN, WAF, SSL offload. Anycast routing. Fast failover with health probes.

URL rewriting, caching, A/B testing. Premium includes Private Link origins.`,
            codeExample: {
                language: 'bash', code: `az afd profile create -g myRG -n myFrontDoor \\
  --sku Standard_AzureFrontDoor` }
        },
        {
            title: 'Event Grid & Event Hubs',
            content: `Event Grid: Event routing for reactive apps. Topics, subscriptions, filters. Event Hubs: Big data streaming, millions of events/sec, Kafka compatible.

Use Grid for events, Hubs for streaming data.`,
            codeExample: {
                language: 'bash', code: `az eventgrid topic create -n myTopic -g myRG -l eastus
az eventhubs namespace create -n myEH -g myRG -l eastus` }
        }
    ],
    questions: [
        { question: 'What is the difference between Azure AD and AD DS?', answer: `AD DS: On-premises, LDAP, Kerberos, Group Policy. Azure AD: Cloud-based, REST/SAML/OAuth, no Group Policy, SSO for SaaS. Azure AD Connect syncs between them.` },
        { question: 'Explain Availability Sets vs Zones.', answer: `Sets: Fault domains + Update domains within datacenter (99.95%). Zones: Separate datacenters in region (99.99%). Use Zones for production, Sets when Zones unavailable.` },
        { question: 'What are Managed Identities?', answer: `Azure resource identity without credentials. System-assigned (tied to resource) or User-assigned (independent). Eliminates secrets in code. Use for accessing Key Vault, Storage, etc.` },
        { question: 'How does VNet Peering work?', answer: `Private connectivity between VNets via Azure backbone. Non-transitive. Can span regions (global peering). Low latency. Traffic not free. Alternative: VPN Gateway.` },
        { question: 'What is Azure Policy?', answer: `Governance service. Policies define rules, Initiatives group policies. Effects: Deny, Audit, Append, DeployIfNotExists. Assign at management group, subscription, or resource group.` },
        { question: 'Explain App Service plans.', answer: `Compute resources for web apps. Tiers: Free/Shared, Basic, Standard (autoscale/slots), Premium (VNet), Isolated. Apps in same plan share resources. Scale plan, not app.` },
        { question: 'What is Azure Key Vault?', answer: `Centralized secrets, keys, certificates. HSM-backed option. RBAC or access policies. Integrate with Managed Identity. Soft delete, purge protection. Essential for security.` },
        { question: 'How does Load Balancer differ from App Gateway?', answer: `Load Balancer: Layer 4 (TCP/UDP), fast, zones. App Gateway: Layer 7 (HTTP), URL routing, SSL offload, WAF. Use App Gateway for web, LB for other TCP.` },
        { question: 'What is Azure Front Door?', answer: `Global HTTP load balancer + CDN + WAF. Anycast, fast failover. URL rewriting, caching. Premium has Private Link. Use for global web applications.` },
        { question: 'Explain Azure RBAC.', answer: `Role-Based Access Control. Security principal + Role definition + Scope. Built-in: Owner, Contributor, Reader. Inheritance: Management Group → Subscription → RG → Resource.` },
        { question: 'What are Management Groups?', answer: `Hierarchy above subscriptions. Apply policies, RBAC across subscriptions. Organize by department, environment, etc. Root management group at organization level.` },
        { question: 'How do you implement DR in Azure?', answer: `Azure Site Recovery replicates VMs. Geo-redundant storage. Traffic Manager for DNS failover. Paired regions for compliance. Define RTO/RPO.` },
        { question: 'What is Azure Service Bus?', answer: `Enterprise messaging. Queues (point-to-point), Topics (pub/sub). Sessions, dead-lettering, transactions. Better for enterprise patterns than Storage Queues.` },
        { question: 'Explain Container Instances.', answer: `Run containers without VMs or K8s. Fast startup, per-second billing. Burst workloads, CI/CD, simple apps. Use AKS for production orchestration.` },
        { question: 'What is Azure Sentinel?', answer: `Cloud-native SIEM + SOAR. Collects data, AI-powered detection, automated playbooks. Integrates with Microsoft security products. Pay per GB analyzed.` }
    ]
};
