import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Accordion from '../components/Accordion';
import QAItem from '../components/QAItem';
import SearchBox from '../components/SearchBox';
import Tabs, { TabKey } from '../components/Tabs';
import { LAST_VIEW_KEY } from '../constants';
import { tools } from '../content/tools';

const ToolPage = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = tools.find((entry) => entry.id === toolId);

  const initialTab: TabKey = useMemo(() => {
    if (typeof window === 'undefined' || !toolId) return 'notes';
    try {
      const stored = window.localStorage.getItem(LAST_VIEW_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as { toolId?: string; tab?: TabKey };
        if (parsed?.toolId === toolId && (parsed.tab === 'qa' || parsed.tab === 'notes')) {
          return parsed.tab;
        }
      }
    } catch (error) {
      console.warn('Could not read last tab', error);
    }
    return 'notes';
  }, [toolId]);

  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState<string>('all');

  useEffect(() => {
    setActiveTab(initialTab);
    setSearch('');
    setTagFilter('all');
  }, [toolId, initialTab]);

  useEffect(() => {
    if (!tool) return;
    try {
      window.localStorage.setItem(LAST_VIEW_KEY, JSON.stringify({ toolId: tool.id, tab: activeTab }));
    } catch (error) {
      console.warn('Could not save last view', error);
    }
  }, [tool, activeTab]);

  const tags = useMemo(() => {
    if (!tool) return [];
    const collection = new Set<string>();
    tool.qa.forEach((item) => item.tags.forEach((tag) => collection.add(tag)));
    return Array.from(collection).sort();
  }, [tool]);

  const filteredNotes = useMemo(() => {
    if (!tool) return [];
    if (!search.trim() || activeTab !== 'notes') return tool.notes;
    const query = search.toLowerCase();
    return tool.notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.bullets.some((bullet) => bullet.toLowerCase().includes(query)) ||
        note.codeBlocks?.some((block) => block.toLowerCase().includes(query))
    );
  }, [search, tool, activeTab]);

  const filteredQA = useMemo(() => {
    if (!tool) return [];
    if (activeTab !== 'qa') return tool.qa;
    const query = search.toLowerCase();
    return tool.qa.filter((item) => {
      const matchesQuery =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query));
      const matchesTag = tagFilter === 'all' || item.tags.includes(tagFilter);
      return matchesQuery && matchesTag;
    });
  }, [search, tool, activeTab, tagFilter]);

  if (!tool) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white/80 p-8 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
        <h1 className="text-3xl font-bold">Tool not found</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Pick a valid tool from the catalog.</p>
        <div className="mt-6 flex justify-center">
          <Link to="/" className="btn-primary">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const tabLabel = activeTab === 'notes' ? 'Notes' : 'Interview Q&A';

  return (
    <div className="space-y-6">
      <div className="card-surface rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">DevOps Tool</p>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{tool.name}</h1>
            <p className="mt-2 max-w-3xl text-slate-700 dark:text-slate-300">{tool.description}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <a
                href={tool.officialSite}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost px-3 py-1 text-indigo-700 dark:text-indigo-200"
              >
                Official site ↗
              </a>
              <a
                href={tool.officialDocs}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost px-3 py-1 text-indigo-700 dark:text-indigo-200"
              >
                Official docs/notes ↗
              </a>
            </div>
          </div>
          <Link to="/" className="btn-ghost self-start">
            ← All tools
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Tabs
          tabs={[
            { key: 'notes', label: 'Concepts & Notes' },
            { key: 'qa', label: 'Interview Q&A' },
          ]}
          active={activeTab}
          onChange={(key) => setActiveTab(key)}
        />
        <div className="flex w-full flex-col gap-3 md:w-1/2 md:flex-row md:items-center">
          <SearchBox value={search} onChange={setSearch} placeholder={`Search ${tabLabel}`} />
          {activeTab === 'qa' ? (
            <div className="flex flex-wrap gap-2 md:justify-end">
              <button
                type="button"
                onClick={() => setTagFilter('all')}
                aria-pressed={tagFilter === 'all'}
                className={`tag-pill ${
                  tagFilter === 'all'
                    ? 'border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-200'
                    : ''
                }`}
              >
                All tags
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setTagFilter(tag)}
                  aria-pressed={tagFilter === tag}
                  className={`tag-pill ${
                    tagFilter === tag
                      ? 'border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-200'
                      : ''
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {activeTab === 'notes' ? (
        filteredNotes.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredNotes.map((note) => (
              <Accordion
                key={note.id}
                id={note.id}
                title={note.title}
                bullets={note.bullets}
                codeBlocks={note.codeBlocks}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-600 dark:text-slate-400">No notes match that search.</p>
        )
      ) : filteredQA.length ? (
        <div className="space-y-3">
          {filteredQA.map((item) => (
            <QAItem
              key={item.id}
              id={item.id}
              question={item.question}
              answer={item.answer}
              tags={item.tags}
              difficulty={item.difficulty}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-600 dark:text-slate-400">No Q&A match that search.</p>
      )}
    </div>
  );
};

export default ToolPage;
