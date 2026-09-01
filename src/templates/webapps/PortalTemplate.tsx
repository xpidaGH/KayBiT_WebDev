import React, { useState } from 'react';
import { Shield, UserCheck, Lock, FileText, Download, Bell, Key, CheckCircle, AlertTriangle, QrCode, Inbox, ArrowRight, Clock } from 'lucide-react';

type UserRole = 'student' | 'faculty' | 'admin';

interface PortalUser {
  id: string;
  name: string;
  role: UserRole;
  department: string;
  accessTier: string;
}

export function PortalTemplate() {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<'overview' | 'vault' | 'inbox'>('overview');
  const [downloadingDocId, setDownloadingDocId] = useState<string | null>(null);

  const users: Record<UserRole, PortalUser> = {
    student: {
      id: 'STU-94819',
      name: 'Alex Rivera',
      role: 'student',
      department: 'Computer Science & Engineering',
      accessTier: 'Level 1: Academic & Lab Access',
    },
    faculty: {
      id: 'FAC-30124',
      name: 'Dr. Sarah Chen',
      role: 'faculty',
      department: 'Distributed Systems & AI Lab',
      accessTier: 'Level 3: Research & Grading Authority',
    },
    admin: {
      id: 'ADM-00109',
      name: 'Elena Rostova',
      role: 'admin',
      department: 'University Registrar & Security Ops',
      accessTier: 'Level 5: Super-Admin & Compliance',
    },
  };

  const currentUser = users[currentRole];

  const documents = [
    { id: 'doc-1', name: 'Official Academic Transcript (Encrypted PDF)', size: '2.4 MB', date: 'Aug 2026', roles: ['student', 'admin'] },
    { id: 'doc-2', name: 'Quarterly Grant Research Budget Allocations.xlsx', size: '5.1 MB', date: 'Jul 2026', roles: ['faculty', 'admin'] },
    { id: 'doc-3', name: 'Annual Campus Security & FERPA Audit Report.pdf', size: '14.8 MB', date: 'Jun 2026', roles: ['admin'] },
    { id: 'doc-4', name: 'Digital Student Identification Credential.pkpass', size: '380 KB', date: 'Aug 2026', roles: ['student'] },
  ];

  const filteredDocs = documents.filter((d) => d.roles.includes(currentRole));

  const handleDownload = (docId: string) => {
    setDownloadingDocId(docId);
    setTimeout(() => {
      setDownloadingDocId(null);
      alert('Secure one-time presigned cryptographic token generated. Download initialized.');
    }, 1200);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-full font-sans pb-16">
      {/* Portal Top Bar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white font-display">Aegis Secure Portal Gateway</span>
                <span className="text-[10px] bg-indigo-950 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded font-mono font-bold uppercase">
                  RBAC Active
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Session ID: sess_94fa82910d • TLS 1.3 Verified</span>
            </div>
          </div>

          {/* Interactive Persona Role Switcher for Students */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 self-start sm:self-auto">
            <span className="text-[11px] text-slate-400 font-semibold pl-2">Persona:</span>
            {(['student', 'faculty', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setCurrentRole(r)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition ${
                  currentRole === r
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 pt-6 grid lg:grid-cols-12 gap-8">
        {/* User Credential Badge Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Identity Card */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl" />

            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-indigo-400 block mb-1">
                  Verified Credential
                </span>
                <h3 className="font-bold text-lg text-white">{currentUser.name}</h3>
                <p className="text-xs text-slate-400 font-mono">{currentUser.id}</p>
              </div>
              <div className="w-12 h-12 bg-white rounded-xl p-1 flex items-center justify-center">
                <QrCode className="w-10 h-10 text-slate-950" />
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Department:</span>
                <span className="font-medium text-slate-200 text-right">{currentUser.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Access Level:</span>
                <span className="font-mono text-emerald-400">{currentUser.accessTier}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-center gap-2.5 text-[11px] text-slate-400">
              <Lock className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Multi-Factor Authentication (FIDO2 WebAuthn) Active</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3 space-y-1">
            {[
              { id: 'overview', label: 'Role Dashboard', icon: Shield },
              { id: 'vault', label: 'Encrypted Document Vault', icon: FileText },
              { id: 'inbox', label: 'Secure Dispatch Inbox', icon: Inbox },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Center Portal Content */}
        <main className="lg:col-span-8 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Role Context Announcement */}
              <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-5 flex items-start gap-4">
                <Bell className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white mb-1">
                    Logged in as {currentUser.role.toUpperCase()} Persona
                  </h4>
                  <p className="text-xs text-indigo-200/80 leading-relaxed">
                    Access privileges, document vaults, and operational controls are dynamically bounded to your authenticated JWT claims.
                  </p>
                </div>
              </div>

              {/* Persona Specific Widgets */}
              {currentRole === 'student' && (
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                    <span className="text-xs text-slate-400 uppercase font-semibold">Cumulative GPA</span>
                    <div className="text-3xl font-extrabold font-mono text-emerald-400">3.92</div>
                    <span className="text-[11px] text-slate-500">Dean's Honor List</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                    <span className="text-xs text-slate-400 uppercase font-semibold">Enrolled Units</span>
                    <div className="text-3xl font-extrabold font-mono text-indigo-400">16.0</div>
                    <span className="text-[11px] text-slate-500">4 Upper Division Courses</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                    <span className="text-xs text-slate-400 uppercase font-semibold">Student Account</span>
                    <div className="text-3xl font-extrabold font-mono text-sky-400">$0.00</div>
                    <span className="text-[11px] text-emerald-400">Tuition Cleared</span>
                  </div>
                </div>
              )}

              {currentRole === 'faculty' && (
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                    <span className="text-xs text-slate-400 uppercase font-semibold">Active Advisees</span>
                    <div className="text-3xl font-extrabold font-mono text-indigo-400">48</div>
                    <span className="text-[11px] text-slate-500">CS Senior Capstones</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                    <span className="text-xs text-slate-400 uppercase font-semibold">Pending Grades</span>
                    <div className="text-3xl font-extrabold font-mono text-amber-400">12</div>
                    <span className="text-[11px] text-amber-300">Due in 48 Hours</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                    <span className="text-xs text-slate-400 uppercase font-semibold">Grant Funding</span>
                    <div className="text-3xl font-extrabold font-mono text-emerald-400">$450k</div>
                    <span className="text-[11px] text-slate-500">NSF Distributed AI</span>
                  </div>
                </div>
              )}

              {currentRole === 'admin' && (
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                    <span className="text-xs text-slate-400 uppercase font-semibold">Active Sessions</span>
                    <div className="text-3xl font-extrabold font-mono text-emerald-400">3,492</div>
                    <span className="text-[11px] text-slate-500">Zero Security Anomalies</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                    <span className="text-xs text-slate-400 uppercase font-semibold">Audit Logs Ingest</span>
                    <div className="text-3xl font-extrabold font-mono text-cyan-400">1.2M/hr</div>
                    <span className="text-[11px] text-slate-500">SIEM Stream Healthy</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                    <span className="text-xs text-slate-400 uppercase font-semibold">Compliance Rate</span>
                    <div className="text-3xl font-extrabold font-mono text-indigo-400">100%</div>
                    <span className="text-[11px] text-emerald-400">FERPA / SOC2 Passed</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'vault' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold font-display text-white">Confidential Document Repository</h3>
                <p className="text-xs text-slate-400">Secure files available strictly to your authenticated role permissions</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl divide-y divide-slate-800 overflow-hidden">
                {filteredDocs.map((doc) => (
                  <div key={doc.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-indigo-400 shrink-0" />
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-white">{doc.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {doc.size} • Uploaded {doc.date}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownload(doc.id)}
                      disabled={downloadingDocId === doc.id}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{downloadingDocId === doc.id ? 'Verifying Token...' : 'Download'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inbox' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
              <Inbox className="w-10 h-10 text-indigo-400 mx-auto" />
              <h4 className="font-bold text-white text-sm">Encrypted Dispatch Channel</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No unread high-priority administrative dispatches for {currentUser.name} at this time.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
