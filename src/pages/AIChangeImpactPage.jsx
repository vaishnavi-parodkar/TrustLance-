import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import {
  TrendingUp,
  Sparkles,
  DollarSign,
  Calendar,
  Clock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function AIChangeImpactPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { project } = useProject();

  const changeRequest = location.state?.changeRequest || project.changeRequests[0];
  const analysis = changeRequest?.aiAnalysis || {
    classification: 'new_scope',
    reasoning: 'The client requests features (Dark Mode toggle and 2 additional page templates) not defined in the 4-screen approved agreement.',
    estimatedHours: 12,
    estimatedCost: 120.0,
    estimatedDays: 3,
    action: 'Formulate an Agreement Amendment with proposed +$120 budget and +3 days schedule adjustment for mutual approval.',
  };

  const isNewScope = analysis.classification === 'new_scope';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-3 border-b border-stone-200">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-purple-700" />
          <h1 className="text-2xl font-black text-stone-900">AI Change Impact & Scope Classification</h1>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Objective evaluation comparing client request against original agreement v1.0.
        </p>
      </div>

      {/* Scope Classification Verdict Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-5 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">CLASSIFICATION RESULT</span>
            <div className="flex items-center space-x-2 mt-1">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isNewScope
                    ? 'bg-purple-100 text-purple-900 border border-purple-300'
                    : 'bg-blue-100 text-blue-900 border border-blue-300'
                }`}
              >
                {isNewScope ? 'CATEGORY B: NEW SCOPE' : 'CATEGORY A: IN-SCOPE CORRECTION'}
              </span>
              <span className="font-bold text-stone-900 text-sm">{changeRequest.title}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-stone-400 text-[10px] block">TARGET MILESTONE</span>
            <span className="font-bold text-stone-800">UI Design & Frontend</span>
          </div>
        </div>

        {/* AI Rationale & Comparison */}
        <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-200 space-y-2">
          <div className="flex items-center space-x-2 text-purple-900 font-bold">
            <Sparkles className="w-4 h-4 text-purple-700" />
            <span>AI Reasoning & Contractual Baseline Comparison</span>
          </div>
          <p className="text-stone-700 leading-relaxed font-medium">
            {analysis.reasoning}
          </p>
        </div>

        {/* Impact Estimations */}
        {isNewScope ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-500 font-semibold flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-purple-700" />
                <span>Estimated Effort</span>
              </span>
              <div className="text-xl font-black text-stone-900 mt-1">{analysis.estimatedHours} Hours</div>
              <div className="text-[10px] text-stone-500 mt-0.5">Component & token engineering</div>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-500 font-semibold flex items-center space-x-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                <span>Suggested Cost Impact</span>
              </span>
              <div className="text-xl font-black text-emerald-800 mt-1">+${analysis.estimatedCost.toFixed(2)} USD</div>
              <div className="text-[10px] text-stone-500 mt-0.5">Fair market hourly rate basis</div>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-500 font-semibold flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-blue-700" />
                <span>Suggested Schedule Impact</span>
              </span>
              <div className="text-xl font-black text-stone-900 mt-1">+{analysis.estimatedDays} Days</div>
              <div className="text-[10px] text-stone-500 mt-0.5">Requires mutual amendment</div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-medium">
            This request targets an unfulfilled acceptance criterion from the signed agreement. It is marked as an in-scope correction ($0 extra billing, 0 days schedule extension).
          </div>
        )}

        {/* Action Safeguard Note */}
        <div className="p-3 bg-stone-100 rounded-xl text-stone-600 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            <strong>Safe Contract Rule:</strong> Bryntum Gantt timelines will NOT be altered until both Alex Morgan and Jordan Lee formally approve the amendment.
          </span>
        </div>

        {/* Proceed Action */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => navigate('/change-negotiation', { state: { changeRequest } })}
            className="px-6 py-3 bg-purple-900 hover:bg-purple-950 text-white font-bold rounded-xl transition-all shadow-sm flex items-center space-x-2"
          >
            <span>Proceed to Negotiation & Mutual Approval</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
