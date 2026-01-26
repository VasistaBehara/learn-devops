import { useState } from 'react';
import CodeBlock from './CodeBlock';

function Accordion({ items }) {
    const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default

    const toggleItem = (index) => {
        setOpenItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    if (items.length === 0) {
        return (
            <div className="no-results">
                <div className="no-results-icon">📭</div>
                <h3>No concepts found</h3>
                <p>Try adjusting your search terms</p>
            </div>
        );
    }

    return (
        <div className="accordion">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`accordion-item ${openItems.has(index) ? 'open' : ''}`}
                >
                    <button
                        className="accordion-header"
                        onClick={() => toggleItem(index)}
                        aria-expanded={openItems.has(index)}
                    >
                        <span>{item.title}</span>
                        <span className="accordion-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="6,9 12,15 18,9" />
                            </svg>
                        </span>
                    </button>
                    <div className="accordion-content">
                        <div className="accordion-body">
                            {item.content.split('\n\n').map((paragraph, pIndex) => (
                                <p key={pIndex}>{paragraph}</p>
                            ))}
                            {item.codeExample && (
                                <CodeBlock
                                    language={item.codeExample.language}
                                    code={item.codeExample.code}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Accordion;
