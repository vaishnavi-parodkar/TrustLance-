import React from 'react';
import {
  FileText,
  FileCheck2,
  Clock,
  UploadCloud,
  Sparkles,
  RefreshCw,
  GitPullRequest,
  TrendingUp,
  Scale,
  DollarSign,
  CreditCard,
  ShieldAlert,
  CheckCircle,
} from 'lucide-react';

const EVENT_CONFIGS = {
  agreement_created: { icon: FileText, color: 'text-stone-700', bg: 'bg-stone-100', border: 'border-stone-300' },
  agreement_approved: { icon: FileCheck2, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-300' },
  milestone_due: { icon: Clock, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-300' },
  deliverable_submitted: { icon: UploadCloud, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-300' },
  ai_verification: { icon: Sparkles, color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-300' },
  schedule_recovery_proposed: { icon: TrendingUp, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-300' },
  deduction_calculated: { icon: DollarSign, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-300' },
  client_delay_detected: { icon: Clock, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-300' },
  amendment_approved: { icon: GitPullRequest, color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-300' },
  payment_captured: { icon: CreditCard, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-400' },
  dispute_analyzed: { icon: ShieldAlert, color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-300' },
};

export default function TrustTimelineList({ events = [] }) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-card p-6">
      <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
        <div>
          <h3 className="text-base font-bold text-stone-900">Project Trust Timeline</h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Immutable, auditable chronological ledger of all agreement, delivery, and payment events.
          </p>
        </div>
        <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full">
          {events.length} Audited Events
        </span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
        {events.map((event, idx) => {
          const cfg = EVENT_CONFIGS[event.type] || {
            icon: CheckCircle,
            color: 'text-stone-700',
            bg: 'bg-stone-100',
            border: 'border-stone-300',
          };
          const Icon = cfg.icon;

          return (
            <div key={event.id || idx} className="relative group">
              {/* Event Marker */}
              <div
                className={`absolute -left-[30px] top-1 w-7 h-7 rounded-full ${cfg.bg} ${cfg.border} border-2 flex items-center justify-center shadow-xs transition-transform group-hover:scale-110`}
              >
                <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
              </div>

              {/* Event Card */}
              <div className="bg-stone-50/70 hover:bg-stone-50 rounded-xl p-4 border border-stone-200/80 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-stone-900">{event.title}</span>
                    <span className="text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider rounded bg-white text-stone-700 border border-stone-200">
                      Day {event.day || '—'}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-600 font-medium">{event.timestamp}</span>
                </div>

                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">{event.description}</p>

                <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px]">
                  <div className="flex items-center space-x-1.5 text-stone-500">
                    <span className="font-semibold text-stone-700">Actor:</span>
                    <span>{event.actor}</span>
                    <span className="text-stone-300">•</span>
                    <span className="text-stone-500 italic">({event.role})</span>
                  </div>
                  <div className="text-[10px] text-emerald-700 font-mono font-medium">
                    VERIFIED SIGNED EVENT
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
