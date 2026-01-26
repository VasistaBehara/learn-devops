import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Header({ onMenuToggle }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="header">
            <div className="header-left">
                <button className="menu-toggle" onClick={onMenuToggle} aria-label="Toggle menu">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
                <Link to="/" className="logo">
                    <span className="logo-icon">🚀</span>
                    <span>DevOps Hub</span>
                </Link>
            </div>
            <div className="header-right">
                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </div>
        </header>
    );
}

export default Header;
