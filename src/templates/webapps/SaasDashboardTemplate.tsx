import React, { useState } from 'react';
import { Activity, Key, Users, CreditCard, Shield, Plus, Copy, Check, Trash2, TrendingUp, AlertCircle, RefreshCw, BarChart3, Clock, X } from 'lucide-react';

interface ApiKeyItem {
  id: string;
  name: string;
  prefix: string;
  role: 'read-only' | 'full-access';
  createdAt: string;
  lastUsed: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Developer';
  status: 'Active' | 'Pending';
}

export function SaasDashboardTemplate() {
  const [activeTab, setActiveTab] = useState<'metrics' | 'apikeys' | 'team' | 'billing'>('metrics');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  // API Key State
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([
    { id: '1', name: 'Production Kubernetes Cluster', prefix: 'sk_live_9f824190...', role: 'full-access', createdAt: 'Aug 10, 2026', lastUsed: '2 mins ago' },
    { id: '2', name: 'Staging Edge Ingress', prefix: 'sk_test_41a02931...', role: 'read-only', createdAt: 'Aug 22, 2026', lastUsed: '3 hours ago' },
  ]);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyRole, setNewKeyRole] = useState<'read-only' | 'full-access'>('full-access');
  const [createdSecret, setCreatedSecret] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  // Team State
  const [members, setMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Alex Rivera (You)', email: 'alex@company.com', role: 'Owner', status: 'Active' },
    { id: '2', name: 'Sarah Chen', email: 'sarah@company.com', role: 'Admin', status: 'Active' },
    { id: '3', name: 'Devon Vance', email: 'devon@company.com', role: 'Developer', status: 'Active' },
  ]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Admin' | 'Developer'>('Developer');

  const handleCreateApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    const randomHex = Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12);
    const fullSecret = `sk_live_${randomHex}`;
    const newKey: ApiKeyItem = {
      id: Date.now().toString(),
      name: newKeyName,
      prefix: `sk_live_${randomHex.substring(0, 8)}...`,
      role: newKeyRole,
      createdAt: 'Just now',
      lastUsed: 'Never',
    };
    setApiKeys([newKey, ...apiKeys]);
    setCreatedSecret(fullSecret);
    setNewKeyName('');
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id));
  };

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteEmail.includes('@')) {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: inviteRole,
        status: 'Pending',
      };
      setMembers([...members, newMember]);
      setIsInviteModalOpen(false);
      setInviteEmail('');
    }
  };

  const metricsData = {
    '24h': { requests: '1.42M', latency: '34ms', errors: '0.012%', quotaPct: 68 },
    '7d': { requests: '9.85M', latency: '38ms', errors: '0.018%', quotaPct: 78 },
    '30d': { requests: '41.2M', latency: '42ms', errors: '0.025%', quotaPct: 91 },
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-full font-sans pb-16">
      {/* SaaS App Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
              ⚡
            </div>
            <div>
              <span className="font-bold text-sm text-white font-display">CloudPulse Engine</span>
              <span className="text-[10px] text-slate-400 block font-mono">Workspace: production-us-east</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-mono text-[11px]">All Systems Operational</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main SaaS Workspace */}
      <div className="max-w-7xl mx-auto px-6 pt-6 grid lg:grid-cols-12 gap-8">
        {/* SaaS Sub-Nav Sidebar */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3 space-y-1">
            {[
              { id: 'metrics', label: 'Live Telemetry', icon: Activity },
              { id: 'apikeys', label: 'API Credentials', icon: Key },
              { id: 'team', label: 'Team & RBAC Seats', icon: Users },
              { id: 'billing', label: 'Usage & Quota', icon: CreditCard },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                    activeTab === tab.id
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Plan Summary Widget */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Current Tier:</span>
              <span className="text-cyan-400 font-bold font-mono">Scale Pro</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Monthly Quota</span>
                <span className="font-mono text-white">{metricsData[timeRange].quotaPct}% used</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-cyan-500 h-full transition-all duration-500"
                  style={{ width: `${metricsData[timeRange].quotaPct}%` }}
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Dynamic SaaS Main Content Area */}
        <main className="lg:col-span-9 space-y-6">
          {/* TAB 1: METRICS & TELEMETRY */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              {/* Header & Time Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">System Telemetry & Health</h2>
                  <p className="text-xs text-slate-400">Real-time edge ingestion rates and latency percentiles</p>
                </div>

                <div className="flex gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
                  {(['24h', '7d', '30d'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setTimeRange(r)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition ${
                        timeRange === r ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metric Stat Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
                  <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Total Requests</span>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">
                    {metricsData[timeRange].requests}
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                    <TrendingUp className="w-3 h-3" /> +14.2% vs prev period
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
                  <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">P99 Edge Latency</span>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                    {metricsData[timeRange].latency}
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                    ⚡ Sub-50ms target met
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
                  <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Error Rate (5xx)</span>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
                    {metricsData[timeRange].errors}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Target SLA: &lt; 0.05%
                  </div>
                </div>
              </div>

              {/* Chart Visualizer Simulation */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                    Request Throughput Histogram ({timeRange})
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">Live 10-sec poll</span>
                </div>

                <div className="h-44 flex items-end gap-2 pt-6 px-2 border-b border-slate-800">
                  {[45, 60, 75, 50, 80, 95, 70, 85, 90, 65, 88, 92, 100, 84, 76, 91].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                      <div
                        className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t group-hover:brightness-125 transition-all duration-300"
                        style={{ height: `${val}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Start of Period</span>
                  <span>Mid Interval</span>
                  <span>Real-time Now</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: API CREDENTIALS */}
          {activeTab === 'apikeys' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold font-display text-white">API Key Governance</h2>
                <p className="text-xs text-slate-400">Generate, scope, and revoke programmatic keys</p>
              </div>

              {/* One-Time Secret Banner */}
              {createdSecret && (
                <div className="bg-amber-950/80 border border-amber-500/50 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                    <AlertCircle className="w-4 h-4" /> Save your secret token immediately!
                  </div>
                  <p className="text-[11px] text-amber-200/80">
                    For cryptographic security, this full token will never be displayed again.
                  </p>
                  <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-amber-500/30">
                    <code className="text-xs text-emerald-400 font-mono flex-1 break-all">{createdSecret}</code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(createdSecret);
                        setCopiedKey(true);
                        setTimeout(() => setCopiedKey(false), 2000);
                      }}
                      className="bg-amber-600 hover:bg-amber-500 text-white text-xs px-3 py-1.5 rounded-lg font-semibold transition"
                    >
                      {copiedKey ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={() => setCreatedSecret(null)}
                      className="text-xs text-slate-400 hover:text-white px-2"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}

              {/* Create Key Form */}
              <form onSubmit={handleCreateApiKey} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  placeholder="Key Identifier (e.g. CI/CD Production Deployer)"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 flex-1"
                />
                <select
                  value={newKeyRole}
                  onChange={(e) => setNewKeyRole(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="full-access">Full Access (Read/Write)</option>
                  <option value="read-only">Read Only (Telemetry Query)</option>
                </select>
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 transition shadow-lg shadow-cyan-600/30"
                >
                  <Plus className="w-4 h-4" /> Create Key
                </button>
              </form>

              {/* Active Keys Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800">
                {apiKeys.map((k) => (
                  <div key={k.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{k.name}</span>
                        <span className="text-[10px] bg-slate-800 text-cyan-400 font-mono px-2 py-0.5 rounded uppercase font-bold">
                          {k.role}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-slate-400 mt-1">{k.prefix}</div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Created {k.createdAt} • Last used {k.lastUsed}
                      </div>
                    </div>

                    <button
                      onClick={() => handleRevokeKey(k.id)}
                      className="text-rose-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-1 self-start sm:self-center"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Revoke Key
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TEAM & SEATS */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">Team Members & RBAC</h2>
                  <p className="text-xs text-slate-400">Manage workspace permissions and seat invitations</p>
                </div>
                <button
                  onClick={() => setIsInviteModalOpen(true)}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-cyan-600/30"
                >
                  <Plus className="w-4 h-4" /> Invite Member
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800">
                {members.map((m) => (
                  <div key={m.id} className="p-4 sm:p-5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-white">{m.name}</div>
                      <div className="text-xs text-slate-400 font-mono">{m.email}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-slate-800 text-slate-300 font-semibold px-2.5 py-1 rounded-lg">
                        {m.role}
                      </span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded font-mono ${
                        m.status === 'Active' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                      }`}>
                        {m.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BILLING & USAGE */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold font-display text-white">Usage & Quotas</h2>
                <p className="text-xs text-slate-400">Track current month consumption against subscription thresholds</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">API Request Quota</span>
                    <span className="font-mono text-cyan-400 font-bold">3.9M / 5.0M</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div className="bg-cyan-500 h-full" style={{ width: '78%' }} />
                  </div>
                  <p className="text-[11px] text-slate-400">Resets automatically on the 1st of next month.</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">Database Egress</span>
                    <span className="font-mono text-emerald-400 font-bold">142 GB / 500 GB</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: '28%' }} />
                  </div>
                  <p className="text-[11px] text-slate-400">Standard Tier-1 global multi-region caching active.</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Invite Member Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsInviteModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold font-display text-white mb-1">Invite Workspace Teammate</h3>
            <p className="text-xs text-slate-400 mb-4">Send a secure invite link with designated role permissions.</p>

            <form onSubmit={handleInviteMember} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Teammate Email</label>
                <input
                  type="email"
                  required
                  placeholder="developer@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Role & Permissions</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Developer">Developer (Deploy & Read API Keys)</option>
                  <option value="Admin">Admin (Full Workspace Management)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-lg shadow-cyan-600/30"
              >
                Send Workspace Invite
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
