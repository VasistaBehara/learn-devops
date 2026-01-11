import { Link } from 'react-router-dom';
import { Tool } from '../content/tools';

type Props = {
  tool: Tool;
};

const ToolCard = ({ tool }: Props) => {
  return (
    <Link
      to={`/tool/${tool.id}`}
      className="group card-surface flex flex-col rounded-xl p-6 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{tool.name}</h3>
        <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700 transition group-hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200">
          Explore
        </span>
      </div>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{tool.description}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span className="rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-800">Notes</span>
        <span className="rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-800">Interview</span>
      </div>
    </Link>
  );
};

export default ToolCard;
