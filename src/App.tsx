import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ToolPage from './pages/ToolPage';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-indigo-50 to-white text-slate-900 transition dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="pointer-events-none absolute inset-0 blur-3xl">
        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-indigo-300/50 dark:bg-indigo-700/30" />
        <div className="absolute right-16 top-10 h-72 w-72 rounded-full bg-cyan-200/50 dark:bg-cyan-600/20" />
      </div>

      <header className="relative z-10 border-b border-white/40 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3 font-semibold text-slate-900 dark:text-white">
            <span className="rounded-lg bg-indigo-600 px-3 py-1 text-sm uppercase tracking-tight text-white shadow-md shadow-indigo-400/30 dark:bg-indigo-500">
              RECAP
            </span>
            <span className="text-xl">Recap</span>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="btn-ghost hidden rounded-md md:inline-flex"
              aria-label="Back to home"
            >
              Home
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              className="btn-ghost"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-12 pt-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tool/:toolId" element={<ToolPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="relative z-10 border-t border-white/40 bg-white/80 px-4 py-6 text-center text-sm text-slate-600 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
        <div className="mx-auto max-w-6xl">
          <p>RECAP · Minimal study guide for practical cloud, platform, and reliability skills.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
