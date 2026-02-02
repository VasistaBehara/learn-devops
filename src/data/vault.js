const vaultData = {
  name: 'HashiCorp Vault',
  icon: '🔐',
  description: 'Secrets management tool for securely storing and accessing tokens, passwords, certificates, and encryption keys.',
  concepts: [
    {
      title: 'Secrets Engines',
      content: 'Secrets engines store, generate, or encrypt data. Types include KV (static secrets), database (dynamic credentials), PKI (certificates), and transit (encryption as a service).',
      codeExample: {
        language: 'bash',
        code: `# Enable secrets engine
vault secrets enable -path=secret kv-v2

# Store a secret
vault kv put secret/myapp/config username="admin" password="secret123"

# Read a secret
vault kv get secret/myapp/config`
      }
    },
    {
      title: 'Authentication Methods',
      content: 'Auth methods verify identity and assign policies. Supports tokens, userpass, LDAP, GitHub, Kubernetes, AWS IAM, and more.',
      codeExample: {
        language: 'bash',
        code: `# Enable Kubernetes auth
vault auth enable kubernetes

# Configure Kubernetes auth
vault write auth/kubernetes/config \\
  kubernetes_host="https://kubernetes.default.svc"

# Create role for service account
vault write auth/kubernetes/role/myapp \\
  bound_service_account_names=myapp-sa \\
  bound_service_account_namespaces=default \\
  policies=myapp-policy \\
  ttl=1h`
      }
    },
    {
      title: 'Policies',
      content: 'Policies define access control using HCL or JSON. They specify paths and capabilities (create, read, update, delete, list).',
      codeExample: {
        language: 'hcl',
        code: `# myapp-policy.hcl
path "secret/data/myapp/*" {
  capabilities = ["read", "list"]
}

path "database/creds/myapp-db" {
  capabilities = ["read"]
}

# Apply policy
vault policy write myapp-policy myapp-policy.hcl`
      }
    },
    {
      title: 'Dynamic Secrets',
      content: 'Vault can generate short-lived credentials for databases, cloud providers, and other systems. Credentials are automatically revoked after TTL.',
      codeExample: {
        language: 'bash',
        code: `# Enable database secrets engine
vault secrets enable database

# Configure PostgreSQL connection
vault write database/config/mydb \\
  plugin_name=postgresql-database-plugin \\
  allowed_roles="myapp-role" \\
  username="vault" \\
  password="vault-password"

# Create role with SQL template
vault write database/roles/myapp-role \\
  db_name=mydb \\
  default_ttl="1h" \\
  max_ttl="24h"

# Get dynamic credentials
vault read database/creds/myapp-role`
      }
    },
    {
      title: 'Transit Secrets Engine',
      content: 'Transit provides encryption as a service. Encrypt data without storing it in Vault, useful for application-layer encryption.',
      codeExample: {
        language: 'bash',
        code: `# Enable transit
vault secrets enable transit

# Create encryption key
vault write -f transit/keys/my-key

# Encrypt data (base64 encoded)
vault write transit/encrypt/my-key \\
  plaintext=$(echo "secret" | base64)
# Returns: ciphertext

# Decrypt data
vault write transit/decrypt/my-key \\
  ciphertext="vault:v1:..."
# Returns: base64 encoded plaintext`
      }
    },
    {
      title: 'PKI Secrets Engine',
      content: 'PKI engine generates X.509 certificates dynamically. Useful for internal TLS, mTLS, and short-lived certificates.',
      codeExample: {
        language: 'bash',
        code: `# Enable PKI
vault secrets enable pki

# Generate root CA
vault write pki/root/generate/internal \\
  common_name="example.com" \\
  ttl="87600h"

# Create role
vault write pki/roles/my-role \\
  allowed_domains="example.com" \\
  allow_subdomains=true \\
  max_ttl="720h"

# Issue certificate
vault write pki/issue/my-role \\
  common_name="app.example.com"`
      }
    },
    {
      title: 'Vault Agent',
      content: 'Vault Agent is a daemon that automates authentication, token renewal, and secret retrieval. Supports auto-auth and template rendering.',
      codeExample: {
        language: 'hcl',
        code: `# vault-agent-config.hcl
auto_auth {
  method "kubernetes" {
    mount_path = "auth/kubernetes"
    config = {
      role = "myapp"
    }
  }
  sink "file" {
    config = { path = "/tmp/vault-token" }
  }
}

template {
  source = "/etc/vault/templates/config.ctmpl"
  destination = "/app/config.json"
}

vault { address = "http://vault:8200" }`
      }
    },
    {
      title: 'Unsealing',
      content: 'Vault starts sealed and cannot access secrets. Unsealing requires a threshold of key shares (Shamir\'s Secret Sharing) or auto-unseal with cloud KMS.',
      codeExample: {
        language: 'bash',
        code: `# Manual unseal (requires threshold keys)
vault operator unseal <key-share-1>
vault operator unseal <key-share-2>
vault operator unseal <key-share-3>

# Auto-unseal with AWS KMS (in config)
seal "awskms" {
  region     = "us-east-1"
  kms_key_id = "alias/vault-unseal-key"
}`
      }
    },
    {
      title: 'High Availability',
      content: 'Vault supports HA mode with Raft integrated storage or external backends like Consul. One node is active, others are standby.',
      codeExample: {
        language: 'hcl',
        code: `# Raft storage configuration
storage "raft" {
  path = "/vault/data"
  node_id = "vault-1"
}

listener "tcp" {
  address = "0.0.0.0:8200"
  tls_disable = false
  tls_cert_file = "/vault/certs/vault.crt"
  tls_key_file = "/vault/certs/vault.key"
}

cluster_addr = "https://vault-1:8201"
api_addr = "https://vault-1:8200"`
      }
    },
    {
      title: 'Vault in Kubernetes',
      content: 'Deploy Vault in Kubernetes using Helm chart. Use Vault Agent Sidecar Injector to automatically inject secrets into pods.',
      codeExample: {
        language: 'yaml',
        code: `# Pod annotation for sidecar injection
metadata:
  annotations:
    vault.hashicorp.com/agent-inject: "true"
    vault.hashicorp.com/role: "myapp"
    vault.hashicorp.com/agent-inject-secret-config: "secret/data/myapp/config"
    vault.hashicorp.com/agent-inject-template-config: |
      {{- with secret "secret/data/myapp/config" -}}
      export DB_PASSWORD="{{ .Data.data.password }}"
      {{- end }}`
      }
    }
  ],
  questions: [
    { question: 'What is HashiCorp Vault and what problems does it solve?', answer: `Vault is a secrets management tool that securely stores and controls access to tokens, passwords, certificates, and keys.
It solves: secret sprawl, static credentials, access control, and audit logging for sensitive data.` },
    { question: 'What are dynamic secrets and why are they important?', answer: `Dynamic secrets are generated on-demand with automatic expiration.
They reduce attack surface (short TTL), eliminate shared credentials, provide unique credentials per client, and simplify rotation.
Supported for databases, cloud providers, etc.` },
    { question: 'How does Vault authentication work?', answer: `Auth methods verify identity (human or machine) and return a Vault token with attached policies.
Methods include: tokens, userpass, LDAP, Kubernetes service accounts, AWS IAM, Azure, GCP, OIDC, and more.` },
    { question: 'Explain Vault\'s unsealing process.', answer: `Vault starts sealed with encrypted data.
Unsealing requires key shares (Shamir's Secret Sharing) - typically 3 of 5 shares.
Auto-unseal uses cloud KMS (AWS, GCP, Azure) to automatically unseal.
Sealed Vault can't serve requests.` },
    { question: 'How do you integrate Vault with Kubernetes?', answer: `Enable Kubernetes auth method configured with cluster API.
Create roles mapping service accounts to policies.
Use Vault Agent Sidecar Injector for automatic secret injection.
Or use CSI driver for secrets as volumes.` },
    { question: 'What is the Transit secrets engine?', answer: `Transit provides encryption-as-a-service without storing data.
Applications encrypt/decrypt via API.
Supports key rotation, convergent encryption, and signing.
Ideal for encrypting data before storage in databases.` },
    { question: 'How do you manage database credentials with Vault?', answer: `Enable database secrets engine.
Configure connection with allowed roles.
Create roles with creation/revocation SQL statements and TTL.
Applications request credentials; Vault creates temporary database users that auto-expire.` },
    { question: 'What are Vault policies and how do they work?', answer: `Policies are HCL documents defining path-based access rules.
Capabilities: create, read, update, delete, list, sudo, deny.
Attached to tokens via auth methods.
Default deny - must explicitly grant access.
Use + and * for wildcards.` },
    { question: 'How does Vault Agent simplify secret access?', answer: `Vault Agent handles: auto-authentication (no hardcoded tokens), automatic token renewal, template rendering (inject secrets into config files), and caching.
Runs as sidecar or daemon, reducing application complexity.` },
    { question: 'What is the difference between KV v1 and KV v2?', answer: `KV v1 has no versioning - updates overwrite.
KV v2 keeps version history, supports soft delete, metadata, and check-and-set.
V2 paths include /data/ and /metadata/ segments.
V2 is recommended for most use cases.` },
    { question: 'How do you achieve high availability with Vault?', answer: `Use Raft integrated storage (recommended) or external storage (Consul).
One node active, others standby.
Active node handles requests, standbys forward.
Auto-unseal essential for HA.
Use load balancer for traffic distribution.` },
    { question: 'How do you rotate secrets in Vault?', answer: `Dynamic secrets auto-rotate via TTL.
For static secrets, use API/CLI to update values.
Transit keys support rotation with versioning.
Database root credentials can be rotated with "vault write database/rotate-root/mydb".` },
    { question: 'What is the PKI secrets engine used for?', answer: `PKI generates X.509 certificates dynamically.
Use cases: internal TLS without manual cert management, mTLS between services, short-lived certificates reducing compromise window.
Supports CA hierarchy and CRL/OCSP.` },
    { question: 'How do you audit Vault operations?', answer: `Enable audit devices (file, syslog, socket).
All requests and responses are logged with HMAC'd sensitive data.
Essential for compliance.
At least one audit device must log successfully for operations to proceed.` },
    { question: 'What are namespaces in Vault Enterprise?', answer: `Namespaces provide multi-tenancy with isolated secret paths, auth methods, and policies.
Each namespace is a "Vault within Vault".
Useful for: team isolation, environment separation, and delegated administration.` }
  ]
};

export default vaultData;
