import React, { useState, useMemo } from 'react';
import { Search, Tag, Clock, Calendar, User, MessageSquare, ThumbsUp, Share2, BookOpen, ChevronRight, X, Send, Bookmark } from 'lucide-react';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Frontend' | 'Architecture' | 'DevOps' | 'AI & ML';
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  likes: number;
  commentsCount: number;
  featured?: boolean;
}

const SAMPLE_ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'optimizing-react-server-components',
    title: 'Architecting High-Throughput React Server Components in 2026',
    excerpt: 'Deep dive into hydration boundaries, zero-bundle-size server modules, and fine-grained streaming SSR patterns for production web applications.',
    content: `React Server Components (RSC) fundamentally redefine the client-server boundary by allowing UI components to execute exclusively on the server, serializing only their output stream to the browser.

### Key Architectural Shifts
1. **Zero Client-Side JavaScript for Data Fetchers**: Data-access libraries (e.g., ORMs, native database drivers) never enter the browser bundle.
2. **Streaming HTML Hydration**: The client starts rendering immediate fallback UI while suspenseful asynchronous server components resolve chunks progressively.
3. **Automatic Code Splitting**: Dynamic client components are downloaded on-demand only when rendered by server-emitted trees.

\`\`\`tsx
// Example: Pure Server Component with direct DB query
import db from '@/lib/database';

export async function UserAnalyticsFeed({ tenantId }: { tenantId: string }) {
  const stats = await db.query('SELECT * FROM telemetry WHERE tenant_id = $1', [tenantId]);
  return (
    <div className="analytics-stream">
      <h2>Active Telemetry ({stats.length} nodes)</h2>
      <ClientInteractiveChart initialData={stats} />
    </div>
  );
}
\`\`\`

### Avoiding Common Hydration Traps
A frequent beginner mistake is nesting stateful hooks inside server-rendered tree leaves without explicit \`'use client'\` boundary declarations. Always maintain a clean separation between data-fetching orchestrators and interactive DOM nodes.`,
    category: 'Architecture',
    publishedAt: 'Aug 28, 2026',
    readTime: '6 min read',
    author: {
      name: 'Dr. Elena Rostova',
      role: 'Principal Systems Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    likes: 142,
    commentsCount: 18,
    featured: true,
  },
  {
    id: '2',
    slug: 'tailwind-css-v4-under-the-hood',
    title: 'Tailwind CSS v4 & The Modern Oxide Engine Explained',
    excerpt: 'How lightningcss and Rust-based JIT compilation reduce build times to under 10ms with native CSS cascade layers.',
    content: `Tailwind CSS v4 eliminates heavy PostCSS dependency trees in favor of direct JIT engine bindings written in Rust (Oxide). This shift reduces compilation overhead by over 10x while embracing modern CSS standards like \`@layer\`, CSS color-mix, and container queries natively.`,
    category: 'Frontend',
    publishedAt: 'Aug 24, 2026',
    readTime: '4 min read',
    author: {
      name: 'Marcus Vance',
      role: 'Staff Frontend Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    likes: 89,
    commentsCount: 7,
  },
  {
    id: '3',
    slug: 'edge-caching-stale-while-revalidate',
    title: 'Mastering Stale-While-Revalidate Caching at the Edge',
    excerpt: 'Implementing CDN cache-control headers, tag-based purge webhooks, and sub-millisecond Time to First Byte (TTFB).',
    content: `The \`stale-while-revalidate\` Cache-Control directive allows CDNs to serve cached content immediately to the client while asynchronously dispatching a background fetch to revalidate and update the edge cache.`,
    category: 'DevOps',
    publishedAt: 'Aug 19, 2026',
    readTime: '8 min read',
    author: {
      name: 'Sarah Chen',
      role: 'Cloud Infrastructure Lead',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    },
    likes: 215,
    commentsCount: 32,
  },
  {
    id: '4',
    slug: 'evaluating-llm-agents-production',
    title: 'Benchmarking AI Coding Agents with Deterministic Sandboxes',
    excerpt: 'Techniques for automated AST verification, test-suite generation, and sandboxed container orchestration.',
    content: `Deploying autonomous coding agents into developer workflows requires deterministic evaluation harnesses that test patch synthesis, syntactic correctness, and test coverage before committing pull requests.`,
    category: 'AI & ML',
    publishedAt: 'Aug 15, 2026',
    readTime: '10 min read',
    author: {
      name: 'Dr. Elena Rostova',
      role: 'Principal Systems Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    likes: 310,
    commentsCount: 44,
  }
];

export function BlogContentTemplate() {
  const [articles, setArticles] = useState<Article[]>(SAMPLE_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<{ id: string; author: string; text: string; time: string }[]>([
    { id: '1', author: 'Devon Miles', text: 'The section on streaming SSR boundaries resolved an issue we had with dynamic charts.', time: '2 hours ago' },
    { id: '2', author: 'Aria Sterling', text: 'Great explanation of JIT compiler internals!', time: '1 day ago' },
  ]);
  const [likedArticles, setLikedArticles] = useState<Set<string>>(new Set());

  const categories = ['All', 'Frontend', 'Architecture', 'DevOps', 'AI & ML'];

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLikedArticles((prev) => {
      const next = new Set(prev);
      const isLiked = next.has(id);
      if (isLiked) {
        next.delete(id);
        setArticles((curr) => curr.map((a) => (a.id === id ? { ...a, likes: a.likes - 1 } : a)));
      } else {
        next.add(id);
        setArticles((curr) => curr.map((a) => (a.id === id ? { ...a, likes: a.likes + 1 } : a)));
      }
      return next;
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      {
        id: Date.now().toString(),
        author: 'Student Developer',
        text: newComment,
        time: 'Just now',
      },
      ...comments,
    ]);
    setNewComment('');
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-full font-sans pb-16">
      {/* Blog Top Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-20 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display tracking-tight text-white">The Modern Web Codex</h1>
              <p className="text-xs text-slate-400">Engineering publications & architectural breakdowns</p>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search articles, tags, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-4 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </header>

      {/* Hero Featured Article */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        {articles.find((a) => a.featured) && (
          <div
            onClick={() => setReadingArticle(articles.find((a) => a.featured)!)}
            className="group relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 cursor-pointer hover:border-indigo-500/60 transition shadow-xl"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                ⭐ Featured Publication
              </span>
              <span className="text-xs text-slate-400">• {articles[0].readTime}</span>
              <span className="text-xs text-slate-400">• {articles[0].publishedAt}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white group-hover:text-indigo-300 transition mb-3">
              {articles[0].title}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-6">
              {articles[0].excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={articles[0].author.avatar} alt="" className="w-9 h-9 rounded-full ring-2 ring-indigo-500/30" />
                <div>
                  <div className="text-xs font-semibold text-white">{articles[0].author.name}</div>
                  <div className="text-[11px] text-slate-400">{articles[0].author.role}</div>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition">
                Read Full Paper <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2">
          <Tag className="w-4 h-4 text-slate-500 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition shrink-0 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-xs text-slate-500 ml-auto font-mono">{filteredArticles.length} publications</span>
        </div>

        {/* Reverse Chronological Article Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setReadingArticle(article)}
              className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-5 hover:border-slate-700 hover:bg-slate-900/60 transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium font-mono text-[11px]">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <h3 className="font-bold text-base text-slate-100 group-hover:text-indigo-400 transition line-clamp-2 mb-2">
                  {article.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={article.author.avatar} alt="" className="w-6 h-6 rounded-full" />
                  <span className="text-xs text-slate-300 font-medium">{article.author.name}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <button
                    onClick={(e) => toggleLike(article.id, e)}
                    className={`flex items-center gap-1 hover:text-rose-400 transition ${
                      likedArticles.has(article.id) ? 'text-rose-400 font-bold' : ''
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{article.likes}</span>
                  </button>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{article.commentsCount}</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Subscription Box */}
        <div className="mt-14 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Weekly Engineering Digest</h3>
            <p className="text-xs text-slate-400 max-w-md">
              Curated architectural case studies, performance benchmarks, and RFC summaries delivered every Monday.
            </p>
          </div>
          {newsletterSubscribed ? (
            <div className="px-4 py-2 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-semibold">
              ✓ Subscribed! Check your inbox for the confirmation link.
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="developer@company.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-full sm:w-64"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl shrink-0 transition shadow-lg shadow-indigo-600/20"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Article Reader Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-center items-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-4 flex items-center justify-between z-10">
              <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
                {readingArticle.category} • {readingArticle.readTime}
              </span>
              <button
                onClick={() => setReadingArticle(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-white leading-tight">
                {readingArticle.title}
              </h1>

              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <img src={readingArticle.author.avatar} alt="" className="w-10 h-10 rounded-full ring-2 ring-indigo-500/30" />
                  <div>
                    <div className="text-sm font-semibold text-white">{readingArticle.author.name}</div>
                    <div className="text-xs text-slate-400">{readingArticle.author.role} • {readingArticle.publishedAt}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLike(readingArticle.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                      likedArticles.has(readingArticle.id)
                        ? 'bg-rose-950/50 border-rose-500/40 text-rose-300'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{readingArticle.likes}</span>
                  </button>
                </div>
              </div>

              {/* Prose */}
              <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4 font-normal">
                {readingArticle.content.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={i} className="text-lg font-bold text-white mt-6 mb-2">{paragraph.replace('### ', '')}</h3>;
                  }
                  if (paragraph.startsWith('```')) {
                    const code = paragraph.replace(/```[a-z]*\n/, '').replace(/```$/, '');
                    return (
                      <pre key={i} className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto text-xs text-indigo-300 font-mono my-4">
                        <code>{code}</code>
                      </pre>
                    );
                  }
                  return <p key={i}>{paragraph}</p>;
                })}
              </div>

              {/* Comments Section */}
              <div className="mt-8 pt-8 border-t border-slate-800">
                <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  Discussion ({comments.length})
                </h4>

                {/* New Comment Input */}
                <form onSubmit={handleAddComment} className="flex gap-2 mb-6">
                  <input
                    type="text"
                    placeholder="Add to the technical discussion..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 flex-1"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition"
                  >
                    <Send className="w-3.5 h-3.5" /> Post
                  </button>
                </form>

                {/* Comment List */}
                <div className="space-y-3">
                  {comments.map((c) => (
                    <div key={c.id} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-300">{c.author}</span>
                        <span className="text-slate-500 text-[11px]">{c.time}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
