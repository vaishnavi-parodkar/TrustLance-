import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import {
  FileCheck2,
  DollarSign,
  Calendar,
  CheckCircle2,
  GitPullRequest,
  ArrowRight,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { executeScenarioC } from '../services/demoDataService';

export default function ChangeRequestNegotiationPage() {
  const navigate = useNavigate();
  const { project, updateProject } = useProject();
  const { isClient, currentUser } = useAuth();

  const [counterCost, setCounterCost] = useState(110.0);
  const [counterDays, setCounterDays] = useState(3);
  const [isApproving, setIsApproving] = useState(false);

  const handleApproveAmendment = () => {
    setIsApproving(true);
    // Execute Scenario C state transition
    updateProject((prev) => executeScenarioC(prev));
    setTimeout(() => {
      navigate('/workspace');
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-3 border-b border-stone-200">
        <div className="flex items-center space-x-2">
          <GitPullRequest className="w-5 h-5 text-purple-700" />
          <h1 className="text-2xl font-black text-stone-900">Change Request Negotiation & Amendment</h1>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Review counter-proposals, agree on price & timeline adjustments, and formalize contract Amendment #1.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-6 text-xs">
        {/* Request Header */}
        <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-purple-950 text-sm">
              Scope Change: Dark Mode Theme & 2 Extra Product Landing Pages
            </span>
            <span className="px-2.5 py-0.5 bg-purple-200 text-purple-900 rounded-full font-bold text-[10px]">
              Pending Final Mutual Sign
            </span>
          </div>
          <p className="text-stone-600 text-xs">
            Client requested feature additions outside baseline 4-screen scope. AI classified as New Scope.
          </p>
        </div>

        {/* Comparison: AI Estimate vs Freelancer Counter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
            <div className="font-bold text-stone-700 flex items-center justify-between">
              <span>AI Scope Sentinel Estimate</span>
              <span className="text-[10px] text-stone-500">Advisory</span>
            </div>
            <div className="space-y-1 text-stone-600">
              <div>Suggested Cost: <strong className="text-stone-900">+$120.00 USD</strong></div>
              <div>Suggested Time: <strong className="text-stone-900">+3 Days</strong></div>
              <div className="text-[11px] text-stone-500 pt-1">Calculated based on 12 hours component styling.</div>
            </div>
          </div>

          <div className="p-4 rounded-xl border-2 border-emerald-500/80 bg-emerald-50/40 space-y-2">
            <div className="font-bold text-emerald-950 flex items-center justify-between">
              <span>Jordan Lee's Counter-Proposal</span>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded font-bold">
                Active Offer
              </span>
            </div>
            <div className="space-y-1 text-emerald-950">
              <div>Agreed Addition: <strong className="text-emerald-800 text-sm">+$110.00 USD</strong></div>
              <div>Agreed Extension: <strong className="text-stone-900 text-sm">+3 Days</strong></div>
              <div className="text-[11px] text-emerald-800 pt-1 italic font-medium">
                "I can deliver the dark mode color variables and two landing pages for +$110 within +3 days without affecting checkout."
              </div>
            </div>
          </div>
        </div>

        {/* Proposed Agreement Amendment v2.0 Summary */}
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
          <div className="font-bold text-stone-900 text-sm flex items-center space-x-2">
            <FileCheck2 className="w-4 h-4 text-emerald-700" />
            <span>Formal Contract Amendment Terms (Agreement Version 2.0)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-white rounded-lg border border-stone-200">
              <span className="text-stone-500">Original Budget:</span>
              <div className="font-bold text-stone-900">$600.00 USD</div>
            </div>
            <div className="p-3 bg-white rounded-lg border border-stone-200">
              <span className="text-stone-500">Added Scope:</span>
              <div className="font-bold text-purple-700">+$110.00 USD</div>
            </div>
            <div className="p-3 bg-white rounded-lg border border-stone-200">
              <span className="text-stone-500">New Total Budget:</span>
              <div className="font-bold text-emerald-800 text-sm">$710.00 USD</div>
            </div>
            <div className="p-3 bg-white rounded-lg border border-stone-200">
              <span className="text-stone-500">New Target Deadline:</span>
              <div className="font-bold text-stone-900 text-sm">Day 24 (24 Days)</div>
            </div>
          </div>
        </div>

        {/* Approval Action */}
        <div className="pt-2 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-stone-500 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Approving updates Bryntum Gantt and appends Amendment #1 to permanent history.</span>
          </div>

          <button
            onClick={handleApproveAmendment}
            disabled={isApproving}
            className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-all shadow-sm flex items-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isApproving ? 'Applying Amendment to Gantt...' : 'Approve Amendment & Update Schedule'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
