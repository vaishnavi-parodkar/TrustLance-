import React from 'react';
import { Link } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import {
  FolderGit2,
  Calendar,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  GitPullRequest,
  Scale,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

export default function ClientDashboardPage() {
  const { project } = useProject();
  const { currentUser } = useAuth();

  const m1 = project.milestones[0];
  const delayAssessment = m1.delayAssessment;
  const isPendingApproval = m1.status === 'submitted';
  const hasChangeRequest = project.changeRequests.some((cr) => cr.status.includes('pending'));
  const hasDispute = project.disputes.some((d) => d.status === 'open' || d.status === 'ai_analyzed');

  return (
    <div className="space-y-6">
      {/* Top Welcome & KPI Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-stone-900">Client Control Center</h1>
            <span className="px-2 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
              Alex Morgan
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Monitoring active deliverables, contractual milestones, and protected PayPal releases.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/project-create"
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Create New Project</span>
          </Link>
          <Link
            to="/workspace"
            className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-bold rounded-lg transition-colors flex items-center space-x-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span>Bryntum Gantt</span>
          </Link>
        </div>
      </div>

      {/* Critical Alert Banner (Scenario A Trigger / Pending Deliverable) */}
      {isPendingApproval && (
        <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-5 shadow-card">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-amber-900 text-sm">
                    Deliverable Awaiting Review: {m1.title}
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-red-100 text-red-800 rounded-full">
                    3 Days Late
                  </span>
                </div>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed max-w-2xl">
                  Jordan Lee submitted UI Design on <strong>Day 7</strong> (agreed deadline was Day 4).
                  AI Deliverable Verification completed with a <strong>94.5% quality score</strong>.
                  Contractual delay policy proposes a <strong>3% deduction (-$4.50)</strong>, with a net release of <strong>$145.50</strong> via PayPal.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <Link
                to="/ai-verification"
                className="px-3.5 py-2 bg-white hover:bg-amber-100/50 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition-colors"
              >
                Inspect AI Verification
              </Link>
              <Link
                to="/delay-attribution"
                className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
              >
                Review & Release ($145.50)
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-card">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Total Project Budget</span>
            <DollarSign className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="mt-2 text-2xl font-black text-stone-900">${project.budget.toFixed(2)}</div>
          <div className="mt-1 text-[11px] text-stone-500 flex items-center space-x-1">
            <span>4 Milestones</span>
            <span>•</span>
            <span className="text-emerald-700 font-medium">1 In Review</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-card">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Schedule Health</span>
            <Calendar className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="mt-2 text-2xl font-black text-stone-900">Day {project.currentDay} / {project.durationDays}</div>
          <div className="mt-1 text-[11px] text-emerald-700 font-semibold flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Target Day 21 Preserved</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-card">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Pending Change Requests</span>
            <GitPullRequest className="w-4 h-4 text-purple-700" />
          </div>
          <div className="mt-2 text-2xl font-black text-stone-900">
            {project.changeRequests.length}
          </div>
          <div className="mt-1 text-[11px] text-purple-700 font-medium">
            <Link to="/change-impact" className="hover:underline">
              Dark Mode & 2 Pages (+110) →
            </Link>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-card">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Open Disputes</span>
            <Scale className="w-4 h-4 text-stone-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-stone-900">
            {hasDispute ? '1 Active' : '0 Open'}
          </div>
          <div className="mt-1 text-[11px] text-stone-500">
            <Link to="/dispute-copilot" className="hover:underline text-emerald-700 font-semibold">
              Dispute Copilot Ready →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Project Overview & Milestones Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-card overflow-hidden">
        <div className="p-5 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 bg-stone-50/50">
          <div>
            <div className="flex items-center space-x-2">
              <FolderGit2 className="w-4 h-4 text-emerald-700" />
              <h3 className="font-bold text-base text-stone-900">{project.title}</h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">{project.tagline}</p>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              to="/workspace"
              className="px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
            >
              Open Bryntum Gantt
            </Link>
          </div>
        </div>

        <div className="divide-y divide-stone-200">
          {project.milestones.map((m) => (
            <div key={m.id} className="p-4 hover:bg-stone-50/60 transition-colors flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-stone-900 text-sm">{m.title}</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold uppercase text-[9px] ${
                      m.status === 'submitted'
                        ? 'bg-amber-100 text-amber-800'
                        : m.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
                <p className="text-stone-500">{m.description}</p>
                <div className="text-[11px] text-stone-600 flex items-center space-x-2 pt-0.5">
                  <span>Scheduled: Day {m.startDay}–{m.endDay}</span>
                  {m.actualSubmissionDay && (
                    <span className="text-red-600 font-semibold">
                      (Submitted Day {m.actualSubmissionDay} — 3d delay)
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-bold text-stone-900 text-sm">${m.budget.toFixed(2)}</div>
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">
                    {m.paymentStatus}
                  </div>
                </div>

                <Link
                  to={`/milestone/${m.id}`}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-semibold transition-colors flex items-center space-x-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
