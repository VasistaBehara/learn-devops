import { useState } from 'react';

function QAItem({ question, answer, number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`qa-item ${isOpen ? 'open' : ''}`}>
            <button
                className="qa-question"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="qa-number">{number}</span>
                <span style={{ flex: 1 }}>{question}</span>
                <span className="qa-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6,9 12,15 18,9" />
                    </svg>
                </span>
            </button>
            <div className="qa-answer">
                <div className="qa-answer-content">
                    {answer.split('\n\n').map((paragraph, index) => (
                        <p key={index} style={{ whiteSpace: 'pre-line' }}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

function QAList({ items }) {
    if (items.length === 0) {
        return (
            <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No questions found</h3>
                <p>Try adjusting your search terms</p>
            </div>
        );
    }

    return (
        <div className="qa-list">
            {items.map((item, index) => (
                <QAItem
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    number={index + 1}
                />
            ))}
        </div>
    );
}

export default QAList;
