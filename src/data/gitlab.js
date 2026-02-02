export default {
    id: 'gitlab',
    name: 'GitLab',
    icon: '🦊',
    description: 'Complete DevOps platform with Git repository management, CI/CD, and project management.',
    concepts: [
        {
            title: 'GitLab Architecture',
            content: `GitLab is an all-in-one DevOps platform. Components: GitLab Rails (web app), Gitaly (Git storage), PostgreSQL, Redis, Sidekiq (background jobs), NGINX.

Self-hosted or GitLab.com SaaS. Groups organize projects. Namespaces provide isolation.`,
            codeExample: {
                language: 'bash', code: `# Clone a GitLab repository
git clone https://gitlab.com/group/project.git
git remote -v` }
        },
        {
            title: 'GitLab CI/CD Basics',
            content: `.gitlab-ci.yml defines pipelines. Pipelines contain stages. Stages contain jobs. Jobs run scripts in runners.

Pipelines trigger on push, merge request, schedule, or API. Artifacts pass data between jobs.`,
            codeExample: {
                language: 'yaml', code: `stages: [build, test, deploy]

build:
  stage: build
  script: npm ci && npm run build
  artifacts:
    paths: [dist/]

test:
  stage: test
  script: npm test` }
        },
        {
            title: 'GitLab Runners',
            content: `Runners execute CI/CD jobs. Types: Shared (GitLab-provided), Group, Project-specific. Executors: Shell, Docker, Kubernetes, Docker Machine.

Register runners with token. Tags route jobs to specific runners. Concurrent setting controls parallelism.`,
            codeExample: {
                language: 'bash', code: `# Register a runner
gitlab-runner register \\
  --url https://gitlab.com/ \\
  --registration-token TOKEN \\
  --executor docker \\
  --docker-image alpine:latest` }
        },
        {
            title: 'Pipeline Configuration',
            content: `Jobs define what to run. Keywords: script, before_script, after_script, variables, only/except, rules, needs, dependencies, cache, artifacts.

Use rules for complex conditions. needs for DAG pipelines. extends for reusable configs.`,
            codeExample: {
                language: 'yaml', code: `deploy:
  stage: deploy
  script: ./deploy.sh
  environment:
    name: production
    url: https://app.example.com
  rules:
    - if: \$CI_COMMIT_BRANCH == "main"
      when: manual
  needs: [build, test]` }
        },
        {
            title: 'Variables and Secrets',
            content: `Variables set in .gitlab-ci.yml, project settings, or group settings. Predefined CI variables available (CI_COMMIT_SHA, CI_PIPELINE_ID, etc).

Masked variables hidden in logs. Protected variables only for protected branches. File type for files.`,
            codeExample: {
                language: 'yaml', code: `variables:
  NODE_ENV: production
  
deploy:
  script:
    - echo \$CI_COMMIT_SHA
    - echo \$DATABASE_URL  # From project settings
  variables:
    DEPLOY_ENV: staging` }
        },
        {
            title: 'Merge Requests',
            content: `MRs propose changes. Features: Code review, discussions, approvals, merge checks, squash commits, merge trains.

MR pipelines run on source branch. Merge result pipelines test merged code. Auto-merge when pipeline succeeds.`,
            codeExample: {
                language: 'yaml', code: `# MR-specific job
lint:
  script: npm run lint
  rules:
    - if: \$CI_PIPELINE_SOURCE == "merge_request_event"` }
        },
        {
            title: 'Environments and Deployments',
            content: `Environments track deployments. Auto-stop environments after time. Review apps per MR. Protected environments require approval.

Deployment history, rollback capability. Kubernetes integration for cluster deployments.`,
            codeExample: {
                language: 'yaml', code: `review:
  stage: deploy
  script: deploy-review-app.sh
  environment:
    name: review/\$CI_COMMIT_REF_SLUG
    url: https://\$CI_COMMIT_REF_SLUG.example.com
    on_stop: stop_review
    auto_stop_in: 1 week` }
        },
        {
            title: 'Caching and Artifacts',
            content: `Cache speeds up jobs by reusing files (node_modules, vendor). Artifacts pass data between jobs and stages.

Cache is best-effort (may not exist). Artifacts are guaranteed. Use cache for dependencies, artifacts for build outputs.`,
            codeExample: {
                language: 'yaml', code: `build:
  cache:
    key: \$CI_COMMIT_REF_SLUG
    paths: [node_modules/]
  artifacts:
    paths: [dist/]
    expire_in: 1 week` }
        },
        {
            title: 'Container Registry',
            content: `Built-in Docker registry per project. Push/pull images. Cleanup policies remove old tags. Integrates with CI/CD.

Dependency proxy caches Docker Hub images. Harbor integration available.`,
            codeExample: {
                language: 'yaml', code: `build_image:
  image: docker:latest
  services: [docker:dind]
  script:
    - docker login -u \$CI_REGISTRY_USER -p \$CI_REGISTRY_PASSWORD \$CI_REGISTRY
    - docker build -t \$CI_REGISTRY_IMAGE:\$CI_COMMIT_SHA .
    - docker push \$CI_REGISTRY_IMAGE:\$CI_COMMIT_SHA` }
        },
        {
            title: 'Security Features',
            content: `SAST: Static Application Security Testing. DAST: Dynamic testing. Dependency scanning. Container scanning. Secret detection. License compliance.

Security dashboard shows vulnerabilities. Require approval based on severity.`,
            codeExample: {
                language: 'yaml', code: `include:
  - template: Security/SAST.gitlab-ci.yml
  - template: Security/Dependency-Scanning.gitlab-ci.yml
  - template: Security/Secret-Detection.gitlab-ci.yml` }
        }
    ],
    questions: [
        { question: 'What is the difference between cache and artifacts?', answer: `Cache: Best-effort, speeds up jobs by reusing files across pipelines (node_modules).
May not exist.
Artifacts: Guaranteed, passes data between jobs/stages, downloadable after pipeline.
Use cache for dependencies, artifacts for outputs.` },
        { question: 'Explain GitLab Runner executors.', answer: `Shell: Runs on runner host.
Docker: Each job in container.
Kubernetes: Jobs as pods.
Docker Machine: Auto-scales VM runners.
Docker is most common.
Choose based on isolation needs and environment.` },
        { question: 'What are protected branches and tags?', answer: `Prevent force push, deletion.
Restrict who can push/merge.
Protected variables only available on protected branches.
Protected environments tied to protected branches.
Essential for production deployments.` },
        { question: 'How do merge trains work?', answer: `Queue of MRs merged sequentially.
Each tested with all preceding changes.
Prevents broken main branch.
Automatically rebases and tests.
Requires premium tier.
Great for high-velocity teams.` },
        { question: 'What is the needs keyword?', answer: `Creates DAG (Directed Acyclic Graph) pipeline.
Jobs start when dependencies finish, not when stage completes.
Faster pipelines by parallelizing.
Specify which jobs a job depends on.` },
        { question: 'How do you handle secrets in GitLab CI?', answer: `Project/Group CI/CD variables.
Mark as masked (hidden in logs) and protected (only protected branches).
Use Vault integration.
Never commit secrets.
File type variables for certificates.` },
        { question: 'Explain rules vs only/except.', answer: `only/except: Legacy, simple branch/tag matching. rules: Powerful, complex conditions with if/changes/exists. rules preferred.
Can combine multiple conditions.
Can set when: manual/delayed.` },
        { question: 'What is Auto DevOps?', answer: `Pre-configured CI/CD pipeline.
Auto Build, Test, Deploy, Review, Security.
Detects language, uses buildpacks.
Good starting point.
Customizable via variables and overrides.` },
        { question: 'How do review apps work?', answer: `Deploy MR to temporary environment.
Automatic cleanup on merge/close.
Environment per MR using CI_COMMIT_REF_SLUG.
Stakeholders can preview changes.
Requires dynamic environment setup.` },
        { question: 'What is GitLab Pages?', answer: `Static site hosting.
Deploy from CI/CD.
Custom domains with TLS.
Public or access-controlled.
Perfect for documentation, blogs.
Article in public/ directory.` },
        { question: 'Explain include and extends.', answer: `include: Import external YAML (local, remote, template). extends: Inherit from job template.
Both promote reuse. include for shared configs, extends for job templates.` },
        { question: 'What are GitLab releases?', answer: `Snapshot of source + artifacts at tag.
Release notes, milestones, links.
Created manually or via API/CI. release-cli tool for automation.
Integrates with packages.` },
        { question: 'How do you debug failing pipelines?', answer: `Check job logs.
Use CI_DEBUG_TRACE=true for verbose output. artifacts:when:on_failure to save debug info.
Local runner with gitlab-runner exec.
Interactive web terminal (premium).` },
        { question: 'What is the parent-child pipeline?', answer: `Trigger child pipelines from parent.
Separate .gitlab-ci.yml per component.
Reduces complexity.
Child inherits or overrides variables.
Good for monorepos.` },
        { question: 'Explain GitLab Package Registry.', answer: `Store packages: npm, Maven, PyPI, NuGet, Composer, Conan, Helm, Go.
Per-project or instance-level.
Version management.
Integrates with CI/CD.
Alternative to external registries.` }
    ]
};
