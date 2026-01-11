import { useState } from 'react';

type Props = {
  id: string;
  question: string;
  answer: string;
  tags: string[];
  difficulty: string;
};

const QAItem = ({ id, question, answer, tags, difficulty }: Props) => {
  const [open, setOpen] = useState(false);
  const panelId = `${id}-qa`;

  return (
    <div className="rounded-xl border border-slate-200 bg-white/60 p-4 shadow-sm transition dark:border-slate-800 dark:bg-slate-900/70">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-3 text-left"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div>
          <p className="text-base font-semibold text-slate-900 dark:text-white">{question}</p>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{difficulty}</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
            {tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span className={`text-xl transition ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div id={panelId} className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {answer}
        </div>
      )}
    </div>
  );
};

export default QAItem;
