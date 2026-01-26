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
                        <div className="hero-stat-value">13</div>
                        <div className="hero-stat-label">Tools Covered</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-value">140+</div>
                        <div className="hero-stat-label">Key Concepts</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-value">200+</div>
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
