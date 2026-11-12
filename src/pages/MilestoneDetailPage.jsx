import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import {
  CheckSquare,
  DollarSign,
  Calendar,
  Clock,
  Sparkles,
  UploadCloud,
  FileText,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

export default function MilestoneDetailPage() {
  const { id = 'm1' } = useParams();
  const { project } = useProject();
  const { isClient } = useAuth();

  const milestone = project.milestones.find((m) => m.id === id) || project.milestones[0];
  const delayAssessment = milestone.delayAssessment;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200">
        <div>
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-5 h-5 text-emerald-700" />
            <h1 className="text-2xl font-black text-stone-900">{milestone.title}</h1>
            <span
              className={`px-2.5 py-0.5 text-xs font-bold rounded-full uppercase ${
                milestone.status === 'submitted'
                  ? 'bg-amber-100 text-amber-800'
                  : milestone.status === 'approved'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-stone-100 text-stone-600'
              }`}
            >
              {milestone.status}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">{milestone.description}</p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/deliverable-submission"
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center space-x-1.5"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Submit Evidence</span>
          </Link>
          <Link
            to="/ai-verification"
            className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-bold rounded-lg transition-colors flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>AI Verification Report</span>
          </Link>
        </div>
      </div>

      {/* Financials & Timeline Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-card">
          <span className="text-stone-500 font-semibold">Milestone Budget</span>
          <div className="text-xl font-black text-stone-900 mt-1">${milestone.budget.toFixed(2)} USD</div>
          <div className="text-[11px] text-stone-500 mt-0.5 uppercase font-medium">
            Status: {milestone.paymentStatus}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-card">
          <span className="text-stone-500 font-semibold">Agreed Schedule</span>
          <div className="text-xl font-black text-stone-900 mt-1">Day {milestone.startDay}–{milestone.endDay}</div>
          <div className="text-[11px] text-stone-500 mt-0.5">Duration: {milestone.originalDurationDays} Days</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-card">
          <span className="text-stone-500 font-semibold">Actual Submission</span>
          <div className="text-xl font-black text-amber-900 mt-1">
            Day {milestone.actualSubmissionDay || 'Pending'}
          </div>
          <div className="text-[11px] text-red-600 font-semibold mt-0.5">
            {milestone.actualSubmissionDay ? '3 Days Delay Detected' : 'On Track'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-card">
          <span className="text-stone-500 font-semibold">Contractual Net Payable</span>
          <div className="text-xl font-black text-emerald-700 mt-1">
            ${(delayAssessment?.netPayableAmount || milestone.budget).toFixed(2)} USD
          </div>
          <div className="text-[11px] text-amber-700 font-medium mt-0.5">
            Deduction: -${(delayAssessment?.deductionAmount || 0).toFixed(2)} (3%)
          </div>
        </div>
      </div>

      {/* Acceptance Criteria & Evidence View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Acceptance Criteria (Always preserved!) */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h3 className="font-bold text-stone-900 text-sm">Contractual Acceptance Criteria</h3>
            <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded font-bold border border-emerald-200">
              Immutable Contract Baseline
            </span>
          </div>

          <div className="space-y-3">
            {milestone.acceptanceCriteria?.map((crit, idx) => (
              <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
                  {idx + 1}
                </span>
                <span className="text-stone-700 font-medium leading-relaxed">{crit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Submitted Evidence */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h3 className="font-bold text-stone-900 text-sm">Submitted Deliverable Evidence</h3>
            <span className="text-[10px] text-stone-500 font-medium">Supabase Storage</span>
          </div>

          {milestone.evidence?.length > 0 ? (
            <div className="space-y-3">
              {milestone.evidence.map((ev) => (
                <div key={ev.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="font-bold text-stone-900 flex items-center space-x-1.5">
                      <FileText className="w-4 h-4 text-emerald-700" />
                      <span>{ev.title}</span>
                    </div>
                    <p className="text-stone-500 text-[11px]">{ev.description || ev.url}</p>
                    <div className="text-[10px] text-stone-400">{ev.submittedAt}</div>
                  </div>
                  <a
                    href={ev.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-stone-400 bg-stone-50 rounded-xl border border-dashed border-stone-300">
              No evidence submitted yet.
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-stone-100 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-stone-600">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Submissions are audited by AI without triggering automatic payments.</span>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to="/ai-verification"
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg transition-colors"
          >
            Open Advisory AI Verification
          </Link>
          <Link
            to="/paypal-checkout"
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-lg transition-colors flex items-center space-x-1"
          >
            <span>PayPal Checkout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
