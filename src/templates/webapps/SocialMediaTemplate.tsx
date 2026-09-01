import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Send, Image, Code, Sparkles, TrendingUp, UserPlus, Check, Share2, MoreHorizontal } from 'lucide-react';

interface SocialPost {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    isFollowing: boolean;
  };
  content: string;
  codeSnippet?: string;
  image?: string;
  timestamp: string;
  likesCount: number;
  isLiked: boolean;
  repostsCount: number;
  isReposted: boolean;
  comments: { id: string; author: string; text: string; time: string }[];
}

const INITIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    author: {
      name: 'Sarah Chen',
      handle: 'sarahcodes',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      isFollowing: true,
    },
    content: 'Just deployed our new Raft consensus cluster across 3 edge cloud regions. Sub-10ms state synchronization without split-brain incidents! 🚀 Here is the core heartbeat timer logic:',
    codeSnippet: `// Raft Heartbeat Election Timeout
const electionTimeout = Math.floor(Math.random() * 150) + 150; // 150-300ms
setInterval(() => {
  if (state.role === 'leader') broadcastHeartbeat();
}, 50);`,
    timestamp: '15m ago',
    likesCount: 142,
    isLiked: false,
    repostsCount: 29,
    isReposted: false,
    comments: [
      { id: 'c1', author: 'Alex Rivera', text: 'How are you handling network partitions between US-East and EU-Central?', time: '8m ago' },
      { id: 'c2', author: 'Sarah Chen', text: 'Quorum requires (N/2 + 1) votes before committing state transitions to disk.', time: '4m ago' },
    ],
  },
  {
    id: 'post-2',
    author: {
      name: 'Marcus Vance',
      handle: 'marcus_v',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      isFollowing: false,
    },
    content: 'CSS container queries combined with Tailwind CSS v4 is a total game changer for reusable UI widgets. No more brittle window.innerWidth hacks! 🎉',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    timestamp: '1h ago',
    likesCount: 88,
    isLiked: true,
    repostsCount: 14,
    isReposted: false,
    comments: [],
  },
];

export function SocialMediaTemplate() {
  const [posts, setPosts] = useState<SocialPost[]>(INITIAL_POSTS);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCode, setNewPostCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [openCommentsPostId, setOpenCommentsPostId] = useState<string | null>(null);
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});

  const stories = [
    { name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
    { name: 'Elena', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { name: 'Marcus', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    { name: 'David', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
  ];

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: SocialPost = {
      id: `post-${Date.now()}`,
      author: {
        name: 'Alex Rivera (You)',
        handle: 'alex_r',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        isFollowing: true,
      },
      content: newPostContent,
      codeSnippet: newPostCode.trim() ? newPostCode : undefined,
      timestamp: 'Just now',
      likesCount: 0,
      isLiked: false,
      repostsCount: 0,
      isReposted: false,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setNewPostCode('');
    setShowCodeInput(false);
  };

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nextLiked = !p.isLiked;
          return {
            ...p,
            isLiked: nextLiked,
            likesCount: p.likesCount + (nextLiked ? 1 : -1),
          };
        }
        return p;
      })
    );
  };

  const toggleRepost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nextReposted = !p.isReposted;
          return {
            ...p,
            isReposted: nextReposted,
            repostsCount: p.repostsCount + (nextReposted ? 1 : -1),
          };
        }
        return p;
      })
    );
  };

  const toggleFollow = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            author: { ...p.author, isFollowing: !p.author.isFollowing },
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = commentDrafts[postId];
    if (!text?.trim()) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [
              ...p.comments,
              {
                id: Date.now().toString(),
                author: 'Alex Rivera',
                text,
                time: 'Just now',
              },
            ],
          };
        }
        return p;
      })
    );

    setCommentDrafts((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-full font-sans pb-16">
      {/* Social Top Nav */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30 px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold shadow-lg shadow-pink-500/20">
              💬
            </div>
            <span className="font-bold text-base font-display text-white">DevSphere</span>
          </div>

          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
              alt=""
              className="w-8 h-8 rounded-full ring-2 ring-pink-500/40"
            />
          </div>
        </div>
      </header>

      {/* Main Social Grid */}
      <div className="max-w-6xl mx-auto px-6 pt-6 grid lg:grid-cols-12 gap-8">
        {/* Main Feed Column */}
        <main className="lg:col-span-8 space-y-6">
          {/* Stories Bar */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 overflow-x-auto">
            {stories.map((s, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
                <div className="w-13 h-13 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 to-amber-400 group-hover:scale-105 transition">
                  <img src={s.avatar} alt="" className="w-12 h-12 rounded-full border-2 border-slate-950 object-cover" />
                </div>
                <span className="text-[11px] text-slate-300 font-medium">{s.name}</span>
              </div>
            ))}
          </div>

          {/* Post Composer */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex gap-3">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                alt=""
                className="w-10 h-10 rounded-full shrink-0"
              />
              <div className="flex-1 space-y-3">
                <textarea
                  rows={3}
                  placeholder="Share a technical insight, architectural win, or question with the engineering community..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 leading-relaxed"
                />

                {showCodeInput && (
                  <textarea
                    rows={3}
                    placeholder="// Paste code snippet here..."
                    value={newPostCode}
                    onChange={(e) => setNewPostCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-pink-300 placeholder-slate-600 focus:outline-none focus:border-pink-500"
                  />
                )}

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCodeInput(!showCodeInput)}
                      className={`p-2 rounded-lg text-xs flex items-center gap-1.5 transition ${
                        showCodeInput ? 'bg-pink-950 text-pink-400 border border-pink-500/30' : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Code className="w-4 h-4" />
                      <span>Code</span>
                    </button>
                  </div>

                  <button
                    onClick={handleCreatePost}
                    disabled={!newPostContent.trim()}
                    className="bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white font-semibold text-xs px-5 py-2 rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-pink-600/30"
                  >
                    <Send className="w-3.5 h-3.5" /> Publish
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Stream */}
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md"
              >
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={post.author.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{post.author.name}</span>
                        <span className="text-xs text-slate-500 font-mono">@{post.author.handle}</span>
                      </div>
                      <span className="text-[11px] text-slate-500">{post.timestamp}</span>
                    </div>
                  </div>

                  {post.author.handle !== 'alex_r' && (
                    <button
                      onClick={() => toggleFollow(post.id)}
                      className={`text-xs font-semibold px-3 py-1 rounded-full transition ${
                        post.author.isFollowing
                          ? 'bg-slate-800 text-slate-400 hover:text-rose-400'
                          : 'bg-pink-600 hover:bg-pink-500 text-white'
                      }`}
                    >
                      {post.author.isFollowing ? 'Following' : '+ Follow'}
                    </button>
                  )}
                </div>

                {/* Content */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{post.content}</p>

                {/* Code Snippet Attachment */}
                {post.codeSnippet && (
                  <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto text-xs text-pink-300 font-mono">
                    <code>{post.codeSnippet}</code>
                  </pre>
                )}

                {/* Image Attachment */}
                {post.image && (
                  <div className="rounded-xl overflow-hidden aspect-video bg-slate-950">
                    <img src={post.image} alt="" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Social Action Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 transition ${
                      post.isLiked ? 'text-pink-500 font-bold' : 'hover:text-pink-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likesCount}</span>
                  </button>

                  <button
                    onClick={() => setOpenCommentsPostId(openCommentsPostId === post.id ? null : post.id)}
                    className="flex items-center gap-1.5 hover:text-sky-400 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments.length} Comments</span>
                  </button>

                  <button
                    onClick={() => toggleRepost(post.id)}
                    className={`flex items-center gap-1.5 transition ${
                      post.isReposted ? 'text-emerald-400 font-bold' : 'hover:text-emerald-400'
                    }`}
                  >
                    <Repeat2 className="w-4 h-4" />
                    <span>{post.repostsCount}</span>
                  </button>

                  <button className="hover:text-slate-200">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Expandable Comments Drawer */}
                {openCommentsPostId === post.id && (
                  <div className="pt-4 border-t border-slate-800 space-y-3">
                    <form
                      onSubmit={(e) => handleAddComment(post.id, e)}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        placeholder="Reply to this thread..."
                        value={commentDrafts[post.id] || ''}
                        onChange={(e) =>
                          setCommentDrafts({ ...commentDrafts, [post.id]: e.target.value })
                        }
                        className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 flex-1"
                      />
                      <button
                        type="submit"
                        className="bg-pink-600 hover:bg-pink-500 text-white font-semibold text-xs px-3.5 py-1.5 rounded-xl transition"
                      >
                        Reply
                      </button>
                    </form>

                    <div className="space-y-2 pt-2">
                      {post.comments.map((c) => (
                        <div key={c.id} className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-semibold text-slate-300">{c.author}</span>
                            <span className="text-[11px] text-slate-500">{c.time}</span>
                          </div>
                          <p className="text-xs text-slate-400">{c.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </main>

        {/* Right Social Sidebar (Trending & Discovery) */}
        <aside className="hidden lg:block lg:col-span-4 space-y-6">
          {/* Trending Topics */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-pink-400" /> Trending in Tech
            </h3>
            <div className="space-y-3 text-xs">
              {[
                { tag: '#RSC_Architecture', posts: '14.2k posts', domain: 'Frontend' },
                { tag: '#RustSIMD', posts: '8.4k posts', domain: 'Systems' },
                { tag: '#Kubernetes_eBPF', posts: '19.1k posts', domain: 'DevOps' },
                { tag: '#AgenticCoding', posts: '32.5k posts', domain: 'AI' },
              ].map((t) => (
                <div key={t.tag} className="flex justify-between items-center hover:bg-slate-800/40 p-2 rounded-xl transition cursor-pointer">
                  <div>
                    <div className="font-bold text-white">{t.tag}</div>
                    <div className="text-[10px] text-slate-500">{t.domain}</div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{t.posts}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
