const helmData = {
    name: 'Helm',
    icon: '⎈',
    description: 'The package manager for Kubernetes, enabling you to define, install, and upgrade complex Kubernetes applications.',
    concepts: [
        {
            title: 'Charts',
            content: 'A Helm chart is a collection of files that describe a related set of Kubernetes resources. Charts contain templates, values, and metadata.',
            codeExample: {
                language: 'bash',
                code: `my-chart/
  Chart.yaml        # Chart metadata
  values.yaml       # Default values
  charts/           # Dependencies
  templates/        # Kubernetes manifests
    deployment.yaml
    service.yaml
    _helpers.tpl    # Template helpers`
            }
        },
        {
            title: 'Templates and Values',
            content: 'Templates use Go templating to generate Kubernetes manifests. Values from values.yaml or --set flags customize the output.',
            codeExample: {
                language: 'yaml',
                code: `# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-app
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"`
            }
        },
        {
            title: 'Releases',
            content: 'A release is an instance of a chart running in a cluster. Each install creates a new release with its own name and configuration.',
            codeExample: {
                language: 'bash',
                code: `# Install a release
helm install my-release bitnami/nginx

# List releases
helm list

# Upgrade a release
helm upgrade my-release bitnami/nginx --set replicaCount=3

# Rollback
helm rollback my-release 1`
            }
        },
        {
            title: 'Repositories',
            content: 'Helm repositories host packaged charts. Public repos like Bitnami and Artifact Hub provide thousands of ready-to-use charts.',
            codeExample: {
                language: 'bash',
                code: `# Add repository
helm repo add bitnami https://charts.bitnami.com/bitnami

# Update repos
helm repo update

# Search for charts
helm search repo nginx

# Search Artifact Hub
helm search hub prometheus`
            }
        },
        {
            title: 'Dependencies',
            content: 'Charts can depend on other charts. Dependencies are defined in Chart.yaml and downloaded to the charts/ directory.',
            codeExample: {
                language: 'yaml',
                code: `# Chart.yaml
dependencies:
  - name: postgresql
    version: "12.x.x"
    repository: "https://charts.bitnami.com/bitnami"
    condition: postgresql.enabled

# Download dependencies
helm dependency update`
            }
        },
        {
            title: 'Hooks',
            content: 'Helm hooks allow you to run jobs at specific points in the release lifecycle: pre-install, post-install, pre-upgrade, etc.',
            codeExample: {
                language: 'yaml',
                code: `apiVersion: batch/v1
kind: Job
metadata:
  name: {{ .Release.Name }}-db-migrate
  annotations:
    "helm.sh/hook": post-install,post-upgrade
    "helm.sh/hook-weight": "0"
    "helm.sh/hook-delete-policy": hook-succeeded
spec:
  template:
    spec:
      containers:
        - name: migrate
          command: ["./migrate.sh"]`
            }
        },
        {
            title: 'Template Functions',
            content: 'Helm provides built-in functions from Go templates and Sprig library for string manipulation, defaults, conditionals, and more.',
            codeExample: {
                language: 'yaml',
                code: `# Default values
{{ .Values.name | default "my-app" }}

# Conditionals
{{- if .Values.ingress.enabled }}
# ingress config here
{{- end }}

# Loops
{{- range .Values.extraEnvVars }}
- name: {{ .name }}
  value: {{ .value | quote }}
{{- end }}`
            }
        },
        {
            title: 'Named Templates',
            content: 'Named templates (partials) in _helpers.tpl provide reusable template snippets for labels, names, and other common patterns.',
            codeExample: {
                language: 'yaml',
                code: `# _helpers.tpl
{{- define "myapp.labels" -}}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion }}
{{- end }}

# Usage in templates
metadata:
  labels:
    {{- include "myapp.labels" . | nindent 4 }}`
            }
        },
        {
            title: 'Values Schema',
            content: 'A values.schema.json file validates values input against a JSON schema, catching configuration errors before installation.',
            codeExample: {
                language: 'json',
                code: `{
  "$schema": "https://json-schema.org/draft-07/schema#",
  "properties": {
    "replicaCount": {
      "type": "integer",
      "minimum": 1
    },
    "image": {
      "type": "object",
      "properties": {
        "repository": {"type": "string"},
        "tag": {"type": "string"}
      },
      "required": ["repository"]
    }
  }
}`
            }
        },
        {
            title: 'Helm Test',
            content: 'Helm tests are pods that verify a release works correctly. Run with helm test to validate deployments.',
            codeExample: {
                language: 'yaml',
                code: `# templates/tests/test-connection.yaml
apiVersion: v1
kind: Pod
metadata:
  name: "{{ .Release.Name }}-test"
  annotations:
    "helm.sh/hook": test
spec:
  containers:
    - name: wget
      image: busybox
      command: ['wget', '{{ .Release.Name }}-svc:80']
  restartPolicy: Never

# Run tests: helm test my-release`
            }
        }
    ],
    questions: [
        { question: 'What is Helm and why is it used?', answer: 'Helm is a package manager for Kubernetes that packages related resources into charts. It solves: complex deployments, configuration management, dependency handling, and release versioning/rollback.' },
        { question: 'What is the difference between Helm 2 and Helm 3?', answer: 'Helm 3 removed Tiller (server component), improving security. It uses 3-way strategic merge for upgrades, stores releases in Kubernetes secrets, and added JSON schema validation. Helm 2 is deprecated.' },
        { question: 'How do you create a new Helm chart?', answer: 'Run "helm create mychart" to scaffold a new chart with default templates. Customize templates/, values.yaml, and Chart.yaml. Test with "helm template" and "helm lint" before installing.' },
        { question: 'How do you pass custom values to a Helm chart?', answer: 'Use --set for individual values (--set replicaCount=3), -f for values files (-f prod-values.yaml), or --set-file for file contents. Priority: --set > -f flags > chart defaults.' },
        { question: 'What is the purpose of _helpers.tpl?', answer: '_helpers.tpl contains named templates (define/include) for reusable snippets like labels, names, and selectors. It reduces duplication and ensures consistency across chart templates.' },
        { question: 'How do you manage Helm chart dependencies?', answer: 'Define in Chart.yaml dependencies section. Run "helm dependency update" to download to charts/. Use condition or tags to optionally enable. Can also manually place charts in charts/ folder.' },
        { question: 'How do you rollback a failed Helm deployment?', answer: 'Use "helm history <release>" to see revisions. Run "helm rollback <release> <revision>" to restore. Helm 3\'s 3-way merge handles rollbacks more intelligently than Helm 2.' },
        { question: 'What are Helm hooks and when are they used?', answer: 'Hooks run resources at lifecycle points: pre/post-install, pre/post-upgrade, pre/post-delete, test. Use for: database migrations, backups before upgrade, cleanup, validation.' },
        { question: 'How do you test Helm charts?', answer: 'Use "helm lint" for static analysis. "helm template" for local rendering. "helm install --dry-run" for server-side validation. helm-unittest plugin for unit tests. helm test for integration tests.' },
        { question: 'What is values.schema.json used for?', answer: 'JSON schema that validates values input. Catches type errors, missing required values, and invalid configurations before installation. Improves chart usability with clear validation messages.' },
        { question: 'How do you version and release Helm charts?', answer: 'Update version in Chart.yaml following SemVer. Use appVersion for application version. Package with "helm package". Host in chart repository (ChartMuseum, GitHub Pages, OCI registry).' },
        { question: 'What is the difference between helm template and helm install --dry-run?', answer: 'helm template renders locally without cluster access. helm install --dry-run sends to cluster for server-side validation but doesn\'t persist. --dry-run catches issues template misses (e.g., CRD validation).' },
        { question: 'How do you store Helm charts in OCI registries?', answer: 'Helm 3.8+ supports OCI registries natively. Use "helm push chart.tgz oci://registry/repo". Pull with "helm pull oci://registry/repo/chart". Works with Docker Hub, ECR, GCR, ACR.' },
        { question: 'How do you handle secrets in Helm charts?', answer: 'Never commit secrets in values. Use external secrets operators (External Secrets, Sealed Secrets). Reference existing secrets. Use helm-secrets plugin for encrypted values files with SOPS.' },
        { question: 'What are subcharts and how do they work?', answer: 'Subcharts are dependencies in charts/ folder. Parent can override subchart values under subchart name key. Use exports for data from child to parent. Enable/disable with conditions.' }
    ]
};

export default helmData;
