import React, { useState } from 'react';
import { GraduationCap, Play, Pause, CheckCircle2, Circle, Award, BookOpen, Clock, ChevronRight, HelpCircle, Check, X, Sparkles, RefreshCw } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface QuizQuestion {
  id: number;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const COURSE_MODULES: Module[] = [
  {
    id: 'm1',
    title: 'Module 1: Server-Side Hydration Boundaries',
    lessons: [
      { id: 'l1', title: '1.1 Deep Dive into React 19 RSC Payload Serialization', duration: '12:40', isCompleted: true },
      { id: 'l2', title: '1.2 Suspense Streaming & Progressive HTML Chunking', duration: '15:10', isCompleted: true },
      { id: 'l3', title: '1.3 Edge Caching & Stale-While-Revalidate Headers', duration: '09:25', isCompleted: false },
    ],
  },
  {
    id: 'm2',
    title: 'Module 2: Real-time WebSockets & State Concurrency',
    lessons: [
      { id: 'l4', title: '2.1 Optimistic UI Updates with Rollback Buffers', duration: '18:00', isCompleted: false },
      { id: 'l5', title: '2.2 Raft Consensus & Distributed Heartbeat Engines', duration: '22:15', isCompleted: false },
    ],
  },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    prompt: 'What happens to module-level server dependencies (like database drivers) in React Server Components?',
    options: [
      'They are bundled into the client JavaScript runtime',
      'They execute strictly on the server and are stripped from client bundles',
      'They require an explicit eval() execution boundary',
      'They are converted to WebAssembly bytecodes',
    ],
    correctIndex: 1,
    explanation: 'RSC executes code exclusively on the server, serializing only JSON/HTML payloads to the client without exposing server npm dependencies.',
  },
  {
    id: 2,
    prompt: 'Why is optimistic concurrency control with a version column preferred over database table locks in high-traffic APIs?',
    options: [
      'It completely eliminates the need for database indexes',
      'It avoids blocking concurrent transactions, rejecting only conflicting updates with HTTP 409 Conflict',
      'It encrypts columns automatically in memory',
      'It bypasses ACID compliance guarantees',
    ],
    correctIndex: 1,
    explanation: 'Optimistic locking allows thousands of concurrent read/write streams without holding expensive table or row mutex locks.',
  },
];

export function ElearningPlatformTemplate() {
  const [modules, setModules] = useState<Module[]>(COURSE_MODULES);
  const [activeLessonId, setActiveLessonId] = useState<string>('l1');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState('04:15');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const toggleLessonComplete = (lessonId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setModules((prev) =>
      prev.map((mod) => ({
        ...mod,
        lessons: mod.lessons.map((l) =>
          l.id === lessonId ? { ...l, isCompleted: !l.isCompleted } : l
        ),
      }))
    );
  };

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.isCompleted).length,
    0
  );
  const courseProgressPct = Math.round((completedLessons / totalLessons) * 100);

  const handleSelectQuizOption = (questionId: number, optionIdx: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const calculateQuizScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) score += 1;
    });
    return score;
  };

  const currentLesson = modules.flatMap((m) => m.lessons).find((l) => l.id === activeLessonId);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-full font-sans pb-16">
      {/* Top E-learning Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm text-white font-display">SkillForge Academy</span>
              <span className="text-[10px] text-slate-400 block font-mono">
                Course: Advanced Systems & Distributed Web Architecture
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Course Progress:</span>
              <span className="text-xs font-mono font-bold text-emerald-400">{courseProgressPct}%</span>
            </div>

            <button
              onClick={() => setShowCertificate(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-emerald-600/30"
            >
              <Award className="w-4 h-4" /> View Certificate
            </button>
          </div>
        </div>
      </header>

      {/* Main Course Layout */}
      <div className="max-w-7xl mx-auto px-6 pt-6 grid lg:grid-cols-12 gap-8">
        {/* Left: Video Player & Quiz Stage */}
        <main className="lg:col-span-8 space-y-8">
          {/* Video Lecture Stage */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Video Player Mock */}
            <div className="relative aspect-video bg-slate-950 flex items-center justify-center group">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&auto=format&fit=crop&q=80"
                alt=""
                className="w-full h-full object-cover opacity-30"
              />

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-600/40 transition transform group-hover:scale-110"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>

              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur rounded-xl p-3 flex items-center justify-between text-xs text-white">
                <span className="font-semibold">{currentLesson?.title}</span>
                <span className="font-mono text-emerald-400">{playbackTime} / {currentLesson?.duration}</span>
              </div>
            </div>

            {/* Video Meta */}
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold font-display text-white">{currentLesson?.title}</h1>
                <p className="text-xs text-slate-400 mt-1">Instructor: Dr. Elena Rostova • Senior Systems Architect</p>
              </div>

              <button
                onClick={() => toggleLessonComplete(activeLessonId)}
                className={`text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition ${
                  currentLesson?.isCompleted
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{currentLesson?.isCompleted ? 'Completed ✓' : 'Mark Completed'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Knowledge Quiz */}
          <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-indigo-400" />
                  Interactive Knowledge Evaluation
                </h3>
                <p className="text-xs text-slate-400">Validate your architectural understanding with immediate grading</p>
              </div>

              {isQuizSubmitted && (
                <div className="text-right">
                  <span className="text-2xl font-extrabold font-mono text-emerald-400">
                    {calculateQuizScore()} / {QUIZ_QUESTIONS.length}
                  </span>
                  <div className="text-[11px] text-slate-400">Score ({Math.round((calculateQuizScore() / QUIZ_QUESTIONS.length) * 100)}%)</div>
                </div>
              )}
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {QUIZ_QUESTIONS.map((q, qIndex) => {
                const userAns = selectedAnswers[q.id];
                return (
                  <div key={q.id} className="space-y-3">
                    <div className="text-xs sm:text-sm font-semibold text-slate-200">
                      <span className="font-mono text-indigo-400 mr-2">Q{qIndex + 1}.</span>
                      {q.prompt}
                    </div>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAns === optIdx;
                        let btnStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300';

                        if (isQuizSubmitted) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-semibold';
                          } else if (isSelected && optIdx !== q.correctIndex) {
                            btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
                          }
                        } else if (isSelected) {
                          btnStyle = 'bg-indigo-950/80 border-indigo-500 text-indigo-200';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isQuizSubmitted}
                            onClick={() => handleSelectQuizOption(q.id, optIdx)}
                            className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {isQuizSubmitted && optIdx === q.correctIndex && (
                              <span className="text-xs text-emerald-400 font-bold font-mono">✓ Correct</span>
                            )}
                            {isQuizSubmitted && isSelected && optIdx !== q.correctIndex && (
                              <span className="text-xs text-rose-400 font-bold font-mono">✗ Incorrect</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isQuizSubmitted && (
                      <div className="text-xs bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-slate-400">
                        <strong className="text-slate-300">Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Submit Bar */}
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              {!isQuizSubmitted ? (
                <button
                  onClick={() => setIsQuizSubmitted(true)}
                  disabled={Object.keys(selectedAnswers).length < QUIZ_QUESTIONS.length}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30"
                >
                  Submit & Evaluate Quiz
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsQuizSubmitted(false);
                    setSelectedAnswers({});
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Retake Knowledge Check
                </button>
              )}
            </div>
          </section>
        </main>

        {/* Right: Course Curriculum Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 space-y-5 sticky top-20">
            <div>
              <h3 className="font-bold text-sm text-white font-display">Curriculum Syllabus</h3>
              <div className="text-xs text-slate-400 mt-1">
                {completedLessons} of {totalLessons} lessons completed
              </div>
            </div>

            {/* Modules Accordion */}
            <div className="space-y-4">
              {modules.map((mod) => (
                <div key={mod.id} className="space-y-2">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                    {mod.title}
                  </div>

                  <div className="space-y-1.5">
                    {mod.lessons.map((lesson) => {
                      const isActive = activeLessonId === lesson.id;
                      return (
                        <div
                          key={lesson.id}
                          onClick={() => setActiveLessonId(lesson.id)}
                          className={`p-3 rounded-xl border text-xs transition cursor-pointer flex items-center justify-between ${
                            isActive
                              ? 'bg-indigo-950/80 border-indigo-500/60 text-white'
                              : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 flex-1 pr-2">
                            <button
                              onClick={(e) => toggleLessonComplete(lesson.id, e)}
                              className="text-slate-500 hover:text-emerald-400"
                            >
                              {lesson.isCompleted ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Circle className="w-4 h-4" />
                              )}
                            </button>
                            <span className="line-clamp-1 font-medium">{lesson.title}</span>
                          </div>

                          <span className="text-[10px] font-mono text-slate-500 shrink-0">
                            {lesson.duration}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl max-w-xl w-full p-8 shadow-2xl relative text-center space-y-6">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-5 right-5 p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
              🏆
            </div>

            <div>
              <span className="text-xs uppercase font-mono font-bold tracking-widest text-emerald-400 block mb-1">
                Certificate of Technical Mastery
              </span>
              <h2 className="text-2xl font-bold font-display text-white">Alex Rivera</h2>
              <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto">
                Has successfully completed the advanced engineering curriculum on <strong>Distributed Systems & Web Architecture</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 flex justify-between items-center text-xs font-mono text-slate-400">
              <span>Credential ID: CRT-9481-SYS</span>
              <span>Issued: August 2026</span>
            </div>

            <button
              onClick={() => {
                alert('Certificate PDF downloaded.');
                setShowCertificate(false);
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition shadow-lg shadow-emerald-600/30"
            >
              Download Verified PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
