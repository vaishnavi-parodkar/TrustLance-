import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import { RefreshCw, CheckSquare, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

export default function RevisionRequestPage() {
  const navigate = useNavigate();
  const { project, updateProject } = useProject();
  const { currentUser } = useAuth();

  const [feedback, setFeedback] = useState(
    'Please adjust the mobile navigation drawer padding and align the secondary checkout button font size with design tokens.'
  );
  const [selectedCriteria, setSelectedCriteria] = useState(['Mobile (390px) screen layouts provided']);

  const handleSendRevision = (e) => {
    e.preventDefault();

    updateProject((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const m = next.milestones[0];
      m.status = 'revision_requested';
      next.trustTimeline.unshift({
        id: `tl_${Date.now()}`,
        day: next.currentDay || 7,
        timestamp: new Date().toLocaleString(),
        actor: currentUser.fullName,
        role: 'Client',
        type: 'revision_requested',
        title: 'In-Scope Revision Requested (Round 1 of 2)',
        description: `Feedback: "${feedback}". Unmet criteria targeted without incurring additional charges.`,
      });
      return next;
    });

    navigate('/workspace');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="pb-3 border-b border-stone-200">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-5 h-5 text-amber-700" />
          <h1 className="text-2xl font-black text-stone-900">Request In-Scope Corrections</h1>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Utilize agreed contractual revision rounds (2 rounds included) to request adjustments on existing acceptance criteria.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-5 text-xs">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 leading-relaxed">
          <strong>Fair Contract Principle:</strong> In-scope revisions fix agreed criteria that were missed. They do not increase the client's bill or automatically extend the schedule. If you wish to add new features or pages, please use a <strong>Change Request</strong>.
        </div>

        <form onSubmit={handleSendRevision} className="space-y-4">
          <div>
            <label className="block font-bold text-stone-800 mb-1.5">Target Milestone</label>
            <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-300 font-semibold text-stone-800">
              {project.milestones[0].title} (${project.milestones[0].budget.toFixed(2)} USD)
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-800 mb-1.5">Unmet Acceptance Criteria</label>
            <div className="space-y-2">
              {project.milestones[0].acceptanceCriteria.map((crit, idx) => (
                <label key={idx} className="flex items-center space-x-2 text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={idx === 0}
                    className="rounded text-emerald-700 focus:ring-emerald-700 w-4 h-4"
                  />
                  <span>{crit}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-800 mb-1.5">Specific Correction Instructions</label>
            <textarea
              rows={4}
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium text-stone-800"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-stone-500 font-medium">Revisions Remaining: <strong>1 of 2</strong></span>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-colors shadow-sm flex items-center space-x-1.5"
            >
              <span>Send Revision Notice</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
