import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import ToolPage from './pages/ToolPage';
import './App.css';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Save last visited page
    useEffect(() => {
        const handleRouteChange = () => {
            localStorage.setItem('devops-last-page', window.location.pathname);
        };
        handleRouteChange();
        window.addEventListener('popstate', handleRouteChange);
        return () => window.removeEventListener('popstate', handleRouteChange);
    }, []);

    return (
        <div className="app">
            <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
            <div className="app-container">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/tool/:toolId" element={<ToolPage />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default App;
