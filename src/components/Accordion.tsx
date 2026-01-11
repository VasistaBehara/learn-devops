import { useState } from 'react';

type Props = {
  id: string;
  title: string;
  bullets: string[];
  codeBlocks?: string[];
  defaultOpen?: boolean;
};

const Accordion = ({ id, title, bullets, codeBlocks, defaultOpen = false }: Props) => {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `${id}-panel`;

  return (
    <div className="rounded-xl border border-slate-200 bg-white/60 p-4 shadow-sm transition dark:border-slate-800 dark:bg-slate-900/70">
      <button
        type="button"
        className="flex w-full items-center justify-between text-left text-lg font-semibold text-slate-900 dark:text-white"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <span className={`transition ${open ? 'rotate-45' : 'rotate-0'}`}>+</span>
      </button>
      {open && (
        <div id={panelId} className="mt-3 space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <ul className="space-y-2 list-disc pl-5">
            {bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
          {codeBlocks?.map((block, index) => (
            <pre key={index} aria-label="Code snippet">
              <code>{block}</code>
            </pre>
          ))}
        </div>
      )}
    </div>
  );
};

export default Accordion;
