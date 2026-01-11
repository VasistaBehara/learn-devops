import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white/80 p-8 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
    <h1 className="text-3xl font-bold">Page not found</h1>
    <p className="mt-2 text-slate-600 dark:text-slate-400">The page you are looking for does not exist.</p>
    <div className="mt-6 flex justify-center">
      <Link to="/" className="btn-primary">
        Back to home
      </Link>
    </div>
  </div>
);

export default NotFound;
