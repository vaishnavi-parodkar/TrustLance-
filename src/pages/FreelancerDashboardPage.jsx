import React from 'react';
import { Link } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import {
  FolderGit2,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UploadCloud,
  CheckCircle2,
  GitPullRequest,
  Scale,
} from 'lucide-react';

export default function FreelancerDashboardPage() {
  const { project } = useProject();
  const { currentUser } = useAuth();

  const m1 = project.milestones[0];
  const delayAssessment = m1.delayAssessment;

  return (
    <div className="space-y-6">
      {/* Top Welcome Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-stone-900">Freelancer Workspace Hub</h1>
            <span className="px-2 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
              Jordan Lee
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Tracking milestones, schedule recovery, deliverable verification, and PayPal payments.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/deliverable-submission"
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center space-x-1.5"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Submit Deliverables</span>
          </Link>
          <Link
            to="/schedule-recovery"
            className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-bold rounded-lg transition-colors flex items-center space-x-1.5"
          >
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            <span>Recovery Plan</span>
          </Link>
        </div>
      </div>

      {/* AI Schedule Recovery & Fair Deduction Notice */}
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl mt-0.5">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-emerald-950 text-sm">
                  AI Schedule Recovery: Day 21 Target Preserved
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded-full">
                  Parallel Track Active
                </span>
              </div>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed max-w-2xl">
                Although UI Design was delivered 3 days late, the AI Schedule Recovery Engine determined that
                <strong> Frontend Development (Day 8–13)</strong> and <strong>Backend Integration (Day 12–18)</strong> can overlap safely.
                Under the contractual delay policy, a <strong>3% deduction (-$4.50)</strong> applies to this milestone.
                Your net payable amount upon client approval is <strong>$145.50</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <Link
              to="/schedule-recovery"
              className="px-3.5 py-2 bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg text-xs font-bold transition-colors"
            >
              View Recovery Schedule
            </Link>
            <Link
              to="/payment-deduction"
              className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
            >
              Verify Deduction Math
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-card">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Expected Net Earnings</span>
            <DollarSign className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="mt-2 text-2xl font-black text-stone-900">
            ${(project.budget - (delayAssessment?.deductionAmount || 0)).toFixed(2)}
          </div>
          <div className="mt-1 text-[11px] text-stone-500">
            <span>Gross: ${project.budget.toFixed(2)}</span>
            <span className="text-amber-700 font-semibold ml-1.5">(-$4.50 adj)</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-card">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Delivery Reliability</span>
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-700">97.8%</div>
          <div className="mt-1 text-[11px] text-stone-500">
            Top Tier Freelancer Rating
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-card">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Change Request Counter</span>
            <GitPullRequest className="w-4 h-4 text-purple-700" />
          </div>
          <div className="mt-2 text-2xl font-black text-stone-900">+$110.00</div>
          <div className="mt-1 text-[11px] text-purple-700 font-medium">
            <Link to="/change-negotiation" className="hover:underline">
              Counter-offer pending review →
            </Link>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-card">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>PayPal Sandbox Status</span>
            <DollarSign className="w-4 h-4 text-blue-700" />
          </div>
          <div className="mt-2 text-2xl font-black text-blue-900">Connected</div>
          <div className="mt-1 text-[11px] text-stone-500 font-mono">
            sb-freelancer-jordan@...
          </div>
        </div>
      </div>

      {/* Milestones Action List */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-card p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <h3 className="text-base font-bold text-stone-900">Assigned Project Milestones</h3>
            <p className="text-xs text-stone-500 mt-0.5">{project.title}</p>
          </div>
          <Link
            to="/workspace"
            className="text-xs font-bold text-emerald-800 hover:underline flex items-center space-x-1"
          >
            <span>Open in Bryntum Gantt</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {project.milestones.map((m) => (
            <div
              key={m.id}
              className="p-4 rounded-xl border border-stone-200 hover:border-emerald-300 bg-stone-50/50 hover:bg-stone-50 transition-all flex flex-wrap items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-stone-900 text-sm">{m.title}</span>
                  {m.id === 'm1' && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded">
                      Submitted (Day 7)
                    </span>
                  )}
                  {m.isParallel && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded">
                      Parallel Track
                    </span>
                  )}
                </div>
                <div className="text-stone-500">
                  Original: Day {m.startDay}–{m.endDay}
                  {m.recoveryStartDay && (
                    <span className="text-emerald-700 font-semibold ml-2">
                      | AI Recovery: Day {m.recoveryStartDay}–{m.recoveryEndDay}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="font-bold text-stone-900 text-sm">${m.budget.toFixed(2)}</div>
                  {m.id === 'm1' && (
                    <div className="text-emerald-700 font-bold text-[11px]">Net: $145.50</div>
                  )}
                </div>

                <Link
                  to={m.status === 'submitted' ? '/ai-verification' : '/deliverable-submission'}
                  className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-bold transition-colors"
                >
                  {m.status === 'submitted' ? 'View AI Audit' : 'Submit Work'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
