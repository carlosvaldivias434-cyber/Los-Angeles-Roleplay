import React, { useState } from 'react';
import { X, Send, Bot, CheckCircle2, XCircle, AlertTriangle, UserCheck, ShieldAlert, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { STAFF_APP_QUESTIONS, ACCEPTANCE_TEMPLATE, REJECTION_TEMPLATE } from '../data/applicationQuestions';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  topBanner: string;
  bottomBanner: string;
}

export const ApplicationSimulatorModal: React.FC<Props> = ({ isOpen, onClose, topBanner, bottomBanner }) => {
  const [step, setStep] = useState<'intro' | 'questions' | 'submitted' | 'review'>('intro');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({
    1: 'ronaldoiscat (2056966914)',
    2: 'Yes, I am 13 or older',
    3: 'EST (UTC-5), 4 to 6 hours daily active on Discord',
    4: 'Yes, verified working mic',
    5: 'I was a Lead Moderator in Florida State Roleplay for 8 months and Trial Supervisor in Denver Metro RP with spotless record.',
    6: 'I admire the professionalism and high standards here. I want to contribute to a friendly and fair community while upholding regulations.',
    7: 'I stay calm under pressure, never let ego dictate decisions, and have comprehensive knowledge of ER:LC server rules and logs.',
    8: 'I immediately begin recording video proof, do not argue publicly, and privately transmit the evidence to the Internal Affairs team.',
    9: 'I de-escalate calmly, state the exact rule violation without emotion, warn them once about ticket etiquette, and escalate to Directive if harassment persists.',
    10: 'I cross-check Roblox kill logs and chat timestamps, interview both witnesses separately, and ensure no action is taken without verified proof.',
    11: 'Fail RP is doing something impossible or unrealistic in real life like driving off a cliff and continuing. Fear RP is valuing your life when held at gunpoint.',
    12: 'I will attend the first scheduled classroom training session within 48 hours and coordinate with Trainers if any timezone conflicts arise.',
    13: 'No, I am fully dedicated to this server',
    14: 'I understand and agree fully',
    15: 'Thank you for your time and consideration reviewing my application. Ready to serve!',
  });

  const [aiScore, setAiScore] = useState<{ human: number; ai: number; flagged: boolean }>({
    human: 93,
    ai: 7,
    flagged: false,
  });

  const [decision, setDecision] = useState<'pending' | 'approved' | 'denied'>('pending');

  if (!isOpen) return null;

  const currentQ = STAFF_APP_QUESTIONS[currentQIndex];

  const handleNext = () => {
    if (currentQIndex < STAFF_APP_QUESTIONS.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      // Analyze with simulated Sapling
      setStep('submitted');
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#2b2d31] border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1e1f22] border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              📝
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Private Channel: #app-ronaldoiscat</h3>
              <p className="text-xs text-slate-400">15-Question Interactive Application Flow</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {step === 'intro' && (
            <div className="space-y-4">
              <div className="bg-[#1e1f22] rounded-xl overflow-hidden border border-slate-800">
                <img src={topBanner} alt="Applications Banner" className="w-full max-h-40 object-cover" />
                <div className="p-5 space-y-3">
                  <h4 className="text-lg font-bold text-white">Staff Applications</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Interested in joining the staff team? You can get started by completing the application below. Please ensure all information you provide is accurate and detailed, as applications are carefully reviewed to select individuals who will contribute positively to the community and uphold standards.
                  </p>
                  <div className="p-3 bg-blue-950/40 rounded-lg border border-blue-500/30 text-xs text-blue-200">
                    <b>Staff Applications Requirements:</b> Applicants must be 13 years or older. You should have your Roblox username, user ID, timezone, and any other relevant details ready before applying.
                  </div>
                </div>
                <img src={bottomBanner} alt="Bottom Banner" className="w-full h-8 object-cover" />
              </div>

              <div className="bg-[#1e1f22] p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">AI Automation Bot:</div>
                  <div className="text-xs text-slate-300">"Are you ready to start your 15 questions?"</div>
                </div>
                <button
                  onClick={() => setStep('questions')}
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95"
                >
                  Start Application <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'questions' && (
            <div className="space-y-5">
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Question {currentQ.id} of {STAFF_APP_QUESTIONS.length}</span>
                <span className="text-cyan-400 font-semibold">{currentQ.category}</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-500 h-full transition-all duration-300"
                  style={{ width: `${(currentQ.id / STAFF_APP_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Bot Prompt Message */}
              <div className="bg-[#1e1f22] p-4 rounded-xl border border-slate-800 flex gap-3">
                <div className="w-9 h-9 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                  AI
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                    Staff Assistant Bot <span className="bg-[#5865f2] text-white text-[9px] px-1 rounded">APP</span>
                  </div>
                  <div className="text-sm font-semibold text-white">{currentQ.question}</div>
                  {currentQ.id === 14 && (
                    <div className="text-xs text-amber-400 italic pt-1">
                      "Are you almost done? Please double check your responses before finalizing."
                    </div>
                  )}
                </div>
              </div>

              {/* Answer Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Your Response:</label>
                {currentQ.type === 'choice' ? (
                  <div className="space-y-2">
                    {currentQ.options?.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setAnswers({ ...answers, [currentQ.id]: opt })}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                          answers[currentQ.id] === opt
                            ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200'
                            : 'bg-[#1e1f22] border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <textarea
                    rows={4}
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
                    placeholder={currentQ.placeholder}
                    className="w-full bg-[#1e1f22] border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                )}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrev}
                  disabled={currentQIndex === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <button
                  onClick={handleNext}
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1 shadow-md"
                >
                  {currentQIndex === STAFF_APP_QUESTIONS.length - 1 ? (
                    <>
                      <Send className="w-3.5 h-3.5" /> Submit to Reviewers
                    </>
                  ) : (
                    <>
                      Next Question <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'submitted' && (
            <div className="space-y-5">
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-5 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Application Submitted Successfully!</h4>
                <p className="text-xs text-slate-300">
                  Your application has been locked, sent to the High-Ranking team review channel, and analyzed via Sapling AI writing detection.
                </p>
              </div>

              {/* High Rank Reviewer Perspective Preview */}
              <div className="border border-slate-700 bg-[#1e1f22] rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Reviewer Channel View</span>
                    <span className="text-xs text-slate-400">#application-reviews</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs font-mono font-bold">
                    <Sparkles className="w-3 h-3 text-cyan-400" /> Sapling: {aiScore.human}% Human • {aiScore.ai}% AI
                  </div>
                </div>

                <div className="text-xs text-slate-300 space-y-2">
                  <div><b>Applicant:</b> @Ronaldoiscat (Discord ID: 1025813762684502168)</div>
                  <div><b>Roblox Info:</b> {answers[1]}</div>
                  <div><b>Timezone:</b> {answers[3]}</div>
                  <div><b>Experience:</b> "{answers[5]}"</div>
                  <div><b>Scenario 8 (Abuse):</b> "{answers[8]}"</div>
                  <div><b>Definitions:</b> "{answers[11]}"</div>
                </div>

                {/* Reviewer Action Buttons */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setDecision('approved');
                      setStep('review');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve (Trainee)
                  </button>
                  <button
                    onClick={() => {
                      setDecision('denied');
                      setStep('review');
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <XCircle className="w-4 h-4" /> Decline Application
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold text-slate-400">Direct Message (DM) Sent to Applicant</span>
                <button
                  onClick={() => setStep('submitted')}
                  className="text-xs text-cyan-400 hover:underline"
                >
                  ← Back to Reviewer
                </button>
              </div>

              <div className="bg-[#1e1f22] rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                <img src={topBanner} alt="Result Banner" className="w-full max-h-36 object-cover" />
                <div className="p-5 space-y-3">
                  <h4 className={`text-base font-bold ${decision === 'approved' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {decision === 'approved' ? ACCEPTANCE_TEMPLATE.title : REJECTION_TEMPLATE.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {decision === 'approved'
                      ? ACCEPTANCE_TEMPLATE.body.replace('@user', '@Ronaldoiscat')
                      : REJECTION_TEMPLATE.body.replace('@user', '@Ronaldoiscat')}
                  </p>
                </div>
                <img src={bottomBanner} alt="Bottom Strip" className="w-full h-8 object-cover" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
