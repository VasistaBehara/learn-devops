export default {
    id: 'jenkins',
    name: 'Jenkins',
    icon: '🔧',
    description: 'Open-source automation server for building, testing, and deploying software with extensive plugin ecosystem.',
    concepts: [
        {
            title: 'Jenkins Architecture',
            content: `Controller (master): Orchestrates builds, UI, configuration. Agents (slaves): Execute jobs. Executors: Build slots on agents.

Distributed builds scale horizontally. Labels route jobs to specific agents. Cloud plugins auto-provision agents.`,
            codeExample: {
                language: 'bash', code: `# Start Jenkins with Docker
docker run -d -p 8080:8080 -p 50000:50000 \\
  -v jenkins_home:/var/jenkins_home \\
  jenkins/jenkins:lts` }
        },
        {
            title: 'Pipeline as Code',
            content: `Jenkinsfile defines pipeline in repo. Declarative (structured, opinionated) or Scripted (flexible, Groovy). Version controlled with code.

Stages group steps. Steps are individual tasks. agent specifies where to run.`,
            codeExample: {
                language: 'groovy', code: `pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}` }
        },
        {
            title: 'Declarative Pipeline',
            content: `Structured syntax with required sections. agent, stages, steps required. environment, options, parameters, triggers, post for additional config.

Easier to read and write. Validates syntax before running. Most common approach.`,
            codeExample: {
                language: 'groovy', code: `pipeline {
    agent { docker { image 'node:18' } }
    environment {
        CI = 'true'
        HOME = '.'
    }
    stages {
        stage('Install') {
            steps { sh 'npm ci' }
        }
    }
    post {
        always { cleanWs() }
        failure { mail to: 'team@example.com', subject: 'Build Failed' }
    }
}` }
        },
        {
            title: 'Scripted Pipeline',
            content: `Full Groovy scripting power. Flexible but complex. node blocks allocate agents. stage for organization. try/catch for error handling.

Use when declarative is too limiting. Mix with declarative using script blocks.`,
            codeExample: {
                language: 'groovy', code: `node('linux') {
    try {
        stage('Checkout') {
            checkout scm
        }
        stage('Build') {
            sh 'make'
        }
    } catch (Exception e) {
        currentBuild.result = 'FAILURE'
        throw e
    } finally {
        cleanWs()
    }
}` }
        },
        {
            title: 'Plugins',
            content: `1800+ plugins extend functionality. Essential: Git, Pipeline, Blue Ocean, Docker, Credentials, Slack. Manage via UI or Configuration as Code.

Update carefully - test in staging. Plugin dependencies matter. Security advisories for vulnerabilities.`,
            codeExample: {
                language: 'groovy', code: `// Using Docker plugin
pipeline {
    agent {
        docker {
            image 'maven:3.9-jdk-17'
            args '-v $HOME/.m2:/root/.m2'
        }
    }
    stages {
        stage('Build') {
            steps { sh 'mvn clean package' }
        }
    }
}` }
        },
        {
            title: 'Credentials Management',
            content: `Store secrets securely. Types: Username/password, SSH keys, Secret text, Certificates. Scopes: Global, Folder, System.

withCredentials binding in pipelines. Credentials plugin manages storage. Jenkins masks in logs.`,
            codeExample: {
                language: 'groovy', code: `pipeline {
    agent any
    stages {
        stage('Deploy') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'docker-hub',
                        usernameVariable: 'USER', passwordVariable: 'PASS')
                ]) {
                    sh 'docker login -u $USER -p $PASS'
                }
            }
        }
    }
}` }
        },
        {
            title: 'Shared Libraries',
            content: `Reusable code across pipelines. Global libraries in Jenkins config. Load dynamically with @Library. vars/ for custom steps, src/ for classes.

Promotes DRY, standardization. Version with Git branches/tags.`,
            codeExample: {
                language: 'groovy', code: `// Jenkinsfile
@Library('my-shared-library@main') _

pipeline {
    agent any
    stages {
        stage('Deploy') {
            steps {
                deployToKubernetes(env: 'production')  // Custom step
            }
        }
    }
}` }
        },
        {
            title: 'Multibranch Pipeline',
            content: `Auto-discover branches with Jenkinsfile. Creates job per branch. Orphan branch cleanup. PR builds for GitHub/GitLab/Bitbucket.

Organization folder scans entire org. Reduces job configuration. Branch-based workflows.`,
            codeExample: {
                language: 'groovy', code: `// Branch-specific behavior
pipeline {
    agent any
    stages {
        stage('Deploy') {
            when { branch 'main' }
            steps { sh './deploy.sh production' }
        }
        stage('Preview') {
            when { changeRequest() }
            steps { sh './deploy.sh preview' }
        }
    }
}` }
        },
        {
            title: 'Blue Ocean',
            content: `Modern UI for Jenkins pipelines. Visual pipeline editor. Better logs and visualization. GitHub/GitLab integration.

Create pipelines visually. Easier for beginners. Classic UI still available.`,
            codeExample: {
                language: 'bash', code: `# Install Blue Ocean plugin via CLI
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  install-plugin blueocean` }
        },
        {
            title: 'Configuration as Code (JCasC)',
            content: `Define Jenkins config in YAML. Reproducible setup. Version controlled. Automates Jenkins provisioning.

System config, credentials, jobs. Reload without restart. Essential for Jenkins at scale.`,
            codeExample: {
                language: 'yaml', code: `# jenkins.yaml
jenkins:
  systemMessage: "Jenkins configured via JCasC"
  numExecutors: 5
  securityRealm:
    local:
      users:
        - id: "admin"
          password: "admin"
credentials:
  system:
    domainCredentials:
      - credentials:
          - string:
              id: "api-key"
              secret: "supersecret"` }
        }
    ],
    questions: [
        { question: 'What is the difference between Declarative and Scripted Pipeline?', answer: `Declarative: Structured, opinionated, validates syntax, easier. Scripted: Full Groovy, flexible, complex, no validation. Use declarative unless you need scripted's power.` },
        { question: 'How do you handle credentials in Jenkins?', answer: `Credentials plugin stores securely. withCredentials binds to variables. Types: Username/password, SSH, Secret text. Masked in logs. Scope: Global, Folder, System.` },
        { question: 'What are Shared Libraries?', answer: `Reusable Groovy code for pipelines. Global or per-folder. vars/ for custom steps, src/ for classes. @Library annotation to load. Promotes standardization and DRY.` },
        { question: 'Explain Jenkins agents and executors.', answer: `Agents (slaves): Machines running builds. Executors: Build slots on agent. Labels route jobs. Cloud plugins auto-scale. Controller should not run builds in production.` },
        { question: 'What is Multibranch Pipeline?', answer: `Auto-discovers branches with Jenkinsfile. Creates job per branch. PR builds. Orphan cleanup. Organization folder scans entire org. Enables GitFlow and PR workflows.` },
        { question: 'How do you implement parallel stages?', answer: `parallel block in Declarative or map in Scripted. Runs stages/steps concurrently. failFast stops all on failure. Great for matrix testing or independent tasks.` },
        { question: 'What is Configuration as Code (JCasC)?', answer: `YAML-defined Jenkins config. Version controlled. Reproducible setup. System settings, credentials, jobs. Reload without restart. Essential for Jenkins at scale.` },
        { question: 'How do you trigger builds?', answer: `Poll SCM: Regular checks. Webhooks: Push-based (preferred). Upstream: After another job. Timer (cron). Remote API. pollSCM, cron, upstream triggers.` },
        { question: 'Explain post actions in pipelines.', answer: `Run after stages complete. Conditions: always, success, failure, unstable, changed, aborted. Use for notifications, cleanup, publishing. Defined in post block.` },
        { question: 'What is Blue Ocean?', answer: `Modern Jenkins UI. Visual pipeline editor. Better visualization of pipelines. GitHub/GitLab integration. Easier for new users. Plugin installation.` },
        { question: 'How do you manage Jenkins at scale?', answer: `Controller/agent architecture. Cloud agents (Kubernetes, EC2). JCasC for configuration. Shared Libraries for standardization. Folder organization. Regular maintenance.` },
        { question: 'What are environment variables in Jenkins?', answer: `Built-in: BUILD_NUMBER, JOB_NAME, WORKSPACE. Custom via environment block. withEnv for step scope. Credentials bound as variables. Available in shell scripts.` },
        { question: 'How do you implement approval gates?', answer: `input step pauses for approval. timeout for expiration. submitter limits who can approve. Parameters for input choices. Essential for production deployments.` },
        { question: 'Explain stash and unstash.', answer: `stash: Save files from workspace. unstash: Restore in same or different agent. Share files between stages on different agents. Lightweight alternative to artifacts.` },
        { question: 'What are Jenkins security best practices?', answer: `Enable security. RBAC with Matrix Auth. Disable CLI remoting. Agent-to-controller security. Regular updates. Audit trail. Credentials encryption. CSRF protection.` }
    ]
};
