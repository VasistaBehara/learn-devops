const argocdData = {
    name: 'ArgoCD',
    icon: '🔄',
    description: 'Declarative GitOps continuous delivery tool for Kubernetes applications.',
    concepts: [
        {
            title: 'GitOps Principles',
            content: 'GitOps uses Git as the single source of truth. ArgoCD continuously syncs cluster state to match Git repository. Changes happen through Git commits, not direct kubectl commands.',
            codeExample: {
                language: 'yaml',
                code: `# GitOps workflow:
# 1. Developer commits to Git
# 2. ArgoCD detects change
# 3. ArgoCD syncs to cluster
# 4. Cluster state matches Git

# Benefits:
# - Version controlled infrastructure
# - Audit trail of all changes
# - Easy rollbacks via git revert`
            }
        },
        {
            title: 'Applications',
            content: 'An Application in ArgoCD defines the source (Git repo), destination (K8s cluster), and sync policy. It tracks and syncs Kubernetes manifests from Git.',
            codeExample: {
                language: 'yaml',
                code: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/org/repo
    targetRevision: HEAD
    path: manifests
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`
            }
        },
        {
            title: 'Sync Policies',
            content: 'Sync policies control how ArgoCD applies changes. Options include automated sync, self-healing (reverts manual changes), and pruning (deletes removed resources).',
            codeExample: {
                language: 'yaml',
                code: `syncPolicy:
  automated:
    prune: true           # Delete resources not in Git
    selfHeal: true        # Revert manual changes
    allowEmpty: false     # Don't sync if empty
  syncOptions:
    - CreateNamespace=true
    - PrunePropagationPolicy=foreground
    - PruneLast=true
  retry:
    limit: 5
    backoff:
      duration: 5s
      factor: 2
      maxDuration: 3m`
            }
        },
        {
            title: 'Projects',
            content: 'Projects provide logical grouping and access control. They restrict which repositories, clusters, and resources an application can use.',
            codeExample: {
                language: 'yaml',
                code: `apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: production
  namespace: argocd
spec:
  description: Production applications
  sourceRepos:
    - 'https://github.com/org/*'
  destinations:
    - namespace: 'prod-*'
      server: https://kubernetes.default.svc
  clusterResourceWhitelist:
    - group: ''
      kind: Namespace
  namespaceResourceBlacklist:
    - group: ''
      kind: ResourceQuota`
            }
        },
        {
            title: 'Hooks and Waves',
            content: 'Resource hooks run at specific sync phases (PreSync, Sync, PostSync). Waves control the order of resource application within a phase.',
            codeExample: {
                language: 'yaml',
                code: `apiVersion: batch/v1
kind: Job
metadata:
  name: db-migration
  annotations:
    argocd.argoproj.io/hook: PreSync
    argocd.argoproj.io/hook-delete-policy: HookSucceeded
    argocd.argoproj.io/sync-wave: "-1"
spec:
  template:
    spec:
      containers:
        - name: migrate
          image: myapp:latest
          command: ["./migrate.sh"]
      restartPolicy: Never`
            }
        },
        {
            title: 'ApplicationSets',
            content: 'ApplicationSets generate multiple Applications from templates. Generators include list, cluster, git directory, and git file generators.',
            codeExample: {
                language: 'yaml',
                code: `apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: cluster-apps
  namespace: argocd
spec:
  generators:
    - clusters: {}
  template:
    metadata:
      name: '{{name}}-app'
    spec:
      project: default
      source:
        repoURL: https://github.com/org/repo
        path: 'clusters/{{name}}'
      destination:
        server: '{{server}}'
        namespace: default`
            }
        },
        {
            title: 'Health Checks',
            content: 'ArgoCD monitors resource health status. Built-in health checks for common resources. Custom health checks can be defined in Lua.',
            codeExample: {
                language: 'yaml',
                code: `# Custom health check in argocd-cm ConfigMap
data:
  resource.customizations.health.mycrd.example.com_MyResource: |
    hs = {}
    if obj.status ~= nil then
      if obj.status.ready == true then
        hs.status = "Healthy"
        hs.message = "Resource is ready"
      else
        hs.status = "Progressing"
        hs.message = "Waiting for ready"
      end
    end
    return hs`
            }
        },
        {
            title: 'Notifications',
            content: 'ArgoCD Notifications sends alerts to various channels when application events occur. Supports Slack, email, webhook, and more.',
            codeExample: {
                language: 'yaml',
                code: `# argocd-notifications-cm ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  trigger.on-sync-succeeded: |
    - when: app.status.sync.status == 'Synced'
      send: [app-deployed]
  template.app-deployed: |
    message: |
      Application {{.app.metadata.name}} deployed!
  service.slack: |
    token: $slack-token`
            }
        },
        {
            title: 'Multi-Cluster',
            content: 'ArgoCD can manage applications across multiple Kubernetes clusters. Clusters are registered and can be targeted by applications.',
            codeExample: {
                language: 'bash',
                code: `# Add a cluster to ArgoCD
argocd cluster add my-cluster-context

# List registered clusters
argocd cluster list

# Deploy to specific cluster
spec:
  destination:
    server: https://cluster-api.example.com
    namespace: production`
            }
        },
        {
            title: 'RBAC',
            content: 'ArgoCD has fine-grained RBAC for controlling user access. Policies define who can perform what actions on which resources.',
            codeExample: {
                language: 'csv',
                code: `# argocd-rbac-cm ConfigMap
p, role:dev, applications, get, */*, allow
p, role:dev, applications, sync, dev/*, allow
p, role:admin, applications, *, */*, allow
p, role:admin, clusters, *, *, allow

g, dev-team, role:dev
g, admin-team, role:admin

# Format: p, role, resource, action, object, effect
# g, user/group, role`
            }
        }
    ],
    questions: [
        { question: 'What is ArgoCD and how does it implement GitOps?', answer: `ArgoCD is a declarative GitOps CD tool for Kubernetes.
It continuously monitors Git repos and syncs cluster state to match.
Git becomes the source of truth; all changes go through Git commits, providing audit trails and easy rollbacks.` },
        { question: 'What is the difference between ArgoCD and Flux?', answer: `Both implement GitOps.
ArgoCD has a rich UI, app-of-apps pattern, and ApplicationSets.
Flux is more lightweight, uses native K8s resources, and integrates with Helm/Kustomize via controllers.
ArgoCD is often preferred for its UI.` },
        { question: 'How does ArgoCD sync work?', answer: `ArgoCD compares desired state (Git) with live state (cluster).
If OutOfSync, it can sync manually or automatically.
Sync applies manifests in waves, respecting hooks.
Self-heal reverts drift; prune removes orphaned resources.` },
        { question: 'What are sync waves and hooks?', answer: `Waves order resource creation (lower numbers first).
Hooks run at phases: PreSync (before apply), Sync (with apply), PostSync (after apply), SyncFail (on failure).
Use for migrations, notifications, validation.` },
        { question: 'How do you implement app-of-apps pattern?', answer: `Create a parent Application that points to a directory containing child Application manifests.
When parent syncs, it creates/updates child apps.
Useful for managing multiple applications together with hierarchical structure.` },
        { question: 'What are ApplicationSets and when to use them?', answer: `ApplicationSets generate multiple Applications from a template.
Generators: list (static), clusters (all/matching), git (directories/files), matrix, merge.
Use for: multi-cluster, multi-environment, or many similar apps.` },
        { question: 'How does ArgoCD handle secrets?', answer: `ArgoCD doesn't handle secrets specially by default.
Options: Sealed Secrets, External Secrets Operator, SOPS, HashiCorp Vault with ArgoCD Vault Plugin.
Never commit plain secrets to Git.` },
        { question: 'How do you configure RBAC in ArgoCD?', answer: `Define policies in argocd-rbac-cm ConfigMap.
Format: p, role, resource, action, object, effect.
Assign users/groups to roles with g entries.
Supports wildcards, SSO group mapping, and default roles.` },
        { question: 'What is self-heal in ArgoCD?', answer: `Self-heal automatically reverts manual changes made directly to cluster (drift).
If someone runs kubectl edit, ArgoCD detects the difference and syncs back to Git state.
Essential for maintaining GitOps discipline.` },
        { question: 'How do you roll back in ArgoCD?', answer: `ArgoCD tracks deployment history.
Use UI or CLI: argocd app rollback <app> <revision>.
Or git revert the commit and let ArgoCD sync.
History shows all synced revisions with timestamps.` },
        { question: 'How do you integrate ArgoCD with Helm?', answer: `ArgoCD natively supports Helm charts.
Specify chart details in source: repoURL, chart name, targetRevision.
Override values via source.helm.values or source.helm.valuesFiles.` },
        { question: 'How do you handle multiple environments?', answer: `Options: separate directories per env, Kustomize overlays, Helm values files per env, ApplicationSets with generators.
Keep base config shared, environment-specific values separate.
Branch strategy less recommended.` },
        { question: 'What is the diffing strategy in ArgoCD?', answer: `ArgoCD compares desired vs live state.
Can ignore specific fields (managedFieldsManagers, status).
Custom diffing for CRDs.
Diffing is normalized to handle server-side defaults and field managers.` },
        { question: 'How do you troubleshoot sync failures?', answer: `Check: app status in UI, sync operation details, events, and logs.
Common issues: RBAC, resource validation, hook failures, dependency ordering.
Use argocd app diff to see differences.` },
        { question: 'How do you set up disaster recovery for ArgoCD?', answer: `ArgoCD stores state in K8s (etcd).
Backup: argocd admin export.
Use HA setup with multiple replicas.
Store Application manifests in Git (app-of-apps).
Can rebuild from Git repos if needed.` }
    ]
};

export default argocdData;
