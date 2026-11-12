import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import {
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  UserCheck,
  AlertCircle,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

export default function AgreementReviewPage() {
  const navigate = useNavigate();
  const { project, updateProject } = useProject();
  const { currentUser, isClient } = useAuth();

  const [clientApproved, setClientApproved] = useState(true);
  const [freelancerApproved, setFreelancerApproved] = useState(true);
  const [isFinalizing, setIsFinalizing] = useState(false);

  const handleMutualSign = () => {
    setIsFinalizing(true);
    updateProject((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next.agreement.status = 'approved';
      next.agreement.approvedAt = new Date().toISOString();
      next.trustTimeline.unshift({
        id: `tl_${Date.now()}`,
        day: 1,
        timestamp: new Date().toLocaleString(),
        actor: 'Alex Morgan & Jordan Lee',
        role: 'Mutual Signature',
        type: 'agreement_approved',
        title: 'Agreement Mutually Signed & Locked',
        description: `Project terms finalized: $${next.budget.toFixed(2)} USD, ${next.durationDays} days duration, with contractual delay policies active.`,
      });
      return next;
    });

    setTimeout(() => {
      navigate('/workspace');
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-3 border-b border-stone-200">
        <div className="flex items-center space-x-2">
          <FileCheck2 className="w-5 h-5 text-emerald-700" />
          <h1 className="text-2xl font-black text-stone-900">Mutual Agreement Review & Signature</h1>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Both parties must review and digitally sign the agreement terms before work commences and escrow schedules activate.
        </p>
      </div>

      {/* Main Review Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-6 text-xs">
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
          <div>
            <div className="font-bold text-stone-900 text-sm">{project.title}</div>
            <div className="text-stone-600 mt-0.5">${project.budget.toFixed(2)} USD • {project.durationDays} Days Duration</div>
          </div>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[11px]">
            Agreement v1.0
          </span>
        </div>

        {/* Contractual Safeguards Summary */}
        <div className="space-y-2">
          <h3 className="font-bold text-stone-800 text-sm">Key Agreed Conditions:</h3>
          <ul className="space-y-1.5 text-stone-600">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Scope Lock:</strong> Deliverables strictly adhere to the 4 defined milestones and acceptance criteria.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Contractual Delay Policy:</strong> 1% deduction per attributable day for freelancer-caused delays (max 10% of affected milestone). 0% for client review lag.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Change Request Discipline:</strong> New feature requests must be estimated by AI, negotiated, and approved as formal amendments before schedule changes apply.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Payment Security:</strong> PayPal Sandbox captures occur only after client deliverable approval and deduction verification.</span>
            </li>
          </ul>
        </div>

        {/* Dual Signature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Client Sign Box */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-bold text-stone-900">Client Signature</div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                Verified Signer
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <img
                src={project.client.avatar}
                alt={project.client.fullName}
                className="w-10 h-10 rounded-full border border-stone-300 object-cover"
              />
              <div>
                <div className="font-bold text-stone-900 text-xs">{project.client.fullName}</div>
                <div className="text-[11px] text-stone-500">{project.client.company}</div>
              </div>
            </div>
            <label className="flex items-center space-x-2 text-stone-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={clientApproved}
                onChange={(e) => setClientApproved(e.target.checked)}
                className="rounded text-emerald-700 focus:ring-emerald-700 w-4 h-4"
              />
              <span className="font-semibold text-[11px]">Alex Morgan has reviewed & approved terms</span>
            </label>
          </div>

          {/* Freelancer Sign Box */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-bold text-stone-900">Freelancer Signature</div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                Verified Signer
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <img
                src={project.freelancer.avatar}
                alt={project.freelancer.fullName}
                className="w-10 h-10 rounded-full border border-stone-300 object-cover"
              />
              <div>
                <div className="font-bold text-stone-900 text-xs">{project.freelancer.fullName}</div>
                <div className="text-[11px] text-stone-500">{project.freelancer.title}</div>
              </div>
            </div>
            <label className="flex items-center space-x-2 text-stone-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={freelancerApproved}
                onChange={(e) => setFreelancerApproved(e.target.checked)}
                className="rounded text-emerald-700 focus:ring-emerald-700 w-4 h-4"
              />
              <span className="font-semibold text-[11px]">Jordan Lee has reviewed & approved terms</span>
            </label>
          </div>
        </div>

        {/* Submit Mutual Lock */}
        <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-stone-500 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Digital signatures generate immutable SHA-256 state snapshot.</span>
          </div>

          <button
            onClick={handleMutualSign}
            disabled={!clientApproved || !freelancerApproved || isFinalizing}
            className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 disabled:bg-stone-300 text-white font-bold rounded-xl transition-all shadow-sm flex items-center space-x-2 text-xs"
          >
            <span>{isFinalizing ? 'Locking Terms & Initializing Schedule...' : 'Confirm Dual Signatures & Launch'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
