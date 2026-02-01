const grafanaData = {
    name: 'Grafana',
    icon: '📊',
    description: 'Open-source analytics and visualization platform for monitoring and observability dashboards.',
    concepts: [
        {
            title: 'Data Sources',
            content: 'Grafana connects to various data sources like Prometheus, InfluxDB, Elasticsearch, MySQL, and cloud providers. Each dashboard panel queries its configured data source.',
            codeExample: {
                language: 'yaml',
                code: `# Common data sources:
- Prometheus (metrics)
- Loki (logs)
- Jaeger/Tempo (traces)
- InfluxDB (time series)
- Elasticsearch (logs/metrics)
- PostgreSQL/MySQL (relational)`
            }
        },
        {
            title: 'Dashboard Basics',
            content: 'Dashboards contain panels arranged in rows. Each panel visualizes data using graphs, stats, tables, or other visualizations. Dashboards can be templated with variables.',
            codeExample: {
                language: 'json',
                code: `{
  "dashboard": {
    "title": "My Dashboard",
    "panels": [
      {
        "type": "graph",
        "title": "Request Rate",
        "targets": [
          {"expr": "rate(http_requests_total[5m])"}
        ]
      }
    ]
  }
}`
            }
        },
        {
            title: 'Variables and Templating',
            content: 'Variables make dashboards dynamic and reusable. Types include query (from data source), custom, interval, and datasource variables.',
            codeExample: {
                language: 'promql',
                code: `# Variable: $namespace
Query: label_values(kube_pod_info, namespace)

# Use in panel query:
sum(rate(http_requests_total{namespace="$namespace"}[5m]))`
            }
        },
        {
            title: 'Panel Types',
            content: 'Grafana offers various panel types: Time series, Stat, Gauge, Bar chart, Table, Heatmap, Logs, and more. Each is optimized for different data types.',
            codeExample: {
                language: 'yaml',
                code: `# Common panel types:
- Time series: trends over time
- Stat: single value with optional sparkline
- Gauge: current value vs thresholds
- Table: tabular data display
- Logs: log line visualization
- Heatmap: distribution patterns`
            }
        },
        {
            title: 'Alerting',
            content: 'Grafana Alerting creates alerts based on panel queries. Supports multiple notification channels and alert rules with conditions and evaluation intervals.',
            codeExample: {
                language: 'yaml',
                code: `# Alert rule example
name: HighCPU
condition: avg() > 80
for: 5m
notification:
  - slack-channel
  - pagerduty

# Contact points: email, Slack, 
# PagerDuty, webhook, etc.`
            }
        },
        {
            title: 'Provisioning',
            content: 'Grafana can be configured via YAML files for dashboards, data sources, and alert rules. Enables GitOps workflows for dashboard management.',
            codeExample: {
                language: 'yaml',
                code: `# datasources.yaml
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    url: http://prometheus:9090
    isDefault: true

# dashboards.yaml
apiVersion: 1
providers:
  - name: 'default'
    folder: ''
    options:
      path: /var/lib/grafana/dashboards`
            }
        },
        {
            title: 'Annotations',
            content: 'Annotations mark events on graphs (deployments, incidents). Can be added manually, via API, or queried from data sources.',
            codeExample: {
                language: 'yaml',
                code: `# Query annotation from Prometheus
datasource: Prometheus
expr: changes(deployment_version[1m]) > 0
titleFormat: Deployment
tagKeys: version, environment

# API annotation
POST /api/annotations
{"dashboardId": 1, "time": 1234567890, "text": "Deploy v1.2"}`
            }
        },
        {
            title: 'Organizations and RBAC',
            content: 'Grafana supports multi-tenancy with organizations. Role-Based Access Control (RBAC) manages permissions for dashboards, folders, and data sources.',
            codeExample: {
                language: 'yaml',
                code: `# Roles
- Viewer: view dashboards
- Editor: edit dashboards
- Admin: full access

# Folder permissions
/dashboards/production - Team A (Editor)
/dashboards/staging - All (Viewer)`
            }
        },
        {
            title: 'Plugins',
            content: 'Grafana\'s plugin architecture extends functionality with panel plugins, data source plugins, and app plugins from the community.',
            codeExample: {
                language: 'bash',
                code: `# Install plugin via CLI
grafana-cli plugins install grafana-piechart-panel

# Or via environment variable
GF_INSTALL_PLUGINS=grafana-clock-panel,grafana-worldmap-panel

# Popular plugins:
# - grafana-piechart-panel
# - grafana-worldmap-panel
# - grafana-polystat-panel`
            }
        },
        {
            title: 'Loki Integration',
            content: 'Grafana Loki is a log aggregation system designed to work with Grafana. It uses labels like Prometheus for efficient log querying.',
            codeExample: {
                language: 'logql',
                code: `# LogQL query in Grafana
{app="nginx"} |= "error"
{namespace="production"} | json | status >= 500
rate({job="app"}[5m])

# Correlate logs with metrics using same labels`
            }
        }
    ],
    questions: [
        { question: 'What is Grafana and what problems does it solve?', answer: 'Grafana is an open-source visualization platform that unifies metrics, logs, and traces from multiple sources into customizable dashboards. It solves the problem of scattered observability data by providing a single pane of glass for monitoring.' },
        { question: 'How do you connect Grafana to Prometheus?', answer: 'Add Prometheus as a data source in Configuration > Data Sources. Set the URL (e.g., http://prometheus:9090), configure authentication if needed, and test the connection. Then create panels using PromQL queries.' },
        { question: 'What are Grafana variables and how are they used?', answer: 'Variables make dashboards dynamic. Query variables pull values from data sources (label_values), custom variables offer predefined options, and interval variables control time granularity. Use $variable syntax in queries.' },
        { question: 'How do you implement dashboard as code?', answer: 'Use provisioning with YAML files to define data sources and dashboard providers. Store dashboard JSON in Git. Tools like Grafonnet (Jsonnet library) or Terraform Grafana provider enable programmatic dashboard creation.' },
        { question: 'Explain Grafana alerting architecture.', answer: 'Alert rules define conditions and evaluation intervals. When triggered, alerts route through contact points (Slack, email, PagerDuty). Notification policies control routing, grouping, and timing. Silences temporarily mute alerts.' },
        { question: 'How do you share dashboards across teams?', answer: 'Use folders with appropriate permissions. Export/import dashboard JSON. Use provisioning for GitOps. Create dashboard links for navigation. Use variables for multi-team dashboards. Consider Grafana Cloud for cross-org sharing.' },
        { question: 'What is the difference between Grafana OSS and Enterprise?', answer: 'OSS is free with core features. Enterprise adds: enhanced RBAC, reporting, data source permissions, SAML/LDAP sync, auditing, team sync, and enterprise plugins. Both support the same visualization features.' },
        { question: 'How do you optimize dashboard performance?', answer: 'Limit time range and data points. Use recording rules in Prometheus. Reduce panel count. Use appropriate refresh intervals. Cache data source queries. Avoid expensive regex in queries. Use mixed data sources sparingly.' },
        { question: 'How do you migrate dashboards between environments?', answer: 'Export dashboard JSON (share icon > Export). Use provisioning for automated deployment. Tools like grizzly or grafana-backup help. API scripting for bulk operations. Keep UID consistent for updates.' },
        { question: 'What are annotations and how are they useful?', answer: 'Annotations mark events on time series graphs (deployments, incidents, changes). They provide context for metric changes. Add via UI, API, or automatically from data sources. Essential for correlating events with metrics.' },
        { question: 'How do you implement high availability for Grafana?', answer: 'Use external database (PostgreSQL/MySQL) instead of SQLite. Deploy multiple Grafana instances behind load balancer. Share session storage. Use remote image rendering. Deploy in Kubernetes with replicas.' },
        { question: 'What is Grafana Loki and how does it integrate?', answer: 'Loki is a log aggregation system using Prometheus-like labels. Add as data source in Grafana. Query with LogQL. Correlate logs with metrics using matching labels. Explore view provides log searching and filtering.' },
        { question: 'How do you create a unified observability view?', answer: 'Add multiple data sources (Prometheus for metrics, Loki for logs, Tempo/Jaeger for traces). Use consistent labels across sources. Create dashboards with mixed panels. Use Explore for ad-hoc correlation.' },
        { question: 'What are transformations in Grafana?', answer: 'Transformations process query results before visualization: merge, filter, calculate, rename, join data frames. Examples: reduce rows, add field from calculation, filter by value. Chain multiple transformations.' },
        { question: 'How do you secure a Grafana installation?', answer: 'Enable HTTPS/TLS. Configure authentication (OAuth, LDAP, SAML). Set proper RBAC permissions. Disable anonymous access. Use secrets management for credentials. Enable audit logging. Regularly update Grafana.' }
    ]
};

export default grafanaData;
