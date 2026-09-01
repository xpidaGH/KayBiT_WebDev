import React, { useState } from 'react';
import { Kanban, Plus, User, CheckCircle2, Clock, AlertTriangle, Filter, ChevronRight, ChevronLeft, MoreHorizontal, X } from 'lucide-react';

export type TaskStatus = 'backlog' | 'in_progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  assignee: string;
  storyPoints: number;
  tag: string;
}

const INITIAL_TASKS: Task[] = [
  { id: 'ENG-101', title: 'Implement OAuth2 PKCE Refresh Token Exchange', status: 'backlog', priority: 'high', assignee: 'Alex', storyPoints: 5, tag: 'Auth' },
  { id: 'ENG-102', title: 'Optimize Postgres Indexing for Multi-Tenant Query Planner', status: 'in_progress', priority: 'urgent', assignee: 'Sarah', storyPoints: 8, tag: 'Database' },
  { id: 'ENG-103', title: 'Design System Typography & Elevation Audit', status: 'review', priority: 'medium', assignee: 'Jordan', storyPoints: 3, tag: 'Design' },
  { id: 'ENG-104', title: 'Configure Edge CDN Stale-While-Revalidate Purge Hooks', status: 'done', priority: 'low', assignee: 'Elena', storyPoints: 2, tag: 'Infra' },
  { id: 'ENG-105', title: 'Add eBPF Socket Filter for Zero-Downtime Proxies', status: 'in_progress', priority: 'high', assignee: 'Alex', storyPoints: 5, tag: 'Infra' },
  { id: 'ENG-106', title: 'Unit Tests for Stripe Idempotency Key Recovery', status: 'backlog', priority: 'medium', assignee: 'Sarah', storyPoints: 3, tag: 'Billing' },
];

export function ProjectManagementTemplate() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'urgent' | 'high' | 'medium' | 'low'>('high');
  const [newTaskAssignee, setNewTaskAssignee] = useState('Alex');
  const [newTaskPoints, setNewTaskPoints] = useState(3);
  const [newTaskTag, setNewTaskTag] = useState('Core');
  const [filterAssignee, setFilterAssignee] = useState<string>('All');

  const columns: { key: TaskStatus; label: string; color: string; border: string }[] = [
    { key: 'backlog', label: 'Backlog', color: 'bg-slate-800 text-slate-300', border: 'border-t-slate-600' },
    { key: 'in_progress', label: 'In Progress', color: 'bg-amber-950/80 text-amber-300', border: 'border-t-amber-500' },
    { key: 'review', label: 'Code Review', color: 'bg-indigo-950/80 text-indigo-300', border: 'border-t-indigo-500' },
    { key: 'done', label: 'Done', color: 'bg-emerald-950/80 text-emerald-300', border: 'border-t-emerald-500' },
  ];

  const moveTask = (taskId: string, targetStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: targetStatus } : t))
    );
  };

  const advanceTask = (taskId: string) => {
    const order: TaskStatus[] = ['backlog', 'in_progress', 'review', 'done'];
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const currentIndex = order.indexOf(t.status);
          const nextStatus = order[Math.min(order.length - 1, currentIndex + 1)];
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const regressedTask = (taskId: string) => {
    const order: TaskStatus[] = ['backlog', 'in_progress', 'review', 'done'];
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const currentIndex = order.indexOf(t.status);
          const prevStatus = order[Math.max(0, currentIndex - 1)];
          return { ...t, status: prevStatus };
        }
        return t;
      })
    );
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `ENG-${Math.floor(Math.random() * 800) + 100}`,
      title: newTaskTitle,
      status: 'backlog',
      priority: newTaskPriority,
      assignee: newTaskAssignee,
      storyPoints: Number(newTaskPoints),
      tag: newTaskTag,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setIsNewTaskOpen(false);
  };

  const filteredTasks = tasks.filter(
    (t) => filterAssignee === 'All' || t.assignee === filterAssignee
  );

  const totalPoints = tasks.reduce((sum, t) => sum + t.storyPoints, 0);
  const completedPoints = tasks
    .filter((t) => t.status === 'done')
    .reduce((sum, t) => sum + t.storyPoints, 0);
  const sprintProgress = Math.round((completedPoints / (totalPoints || 1)) * 100);

  const priorityColors = {
    urgent: 'bg-rose-950 text-rose-400 border-rose-500/30',
    high: 'bg-amber-950 text-amber-400 border-amber-500/30',
    medium: 'bg-blue-950 text-blue-400 border-blue-500/30',
    low: 'bg-slate-800 text-slate-400 border-slate-700',
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-full font-sans pb-16">
      {/* Project Management Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-amber-500/20">
              <Kanban className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm text-white font-display">SprintFlow Agile Workspace</span>
              <span className="text-[10px] text-slate-400 font-mono block">Sprint 24 • Ends in 4 days</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="All">All Assignees</option>
              <option value="Alex">Alex</option>
              <option value="Sarah">Sarah</option>
              <option value="Jordan">Jordan</option>
              <option value="Elena">Elena</option>
            </select>

            <button
              onClick={() => setIsNewTaskOpen(true)}
              className="bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-amber-600/30"
            >
              <Plus className="w-4 h-4" /> Create Task
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-6 space-y-6">
        {/* Sprint Velocity Header Banner */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white">Sprint 24: Core Infrastructure & Auth Engine</h2>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              Completed {completedPoints} of {totalPoints} Story Points ({sprintProgress}%)
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-64">
            <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-500"
                style={{ width: `${sprintProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">{sprintProgress}%</span>
          </div>
        </div>

        {/* 4 Column Kanban Board */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.key);
            return (
              <div
                key={col.key}
                className={`bg-slate-900/60 border border-slate-800 border-t-4 ${col.border} rounded-2xl p-4 flex flex-col min-h-[500px]`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/80">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-200">
                    {col.label}
                  </span>
                  <span className="text-xs font-mono font-bold bg-slate-800 px-2 py-0.5 rounded-full text-slate-400">
                    {colTasks.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-3 flex-1">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition space-y-3 group shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-semibold text-slate-400">
                          {task.id}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded border ${
                            priorityColors[task.priority]
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      <h4 className="text-xs font-semibold text-slate-100 leading-snug">
                        {task.title}
                      </h4>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[11px]">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                            {task.assignee[0]}
                          </span>
                          <span>{task.assignee}</span>
                        </div>
                        <span className="font-mono text-amber-400 font-bold">
                          {task.storyPoints} pts
                        </span>
                      </div>

                      {/* Interactive Stage Move Controls */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-900">
                        <button
                          disabled={task.status === 'backlog'}
                          onClick={() => regressedTask(task.id)}
                          className="p-1 rounded bg-slate-900 text-slate-400 hover:text-white disabled:opacity-30 text-xs"
                          title="Move Back"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>

                        <span className="text-[10px] text-slate-500 font-mono capitalize">
                          {task.status.replace('_', ' ')}
                        </span>

                        <button
                          disabled={task.status === 'done'}
                          onClick={() => advanceTask(task.id)}
                          className="p-1 rounded bg-slate-900 text-slate-400 hover:text-white disabled:opacity-30 text-xs"
                          title="Advance Stage"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Task Modal */}
      {isNewTaskOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsNewTaskOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold font-display text-white mb-1">Create Sprint Task</h3>
            <p className="text-xs text-slate-400 mb-4">Add a new ticket to the engineering backlog</p>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Task Summary</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement Webhook retry backoff algorithm"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Assignee</label>
                  <select
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Alex">Alex</option>
                    <option value="Sarah">Sarah</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Elena">Elena</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Story Points (Fibonacci)</label>
                <input
                  type="number"
                  min="1"
                  max="13"
                  value={newTaskPoints}
                  onChange={(e) => setNewTaskPoints(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-lg shadow-amber-600/30"
              >
                <Plus className="w-4 h-4" /> Add Task to Backlog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
