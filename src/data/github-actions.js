export default {
  id: 'github-actions',
  name: 'GitHub Actions',
  icon: '⚡',
  description: 'CI/CD and automation platform built into GitHub for building, testing, and deploying code.',
  concepts: [
    {
      title: 'Workflows and Events',
      content: `Workflows are YAML files in .github/workflows/. Events trigger workflows: push, pull_request, schedule, workflow_dispatch (manual), release, issues, etc.

Multiple workflows per repo. Each workflow has jobs. Jobs have steps.`,
      codeExample: {
        language: 'yaml', code: `name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test` }
    },
    {
      title: 'Jobs and Steps',
      content: `Jobs run in parallel by default. Use needs for dependencies. Each job runs on fresh runner. Steps run sequentially within job.

Steps use actions (uses:) or run commands (run:). Share data with outputs and artifacts.`,
      codeExample: {
        language: 'yaml', code: `jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploying..."` }
    },
    {
      title: 'Actions Marketplace',
      content: `Reusable actions from GitHub Marketplace. Official actions: checkout, setup-node, cache, upload-artifact. Community actions for everything.

Reference as owner/repo@version. Pin to SHA for security. Create custom actions in JavaScript, TypeScript, or Docker.`,
      codeExample: {
        language: 'yaml', code: `steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-python@v5
    with:
      python-version: '3.11'
  - uses: actions/cache@v4
    with:
      path: ~/.cache/pip
      key: pip-\${{ hashFiles('requirements.txt') }}`
      }
    },
    {
      title: 'Secrets and Variables',
      content: `Secrets: Encrypted, not shown in logs. Set at repo, environment, or org level. Access via secrets context. Variables: Non-sensitive config.

GITHUB_TOKEN auto-provided for API access. Use environments for deployment secrets.`,
      codeExample: {
        language: 'yaml', code: `jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - run: |
          echo "Deploying to \${{ vars.DEPLOY_URL }}"
          curl -X POST \${{ secrets.DEPLOY_WEBHOOK }}`
      }
    },
    {
      title: 'Matrix Builds',
      content: `Run job with multiple configurations. Combine os, language versions, etc. Fail-fast stops all on first failure. include/exclude for specific combinations.

Great for cross-platform testing. Max 256 jobs per matrix.`,
      codeExample: {
        language: 'yaml', code: `jobs:
  test:
    runs-on: \${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node: [18, 20, 22]
      fail-fast: false
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node }}`
      }
    },
    {
      title: 'Artifacts and Caching',
      content: `Artifacts: Upload/download files between jobs. Persist after workflow. upload-artifact, download-artifact actions.

Cache: Speed up workflows by caching dependencies. Key-based. Restore keys for fallback.`,
      codeExample: {
        language: 'yaml', code: `- uses: actions/cache@v4
  with:
    path: node_modules
    key: npm-\${{ hashFiles('package-lock.json') }}
    restore-keys: npm-

- uses: actions/upload-artifact@v4
  with:
    name: build-output
    path: dist/` }
    },
    {
      title: 'Environments and Deployments',
      content: `Environments define deployment targets. Protection rules: Approvals, wait timer, branch restrictions. Environment secrets and variables.

Deployment history in repo. Required reviewers for production.`,
      codeExample: {
        language: 'yaml', code: `jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://myapp.com
    steps:
      - run: ./deploy.sh` }
    },
    {
      title: 'Reusable Workflows',
      content: `Call workflows from other workflows. DRY principle for common patterns. workflow_call event. Pass inputs and secrets.

Central repo for org-wide workflows. Version with tags/branches.`,
      codeExample: {
        language: 'yaml', code: `# .github/workflows/reusable.yml
on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploying to \${{ inputs.environment }}"`
      }
    },
    {
      title: 'Composite Actions',
      content: `Bundle multiple steps into one action. Reusable across repos. Define in action.yml. Can use other actions.

Simpler than JavaScript actions. Good for scripts that don't need complex logic.`,
      codeExample: {
        language: 'yaml', code: `# action.yml
name: 'Setup and Build'
runs:
  using: composite
  steps:
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
    - run: npm ci
      shell: bash
    - run: npm run build
      shell: bash` }
    },
    {
      title: 'Self-Hosted Runners',
      content: `Run workflows on your infrastructure. Linux, Windows, macOS. Labels for routing. Runner groups for organization.

Use for: Private networks, special hardware, cost savings, compliance. Require security considerations.`,
      codeExample: {
        language: 'yaml', code: `jobs:
  build:
    runs-on: [self-hosted, linux, x64, gpu]
    steps:
      - uses: actions/checkout@v4
      - run: ./build.sh` }
    }
  ],
  questions: [
    { question: 'How do you trigger a workflow manually?', answer: `Use workflow_dispatch event. Optionally define inputs. Trigger from Actions tab or API. Good for deployments or on-demand tasks. Can combine with other triggers.` },
    { question: 'Explain the difference between needs and uses.', answer: `needs: Job dependency, waits for job to complete. uses: Reference an action within a step. needs is job-level (sequential), uses is step-level (reusable actions).` },
    { question: 'How do you share data between jobs?', answer: `Artifacts: files via upload/download-artifact. Outputs: Set output in job, reference in dependent job. Artifacts for files, outputs for small values.` },
    { question: 'What is GITHUB_TOKEN?', answer: `Auto-generated token for workflow. Scoped to repo. Permissions configurable per workflow. Expires when job ends. Use for API calls, pushing code. More secure than PATs.` },
    { question: 'How do matrix builds work?', answer: `Define combinations of variables. GitHub creates job for each. Parallel by default. fail-fast to stop on first failure. include/exclude for specific combos. Max 256 jobs.` },
    { question: 'What are reusable workflows?', answer: `Workflows that can be called from other workflows. workflow_call trigger. Pass inputs and secrets. Centralize common patterns. Version with refs. Reduce duplication.` },
    { question: 'How do you debug failing workflows?', answer: `Check job logs. Enable debug logging: ACTIONS_RUNNER_DEBUG=true. Use tmate for SSH access. Add debugging steps. Download artifacts. Test locally with act.` },
    { question: 'Explain environment protection rules.', answer: `Required reviewers: Approval before deployment. Wait timer: Delay deployment. Branch restrictions: Only specific branches. Prevent secrets exposure. Essential for production.` },
    { question: 'What is the difference between cache and artifacts?', answer: `Cache: Speed up workflows, key-based, shared across runs, best-effort. Artifacts: Share between jobs, persist after run, guaranteed. Cache for dependencies, artifacts for outputs.` },
    { question: 'How do you handle secrets?', answer: `Repo/org/environment secrets. Encrypted at rest. Not in logs (masked). Reference with secrets context. Environment secrets for deployment. Never commit secrets.` },
    { question: 'What are composite actions?', answer: `Reusable steps packaged as action. Defined in action.yml. Can use other actions. Simpler than JavaScript actions. Good for common step sequences.` },
    { question: 'How do concurrency controls work?', answer: `concurrency key groups workflows. Cancel in-progress when new starts. Use for deployments - only one at a time. group name can include branch/PR number.` },
    { question: 'Explain workflow permissions.', answer: `GITHUB_TOKEN permissions. Default: Read repo. Configure per workflow or job. Least privilege principle. Write for pushes, packages, deployments. Security best practice.` },
    { question: 'What is workflow_run event?', answer: `Trigger when another workflow completes. Access artifacts from triggering workflow. Chain workflows. Useful for deployment after tests or notifications.` },
    { question: 'How do self-hosted runners differ?', answer: `Run on your infrastructure. Full control over environment. Access private networks. Custom hardware (GPU). Persistent state between jobs. Require security hardening.` }
  ]
};
