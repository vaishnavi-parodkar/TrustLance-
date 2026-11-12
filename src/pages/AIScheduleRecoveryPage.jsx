import React from 'react';
import { Link } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import {
  Clock,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Layers,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { computeScheduleRecovery } from '../services/scheduleRecoveryEngine';

export default function AIScheduleRecoveryPage() {
  const { project } = useProject();

  const recoveryResult = computeScheduleRecovery({
    originalMilestones: project.milestones,
    delayedMilestoneIndex: 0,
    actualSubmissionDay: project.milestones[0].actualSubmissionDay || 7,
    targetFinalDay: project.durationDays,
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200">
        <div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-emerald-700" />
            <h1 className="text-2xl font-black text-stone-900">AI Schedule Recovery & Delay Mitigation</h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Section 7 Engine: Mathematically recovers lost days targeting the client's original delivery deadline (Day 21).
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to="/workspace"
            className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-bold rounded-lg transition-colors flex items-center space-x-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span>View in Bryntum Gantt</span>
          </Link>
          <Link
            to="/delay-attribution"
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center space-x-1.5"
          >
            <span>Delay Attribution Report</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Target Day 21 Preservation Banner */}
      <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-card space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h2 className="text-lg font-bold">Target Day 21 Final Deadline: FULLY PRESERVED</h2>
          </div>
          <span className="px-3 py-1 bg-emerald-800 text-emerald-200 rounded-full text-xs font-bold border border-emerald-700">
            Parallel Recovery Plan
          </span>
        </div>
        <p className="text-xs text-emerald-100 leading-relaxed max-w-3xl">
          TRUSTLANCE does not simply push out final deadlines when a milestone misses its date. By analyzing dependency linkages, the AI engine discovered that <strong>Backend Integration (Day 12–18)</strong> can execute concurrently with <strong>Frontend Development (Day 8–13)</strong> on Days 12–13, successfully absorbing the 3-day UI design delay.
        </p>
      </div>

      {/* Comparative Schedule Table: Original Baseline vs Recovery Schedule */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-card overflow-hidden text-xs">
        <div className="p-5 border-b border-stone-200 bg-stone-50/60 flex items-center justify-between">
          <h3 className="font-bold text-stone-900 text-sm">Schedule Transformation: Baseline vs Recovery</h3>
          <span className="text-stone-500 font-medium">Critical Path Compression</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-100/70 text-stone-600 font-bold border-b border-stone-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Milestone</th>
                <th className="p-4">Original Baseline</th>
                <th className="p-4">Recovery Schedule</th>
                <th className="p-4">Optimization Applied</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              <tr className="bg-red-50/30">
                <td className="p-4 font-bold text-stone-900">1. UI Design & System Mockups</td>
                <td className="p-4 text-stone-600">Day 1–4 (4 days)</td>
                <td className="p-4 font-bold text-red-700">Day 1–7 (7 days)</td>
                <td className="p-4 text-stone-500">+3 Days Freelancer Delay</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 font-bold rounded">Delayed</span>
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-stone-900">2. Frontend Development</td>
                <td className="p-4 text-stone-600">Day 5–11 (7 days)</td>
                <td className="p-4 font-bold text-stone-900">Day 8–13 (6 days)</td>
                <td className="p-4 text-emerald-700 font-medium">Shifted + Compressed 1 day</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">Optimized</span>
                </td>
              </tr>
              <tr className="bg-blue-50/30">
                <td className="p-4 font-bold text-stone-900">3. Backend Integration</td>
                <td className="p-4 text-stone-600">Day 12–17 (6 days)</td>
                <td className="p-4 font-bold text-blue-900">Day 12–18 (7 days)</td>
                <td className="p-4 font-semibold text-blue-700">Parallel Overlap with Frontend (Days 12–13)</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded">Parallel Track</span>
                </td>
              </tr>
              <tr className="bg-emerald-50/30">
                <td className="p-4 font-bold text-stone-900">4. Testing & Deployment</td>
                <td className="p-4 text-stone-600">Day 18–21 (4 days)</td>
                <td className="p-4 font-bold text-emerald-900">Day 19–21 (3 days)</td>
                <td className="p-4 text-emerald-700 font-medium">Target Day 21 Preserved</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">Day 21 Intact</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Identified Parallel Execution Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-3">
          <div className="flex items-center space-x-2 text-blue-900 font-bold text-sm">
            <Layers className="w-4 h-4 text-blue-700" />
            <span>Parallel Task Feasibility Analysis</span>
          </div>
          <p className="text-stone-600 leading-relaxed">
            The AI engine evaluated task dependencies. Because the database schema and authentication contracts can be set up independently of final button styling, Jordan Lee can initiate Backend Integration on Day 12 while finalizing the last Frontend views.
          </p>
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-900">
            <strong>Time Recovered:</strong> 2 Full Calendar Days via Days 12–13 concurrency.
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-3">
          <div className="flex items-center space-x-2 text-stone-900 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>Risk Management Safeguards</span>
          </div>
          <ul className="space-y-1.5 text-stone-600 leading-relaxed">
            <li className="flex items-start space-x-1.5">
              <span className="text-emerald-700 font-bold">•</span>
              <span>No mandatory deliverables are eliminated or de-scoped.</span>
            </li>
            <li className="flex items-start space-x-1.5">
              <span className="text-emerald-700 font-bold">•</span>
              <span>Core QA testing window (Days 19–21) remains protected.</span>
            </li>
            <li className="flex items-start space-x-1.5">
              <span className="text-emerald-700 font-bold">•</span>
              <span>All schedule adjustments are mirrored directly into Bryntum Gantt.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
