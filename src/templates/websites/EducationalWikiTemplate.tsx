import React, { useState, useMemo } from 'react';
import { Book, ChevronRight, ChevronDown, Search, Copy, Check, ThumbsUp, ThumbsDown, AlertCircle, Info, Lightbulb, AlertTriangle, FileText, Folder, Hash } from 'lucide-react';

interface DocItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  lastUpdated: string;
  content: string;
  headings: string[];
}

const DOCS: DocItem[] = [
  {
    id: 'rsc-mental-model',
    category: 'Frontend Architecture',
    title: 'React Server Components: Mental Models & Data Boundaries',
    readTime: '5 min',
    lastUpdated: 'August 2026',
    headings: ['Overview', 'The Server-Client Boundary', 'Code Example', 'Common Hydration Errors'],
    content: `React Server Components (RSC) enable developers to author components that execute strictly at build time or request time on the server.

### Overview
In traditional Single Page Applications (SPAs), the browser downloads the entire JavaScript bundle, initializes runtime state, and fires fetch requests over HTTP. RSC shifts this model by executing data access logic directly on the server host.

### The Server-Client Boundary
You define the transition from server execution to client interactivity using the \`'use client'\` directive at the top of a module file.

> [!TIP]
> Keep the \`'use client'\` boundary as low in your component subtree as possible to maximize the portion of the tree rendered on the server.

### Code Example
\`\`\`tsx
// ServerComponent.tsx (No 'use client' needed)
import { fetchUserMetrics } from '@/lib/metrics';
import { InteractiveChart } from './InteractiveChart'; // Client component

export async function DashboardView({ userId }: { userId: string }) {
  const data = await fetchUserMetrics(userId);
  return (
    <section className="dashboard">
      <h1>Telemetry Overview</h1>
      <InteractiveChart points={data} />
    </section>
  );
}
\`\`\`

### Common Hydration Errors
Passing non-serializable objects (such as functions, classes, or cyclic structures) from a Server Component to a Client Component prop will trigger serialization hydration exceptions.`
  },
  {
    id: 'oauth-jwt-security',
    category: 'Web Security & Auth',
    title: 'OAuth 2.0 PKCE & Secure JWT Session Token Rotation',
    readTime: '7 min',
    lastUpdated: 'July 2026',
    headings: ['Authorization Code Flow with PKCE', 'Why LocalStorage is Unsafe for Tokens', 'Secure HttpOnly Cookies'],
    content: `Proof Key for Code Exchange (PKCE) prevents authorization code interception attacks in Single Page Applications and mobile clients.

### Authorization Code Flow with PKCE
PKCE introduces a dynamically generated cryptographic secret called the **Code Verifier** and its hashed representation, the **Code Challenge**.

> [!WARNING]
> Never store sensitive JWT access or refresh tokens in \`localStorage\` or \`sessionStorage\`. Any third-party npm package with an XSS vulnerability can read from storage.

### Secure HttpOnly Cookies
Always store session tokens in \`HttpOnly\`, \`SameSite=Lax\`, and \`Secure\` cookies so they cannot be accessed by client-side JavaScript scripts.`
  },
  {
    id: 'optimistic-locking',
    category: 'Backend & Distributed Systems',
    title: 'Optimistic Concurrency Control in Transactional APIs',
    readTime: '6 min',
    lastUpdated: 'August 2026',
    headings: ['Pessimistic vs Optimistic Locking', 'Version Column Pattern', 'Handling 409 Conflict'],
    content: `Optimistic locking allows concurrent transactions to complete without locking database tables, verifying that no conflicting updates occurred before committing.

### Version Column Pattern
Add an integer \`version\` or \`updated_at\` timestamp column to your database schema. When updating a record, include the version in the WHERE clause:

\`\`\`sql
UPDATE inventory_items 
SET stock = stock - 1, version = version + 1
WHERE id = 'sku-948' AND version = 3;
\`\`\`

If zero rows are updated, another concurrent transaction updated the record first. Return an HTTP \`409 Conflict\` status code and prompt the client to re-fetch the latest state.`
  }
];

export function EducationalWikiTemplate() {
  const [selectedDoc, setSelectedDoc] = useState<DocItem>(DOCS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Frontend Architecture': true,
    'Web Security & Auth': true,
    'Backend & Distributed Systems': true,
  });

  const categories = useMemo(() => {
    const map: Record<string, DocItem[]> = {};
    DOCS.forEach((d) => {
      if (!map[d.category]) map[d.category] = [];
      map[d.category].push(d);
    });
    return map;
  }, []);

  const filteredDocs = useMemo(() => {
    if (!searchQuery.trim()) return DOCS;
    return DOCS.filter(
      (d) =>
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-full font-sans pb-16 flex flex-col">
      {/* Wiki Nav Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Book className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-white font-display">DevDocs & Wiki Codex</span>
              <span className="text-[10px] text-slate-400 block">v2026.8 Technical Documentation</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search documentation (⌘K)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </header>

      {/* Main Layout: Sidebar + Article Content + On-This-Page */}
      <div className="max-w-7xl mx-auto px-6 pt-6 grid lg:grid-cols-12 gap-8 flex-1 w-full">
        {/* Left Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sticky top-20">
            <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-3 px-2">
              Knowledge Base Tree
            </div>

            <nav className="space-y-3 text-xs">
              {(Object.entries(categories) as [string, DocItem[]][]).map(([catName, items]) => (
                <div key={catName} className="space-y-1">
                  <button
                    onClick={() => toggleCategory(catName)}
                    className="w-full text-left font-semibold text-slate-300 hover:text-white flex items-center justify-between py-1 px-2 rounded-lg hover:bg-slate-800/60 transition"
                  >
                    <span className="flex items-center gap-1.5">
                      <Folder className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{catName}</span>
                    </span>
                    {expandedCategories[catName] ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>

                  {expandedCategories[catName] && (
                    <div className="pl-4 space-y-1 border-l border-slate-800 ml-3">
                      {items.map((doc) => (
                        <button
                          key={doc.id}
                          onClick={() => {
                            setSelectedDoc(doc);
                            setFeedback(null);
                          }}
                          className={`w-full text-left py-1.5 px-2.5 rounded-lg text-[11px] transition flex items-center gap-1.5 ${
                            selectedDoc.id === doc.id
                              ? 'bg-indigo-600/20 text-indigo-300 font-semibold border-l-2 border-indigo-500'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                          }`}
                        >
                          <FileText className="w-3 h-3 shrink-0" />
                          <span className="line-clamp-1">{doc.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Center Article Content */}
        <main className="lg:col-span-7 space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>Docs</span>
            <ChevronRight className="w-3 h-3" />
            <span>{selectedDoc.category}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-indigo-400">{selectedDoc.title}</span>
          </div>

          {/* Article Header */}
          <div className="border-b border-slate-800 pb-6">
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
              {selectedDoc.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>Updated {selectedDoc.lastUpdated}</span>
              <span>•</span>
              <span>{selectedDoc.readTime} read</span>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed space-y-5">
            {selectedDoc.content.split('\n\n').map((block, idx) => {
              if (block.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-lg font-bold font-display text-white mt-6 mb-2 flex items-center gap-2">
                    <Hash className="w-4 h-4 text-indigo-400" />
                    {block.replace('### ', '')}
                  </h3>
                );
              }
              if (block.startsWith('> [!TIP]')) {
                return (
                  <div key={idx} className="p-4 rounded-xl bg-emerald-950/40 border-l-4 border-emerald-500 text-emerald-200 text-xs my-4 flex items-start gap-3">
                    <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>{block.replace('> [!TIP]\n> ', '')}</div>
                  </div>
                );
              }
              if (block.startsWith('> [!WARNING]')) {
                return (
                  <div key={idx} className="p-4 rounded-xl bg-amber-950/40 border-l-4 border-amber-500 text-amber-200 text-xs my-4 flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>{block.replace('> [!WARNING]\n> ', '')}</div>
                  </div>
                );
              }
              if (block.startsWith('```')) {
                const lines = block.split('\n');
                const lang = lines[0].replace('```', '') || 'ts';
                const codeBody = lines.slice(1, -1).join('\n');
                return (
                  <div key={idx} className="relative my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                    <div className="flex items-center justify-between px-4 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                      <span>{lang}</span>
                      <button
                        onClick={() => copyCode(codeBody)}
                        className="flex items-center gap-1 hover:text-white transition"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                    <pre className="p-4 overflow-x-auto text-xs text-indigo-300 font-mono">
                      <code>{codeBody}</code>
                    </pre>
                  </div>
                );
              }
              return <p key={idx}>{block}</p>;
            })}
          </div>

          {/* Was this article helpful? Widget */}
          <div className="mt-12 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">Was this documentation helpful?</h4>
              <p className="text-[11px] text-slate-400">Help us improve the developer experience with your feedback.</p>
            </div>

            {feedback ? (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Thank you for your feedback!
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFeedback('helpful')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" /> Yes
                </button>
                <button
                  onClick={() => setFeedback('not-helpful')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
                >
                  <ThumbsDown className="w-3.5 h-3.5 text-rose-400" /> No
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar: On This Page Table of Contents */}
        <aside className="hidden lg:block lg:col-span-2 space-y-4">
          <div className="sticky top-20 text-xs space-y-3">
            <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">On This Page</div>
            <ul className="space-y-2 border-l border-slate-800 pl-3">
              {selectedDoc.headings.map((h) => (
                <li key={h}>
                  <a href="#" className="text-slate-400 hover:text-indigo-400 transition block text-[11px] leading-tight">
                    {h}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
