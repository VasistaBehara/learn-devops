type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SearchBox = ({ value, onChange, placeholder }: Props) => {
  return (
    <label className="block w-full">
      <span className="sr-only">Search</span>
      <div className="relative">
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? 'Search this tab...'}
          className="w-full rounded-xl border border-slate-200 bg-white/80 py-2 pl-10 pr-3 text-sm shadow-sm transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-900/70 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-900/50"
        />
        <span className="pointer-events-none absolute left-3 top-2.5 text-slate-400">🔍</span>
      </div>
    </label>
  );
};

export default SearchBox;
