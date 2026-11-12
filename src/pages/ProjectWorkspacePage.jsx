import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import BryntumGanttWrapper from '../components/gantt/BryntumGanttWrapper';
import TrustTimelineList from '../components/trust-timeline/TrustTimelineList';
import {
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  UploadCloud,
  FileText,
  CreditCard,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectWorkspacePage() {
  const { project } = useProject();
  const { isClient } = useAuth();
  const [selectedTask, setSelectedTask] = useState(null);

  const m1 = project.milestones[0];

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-stone-900">{project.title}</h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
              Active Project
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Official Bryntum Gantt Integration • Baseline tracking, critical path calculation & AI schedule recovery.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/schedule-recovery"
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center space-x-1.5"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>AI Schedule Recovery</span>
          </Link>
          <Link
            to="/delay-attribution"
            className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-bold rounded-lg transition-colors flex items-center space-x-1.5"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
            <span>Delay & Deductions</span>
          </Link>
        </div>
      </div>

      {/* Schedule Health Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-card">
          <div className="text-stone-500 text-xs font-semibold">Delivery Target</div>
          <div className="text-xl font-black text-stone-900 mt-1">Day {project.durationDays}</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-0.5 flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Final Deadline Preserved</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-card">
          <div className="text-stone-500 text-xs font-semibold">Active Milestone</div>
          <div className="text-xl font-black text-amber-900 mt-1">Milestone 1: UI Design</div>
          <div className="text-[11px] text-amber-700 font-medium mt-0.5">
            Submitted Day 7 (3d delay detected)
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-card">
          <div className="text-stone-500 text-xs font-semibold">Parallel Work Identified</div>
          <div className="text-xl font-black text-blue-900 mt-1">Frontend & Backend</div>
          <div className="text-[11px] text-blue-700 font-medium mt-0.5">
            Days 12–13 Safe Overlap
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-card">
          <div className="text-stone-500 text-xs font-semibold">Contractual Adjustment</div>
          <div className="text-xl font-black text-stone-900 mt-1">-$4.50 USD</div>
          <div className="text-[11px] text-stone-500 mt-0.5">
            Net $145.50 for Alex review
          </div>
        </div>
      </div>

      {/* Bryntum Gantt Component */}
      <BryntumGanttWrapper
        tasks={project.ganttTasks}
        dependencies={project.ganttDependencies}
        targetFinalDay={project.durationDays}
        onTaskClick={(task) => setSelectedTask(task)}
      />

      {/* Task Details Drawer / Quick Details */}
      {selectedTask && (
        <div className="p-4 bg-stone-100 rounded-xl border border-stone-200 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="font-bold text-stone-900">{selectedTask.name}</div>
            <span className="text-stone-500">Duration: {selectedTask.duration} days</span>
            <span className="text-stone-500">Progress: {selectedTask.percentDone}%</span>
          </div>
          <Link
            to="/schedule-recovery"
            className="text-emerald-800 font-bold hover:underline flex items-center space-x-1"
          >
            <span>View Recovery Analysis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Auditable Project Trust Timeline */}
      <TrustTimelineList events={project.trustTimeline} />
    </div>
  );
}
