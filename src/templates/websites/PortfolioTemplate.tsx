import React, { useState } from 'react';
import { ExternalLink, Github, Mail, Linkedin, Terminal, Layers, Cpu, Award, Send, CheckCircle2, Code2, Sparkles, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'Full-Stack' | 'AI & Systems' | 'Cloud / Infra';
  summary: string;
  impactMetric: string;
  stack: string[];
  image: string;
  problem: string;
  solution: string;
  liveUrl: string;
  githubUrl: string;
}

const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'NeuroMesh Distributed Vector Database',
    category: 'AI & Systems',
    summary: 'A sub-millisecond semantic search engine powered by Rust SIMD vector quantization and Raft consensus replication.',
    impactMetric: '14x faster query latency than baseline HNSW indices',
    stack: ['Rust', 'SIMD', 'Raft Consensus', 'gRPC', 'WebAssembly'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    problem: 'Large enterprise embeddings search experienced high p99 latency spikes during concurrent multi-tenant clustering.',
    solution: 'Engineered an asynchronous SIMD-quantized vector indexing pipeline with zero-allocation memory pooling.',
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
  },
  {
    id: 'p2',
    title: 'PrismPulse Real-Time Financial Telemetry',
    category: 'Full-Stack',
    summary: 'High-frequency market analytics dashboard rendering 100k data points/sec with WebGL and Web Workers.',
    impactMetric: 'Maintains stable 60 FPS under 100k events/sec throughput',
    stack: ['React', 'TypeScript', 'WebGL / PixiJS', 'WebSockets', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=600&auto=format&fit=crop&q=80',
    problem: 'Standard DOM chart libraries locked the main JavaScript thread during volatile market market-maker order updates.',
    solution: 'Offloaded calculations to Web Workers and rendered candlestick charts directly via hardware-accelerated WebGL buffers.',
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
  },
  {
    id: 'p3',
    title: 'KubeSentry Zero-Trust Edge Ingress',
    category: 'Cloud / Infra',
    summary: 'Kubernetes ingress controller with integrated eBPF security filters, mTLS rotation, and automated canary deployments.',
    impactMetric: 'Zero dropped packets across 50M daily edge requests',
    stack: ['Go', 'eBPF', 'Kubernetes Operator', 'Envoy Proxy', 'OpenTelemetry'],
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80',
    problem: 'Legacy NGINX proxies suffered from slow reload cycles during rapid microservice scaling events.',
    solution: 'Created an eBPF-driven dynamic routing layer that modifies kernel socket maps without restarting proxies.',
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
  },
];

export function PortfolioTemplate() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '', budget: '$5k - $10k' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const categories = ['All', 'Full-Stack', 'AI & Systems', 'Cloud / Infra'];

  const filteredProjects = PROJECTS.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setContactForm({ name: '', email: '', message: '', budget: '$5k - $10k' });
      }, 4000);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-full font-sans pb-16">
      {/* Portfolio Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-20 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-indigo-400 font-bold">&lt;dev/&gt;</span>
            <span className="font-bold text-sm tracking-tight text-white">Julian Hayes</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Contracts
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Staff Full-Stack & Distributed Systems Engineer
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-tight mb-4">
            Building resilient cloud architectures & high-performance web systems.
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
            Specializing in high-throughput React frontends, low-latency Rust/Go backend microservices, and Kubernetes orchestration. 8+ years scaling production platforms to millions of daily users.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 transition shadow-lg shadow-indigo-600/30"
            >
              <Mail className="w-4 h-4" /> Start a Project
            </a>
            <a
              href="#projects"
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 transition"
            >
              <Code2 className="w-4 h-4" /> View Selected Work
            </a>
          </div>
        </div>

        {/* Highlight Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80">
          <div>
            <div className="text-2xl font-bold font-mono text-indigo-400">8+</div>
            <div className="text-xs text-slate-400 mt-0.5">Years Production Exp</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-emerald-400">50M+</div>
            <div className="text-xs text-slate-400 mt-0.5">Daily Requests Handled</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-sky-400">99.99%</div>
            <div className="text-xs text-slate-400 mt-0.5">System SLA Delivered</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-amber-400">12k+</div>
            <div className="text-xs text-slate-400 mt-0.5">GitHub Stars on OSS</div>
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold font-display text-white">Selected Engineering Case Studies</h2>
            <p className="text-xs text-slate-400">Real-world technical challenges, architectural designs, and measurable outcomes</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-slate-900/60 border border-slate-800/90 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition cursor-pointer flex flex-col justify-between group"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur text-indigo-300 text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded border border-indigo-500/30">
                  {project.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-indigo-400 transition mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] text-emerald-300 font-mono">
                    ⚡ {project.impactMetric}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.stack.slice(0, 3).map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded font-mono">
                        {s}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="px-1.5 py-0.5 bg-slate-800 text-slate-400 text-[10px] rounded font-mono">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Skill Matrix */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold font-display text-white mb-6">Technical Capabilities & Domains</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h4 className="font-bold text-sm text-white">Frontend Architecture</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              React 19, TypeScript, Next.js App Router, Micro-Frontends, WebGL, Web Workers, CSS Oxide.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <h4 className="font-bold text-sm text-white">Distributed Systems</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Go, Rust, gRPC, Apache Kafka, Redis Cluster, Raft Consensus, PostgreSQL optimization.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <Terminal className="w-5 h-5 text-sky-400" />
            <h4 className="font-bold text-sm text-white">Cloud & DevOps</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kubernetes, Docker, Terraform, AWS/GCP, GitHub Actions CI/CD, eBPF, OpenTelemetry.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h4 className="font-bold text-sm text-white">Security & Audits</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero-Trust Network Access, SOC2 Compliance, JWT Cryptography, OAuth2 / OIDC, Pen-testing.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Contact Form */}
      <section id="contact" className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <div className="text-center max-w-md mx-auto mb-6">
            <h2 className="text-2xl font-bold font-display text-white">Let's Build Something Exceptional</h2>
            <p className="text-xs text-slate-400 mt-1">Have a project, contract, or advisory inquiry? Send a message.</p>
          </div>

          {formSubmitted ? (
            <div className="p-6 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-white text-sm">Message Transmitted Successfully!</h4>
              <p className="text-xs text-emerald-200/80">I will review your project specs and respond within 24 business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitContact} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Estimated Scope / Budget</label>
                <select
                  value={contactForm.budget}
                  onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="$5k - $10k">$5,000 - $10,000 (Sprint MVP)</option>
                  <option value="$10k - $25k">$10,000 - $25,000 (Full Architecture & Build)</option>
                  <option value="$25k+">$25,000+ (Enterprise System Scale)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Project Details & Objectives</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Outline your application specs, expected timeline, and technical constraints..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-600/30"
              >
                <Send className="w-4 h-4" /> Send Project Inquiry
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
              Case Study • {selectedProject.category}
            </span>
            <h2 className="text-2xl font-bold font-display text-white mt-1 mb-4">
              {selectedProject.title}
            </h2>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="font-bold text-rose-400 mb-1">The Engineering Problem:</div>
                <p>{selectedProject.problem}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="font-bold text-indigo-400 mb-1">Architectural Solution:</div>
                <p>{selectedProject.solution}</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                <div className="font-bold mb-1">Measurable Outcome:</div>
                <p className="font-mono">{selectedProject.impactMetric}</p>
              </div>

              <div className="pt-2">
                <div className="font-bold text-slate-400 mb-2 uppercase text-[10px]">Technology Stack:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-slate-800 rounded-lg text-slate-200 font-mono text-xs">
                      {s}
                    </span>
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
