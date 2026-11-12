import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import {
  Sparkles,
  FileCheck2,
  DollarSign,
  Calendar,
  Layers,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Edit3,
} from 'lucide-react';

export default function AIAgreementGeneratorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { project, updateProject } = useProject();

  // Fallback data if direct navigation
  const initialData = location.state?.agreementData || {
    title: project.title,
    description: project.tagline,
    budget: project.budget,
    currency: 'USD',
    durationDays: project.durationDays,
    revisionRounds: 2,
    clientReviewDays: 2,
    delayPolicy: {
      ratePerDayPct: 1.0,
      maxCapPct: 10.0,
      terms: '1% deduction per freelancer-attributable late day, maximum 10% of affected milestone. 0% for client review lag.',
    },
    milestones: project.milestones.map((m) => ({
      order: m.order,
      title: m.title,
      budget: m.budget,
      durationDays: m.originalDurationDays,
      startDay: m.startDay,
      endDay: m.endDay,
      deliverables: m.deliverables,
      acceptanceCriteria: m.acceptanceCriteria,
    })),
    additionalWorkPolicy: 'Any feature request outside agreed acceptance criteria will be classified as New Scope requiring an approved cost/timeline amendment.',
    terminationConditions: 'Either party may terminate with 3 days written notice. Freelancer receives payment for all approved milestones.',
  };

  const [agreement, setAgreement] = useState(initialData);

  const handleProceedToReview = () => {
    updateProject((prev) => ({
      ...prev,
      title: agreement.title,
      budget: agreement.budget,
      durationDays: agreement.durationDays,
    }));
    navigate('/agreement-review', { state: { agreement } });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-700" />
            <h1 className="text-2xl font-black text-stone-900">AI Structured Smart Agreement</h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Generated via Groq LLaMA 3.3 70B & Gemini API. Review milestones, acceptance criteria, and contractual delay policies.
          </p>
        </div>

        <button
          onClick={handleProceedToReview}
          className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center space-x-2"
        >
          <span>Review & Mutual Sign</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Overview Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div>
            <h2 className="text-lg font-bold text-stone-900">{agreement.title}</h2>
            <p className="text-xs text-stone-600 mt-1">{agreement.description}</p>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold">
            Draft Agreement v1.0
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-1">
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-stone-500 font-medium">Total Budget</span>
            <div className="text-base font-bold text-stone-900 mt-0.5">${agreement.budget.toFixed(2)} USD</div>
          </div>
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-stone-500 font-medium">Project Duration</span>
            <div className="text-base font-bold text-stone-900 mt-0.5">{agreement.durationDays} Days</div>
          </div>
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-stone-500 font-medium">Included Revisions</span>
            <div className="text-base font-bold text-stone-900 mt-0.5">{agreement.revisionRounds} Rounds</div>
          </div>
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-stone-500 font-medium">Client Review SLA</span>
            <div className="text-base font-bold text-stone-900 mt-0.5">{agreement.clientReviewDays} Days</div>
          </div>
        </div>
      </div>

      {/* Contractual Delay Policy (Section 4 & 8) */}
      <div className="bg-amber-50/70 rounded-2xl border border-amber-200 p-6 space-y-3">
        <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-amber-700" />
          <span>Configurable Contractual Delay Policy</span>
        </div>
        <p className="text-xs text-amber-800 leading-relaxed">
          Both parties explicitly configure and agree to transparent delay rules before work begins:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 bg-white rounded-xl border border-amber-200">
            <span className="font-semibold text-stone-700">Freelancer-Caused Delay:</span>
            <div className="font-bold text-stone-900 mt-1">1.0% deduction per attributable day</div>
            <div className="text-[10px] text-stone-500 mt-0.5">Capped at 10% of affected milestone only</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-amber-200">
            <span className="font-semibold text-stone-700">Client-Caused Review Lag:</span>
            <div className="font-bold text-emerald-700 mt-1">0% deduction to freelancer</div>
            <div className="text-[10px] text-stone-500 mt-0.5">Schedule extends without penalty</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-amber-200">
            <span className="font-semibold text-stone-700">Mathematical Formula:</span>
            <div className="font-mono text-stone-900 font-bold mt-1">D = min(M * 0.01 * L, M * 0.10)</div>
            <div className="text-[10px] text-stone-500 mt-0.5">Authoritative deterministic math</div>
          </div>
        </div>
      </div>

      {/* Extracted Milestones & Acceptance Criteria */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-stone-900">Structured Project Milestones ({agreement.milestones.length})</h3>

        {agreement.milestones.map((m, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-stone-200 p-5 shadow-card space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200">
              <div className="flex items-center space-x-2.5">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs">
                  {m.order}
                </span>
                <span className="font-bold text-stone-900 text-sm">{m.title}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 bg-stone-100 rounded-lg text-stone-600 font-medium">
                  Day {m.startDay}–{m.endDay} ({m.durationDays} days)
                </span>
                <span className="font-bold text-emerald-800 text-sm">${m.budget.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-bold text-stone-700 block mb-1.5 uppercase text-[10px] tracking-wider">
                  Agreed Deliverables:
                </span>
                <ul className="space-y-1">
                  {m.deliverables.map((d, dIdx) => (
                    <li key={dIdx} className="text-stone-600 flex items-start space-x-1.5">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-stone-700 block mb-1.5 uppercase text-[10px] tracking-wider">
                  Concrete Acceptance Criteria:
                </span>
                <ul className="space-y-1">
                  {m.acceptanceCriteria.map((c, cIdx) => (
                    <li key={cIdx} className="text-stone-600 flex items-start space-x-1.5">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action */}
      <div className="p-4 bg-stone-100 rounded-xl flex items-center justify-between text-xs">
        <span className="text-stone-600">Original terms snapshot will be permanently hashed upon signature.</span>
        <button
          onClick={handleProceedToReview}
          className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg transition-colors flex items-center space-x-1.5"
        >
          <span>Proceed to Agreement Review</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
