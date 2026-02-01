import { NavLink, useLocation } from 'react-router-dom';

const tools = [
    { id: 'aws', name: 'AWS', icon: '☁️' },
    { id: 'gcp', name: 'Google Cloud', icon: '🌐' },
    { id: 'azure', name: 'Azure', icon: '🔷' },
    { id: 'terraform', name: 'Terraform', icon: '🏗️' },
    { id: 'ansible', name: 'Ansible', icon: '⚙️' },
    { id: 'git', name: 'Git', icon: '📚' },
    { id: 'docker', name: 'Docker', icon: '🐳' },
    { id: 'kubernetes', name: 'Kubernetes', icon: '☸️' },
    { id: 'jenkins', name: 'Jenkins', icon: '🔧' },
    { id: 'gitlab', name: 'GitLab', icon: '🦊' },
    { id: 'github-actions', name: 'GitHub Actions', icon: '⚡' },
    { id: 'linux', name: 'Linux', icon: '🐧' },
    { id: 'sre', name: 'SRE', icon: '🔥' },
    { id: 'prometheus', name: 'Prometheus', icon: '🔥' },
    { id: 'grafana', name: 'Grafana', icon: '📊' },
    { id: 'helm', name: 'Helm', icon: '⎈' },
    { id: 'vault', name: 'Vault', icon: '🔐' },
    { id: 'argocd', name: 'ArgoCD', icon: '🔄' },
    { id: 'cloudformation', name: 'CloudFormation', icon: '📋' },
    { id: 'bash', name: 'Bash/Shell', icon: '💻' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'yaml', name: 'YAML', icon: '📝' },
    { id: 'json', name: 'JSON', icon: '📋' },
];

function Sidebar({ isOpen, onClose }) {
    const location = useLocation();

    return (
        <>
            <div
                className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
                onClick={onClose}
            />
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-section">
                    <h3 className="sidebar-title">Navigation</h3>
                    <nav className="sidebar-nav">
                        <NavLink
                            to="/"
                            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                            onClick={onClose}
                        >
                            <span className="sidebar-link-icon">🏠</span>
                            <span>Home</span>
                        </NavLink>
                    </nav>
                </div>

                <div className="sidebar-section">
                    <h3 className="sidebar-title">DevOps Tools</h3>
                    <nav className="sidebar-nav">
                        {tools.map(tool => (
                            <NavLink
                                key={tool.id}
                                to={`/tool/${tool.id}`}
                                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                                onClick={onClose}
                            >
                                <span className="sidebar-link-icon">{tool.icon}</span>
                                <span>{tool.name}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
