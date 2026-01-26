export default {
    id: 'gcp',
    name: 'Google Cloud Platform',
    icon: '🌐',
    description: 'Google\'s cloud platform offering 100+ services for compute, storage, big data, machine learning, and networking.',
    concepts: [
        {
            title: 'Compute Engine',
            content: `Virtual machines. Machine types: E2 (cost-effective), N2 (balanced), C2 (compute), M2 (memory). Custom machine types available.

Preemptible/Spot VMs up to 80% cheaper. Live migration during maintenance. Sole-tenant nodes for compliance.`,
            codeExample: {
                language: 'bash', code: `gcloud compute instances create my-vm \\
  --zone=us-central1-a --machine-type=e2-medium \\
  --image-family=debian-11 --image-project=debian-cloud` }
        },
        {
            title: 'Cloud Storage',
            content: `Object storage. Classes: Standard, Nearline (monthly), Coldline (quarterly), Archive (yearly). Single API for all classes.

Features: Versioning, lifecycle management, uniform bucket-level access, CORS, signed URLs.`,
            codeExample: {
                language: 'bash', code: `gsutil mb -l us-central1 gs://my-bucket
gsutil cp file.txt gs://my-bucket/
gsutil lifecycle set lifecycle.json gs://my-bucket/` }
        },
        {
            title: 'Cloud IAM',
            content: `Access control. Members (who), Roles (what), Policies (bindings). Role types: Primitive, Predefined, Custom.

Service accounts for applications. Workload Identity for GKE. IAM Conditions for fine-grained access.`,
            codeExample: {
                language: 'bash', code: `gcloud projects add-iam-policy-binding my-project \\
  --member="user:admin@example.com" \\
  --role="roles/storage.admin"` }
        },
        {
            title: 'Cloud Functions',
            content: `Serverless functions. Triggers: HTTP, Cloud Storage, Pub/Sub, Firestore. Gen 2 built on Cloud Run with longer timeouts and concurrency.

Runtimes: Node.js, Python, Go, Java, Ruby, PHP, .NET.`,
            codeExample: {
                language: 'python', code: `import functions_framework

@functions_framework.http
def hello(request):
    name = request.args.get('name', 'World')
    return f'Hello, {name}!'` }
        },
        {
            title: 'VPC Networking',
            content: `Global VPCs span regions. Custom mode recommended. Firewall rules are VPC-level with priority. VPC peering, Shared VPC for organization.

Private Google Access for internal access to GCP APIs. Cloud NAT for outbound.`,
            codeExample: {
                language: 'bash', code: `gcloud compute networks create my-vpc --subnet-mode=custom
gcloud compute networks subnets create my-subnet \\
  --network=my-vpc --range=10.0.0.0/24 --region=us-central1` }
        },
        {
            title: 'Cloud SQL',
            content: `Managed relational databases: MySQL, PostgreSQL, SQL Server. High availability with regional instances. Read replicas, automated backups.

Cloud SQL Auth Proxy for secure connections. Private IP via VPC.`,
            codeExample: {
                language: 'bash', code: `gcloud sql instances create my-db \\
  --database-version=POSTGRES_14 \\
  --tier=db-g1-small --region=us-central1` }
        },
        {
            title: 'Cloud Spanner',
            content: `Globally distributed relational database. Horizontal scaling, strong consistency. 99.999% availability (multi-region).

Use for: Global apps, financial systems, inventory. Higher cost than Cloud SQL.`,
            codeExample: {
                language: 'bash', code: `gcloud spanner instances create my-instance \\
  --config=regional-us-central1 --nodes=1` }
        },
        {
            title: 'BigQuery',
            content: `Serverless data warehouse. Petabyte scale, standard SQL. Columnar storage. Streaming inserts. BigQuery ML for in-DB machine learning.

Pricing: On-demand ($5/TB) or flat-rate. Partition and cluster for optimization.`,
            codeExample: {
                language: 'bash', code: `bq query --use_legacy_sql=false \\
  'SELECT name, COUNT(*) FROM dataset.table GROUP BY name'` }
        },
        {
            title: 'GKE (Kubernetes Engine)',
            content: `Managed Kubernetes. Standard (full control) or Autopilot (fully managed). Auto-upgrades, Workload Identity, cluster autoscaler.

VPC-native clusters. GKE Gateway for ingress. Anthos for multi-cloud.`,
            codeExample: {
                language: 'bash', code: `gcloud container clusters create-auto my-cluster \\
  --region=us-central1
gcloud container clusters get-credentials my-cluster` }
        },
        {
            title: 'Cloud Run',
            content: `Serverless containers. Scale to zero. Any container, any language. Traffic splitting. Cloud Run Jobs for batch.

Up to 60 minute timeout, 32GB RAM. Better than Functions for complex apps.`,
            codeExample: {
                language: 'bash', code: `gcloud run deploy my-service \\
  --image=gcr.io/PROJECT/my-image \\
  --region=us-central1 --allow-unauthenticated` }
        },
        {
            title: 'Cloud Pub/Sub',
            content: `Messaging for event-driven systems. Topics and subscriptions. Pull, push, or BigQuery export. At-least-once delivery, ordering with keys.

Dead letter topics. Message retention up to 7 days.`,
            codeExample: {
                language: 'bash', code: `gcloud pubsub topics create my-topic
gcloud pubsub subscriptions create my-sub --topic=my-topic
gcloud pubsub topics publish my-topic --message="Hello"` }
        },
        {
            title: 'Cloud Load Balancing',
            content: `Global: HTTP(S), SSL Proxy, TCP Proxy. Regional: Network, Internal. Premium tier uses Google backbone.

Health checks, CDN integration, managed certificates, Cloud Armor for WAF/DDoS.`,
            codeExample: {
                language: 'bash', code: `gcloud compute backend-services create my-backend \\
  --global --protocol=HTTP --health-checks=my-hc` }
        },
        {
            title: 'Cloud Dataflow',
            content: `Managed Apache Beam. Unified batch and streaming. Auto-scaling workers. Exactly-once processing.

Use for: ETL, real-time analytics, data migration. Templates for common patterns.`,
            codeExample: {
                language: 'bash', code: `gcloud dataflow jobs run my-job \\
  --gcs-location=gs://dataflow-templates/wordcount \\
  --parameters inputFile=gs://input/*,output=gs://output/` }
        },
        {
            title: 'Cloud Firestore',
            content: `NoSQL document database. Real-time sync. Offline support. Scales automatically. Native mode or Datastore mode.

Strong consistency. Security rules for mobile/web apps.`,
            codeExample: { language: 'bash', code: `gcloud firestore databases create --region=us-central1` }
        },
        {
            title: 'Cloud Monitoring & Logging',
            content: `Monitoring: Metrics, dashboards, alerting, uptime checks. Logging: Log collection, Log Explorer, routing to BigQuery/GCS/Pub/Sub.

Cloud Trace for distributed tracing. Error Reporting for exceptions.`,
            codeExample: {
                language: 'bash', code: `gcloud monitoring policies create --policy-from-file=policy.json
gcloud logging read "severity>=ERROR" --limit=10` }
        }
    ],
    questions: [
        { question: 'What is the difference between Compute Engine and App Engine?', answer: `Compute Engine (IaaS): Full VM control. App Engine (PaaS): Managed, focus on code. Standard (sandboxed, fast scale) or Flexible (Docker). Use App Engine for web apps, Compute for custom needs.` },
        { question: 'Explain GCP resource hierarchy.', answer: `Organization → Folders → Projects → Resources. IAM policies inherit downward. More permissive policies at higher levels grant broader access. Projects are billing and resource boundary.` },
        { question: 'What is Workload Identity?', answer: `GKE pods impersonate IAM service accounts without keys. Map Kubernetes SA to IAM SA. No credentials to manage. Better security and audit trail than SA keys.` },
        { question: 'How does Cloud Spanner differ from Cloud SQL?', answer: `Cloud SQL: Regional, vertical scaling, MySQL/PostgreSQL/SQL Server. Spanner: Global, horizontal scaling, strong consistency, 99.999% SLA. Spanner for global scale, SQL for traditional workloads.` },
        { question: 'What load balancing options exist?', answer: `External: HTTP(S) (L7 global), TCP/SSL Proxy (L4 global), Network (L4 regional). Internal: HTTP(S), TCP/UDP. Premium tier uses Google backbone. Standard is internet-based.` },
        { question: 'When to use Cloud Run vs GKE?', answer: `Cloud Run: Stateless services, variable traffic, scale to zero, simple deployment. GKE: Kubernetes ecosystem, stateful apps, complex networking, multi-container pods.` },
        { question: 'What is Cloud Dataflow?', answer: `Managed Apache Beam for batch and streaming. Auto-scaling, exactly-once processing. Use for ETL, real-time analytics, data migration. Alternative to Dataproc (Spark/Hadoop).` },
        { question: 'How do you implement DR in GCP?', answer: `Multi-region services (Spanner, GCS), regional MIGs, global load balancing. Cold (backup restore), Warm (reduced standby), Hot (active-active). Cloud DNS for failover.` },
        { question: 'What is VPC Service Controls?', answer: `Security perimeter preventing data exfiltration. Define perimeter around projects, control API access. Block unauthorized data transfer. Essential for compliance.` },
        { question: 'Explain Cloud Armor.', answer: `DDoS protection and WAF. Pre-configured rules (OWASP), custom rules, rate limiting. Adaptive Protection with ML. Protects HTTP(S) Load Balancer backends.` },
        { question: 'How do you monitor applications?', answer: `Cloud Monitoring: Metrics, dashboards, alerting. Cloud Logging: Log Explorer, queries, sinks. Cloud Trace: Distributed tracing. Profiler: CPU/memory profiling.` },
        { question: 'What is Cloud CDN?', answer: `Content delivery at Google edge. Integrates with HTTP(S) LB. Cache modes: Use origin headers, cache all static, force cache all. Signed URLs for access control.` },
        { question: 'How are Labels used?', answer: `Key-value metadata for organization and billing. Up to 64 per resource. Use for cost allocation, filtering, automation. Different from network tags (firewall targeting).` },
        { question: 'What are Managed Instance Groups?', answer: `Collection of identical VMs from template. Autoscaling, health checks, rolling updates. Zonal or regional (multi-zone). Use for stateless web servers.` },
        { question: 'How does GCP handle encryption?', answer: `At rest: Default encryption (AES-256). CMEK (Cloud KMS managed), CSEK (customer-supplied). In transit: TLS 1.3. Cloud HSM for hardware key storage.` }
    ]
};
