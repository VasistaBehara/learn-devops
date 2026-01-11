export type TabKey = 'notes' | 'qa';

type Tab = {
  key: TabKey;
  label: string;
};

type Props = {
  tabs: Tab[];
  active: TabKey;
  onChange: (key: TabKey) => void;
};

const Tabs = ({ tabs, active, onChange }: Props) => {
  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 text-sm shadow-inner dark:border-slate-800 dark:bg-slate-900">
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            type="button"
            className={`rounded-full px-4 py-2 font-semibold transition ${
              isActive
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-400/40 dark:bg-indigo-500'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
            aria-pressed={isActive}
            onClick={() => onChange(tab.key)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
