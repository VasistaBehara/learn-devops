const prometheusData = {
  name: 'Prometheus',
  icon: '🔥',
  description: 'Open-source monitoring and alerting toolkit designed for reliability and scalability.',
  concepts: [
    {
      title: 'Metrics Collection',
      content: 'Prometheus uses a pull model to scrape metrics from targets at configured intervals. Targets expose metrics via HTTP endpoints in a specific format.',
      codeExample: {
        language: 'yaml',
        code: `# prometheus.yml
scrape_configs:
  - job_name: 'my-app'
    static_configs:
      - targets: ['localhost:8080']
    scrape_interval: 15s`
      }
    },
    {
      title: 'PromQL Basics',
      content: 'PromQL (Prometheus Query Language) is used to query time-series data. It supports aggregations, functions, and vector matching.',
      codeExample: {
        language: 'promql',
        code: `# Basic queries
http_requests_total
http_requests_total{status="200"}
rate(http_requests_total[5m])
sum(rate(http_requests_total[5m])) by (service)`
      }
    },
    {
      title: 'Metric Types',
      content: 'Prometheus supports four core metric types: Counter (cumulative), Gauge (point-in-time), Histogram (bucketed), and Summary (quantiles).',
      codeExample: {
        language: 'promql',
        code: `# Counter - only increases
http_requests_total

# Gauge - can go up and down
memory_usage_bytes

# Histogram - distribution buckets
http_request_duration_seconds_bucket{le="0.5"}`
      }
    },
    {
      title: 'Labels and Cardinality',
      content: 'Labels are key-value pairs that identify time series. High cardinality (too many unique label combinations) can cause performance issues.',
      codeExample: {
        language: 'promql',
        code: `# Good labels
http_requests_total{method="GET", status="200", path="/api"}

# Avoid high cardinality
# BAD: user_id as label with millions of users`
      }
    },
    {
      title: 'Alerting Rules',
      content: 'Prometheus can define alerting rules that trigger when conditions are met, sending alerts to Alertmanager for routing and notification.',
      codeExample: {
        language: 'yaml',
        code: `groups:
  - name: example
    rules:
      - alert: HighErrorRate
        expr: rate(http_errors_total[5m]) > 0.1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"`
      }
    },
    {
      title: 'Service Discovery',
      content: 'Prometheus supports automatic target discovery for Kubernetes, Consul, EC2, and other platforms, eliminating manual configuration.',
      codeExample: {
        language: 'yaml',
        code: `scrape_configs:
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true`
      }
    },
    {
      title: 'Recording Rules',
      content: 'Recording rules pre-compute frequently used or expensive queries and save results as new time series.',
      codeExample: {
        language: 'yaml',
        code: `groups:
  - name: example
    rules:
      - record: job:http_requests:rate5m
        expr: sum(rate(http_requests_total[5m])) by (job)`
      }
    },
    {
      title: 'Exporters',
      content: 'Exporters are tools that expose metrics from third-party systems in Prometheus format. Popular ones include node_exporter, mysql_exporter, and blackbox_exporter.',
      codeExample: {
        language: 'bash',
        code: `# Run node_exporter for system metrics
./node_exporter --web.listen-address=":9100"

# Scrape configuration
- job_name: 'node'
  static_configs:
    - targets: ['localhost:9100']`
      }
    },
    {
      title: 'Federation',
      content: 'Federation allows a Prometheus server to scrape selected time series from another Prometheus server, enabling hierarchical scaling.',
      codeExample: {
        language: 'yaml',
        code: `scrape_configs:
  - job_name: 'federate'
    scrape_interval: 30s
    honor_labels: true
    metrics_path: '/federate'
    params:
      'match[]':
        - '{job="app"}'`
      }
    },
    {
      title: 'Remote Storage',
      content: 'Prometheus supports remote write and read for long-term storage solutions like Thanos, Cortex, or VictoriaMetrics.',
      codeExample: {
        language: 'yaml',
        code: `# prometheus.yml
remote_write:
  - url: "http://thanos-receive:19291/api/v1/receive"

remote_read:
  - url: "http://thanos-query:9090/api/v1/read"`
      }
    }
  ],
  questions: [
    { question: 'How does Prometheus collect metrics?', answer: `Prometheus uses a pull model where it scrapes HTTP endpoints that expose metrics.
Targets are configured in scrape_configs, and Prometheus periodically fetches metrics at the defined scrape_interval.` },
    { question: 'What are the four metric types in Prometheus?', answer: `Counter (cumulative, only increases), Gauge (can go up or down), Histogram (samples in configurable buckets), and Summary (calculates quantiles).
Choose based on what you're measuring.` },
    { question: 'What is PromQL and how is it used?', answer: `PromQL is the query language for selecting and aggregating time series data.
It supports instant vectors, range vectors, scalar operations, and functions like rate(), sum(), avg(), histogram_quantile().` },
    { question: 'How do you handle high cardinality in Prometheus?', answer: `Avoid labels with many unique values (user IDs, request IDs).
Use recording rules to pre-aggregate data.
Consider dropping high-cardinality labels via relabeling.
Monitor cardinality with prometheus_tsdb_head_series.` },
    { question: 'Explain the difference between rate() and irate()', answer: 'rate() calculates per-second average over a time range, ideal for slow-moving counters and alerting. irate() uses only the last two samples, better for volatile metrics and dashboards but not alerting.' },
    { question: 'What is Alertmanager and how does it work with Prometheus?', answer: `Alertmanager handles alerts from Prometheus: deduplicates, groups, routes to receivers (email, Slack, PagerDuty), and manages silences/inhibitions.
Prometheus sends firing alerts, Alertmanager handles notification.` },
    { question: 'How do you monitor Kubernetes with Prometheus?', answer: `Use kubernetes_sd_configs for auto-discovery of pods, services, and nodes.
Deploy kube-state-metrics for cluster state.
Use annotations like prometheus.io/scrape=true for pod discovery.` },
    { question: 'What are recording rules and when should you use them?', answer: `Recording rules pre-compute expensive queries and save as new metrics.
Use for: frequently-used aggregations, complex queries in dashboards, reducing query latency, and cross-team metric sharing.` },
    { question: 'How do you scale Prometheus for large environments?', answer: `Use federation for hierarchical collection.
Implement Thanos or Cortex for long-term storage and global view.
Shard by team/environment.
Use recording rules to reduce query load.` },
    { question: 'What is the difference between push and pull models?', answer: `Pull: Prometheus scrapes targets (better for debugging, targets don't need to know about Prometheus).
Push: targets send metrics (useful for short-lived jobs via Pushgateway, but loses some benefits).` },
    { question: 'How do you create custom metrics in your application?', answer: `Use Prometheus client libraries (Python, Go, Java, etc.) to instrument code.
Create Counter, Gauge, Histogram types and expose via /metrics endpoint.
Follow naming conventions: namespace_subsystem_name_unit.` },
    { question: 'What is label relabeling and when is it used?', answer: `Relabeling modifies labels during scraping.
Use cases: drop unwanted targets, add labels from metadata, rename labels, filter by regex.
Configured via relabel_configs in scrape_configs.` },
    { question: 'How do you persist Prometheus data?', answer: `Prometheus stores data locally using TSDB.
For long-term retention, use remote_write to send data to Thanos, Cortex, or VictoriaMetrics.
Configure retention with --storage.tsdb.retention.time flag.` },
    { question: 'What are the best practices for alerting rules?', answer: `Use "for" clause to avoid flapping.
Keep runbooks linked in annotations.
Set appropriate severity levels.
Test alerts in staging.
Avoid alert fatigue with proper thresholds.
Use recording rules for complex conditions.` },
    { question: 'How do you debug scrape failures?', answer: `Check /targets endpoint for status and errors.
Verify target is reachable.
Check /metrics endpoint format.
Review relabel_configs.
Check for certificate issues with TLS.
Look at prometheus_target_scrape_pool_* metrics.` }
  ]
};

export default prometheusData;
