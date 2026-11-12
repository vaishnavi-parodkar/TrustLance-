import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Scale,
  DollarSign,
  FileText,
} from 'lucide-react';

export default function AIVerificationReportPage() {
  const navigate = useNavigate();
  const { project } = useProject();
  const { isClient } = useAuth();

  const m1 = project.milestones[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-700" />
            <h1 className="text-2xl font-black text-stone-900">AI Deliverable Verification Report</h1>
            <span className="px-2 py-0.5 text-xs font-bold bg-purple-100 text-purple-900 rounded-full border border-purple-200">
              Advisory Audit
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Grounded against signed acceptance criteria in agreement v1.0. No hallucinated inspections.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to="/delay-attribution"
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center space-x-1.5"
          >
            <span>Proceed to Delay & Payment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Advisory Banner (Section 5 Requirement) */}
      <div className="p-3.5 bg-stone-100 border border-stone-300 rounded-xl flex items-start space-x-2.5 text-xs text-stone-700">
        <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Official Platform Policy:</strong> AI deliverable assessments are advisory. A submission does NOT automatically release funds or authorize PayPal captures. Deliverables require client review and mutual concurrence.
        </div>
      </div>

      {/* Score & Verdict Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-stone-400">EVALUATION SUMMARY</span>
          <h2 className="text-xl font-bold text-stone-900">{m1.title} Deliverables</h2>
          <p className="text-xs text-stone-500">Submitted on Day 7 by Jordan Lee (Original Deadline: Day 4)</p>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="text-3xl font-black text-emerald-700">94.5%</div>
            <div className="text-[11px] font-semibold text-stone-500 uppercase">Confidence Score</div>
          </div>
          <div className="h-10 w-px bg-stone-200 hidden sm:block"></div>
          <div className="text-center">
            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-emerald-100 text-emerald-900 font-bold rounded-full text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Criteria Passed</span>
            </div>
            <div className="text-[11px] text-stone-500 mt-1">Ready for Approval</div>
          </div>
        </div>
      </div>

      {/* Criteria Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Completed Requirements */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-card space-y-3">
          <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Completed Requirements (2/3)</span>
          </div>
          <div className="space-y-2 pt-1">
            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-stone-800 leading-relaxed">
              <strong>Mobile (390px) & Desktop (1440px) Views:</strong> All 4 templates (Home, Product Catalogue, Cart, Admin) verified in submitted Figma assets.
            </div>
            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-stone-800 leading-relaxed">
              <strong>Design Tokens & Components:</strong> Typography hierarchy, spacing scale, and color system variables defined in design system file.
            </div>
          </div>
        </div>

        {/* Partially Completed or Advisory */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-card space-y-3">
          <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>Advisory Observations (1/3)</span>
          </div>
          <div className="space-y-2 pt-1">
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-stone-800 leading-relaxed">
              <strong>Interactive Checkout Prototype:</strong> Clickable checkout preview verified; minor page transition refinement suggested during frontend build.
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-600 leading-relaxed">
              <strong>Asset Exports:</strong> SVG and PNG asset pack provided in 14.2 MB archive. Ready for frontend developers.
            </div>
          </div>
        </div>
      </div>

      {/* Client Decision Hub */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-4">
        <h3 className="font-bold text-stone-900 text-sm">Client Verification Decision</h3>
        <p className="text-xs text-stone-500">
          As Alex Morgan, choose your response to Jordan Lee's submission:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Action 1: Approve with Delay Deduction */}
          <Link
            to="/delay-attribution"
            className="p-4 rounded-xl border-2 border-emerald-600 bg-emerald-50/40 hover:bg-emerald-50 transition-all text-left space-y-2 group"
          >
            <div className="font-bold text-emerald-950 flex items-center justify-between">
              <span>Approve Deliverable</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            </div>
            <p className="text-emerald-800 text-[11px] leading-relaxed">
              Accept submitted work. Proceed to fair delay deduction (-$4.50) and net PayPal capture ($145.50).
            </p>
          </Link>

          {/* Action 2: Request Revision */}
          <Link
            to="/revision-request"
            className="p-4 rounded-xl border border-stone-200 hover:border-amber-400 bg-stone-50 hover:bg-amber-50/30 transition-all text-left space-y-2"
          >
            <div className="font-bold text-stone-900 flex items-center justify-between">
              <span>Request Corrections</span>
              <RefreshCw className="w-4 h-4 text-amber-700" />
            </div>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              Use 1 of 2 included revision rounds for in-scope defects. Does not incur additional billing.
            </p>
          </Link>

          {/* Action 3: Raise Dispute */}
          <Link
            to="/dispute-copilot"
            className="p-4 rounded-xl border border-stone-200 hover:border-rose-400 bg-stone-50 hover:bg-rose-50/30 transition-all text-left space-y-2"
          >
            <div className="font-bold text-stone-900 flex items-center justify-between">
              <span>Raise Disagreement</span>
              <Scale className="w-4 h-4 text-rose-700" />
            </div>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              Submit claims to AI Dispute Copilot for neutral, evidence-based mediation.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
