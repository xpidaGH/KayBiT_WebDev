import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, Zap, Shield, GitBranch, Cpu, Clock, Check, X, Star } from 'lucide-react';

export function LandingPageTemplate() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [email, setEmail] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  // Live countdown timer for early-bird launch
  const [timeLeft, setTimeLeft] = useState({ hours: 48, minutes: 22, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setIsJoined(true);
    }
  };

  const pricingTiers = [
    {
      name: 'Developer',
      priceMonthly: 19,
      priceAnnual: 15,
      description: 'Ideal for independent engineers and hobby builders.',
      features: ['Up to 5 Microservice Workspaces', '100k Monthly Edge Invocations', 'Community Discord Access', '7-Day Log Retention'],
      popular: false,
    },
    {
      name: 'Team Pro',
      priceMonthly: 49,
      priceAnnual: 39,
      description: 'For fast-moving engineering teams scaling production apps.',
      features: ['Unlimited Workspaces', '5M Monthly Edge Invocations', 'Real-time WebSocket Debugger', '30-Day Audit Log Retention', 'Dedicated Priority Support'],
      popular: true,
    },
    {
      name: 'Enterprise',
      priceMonthly: 129,
      priceAnnual: 99,
      description: 'Custom security controls, SSO, and dedicated SLA pods.',
      features: ['Custom Invocations & Zero-Throttle', 'SAML 2.0 / Okta SSO & SCIM', 'SOC2 Compliance Attestation', 'Air-Gapped Private VPC Deployment', '99.99% Uptime SLA'],
      popular: false,
    },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-full font-sans pb-16">
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-3">
        <span>🚀 <strong>v3.0 Launch Special:</strong> Save 20% + Get 3 Months Free</span>
        <div className="flex items-center gap-1 font-mono font-bold bg-black/30 px-2 py-0.5 rounded text-[11px]">
          <Clock className="w-3 h-3" />
          <span>{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Nav */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-20 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              ⚡
            </div>
            <span className="font-bold text-base font-display text-white">DevSync Pro</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#pricing"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-lg shadow-indigo-600/20"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Next-Generation CI/CD & Local Microservice Orchestrator
        </div>

        <h1 className="text-3xl sm:text-6xl font-extrabold font-display text-white tracking-tight leading-tight mb-6 max-w-4xl mx-auto">
          Synchronize your microservices in milliseconds, not minutes.
        </h1>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8">
          Eliminate "works on my machine" bottlenecks. DevSync Pro spins up ephemeral staging environments with live hot-reloading and instant remote database mirroring.
        </p>

        {/* Lead Capture Form */}
        <div className="max-w-md mx-auto mb-10">
          {isJoined ? (
            <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              You're on the early access priority list! Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleJoin} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your work email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 flex-1"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition shrink-0 shadow-lg shadow-indigo-600/30"
              >
                Claim Access <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
          <p className="text-[11px] text-slate-500 mt-2">Free 14-day trial • No credit card required • Instant setup</p>
        </div>

        {/* Social Proof Stars */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span>Rated <strong>4.9/5</strong> by 2,400+ engineering teams</span>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Instant Staging Preview URLs</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every git branch automatically deploys an isolated preview container with isolated databases and edge TLS routing.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Zero-Config Docker Composition</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Auto-detects docker-compose.yml, helm charts, and Kubernetes manifests without requiring proprietary configuration scripts.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Enterprise Vault Security</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              End-to-end encrypted secret variables injected directly into memory without exposing sensitive keys to local disks.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section with Toggle */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-14">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Simple, Predictable Pricing</h2>
          <p className="text-xs text-slate-400 mt-1">Start free, scale seamlessly with your engineering team</p>

          {/* Monthly / Annual Toggle */}
          <div className="inline-flex items-center gap-3 bg-slate-900 border border-slate-800 p-1.5 rounded-full mt-6">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                !isAnnual ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 ${
                isAnnual ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative ${
                tier.popular
                  ? 'bg-slate-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/10'
                  : 'bg-slate-900/60 border border-slate-800'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-lg font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{tier.description}</p>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                    ${isAnnual ? tier.priceAnnual : tier.priceMonthly}
                  </span>
                  <span className="text-xs text-slate-400">/dev/month</span>
                </div>

                <div className="space-y-2.5 my-6">
                  {tier.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={`w-full py-2.5 rounded-xl text-xs font-semibold transition ${
                  tier.popular
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                Start 14-Day Free Trial
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
