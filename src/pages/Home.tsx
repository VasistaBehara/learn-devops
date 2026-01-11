import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ToolCard from '../components/ToolCard';
import { LAST_VIEW_KEY } from '../constants';
import { tools } from '../content/tools';

type LastView = {
  toolId: string;
  tab?: 'notes' | 'qa';
};

const Home = () => {
  const [lastView, setLastView] = useState<LastView | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(LAST_VIEW_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as LastView;
        if (parsed?.toolId) setLastView(parsed);
      }
    } catch (error) {
      console.warn('Could not read last view', error);
    }
  }, []);

  const resumeTool = lastView ? tools.find((tool) => tool.id === lastView.toolId) : null;

  return (
    <div className="space-y-10">
      <section className="card-surface relative overflow-hidden rounded-2xl p-8 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-cyan-400/10 to-transparent" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-300">
              RECAP
            </p>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 dark:text-white">
              Rapid refresh on cloud, platform, and reliability skills.
            </h1>
            <p className="max-w-2xl text-lg text-slate-700 dark:text-slate-300">
              Zero-login, zero-API-key study cards covering cloud platforms, infra-as-code, automation, CI/CD,
              containers, Kubernetes, observability, and SRE topics.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/tool/aws" className="btn-primary" aria-label="Jump to AWS notes">
                Start with AWS
              </Link>
              <a
                className="btn-ghost"
                href="https://developer.hashicorp.com/terraform/language"
                target="_blank"
                rel="noreferrer"
              >
                Terraform docs
              </a>
            </div>
          </div>
          <div className="card-surface relative mt-4 w-full max-w-sm rounded-xl p-6 text-sm leading-relaxed text-slate-700 shadow-lg dark:text-slate-200">
            <div className="mb-3 inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-200">
              Quick facts
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-xl">•</span> Stateless React front-end; deploy anywhere static.</li>
              <li className="flex items-start gap-2"><span className="text-xl">•</span> LocalStorage remembers your theme and last tab.</li>
              <li className="flex items-start gap-2"><span className="text-xl">•</span> Built with Vite, Tailwind, and TypeScript.</li>
            </ul>
            {resumeTool ? (
              <div className="mt-4 rounded-lg border border-indigo-200/70 bg-indigo-50/70 p-3 text-indigo-800 dark:border-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-100">
                <p className="text-xs uppercase tracking-wide">Resume</p>
                <Link className="font-semibold" to={`/tool/${resumeTool.id}`}>
                  Back to {resumeTool.name} ({lastView?.tab === 'qa' ? 'Q&A' : 'Notes'})
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-baseline justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Tools</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Choose a platform to dive into concepts and interview prep.</p>
          </div>
          <Link to="/tool/terraform" className="btn-ghost">
            Random pick
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
