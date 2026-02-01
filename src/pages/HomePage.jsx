import ToolCard from '../components/ToolCard';

const tools = [
    {
        id: 'aws',
        name: 'Amazon Web Services',
        icon: '☁️',
        description: 'Master cloud computing with EC2, S3, Lambda, IAM, and 20+ AWS services.',
        conceptCount: 20,
        questionCount: 25,
        color: '#ff9900'
    },
    {
        id: 'gcp',
        name: 'Google Cloud Platform',
        icon: '🌐',
        description: 'Learn GCP services including Compute Engine, Cloud Storage, and BigQuery.',
        conceptCount: 10,
        questionCount: 15,
        color: '#4285f4'
    },
    {
        id: 'azure',
        name: 'Microsoft Azure',
        icon: '🔷',
        description: 'Explore Azure VMs, Blob Storage, Azure AD, and enterprise cloud solutions.',
        conceptCount: 10,
        questionCount: 15,
        color: '#0078d4'
    },
    {
        id: 'terraform',
        name: 'Terraform',
        icon: '🏗️',
        description: 'Infrastructure as Code with HCL, providers, modules, and state management.',
        conceptCount: 10,
        questionCount: 15,
        color: '#7b42bc'
    },
    {
        id: 'ansible',
        name: 'Ansible',
        icon: '⚙️',
        description: 'Automation with playbooks, inventory management, roles, and modules.',
        conceptCount: 10,
        questionCount: 15,
        color: '#ee0000'
    },
    {
        id: 'git',
        name: 'Git',
        icon: '📚',
        description: 'Version control with branching, merging, rebasing, and collaboration workflows.',
        conceptCount: 10,
        questionCount: 15,
        color: '#f05032'
    },
    {
        id: 'docker',
        name: 'Docker',
        icon: '🐳',
        description: 'Containerization with images, Dockerfiles, networking, and orchestration.',
        conceptCount: 10,
        questionCount: 15,
        color: '#2496ed'
    },
    {
        id: 'kubernetes',
        name: 'Kubernetes',
        icon: '☸️',
        description: 'Container orchestration with pods, deployments, services, and scaling.',
        conceptCount: 10,
        questionCount: 15,
        color: '#326ce5'
    },
    {
        id: 'jenkins',
        name: 'Jenkins',
        icon: '🔧',
        description: 'CI/CD automation with pipelines, plugins, and distributed builds.',
        conceptCount: 10,
        questionCount: 15,
        color: '#d33833'
    },
    {
        id: 'gitlab',
        name: 'GitLab',
        icon: '🦊',
        description: 'Complete DevOps platform with Git, CI/CD, and project management.',
        conceptCount: 10,
        questionCount: 15,
        color: '#fc6d26'
    },
    {
        id: 'github-actions',
        name: 'GitHub Actions',
        icon: '⚡',
        description: 'CI/CD and automation built into GitHub with workflows and actions.',
        conceptCount: 10,
        questionCount: 15,
        color: '#2088ff'
    },
    {
        id: 'linux',
        name: 'Linux',
        icon: '🐧',
        description: 'Essential OS skills for servers, containers, and cloud infrastructure.',
        conceptCount: 10,
        questionCount: 15,
        color: '#fcc624'
    },
    {
        id: 'sre',
        name: 'SRE',
        icon: '🔥',
        description: 'Site Reliability Engineering practices for building reliable systems.',
        conceptCount: 10,
        questionCount: 15,
        color: '#ea4335'
    },
    {
        id: 'prometheus',
        name: 'Prometheus',
        icon: '🔥',
        description: 'Metrics collection and alerting with PromQL and service discovery.',
        conceptCount: 10,
        questionCount: 15,
        color: '#e6522c'
    },
    {
        id: 'grafana',
        name: 'Grafana',
        icon: '📊',
        description: 'Visualization platform for metrics, logs, and traces dashboards.',
        conceptCount: 10,
        questionCount: 15,
        color: '#f46800'
    },
    {
        id: 'helm',
        name: 'Helm',
        icon: '⎈',
        description: 'Kubernetes package manager for deploying and managing applications.',
        conceptCount: 10,
        questionCount: 15,
        color: '#0f1689'
    },
    {
        id: 'vault',
        name: 'HashiCorp Vault',
        icon: '🔐',
        description: 'Secrets management, encryption, and identity-based access control.',
        conceptCount: 10,
        questionCount: 15,
        color: '#000000'
    },
    {
        id: 'argocd',
        name: 'ArgoCD',
        icon: '🔄',
        description: 'GitOps continuous delivery for Kubernetes with declarative configuration.',
        conceptCount: 10,
        questionCount: 15,
        color: '#ef7b4d'
    },
    {
        id: 'cloudformation',
        name: 'AWS CloudFormation',
        icon: '📋',
        description: 'AWS Infrastructure as Code with templates, stacks, and StackSets.',
        conceptCount: 10,
        questionCount: 15,
        color: '#ff9900'
    },
    {
        id: 'bash',
        name: 'Bash/Shell Scripting',
        icon: '💻',
        description: 'Essential scripting for automation, system admin, and DevOps workflows.',
        conceptCount: 20,
        questionCount: 20,
        color: '#4eaa25'
    },
    {
        id: 'python',
        name: 'Python for DevOps',
        icon: '🐍',
        description: 'Python automation, AWS SDK, Docker, Kubernetes, and infrastructure tooling.',
        conceptCount: 20,
        questionCount: 20,
        color: '#3776ab'
    },
    {
        id: 'yaml',
        name: 'YAML',
        icon: '📝',
        description: 'Human-readable data format for Kubernetes, Docker Compose, and CI/CD configs.',
        conceptCount: 10,
        questionCount: 15,
        color: '#cb171e'
    },
    {
        id: 'json',
        name: 'JSON',
        icon: '📋',
        description: 'Data interchange format for APIs, configuration, and jq processing.',
        conceptCount: 10,
        questionCount: 15,
        color: '#000000'
    }
];

function HomePage() {
    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-badge">
                    <span className="hero-badge-icon">🎯</span>
                    <span>Your DevOps Journey Starts Here</span>
                </div>
                <h1 className="hero-title">
                    Master <span className="gradient-text">DevOps Tools</span>
                    <br />& Ace Your Interviews
                </h1>
                <p className="hero-description">
                    Comprehensive learning resources covering key concepts, practical examples,
                    and interview preparation for the most in-demand DevOps technologies.
                </p>
                <div className="hero-stats">
                    <div className="hero-stat">
                        <div className="hero-stat-value">23</div>
                        <div className="hero-stat-label">Tools Covered</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-value">260+</div>
                        <div className="hero-stat-label">Key Concepts</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-value">350+</div>
                        <div className="hero-stat-label">Interview Q&As</div>
                    </div>
                </div>
            </section>

            <section className="tools-section">
                <div className="section-header">
                    <h2 className="section-title">DevOps Learning Paths</h2>
                </div>
                <div className="tools-grid">
                    {tools.map(tool => (
                        <ToolCard key={tool.id} tool={tool} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default HomePage;
