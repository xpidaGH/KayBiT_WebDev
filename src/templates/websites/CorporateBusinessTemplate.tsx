import React, { useState } from 'react';
import { Building2, Shield, Zap, Globe, Users, ArrowRight, ChevronDown, CheckCircle2, PhoneCall, Check, Lock, Award, Calculator, X } from 'lucide-react';

export function CorporateBusinessTemplate() {
  const [activeTab, setActiveTab] = useState<'cloud' | 'ai' | 'security'>('cloud');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [teamSize, setTeamSize] = useState(50);
  const [hourlyRate, setHourlyRate] = useState(85);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoForm, setDemoForm] = useState({ company: '', email: '', size: '50-250', requirements: '' });

  const hoursSavedPerDevWeek = 5.2;
  const annualSavings = Math.round(teamSize * hourlyRate * hoursSavedPerDevWeek * 50);

  const services = {
    cloud: {
      title: 'Autonomous Multi-Cloud Infrastructure',
      desc: 'Seamlessly distribute workloads across AWS, Google Cloud, and Azure with automated failover, intelligent edge routing, and 99.999% guaranteed uptime SLA.',
      features: ['Kubernetes Zero-Downtime Migration', 'Dynamic Multi-Region Active/Active Replication', 'FinOps Cloud Cost Optimization (-38% Avg)'],
    },
    ai: {
      title: 'Enterprise Generative AI & Retrieval (RAG)',
      desc: 'Deploy private, air-gapped Large Language Model agents with deterministic security guardrails and proprietary vector knowledge pipelines.',
      features: ['SOC2 & HIPAA Compliant AI Workspaces', 'Sub-50ms Vector Embedding Pipelines', 'Custom SLM Fine-Tuning & Quantization'],
    },
    security: {
      title: 'Zero-Trust Architecture & Continuous Compliance',
      desc: 'Protect mission-critical data with eBPF runtime observability, automated cryptographic key rotation, and automated audit logging.',
      features: ['Automated Penetration Testing AI', 'Hardware Security Module (HSM) Vaults', 'Real-time Threat Mitigation Engine'],
    },
  };

  const faqs = [
    {
      q: 'How does ApexCloud integrate with our existing legacy monolithic systems?',
      a: 'We leverage the Strangler Fig pattern to decouple critical business services into high-performance microservices incrementally without interrupting live production operations.',
    },
    {
      q: 'What compliance certifications are included with Enterprise deployments?',
      a: 'ApexCloud provides turnkey SOC 2 Type II, ISO 27001, HIPAA, and GDPR compliance validation reports with dedicated auditor access.',
    },
    {
      q: 'What is the standard SLA response time for Tier-1 Enterprise customers?',
      a: 'Tier-1 clients receive dedicated 24/7/365 access to Staff Systems Engineers with a guaranteed 15-minute response time SLA and a dedicated Slack/Teams bridge.',
    },
  ];

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
    setTimeout(() => {
      setDemoSubmitted(false);
      setIsDemoModalOpen(false);
      setDemoForm({ company: '', email: '', size: '50-250', requirements: '' });
    }, 2500);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-full font-sans pb-16">
      {/* Top Corporate Nav */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-display text-white tracking-tight">ApexCloud Solutions</h1>
              <p className="text-xs text-slate-400">Enterprise Cloud & AI Systems Architecture</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 text-xs text-slate-300 font-medium">
              <a href="#services" className="hover:text-blue-400 transition">Services</a>
              <a href="#roi" className="hover:text-blue-400 transition">ROI Calculator</a>
              <a href="#compliance" className="hover:text-blue-400 transition">Compliance</a>
              <a href="#faq" className="hover:text-blue-400 transition">FAQ</a>
            </div>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Request Consultation
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-6">
            <Award className="w-3.5 h-3.5" /> Gartner Magic Quadrant Leader for Cloud Engineering
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-tight mb-6">
            Accelerating Digital Transformation for Global Enterprises
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
            ApexCloud designs, migrates, and manages resilient cloud infrastructure and private AI platforms for Fortune 500 financial institutions, healthcare providers, and high-growth SaaS scale-ups.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition shadow-xl shadow-blue-600/30"
            >
              <span>Schedule Architecture Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#roi"
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition"
            >
              <Calculator className="w-4 h-4" /> Calculate Enterprise ROI
            </a>
          </div>
        </div>

        {/* Corporate Trust Logos */}
        <div className="mt-14 pt-8 border-t border-slate-900">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-4">
            Trusted by Engineering Leaders Worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-60 text-xs font-mono font-bold text-slate-400">
            <span>// NOVA FINANCIAL</span>
            <span>// SYNTEX HEALTH</span>
            <span>// VORTEX MOBILITY</span>
            <span>// QUANTUM LOGISTICS</span>
            <span>// AEROSPACE ZERO</span>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-14">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-bold font-display text-white">Enterprise Service Suites</h2>
          <p className="text-xs text-slate-400 mt-1">Modular solutions tailored to complex architectural scaling requirements</p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: 'cloud', label: 'Cloud Infrastructure', icon: Globe },
            { id: 'ai', label: 'Enterprise AI & Data', icon: Zap },
            { id: 'security', label: 'Cyber Resilience', icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-3">
            {services[activeTab].title}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
            {services[activeTab].desc}
          </p>

          <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            {services[activeTab].features.map((feat) => (
              <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-200">
                <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator */}
      <section id="roi" className="max-w-4xl mx-auto px-6 py-14">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 rounded-3xl p-6 sm:p-10">
          <div className="text-center mb-8">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
              Financial Impact Model
            </span>
            <h2 className="text-2xl font-bold font-display text-white mt-1">
              Estimate Engineering Efficiency & Cost Savings
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Calculate projected developer productivity unlocked through ApexCloud automation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-300">Software Engineers on Team:</span>
                  <span className="text-blue-400 font-mono font-bold">{teamSize} developers</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="5"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full accent-blue-500 bg-slate-950"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-300">Avg Blended Hourly Cost:</span>
                  <span className="text-blue-400 font-mono font-bold">${hourlyRate}/hr</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="200"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full accent-blue-500 bg-slate-950"
                />
              </div>
            </div>

            <div className="bg-slate-950 border border-blue-500/30 rounded-2xl p-6 text-center space-y-2">
              <div className="text-[11px] uppercase font-bold tracking-wider text-blue-300">
                Projected Annual Value Unlocked
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">
                ${annualSavings.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400">
                Based on 5.2 hours saved per engineer/week on CI/CD & incident triage
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Security Grid */}
      <section id="compliance" className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
            <Lock className="w-6 h-6 text-blue-400 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-white mb-1">SOC 2 Type II Certified</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Rigorous third-party security, availability, and confidentiality compliance audits.</p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
            <Shield className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-white mb-1">ISO 27001 & GDPR Ready</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Global data sovereignty and cryptographic key lifecycle compliance.</p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
            <Users className="w-6 h-6 text-sky-400 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-white mb-1">Dedicated TAM & SRE Pod</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Assigned Technical Account Manager and dedicated 15-minute SLA on-call engineers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold font-display text-white text-center mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between text-xs sm:text-sm font-semibold text-white transition"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-blue-400' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Consultation Request Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-bold font-display text-white mb-1">Schedule Enterprise Consultation</h3>
            <p className="text-xs text-slate-400 mb-6">Meet with a Principal Cloud Architect to evaluate your system roadmap.</p>

            {demoSubmitted ? (
              <div className="p-6 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-sm">Consultation Scheduled!</h4>
                <p className="text-xs text-emerald-200/80">Our lead architect will contact you within 2 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Company / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="Acme Financial Inc."
                    value={demoForm.company}
                    onChange={(e) => setDemoForm({ ...demoForm, company: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Corporate Email</label>
                  <input
                    type="email"
                    required
                    placeholder="cto@acme.com"
                    value={demoForm.email}
                    onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Engineering Organization Size</label>
                  <select
                    value={demoForm.size}
                    onChange={(e) => setDemoForm({ ...demoForm, size: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="10-50">10 - 50 Engineers</option>
                    <option value="50-250">50 - 250 Engineers</option>
                    <option value="250+">250+ Engineers (Global Enterprise)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/30"
                >
                  <PhoneCall className="w-4 h-4" /> Confirm Consultation Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
