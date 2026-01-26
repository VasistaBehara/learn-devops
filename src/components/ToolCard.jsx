import { Link } from 'react-router-dom';

function ToolCard({ tool }) {
    const { id, name, icon, description, conceptCount, questionCount, color } = tool;

    return (
        <Link
            to={`/tool/${id}`}
            className="tool-card"
            style={{ '--tool-color': color }}
        >
            <div className="tool-card-icon">
                {icon}
            </div>
            <h3 className="tool-card-title">{name}</h3>
            <p className="tool-card-description">{description}</p>
            <div className="tool-card-stats">
                <span className="tool-card-stat">
                    <strong>{conceptCount}</strong> concepts
                </span>
                <span className="tool-card-stat">
                    <strong>{questionCount}</strong> Q&As
                </span>
            </div>
        </Link>
    );
}

export default ToolCard;
