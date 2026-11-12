import React from 'react';
import { useProject } from '../context/ProjectContext';
import { FileText, ShieldCheck, CheckCircle2, GitPullRequest, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AmendmentHistoryPage() {
  const { project } = useProject();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="pb-3 border-b border-stone-200">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-emerald-700" />
          <h1 className="text-2xl font-black text-stone-900">Agreement Version & Amendment History</h1>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Full immutable log of all signed contract iterations. TRUSTLANCE never overwrites historical agreements.
        </p>
      </div>

      <div className="space-y-4">
        {/* Version 1: Original Agreement */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-4 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200">
            <div className="flex items-center space-x-2.5">
              <span className="px-2.5 py-1 bg-stone-100 text-stone-800 font-bold rounded-lg text-xs">
                Version 1.0 (Baseline)
              </span>
              <span className="font-bold text-stone-900 text-sm">Initial Signed Smart Agreement</span>
            </div>
            <span className="text-stone-500 font-medium">Signed: Nov 10, 2026 (Day 1)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-500">Baseline Budget:</span>
              <div className="font-bold text-stone-900 mt-0.5">$600.00 USD</div>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-500">Baseline Duration:</span>
              <div className="font-bold text-stone-900 mt-0.5">21 Days</div>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-500">Milestones:</span>
              <div className="font-bold text-stone-900 mt-0.5">4 Agreed Stages</div>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-500">Signatures:</span>
              <div className="font-bold text-emerald-700 mt-0.5">Alex Morgan & Jordan Lee</div>
            </div>
          </div>

          <p className="text-stone-600 leading-relaxed">
            Established project scope for E-commerce Website Development with 4 core milestones (UI Design, Frontend, Backend, Deployment) and the 1%/day delay deduction terms.
          </p>
        </div>

        {/* Version 2 / Amendments */}
        {project.amendments.length > 0 ? (
          project.amendments.map((amd, idx) => (
            <div
              key={amd.id || idx}
              className="bg-purple-50/60 rounded-2xl border border-purple-200 p-6 space-y-4 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-purple-200">
                <div className="flex items-center space-x-2.5">
                  <span className="px-2.5 py-1 bg-purple-100 text-purple-900 font-bold rounded-lg text-xs">
                    Version 2.0 (Amendment #1)
                  </span>
                  <span className="font-bold text-purple-950 text-sm">{amd.title}</span>
                </div>
                <span className="text-purple-700 font-medium">Mutually Approved: Day 7</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-white rounded-xl border border-purple-200">
                  <span className="text-stone-500">Added Budget:</span>
                  <div className="font-bold text-purple-900 mt-0.5">+${amd.addedBudget.toFixed(2)} USD</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-purple-200">
                  <span className="text-stone-500">Added Duration:</span>
                  <div className="font-bold text-purple-900 mt-0.5">+{amd.addedDays} Days</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-purple-200">
                  <span className="text-stone-500">New Total Budget:</span>
                  <div className="font-bold text-emerald-800 mt-0.5">${amd.newTotalBudget.toFixed(2)} USD</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-purple-200">
                  <span className="text-stone-500">New Deadline:</span>
                  <div className="font-bold text-stone-900 mt-0.5">Day {amd.newDurationDays}</div>
                </div>
              </div>

              <p className="text-purple-900 leading-relaxed">
                Client introduced Dark Mode toggle and 2 specialized promotional landing pages. AI Scope Sentinel classified as New Scope. Freelancer countered at +$110 and +3 days. Client approved amendment.
              </p>
            </div>
          ))
        ) : (
          <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 text-center text-xs text-stone-500">
            <GitPullRequest className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <div className="font-bold text-stone-700">No Scope Amendments Active</div>
            <p className="mt-1 max-w-sm mx-auto">
              When a client requests additional features, AI Scope Sentinel formulates an amendment here after mutual agreement.
            </p>
            <Link
              to="/change-request"
              className="inline-flex items-center space-x-1.5 text-emerald-800 font-bold mt-3 hover:underline"
            >
              <span>Test Submitting a Change Request</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
