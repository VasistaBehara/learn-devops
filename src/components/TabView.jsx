import { useState } from 'react';

function TabView({ tabs, children }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="tab-view">
            <div className="tab-header">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`tab-button ${activeTab === index ? 'active' : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {children[activeTab]}
            </div>
        </div>
    );
}

export default TabView;
