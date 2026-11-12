import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import {
  Scale,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { generateDisputeReport } from '../services/aiService';
import { executeScenarioD } from '../services/demoDataService';

export default function DisputeCopilotPage() {
  const { project, updateProject } = useProject();
  const { currentUser } = useAuth();

  const dispute = project.disputes[0];
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const report = await generateDisputeReport({
        projectTitle: project.title,
        clientClaim: dispute.clientClaim,
        freelancerClaim: dispute.freelancerClaim,
        agreementSummary: {
          budget: project.budget,
          milestone: project.milestones[0],
          terms: project.agreement.terms,
        },
        evidenceHistory: project.milestones[0].evidence,
      });

      updateProject((prev) => {
        const next = JSON.parse(JSON.stringify(prev));
        next.status = 'disputed';
        next.disputes[0].status = 'ai_analyzed';
        next.disputes[0].aiReport = report;
        next.trustTimeline.unshift({
          id: `tl_${Date.now()}`,
          day: next.currentDay || 8,
          timestamp: new Date().toLocaleString(),
          actor: 'AI Dispute Copilot',
          role: 'Neutral Engine',
          type: 'dispute_analyzed',
          title: 'Neutral Dispute Assessment Generated',
          description: 'Analyzed signed agreement v1.0, Figma evidence assets, and submission timeline.',
        });
        return next;
      });
    } catch (err) {
      console.error('Error generating dispute report:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const report = dispute.aiReport;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200">
        <div>
          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-rose-700" />
            <h1 className="text-2xl font-black text-stone-900">AI Dispute Copilot</h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-rose-100 text-rose-900 rounded-full border border-rose-200">
              Neutral Evidence Mediation
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Section 10 Engine: Objective, neutral analysis comparing party claims against signed contract baselines and audit logs.
          </p>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="px-4 py-2 bg-rose-800 hover:bg-rose-900 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center space-x-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isGenerating ? 'Synthesizing Contract Evidence...' : 'Re-Analyze Evidence via AI'}</span>
        </button>
      </div>

      {/* Principle Banner */}
      <div className="p-3.5 bg-stone-100 border border-stone-300 rounded-xl flex items-start space-x-2.5 text-xs text-stone-700">
        <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Neutrality Standard:</strong> Dispute Copilot NEVER declares either party guilty, imposes financial penalties, or unilaterally reverses PayPal transactions. It produces factual evidence comparisons and actionable resolution paths for mutual agreement.
        </div>
      </div>

      {/* Disputed Claims Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Client Claim */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <span className="font-bold text-stone-900 text-sm">Client Claim (Alex Morgan)</span>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-800 font-bold rounded text-[10px]">
              Complainant
            </span>
          </div>
          <p className="text-stone-700 leading-relaxed font-medium bg-stone-50 p-3.5 rounded-xl border border-stone-200">
            "{dispute.clientClaim}"
          </p>
          <div className="text-[11px] text-stone-500">
            Asserts that secondary checkout variations should have been included and delivery was delayed.
          </div>
        </div>

        {/* Freelancer Claim */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <span className="font-bold text-stone-900 text-sm">Freelancer Claim (Jordan Lee)</span>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-bold rounded text-[10px]">
              Respondent
            </span>
          </div>
          <p className="text-stone-700 leading-relaxed font-medium bg-stone-50 p-3.5 rounded-xl border border-stone-200">
            "{dispute.freelancerClaim}"
          </p>
          <div className="text-[11px] text-stone-500">
            Asserts that all 4 agreed screens were delivered in Figma, and secondary variations are new scope.
          </div>
        </div>
      </div>

      {/* AI Neutral Evaluation Report */}
      {report && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-6 text-xs">
          <div className="flex items-center space-x-2 pb-3 border-b border-stone-200">
            <Sparkles className="w-5 h-5 text-purple-700" />
            <h3 className="font-bold text-stone-900 text-base">Neutral AI Mediation Assessment</h3>
          </div>

          <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-200 text-stone-800 leading-relaxed space-y-2">
            <div className="font-bold text-purple-950 text-sm">Factual Contract Synthesis:</div>
            <p>{report.neutralAssessment}</p>
          </div>

          {/* Evidence Checklist */}
          <div className="space-y-2">
            <h4 className="font-bold text-stone-900">Verified Evidence Analysis:</h4>
            <div className="space-y-1.5">
              {report.evidenceEvaluation?.map((ev, idx) => (
                <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="text-stone-700 font-medium">{ev}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Proposed Resolution Options (Section 10) */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-stone-900 text-sm">Balanced Resolution Options:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {report.resolutionOptions?.map((opt, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-white hover:border-emerald-400 transition-all flex flex-col justify-between space-y-3"
                >
                  <div>
                    <span className="text-xs font-bold text-stone-900 block mb-1">{opt.title}</span>
                    <p className="text-[11px] text-stone-600 leading-relaxed">{opt.description}</p>
                  </div>
                  <div className="pt-2 border-t border-stone-200/60 text-[10px] text-emerald-800 font-semibold">
                    {opt.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
