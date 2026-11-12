import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import {
  Scale,
  Calendar,
  DollarSign,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  CreditCard,
} from 'lucide-react';
import PayPalCheckoutModal from '../components/paypal/PayPalCheckoutModal';

export default function DelayAttributionReportPage() {
  const navigate = useNavigate();
  const { project, updateProject } = useProject();
  const { currentUser, isClient } = useAuth();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const m1 = project.milestones[0];
  const delay = m1.delayAssessment || {
    originalDeadlineDay: 4,
    actualSubmissionDay: 7,
    totalDelayDays: 3,
    freelancerDays: 3,
    clientDays: 0,
    excusedDays: 0,
    classification: 'freelancer_caused',
    deductionPct: 3.0,
    deductionAmount: 4.5,
    netPayableAmount: 145.5,
    status: 'proposed',
  };

  const isClientCaused = delay.classification === 'client_caused';

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200">
        <div>
          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-emerald-700" />
            <h1 className="text-2xl font-black text-stone-900">Delay Attribution & Assessment Report</h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Section 8 Engine: Objective responsibility analysis and contractually accepted deduction calculation.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/payment-deduction"
            className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-bold rounded-lg transition-colors flex items-center space-x-1.5"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
            <span>Interactive Formula Math</span>
          </Link>
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center space-x-1.5"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>PayPal Sandbox Checkout (${delay.netPayableAmount.toFixed(2)})</span>
          </button>
        </div>
      </div>

      {/* Responsibility Classification Hero Card */}
      <div
        className={`rounded-2xl p-6 shadow-card border ${
          isClientCaused
            ? 'bg-blue-50/80 border-blue-200 text-blue-950'
            : 'bg-amber-50/80 border-amber-200 text-amber-950'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
              RESPONSIBILITY CLASSIFICATION
            </span>
            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isClientCaused
                    ? 'bg-blue-200 text-blue-900 border border-blue-300'
                    : 'bg-amber-200 text-amber-900 border border-amber-300'
                }`}
              >
                {isClientCaused ? 'CLIENT-CAUSED REVIEW LAG' : 'FREELANCER-CAUSED SUBMISSION DELAY'}
              </span>
              <span className="font-bold text-sm">{m1.title}</span>
            </div>
            <p className="text-xs leading-relaxed max-w-2xl pt-1">
              {delay.rationale ||
                'Milestone submitted 3 days after original deadline without client-caused delays. Evaluated per agreed 1%/day policy.'}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold block text-stone-500">Proposed Contractual Adjustment</span>
            <div
              className={`text-3xl font-black ${
                isClientCaused ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {isClientCaused ? '$0.00' : `-$${delay.deductionAmount.toFixed(2)}`}
            </div>
            <span className="text-[11px] font-semibold text-stone-600">
              {isClientCaused ? '0% (No Freelancer Penalty)' : `3.0% of $${m1.budget.toFixed(2)}`}
            </span>
          </div>
        </div>
      </div>

      {/* Formal Delay Assessment Breakdown Table (Section 8.F Specification) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-card overflow-hidden text-xs">
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <h3 className="font-bold text-stone-900 text-sm">Delay Assessment Audit Metrics</h3>
          <span className="text-stone-500 font-medium">Audited by Deterministic Math Engine</span>
        </div>

        <div className="divide-y divide-stone-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 p-4 gap-4 bg-stone-50/40">
            <div>
              <span className="text-stone-500 font-medium">Original Contract Deadline</span>
              <div className="font-bold text-stone-900 text-sm mt-0.5">Day {delay.originalDeadlineDay}</div>
            </div>
            <div>
              <span className="text-stone-500 font-medium">Actual Submission Date</span>
              <div className="font-bold text-stone-900 text-sm mt-0.5">Day {delay.actualSubmissionDay}</div>
            </div>
            <div>
              <span className="text-stone-500 font-medium">Total Delay Days</span>
              <div className="font-bold text-stone-900 text-sm mt-0.5">{delay.totalDelayDays} Days</div>
            </div>
            <div>
              <span className="text-stone-500 font-medium">Freelancer Attributable Days</span>
              <div className="font-bold text-red-700 text-sm mt-0.5">{delay.freelancerDays} Days</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 p-4 gap-4 bg-white">
            <div>
              <span className="text-stone-500 font-medium">Client Review Lag Days</span>
              <div className="font-bold text-stone-900 text-sm mt-0.5">{delay.clientDays} Days</div>
            </div>
            <div>
              <span className="text-stone-500 font-medium">Excused / External Days</span>
              <div className="font-bold text-stone-900 text-sm mt-0.5">{delay.excusedDays} Days</div>
            </div>
            <div>
              <span className="text-stone-500 font-medium">Disputed Delay Days</span>
              <div className="font-bold text-stone-900 text-sm mt-0.5">{delay.disputedDays || 0} Days</div>
            </div>
            <div>
              <span className="text-stone-500 font-medium">Contract Rate per Late Day</span>
              <div className="font-bold text-stone-900 text-sm mt-0.5">1.0% / Day</div>
            </div>
          </div>

          {/* Financial Calculation Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 p-4 gap-4 bg-emerald-50/50">
            <div>
              <span className="text-stone-600 font-medium">Gross Milestone Budget</span>
              <div className="font-black text-stone-900 text-base mt-0.5">${m1.budget.toFixed(2)} USD</div>
            </div>
            <div>
              <span className="text-amber-800 font-medium">Approved Delay Adjustment</span>
              <div className="font-black text-amber-700 text-base mt-0.5">
                -${delay.deductionAmount.toFixed(2)} USD ({delay.deductionPct}%)
              </div>
            </div>
            <div>
              <span className="text-emerald-800 font-medium">Net Payable to Jordan Lee</span>
              <div className="font-black text-emerald-800 text-lg mt-0.5">
                ${delay.netPayableAmount.toFixed(2)} USD
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting Audit Evidence */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-4 text-xs">
        <h3 className="font-bold text-stone-900 text-sm">Supporting Audit Evidence & Verification Logs</h3>

        <div className="space-y-2">
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start justify-between">
            <div>
              <span className="font-bold text-stone-900">1. Original Contract Deadline Verification:</span>
              <p className="text-stone-600 mt-0.5">
                Agreed contract version 1.0 explicitly recorded Milestone 1 delivery for Day 4 (Nov 14).
              </p>
            </div>
            <span className="text-stone-400 font-mono text-[10px]">VERIFIED</span>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start justify-between">
            <div>
              <span className="font-bold text-stone-900">2. Submission Timestamp Audit:</span>
              <p className="text-stone-600 mt-0.5">
                Supabase Storage evidence upload timestamped at Day 7, 03:30 PM (72 hours past deadline).
              </p>
            </div>
            <span className="text-stone-400 font-mono text-[10px]">VERIFIED</span>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start justify-between">
            <div>
              <span className="font-bold text-stone-900">3. Client Review Window SLA Verification:</span>
              <p className="text-stone-600 mt-0.5">
                Client provided all initial brand assets on Day 1. No documented feedback holds during Days 1–4.
              </p>
            </div>
            <span className="text-stone-400 font-mono text-[10px]">VERIFIED</span>
          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-stone-500 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>AI recommends the deduction; client must explicitly confirm during checkout.</span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-all shadow-sm flex items-center space-x-2 text-xs"
          >
            <span>Confirm Adjustment & Pay via PayPal (${delay.netPayableAmount.toFixed(2)})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PayPal Checkout Modal */}
      <PayPalCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        milestone={m1}
        onPaymentSuccess={() => {
          setIsCheckoutOpen(false);
          navigate('/transactions');
        }}
      />
    </div>
  );
}
