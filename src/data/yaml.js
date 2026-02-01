const yamlData = {
    name: 'YAML',
    icon: '📝',
    description: 'YAML Ain\'t Markup Language - human-readable data serialization format used for configuration files.',
    concepts: [
        {
            title: 'Basic Syntax',
            content: 'YAML uses indentation for structure (spaces only, no tabs). Key-value pairs use colons. Lists use dashes. Comments start with #.',
            codeExample: {
                language: 'yaml',
                code: `# This is a comment
name: John Doe
age: 30
active: true

# Nested objects (use consistent indentation)
address:
  street: 123 Main St
  city: New York
  zip: "10001"  # Quoted to keep as string

# Lists
hobbies:
  - reading
  - gaming
  - coding`
            }
        },
        {
            title: 'Data Types',
            content: 'YAML automatically detects types: strings, numbers, booleans, null. Use quotes to force string type for special values.',
            codeExample: {
                language: 'yaml',
                code: `# Strings (quotes optional for most)
name: John
title: "Manager: IT"  # Colon requires quotes
description: 'Single quotes work too'

# Numbers
integer: 42
float: 3.14
scientific: 1.0e+6
hex: 0xFF

# Booleans (many forms)
enabled: true
active: yes
disabled: false
inactive: no

# Null
value: null
empty: ~
also_empty:

# Force string type
version: "1.0"
zip_code: "00123"
port: "8080"`
            }
        },
        {
            title: 'Multi-line Strings',
            content: 'YAML supports multi-line strings with literal (|) and folded (>) block scalars. Control trailing newlines with indicators.',
            codeExample: {
                language: 'yaml',
                code: `# Literal block (preserves newlines)
script: |
  #!/bin/bash
  echo "Hello"
  exit 0

# Folded block (newlines become spaces)
description: >
  This is a long description
  that spans multiple lines
  but becomes one paragraph.

# Strip final newline with -
script_clean: |-
  echo "No trailing newline"

# Keep final newline with +
script_keep: |+
  echo "Has trailing newlines"


# Indentation indicator
code: |2
    Indented content
    preserved exactly`
            }
        },
        {
            title: 'Anchors and Aliases',
            content: 'Anchors (&) define reusable content. Aliases (*) reference anchors. Merge key (<<) combines mappings. Reduces duplication.',
            codeExample: {
                language: 'yaml',
                code: `# Define anchor
defaults: &defaults
  adapter: postgres
  host: localhost
  port: 5432

# Use alias
development:
  database: dev_db
  <<: *defaults

production:
  database: prod_db
  <<: *defaults
  host: prod-server.example.com  # Override

# Anchor for lists
base_packages: &packages
  - git
  - curl
  - vim

server_packages:
  - *packages  # Include all base packages
  - nginx
  - docker

# Simple anchor/alias
primary: &primary_color "#007bff"
theme:
  button_color: *primary_color
  link_color: *primary_color`
            }
        },
        {
            title: 'Complex Keys',
            content: 'YAML supports complex keys including multi-line strings and even sequences as keys using ? indicator.',
            codeExample: {
                language: 'yaml',
                code: `# Complex mapping key
? |
  This is a
  multi-line key
: value for complex key

# Sequence as key
? - item1
  - item2
: value for sequence key

# Nested complex structures
servers:
  ? name: web-server
    region: us-east
  : ip: 10.0.0.1

# More common: avoid complex keys
# Use simpler structures when possible
servers:
  - name: web-server
    region: us-east
    ip: 10.0.0.1`
            }
        },
        {
            title: 'Flow Style',
            content: 'Flow style uses JSON-like syntax with brackets. Compact but less readable. Useful for short inline structures.',
            codeExample: {
                language: 'yaml',
                code: `# Flow style mapping (like JSON object)
person: {name: John, age: 30, active: true}

# Flow style sequence (like JSON array)
colors: [red, green, blue]

# Mixed
servers:
  - {name: web1, port: 80}
  - {name: web2, port: 8080}

# Nested flow style
config: {db: {host: localhost, port: 5432}, cache: {host: redis}}

# Equivalent block style (preferred for readability)
config:
  db:
    host: localhost
    port: 5432
  cache:
    host: redis`
            }
        },
        {
            title: 'Multiple Documents',
            content: 'A YAML file can contain multiple documents separated by ---. Use ... to explicitly end a document.',
            codeExample: {
                language: 'yaml',
                code: `# First document
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  key: value
---
# Second document
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
type: Opaque
data:
  password: cGFzc3dvcmQ=
---
# Third document
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
...
# End of documents`
            }
        },
        {
            title: 'Kubernetes YAML',
            content: 'Kubernetes uses YAML for resource definitions. Common structure includes apiVersion, kind, metadata, and spec sections.',
            codeExample: {
                language: 'yaml',
                code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.21
          ports:
            - containerPort: 80
          resources:
            limits:
              memory: "128Mi"
              cpu: "500m"
          env:
            - name: ENV
              value: production`
            }
        },
        {
            title: 'Docker Compose YAML',
            content: 'Docker Compose uses YAML to define multi-container applications. Services, networks, and volumes are top-level keys.',
            codeExample: {
                language: 'yaml',
                code: `version: '3.8'

services:
  web:
    build: ./app
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
    networks:
      - frontend
      - backend

  db:
    image: postgres:14
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: secret
    networks:
      - backend

volumes:
  db-data:

networks:
  frontend:
  backend:`
            }
        },
        {
            title: 'GitHub Actions YAML',
            content: 'GitHub Actions workflows are defined in YAML. Jobs, steps, and triggers follow a specific structure.',
            codeExample: {
                language: 'yaml',
                code: `name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build`
            }
        }
    ],
    questions: [
        { question: 'What is YAML used for?', answer: 'YAML is a human-readable data serialization format. Used for configuration files (Kubernetes, Docker, Ansible, CI/CD), data exchange, and structured documents. More readable than JSON or XML.' },
        { question: 'What are the rules for YAML indentation?', answer: 'Use spaces only (no tabs). Consistent indentation (usually 2 spaces). Indentation defines structure/hierarchy. Children must be indented more than parents. Be consistent throughout the file.' },
        { question: 'How do you represent null in YAML?', answer: 'Multiple ways: null keyword, tilde (~), or empty value. Examples: value: null, value: ~, or just value: (nothing after colon). All parse as null/None.' },
        { question: 'What is the difference between | and > in YAML?', answer: '| (literal) preserves newlines exactly as written. > (folded) converts newlines to spaces, creating a single paragraph. Both preserve final newline by default; use |- or >- to strip it.' },
        { question: 'How do anchors and aliases work?', answer: 'Anchors (&name) mark a value for reuse. Aliases (*name) reference the anchor. << with alias merges mappings. Reduces duplication. Useful for shared defaults across configurations.' },
        { question: 'What is flow style vs block style?', answer: 'Block style uses indentation (multi-line, readable). Flow style uses brackets like JSON: {key: value} for maps, [a, b] for lists. Block is preferred for complex configs; flow for inline short values.' },
        { question: 'How do you handle special characters in YAML strings?', answer: 'Use quotes when: starting with special chars (@, &, *, etc.), containing colons, containing #, needing escape sequences. Both single and double quotes work; double allows escapes.' },
        { question: 'How do you write multi-line strings in YAML?', answer: 'Use | for literal (keeps newlines) or > for folded (joins lines). Add - to strip trailing newlines (|-), + to keep them (|+). Indent content under the indicator.' },
        { question: 'What are common YAML mistakes?', answer: 'Using tabs instead of spaces. Inconsistent indentation. Missing quotes around special values. Forgetting yes/no are booleans. Treating version numbers as floats. Not escaping colons in strings.' },
        { question: 'How do you validate YAML files?', answer: 'Use online validators, yamllint tool, or IDE plugins. yamllint checks syntax and style. Parse with Python PyYAML or yq to verify. Kubernetes: kubectl --dry-run for K8s YAML validation.' },
        { question: 'What is the difference between YAML and JSON?', answer: 'YAML: more readable, supports comments, anchors/aliases, multi-line strings. JSON: stricter, more portable, no comments. YAML is a superset of JSON; valid JSON is valid YAML.' },
        { question: 'How do you represent a list of objects in YAML?', answer: 'Use dashes for list items with nested key-value pairs. Each dash starts a new list item. Properties are indented under the dash. Common in Kubernetes manifests.' },
        { question: 'What are YAML tags?', answer: 'Tags explicitly specify type: !!str forces string, !!int for integer, !!bool for boolean. Useful when automatic type detection is wrong: version: !!str 1.0 keeps it as string.' },
        { question: 'How do you merge multiple YAML files?', answer: 'Use tools: yq, kustomize, or language-specific merging. Anchors work within single file only. Kustomize patches for Kubernetes. Helm values files merge automatically.' },
        { question: 'What does --- mean in YAML?', answer: '--- separates multiple documents in one file. Each document is parsed independently. Common in Kubernetes (multiple resources) and config management. ... explicitly ends a document.' }
    ]
};

export default yamlData;
