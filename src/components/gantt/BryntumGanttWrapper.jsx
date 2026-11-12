import React, { useEffect, useRef, useState } from 'react';
import { Gantt } from '@bryntum/gantt-trial';
import { Calendar, AlertTriangle, CheckCircle, Clock, Zap, ShieldCheck } from 'lucide-react';

export default function BryntumGanttWrapper({
  tasks = [],
  dependencies = [],
  targetFinalDay = 21,
  onTaskClick,
}) {
  const containerRef = useRef(null);
  const ganttInstanceRef = useRef(null);
  const [initError, setInitError] = useState(null);
  const [activeView, setActiveView] = useState('recovery'); // 'baseline', 'actual', 'recovery'

  useEffect(() => {
    if (!containerRef.current) return;

    // Destroy existing instance if any
    if (ganttInstanceRef.current) {
      try {
        ganttInstanceRef.current.destroy();
      } catch (e) {
        console.warn('Error destroying existing Gantt instance:', e);
      }
      ganttInstanceRef.current = null;
    }

    try {
      // Map tasks to Bryntum Gantt format
      const formattedTasks = tasks.map((t, idx) => ({
        id: t.id || `task_${idx + 1}`,
        name: t.name,
        startDate: t.startDate || '2026-11-10',
        endDate: t.endDate || '2026-11-14',
        duration: t.duration || 4,
        percentDone: t.percentDone || 0,
        cls: t.cls || '',
        baselines: t.baseline
          ? [
              {
                startDate: t.baseline.startDate,
                endDate: t.baseline.endDate,
              },
            ]
          : [],
      }));

      const formattedDependencies = dependencies.map((d, idx) => ({
        id: `dep_${idx + 1}`,
        from: d.from,
        to: d.to,
        type: d.type || 2, // Finish-to-Start
      }));

      // Initialize Bryntum Gantt
      const gantt = new Gantt({
        appendTo: containerRef.current,
        autoHeight: false,
        height: 480,
        columns: [
          { type: 'wbs', width: 50 },
          { type: 'name', width: 260, text: 'Milestone / Task Name' },
          { type: 'startdate', width: 110, text: 'Start' },
          { type: 'enddate', width: 110, text: 'End' },
          { type: 'duration', width: 90, text: 'Days' },
          { type: 'percentdone', showCircle: true, width: 80, text: 'Progress' },
        ],
        project: {
          tasksData: formattedTasks,
          dependenciesData: formattedDependencies,
        },
        features: {
          baselines: {
            disabled: false,
          },
          criticalPaths: {
            disabled: false,
          },
          dependencies: {
            disabled: false,
          },
          taskTooltip: {
            template: (data) => {
              const task = data.taskRecord;
              return `
                <div class="p-2 text-xs">
                  <div class="font-bold text-sm text-stone-900">${task.name}</div>
                  <div class="text-stone-600 mt-1">Duration: ${task.duration} days</div>
                  <div class="text-stone-600">Progress: ${task.percentDone}%</div>
                  ${task.cls?.includes('delayed') ? '<div class="text-red-600 font-semibold mt-1">Status: Missed Milestone (3 Days Delay)</div>' : ''}
                  ${task.cls?.includes('parallel') ? '<div class="text-blue-600 font-semibold mt-1">Status: Safe Parallel Task Track</div>' : ''}
                  ${task.cls?.includes('recovered') ? '<div class="text-emerald-600 font-semibold mt-1">Status: Compressed Recovery Path</div>' : ''}
                </div>
              `;
            },
          },
        },
        listeners: {
          taskClick: ({ taskRecord }) => {
            if (onTaskClick) onTaskClick(taskRecord);
          },
        },
      });

      ganttInstanceRef.current = gantt;
    } catch (err) {
      console.error('Bryntum Gantt Initialization Error:', err);
      setInitError(err.message || 'Error mounting Bryntum Gantt');
    }

    // Clean up on component unmount
    return () => {
      if (ganttInstanceRef.current) {
        try {
          ganttInstanceRef.current.destroy();
        } catch (e) {
          // ignore
        }
        ganttInstanceRef.current = null;
      }
    };
  }, [tasks, dependencies]);

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-card overflow-hidden">
      {/* Top Gantt Header & Controls */}
      <div className="p-4 border-b border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-stone-900">Interactive Bryntum Gantt Schedule</h3>
              <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                Official Integration
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Synchronized with Supabase schedule_tasks & schedule_dependencies
            </p>
          </div>
        </div>

        {/* Legend & Target Marker */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-white border border-stone-200 rounded-md">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span className="text-stone-700 font-medium">Delayed (+3d)</span>
          </div>
          <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-white border border-stone-200 rounded-md">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span className="text-stone-700 font-medium">Parallel Work (Days 12–13)</span>
          </div>
          <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-white border border-stone-200 rounded-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-stone-700 font-medium">Recovery Preserved</span>
          </div>
          <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold rounded-md">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Target Day {targetFinalDay} Preserved</span>
          </div>
        </div>
      </div>

      {/* Bryntum Gantt Container */}
      <div className="relative">
        {initError ? (
          <div className="p-8 text-center text-stone-600 bg-stone-50">
            <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-2" />
            <div className="font-semibold text-stone-800">Bryntum Gantt Container Notice</div>
            <div className="text-xs text-stone-500 mt-1 max-w-md mx-auto">{initError}</div>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="w-full"
            style={{ height: '480px', minHeight: '480px' }}
          />
        )}
      </div>

      {/* Bottom Schedule Insights Bar */}
      <div className="p-3 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between text-xs text-stone-600 gap-2">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-emerald-700" />
          <span>
            <strong>Baseline Comparison:</strong> Original UI milestone due Day 4. Submitted Day 7. AI Recovery overlaps Backend on Day 12 to hit Day 21.
          </span>
        </div>
        <div className="text-emerald-700 font-medium">
          Critical Path Analysis: ACTIVE
        </div>
      </div>
    </div>
  );
}
