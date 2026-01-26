export default {
    id: 'kubernetes',
    name: 'Kubernetes',
    icon: '☸️',
    description: 'Container orchestration platform for automating deployment, scaling, and management of containerized applications.',
    concepts: [
        {
            title: 'Kubernetes Architecture',
            content: `Control Plane: API Server (frontend), etcd (state store), Scheduler (pod placement), Controller Manager (maintains state).

Worker Nodes: kubelet (node agent), kube-proxy (networking), container runtime (Docker/containerd). kubectl is the CLI client.`,
            codeExample: {
                language: 'bash', code: `kubectl cluster-info              # Cluster info
kubectl get nodes                  # List nodes
kubectl describe node <name>       # Node details
kubectl api-resources              # Available resources` }
        },
        {
            title: 'Pods',
            content: `Smallest deployable unit. One or more containers sharing network and storage. Usually one container per pod. Init containers run first.

Pods are ephemeral - use controllers for management. Containers share localhost and volumes.`,
            codeExample: {
                language: 'yaml', code: `apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx
    image: nginx:1.25
    ports:
    - containerPort: 80` }
        },
        {
            title: 'Deployments',
            content: `Manages ReplicaSets and Pods. Declarative updates with rolling deployment. Rollback capability. Scaling and self-healing.

Strategies: RollingUpdate (default), Recreate. Controlled by maxSurge and maxUnavailable.`,
            codeExample: {
                language: 'yaml', code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels: { app: web }
  template:
    metadata:
      labels: { app: web }
    spec:
      containers:
      - name: web
        image: nginx:1.25` }
        },
        {
            title: 'Services',
            content: `Stable network endpoint for pods. Types: ClusterIP (internal), NodePort (external via node), LoadBalancer (cloud LB), ExternalName (DNS).

Label selectors route to pods. kube-proxy handles traffic routing. Headless services for direct pod access.`,
            codeExample: {
                language: 'yaml', code: `apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  type: ClusterIP
  selector: { app: web }
  ports:
  - port: 80
    targetPort: 80` }
        },
        {
            title: 'ConfigMaps & Secrets',
            content: `ConfigMaps store non-sensitive config data. Secrets store sensitive data (base64 encoded, not encrypted by default).

Mount as volumes or environment variables. Updates propagate to mounted volumes (not env vars).`,
            codeExample: {
                language: 'yaml', code: `apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DATABASE_URL: "postgres://db:5432"
---
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  password: cGFzc3dvcmQ=  # base64` }
        },
        {
            title: 'Ingress',
            content: `HTTP/HTTPS routing to services. Host and path-based routing. TLS termination. Requires Ingress Controller (nginx, traefik, etc).

Annotations configure controller-specific features. IngressClass for multiple controllers.`,
            codeExample: {
                language: 'yaml', code: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress
spec:
  rules:
  - host: app.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-service
            port: { number: 80 }` }
        },
        {
            title: 'Persistent Volumes',
            content: `PV: Cluster storage resource. PVC: Request for storage by user. StorageClass: Dynamic provisioning.

Access modes: ReadWriteOnce, ReadOnlyMany, ReadWriteMany. Reclaim policies: Retain, Delete.`,
            codeExample: {
                language: 'yaml', code: `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data-pvc
spec:
  accessModes: [ReadWriteOnce]
  resources:
    requests:
      storage: 10Gi
  storageClassName: standard` }
        },
        {
            title: 'Namespaces',
            content: `Virtual clusters within a cluster. Resource isolation and organization. RBAC per namespace. Resource quotas.

Default namespaces: default, kube-system, kube-public. Scope resources to namespaces in YAML.`,
            codeExample: {
                language: 'bash', code: `kubectl create namespace production
kubectl get pods -n production
kubectl config set-context --current --namespace=production
kubectl get all --all-namespaces` }
        },
        {
            title: 'Scaling & Autoscaling',
            content: `Manual: kubectl scale. HPA: Horizontal Pod Autoscaler based on metrics. VPA: Vertical Pod Autoscaler adjusts resources.

Cluster Autoscaler adds/removes nodes. HPA needs metrics-server installed.`,
            codeExample: {
                language: 'bash', code: `kubectl scale deployment web --replicas=5
kubectl autoscale deployment web --min=2 --max=10 --cpu-percent=50
kubectl get hpa` }
        },
        {
            title: 'RBAC',
            content: `Role-Based Access Control. Role/ClusterRole: Set of permissions. RoleBinding/ClusterRoleBinding: Grant to users/groups/service accounts.

Roles are namespaced. ClusterRoles cluster-wide. Service accounts for pod identity.`,
            codeExample: {
                language: 'yaml', code: `apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]` }
        }
    ],
    questions: [
        { question: 'What is the difference between a Pod and a Deployment?', answer: `Pod: Single instance, ephemeral, no self-healing. Deployment: Manages pods via ReplicaSet, handles scaling, rollouts, rollbacks. Always use Deployments for production.` },
        { question: 'Explain Kubernetes Service types.', answer: `ClusterIP: Internal only (default). NodePort: Exposes on each node's IP. LoadBalancer: Provisions cloud LB. ExternalName: DNS alias. Choose based on access requirements.` },
        { question: 'What is the difference between ConfigMap and Secret?', answer: `ConfigMap: Non-sensitive config data. Secret: Sensitive data, base64 encoded (not encrypted by default). Both mount as volumes/env vars. Encrypt Secrets at rest.` },
        { question: 'How does Kubernetes networking work?', answer: `Every pod gets unique IP. Pods can communicate directly. CNI plugins implement networking (Calico, Flannel, Cilium). Services provide stable endpoints. kube-proxy routes traffic.` },
        { question: 'Explain readiness vs liveness probes.', answer: `Liveness: Is container alive? Fail = restart. Readiness: Can container serve traffic? Fail = remove from service. Startup probe for slow-starting apps. Critical for reliability.` },
        { question: 'What is a StatefulSet?', answer: `For stateful apps (databases). Stable network identity, persistent storage, ordered deployment/scaling. Pods named sequentially: web-0, web-1. Headless service for direct access.` },
        { question: 'How does HPA work?', answer: `Scales pods based on metrics (CPU/memory/custom). Queries metrics-server. Calculates desired replicas. Min/max bounds. Cooldown prevents thrashing. Needs resource requests set.` },
        { question: 'What is an Ingress Controller?', answer: `Implementation of Ingress rules. Not built into K8s - must install. Options: nginx, traefik, HAProxy, cloud-specific. Handles HTTP routing, TLS, load balancing.` },
        { question: 'Explain Kubernetes RBAC.', answer: `Role: Namespace permissions. ClusterRole: Cluster-wide permissions. RoleBinding: Grants Role to subjects. ClusterRoleBinding: Grants ClusterRole. Subjects: users, groups, service accounts.` },
        { question: 'What is a DaemonSet?', answer: `Ensures pod runs on all (or selected) nodes. Use for: logging agents, monitoring, storage daemons. Automatically adds pods to new nodes. One pod per node.` },
        { question: 'How do you debug pods?', answer: `kubectl describe pod: Events, status. kubectl logs: Container logs. kubectl exec -it: Shell access. kubectl get events: Cluster events. Check resource limits, probes, image pulls.` },
        { question: 'What is the difference between PV and PVC?', answer: `PV: Admin-provisioned storage resource. PVC: Developer's storage request. PVC binds to matching PV. StorageClass enables dynamic provisioning. Decouples storage from pods.` },
        { question: 'Explain Kubernetes namespaces.', answer: `Virtual clusters for isolation. Scope resources, RBAC, quotas. Good for: teams, environments, projects. Some resources cluster-wide (nodes, PVs). Avoid too many namespaces.` },
        { question: 'What are init containers?', answer: `Run before main containers. Must complete successfully. Use for: setup, wait for dependencies, config. Run sequentially. Share volumes with main containers.` },
        { question: 'How do rolling updates work?', answer: `Deployment gradually replaces pods. Controlled by maxSurge (extra pods) and maxUnavailable. Zero-downtime updates. Rollback with kubectl rollout undo if issues detected.` }
    ]
};
