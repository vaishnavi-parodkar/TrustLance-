import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import { GitPullRequest, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { classifyChangeRequest } from '../services/aiService';

export default function ClientChangeRequestPage() {
  const navigate = useNavigate();
  const { project, updateProject } = useProject();
  const { currentUser } = useAuth();

  const [title, setTitle] = useState('Dark Mode Theme & 2 Extra Product Landing Pages');
  const [description, setDescription] = useState(
    'I would like to add a full dark mode toggle across the website, plus two specialized marketing landing pages and an analytics dashboard view.'
  );
  const [isClassifying, setIsClassifying] = useState(false);

  const handlePreloadScenarioC = () => {
    setTitle('Dark Mode Theme & 2 Extra Product Landing Pages');
    setDescription(
      'I would like to add a full dark mode toggle across the website, plus two specialized marketing landing pages and an analytics dashboard view.'
    );
  };

  const handlePreloadCorrection = () => {
    setTitle('Missing Sticky Navigation Bar on Mobile');
    setDescription(
      'The approved Figma design specified a sticky navigation bar with cart badge on mobile viewports, but it is missing.'
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClassifying(true);

    try {
      const aiAnalysis = await classifyChangeRequest({
        agreementTitle: project.title,
        originalCriteria: project.milestones[0].acceptanceCriteria,
        requestText: `${title}: ${description}`,
      });

      const newChangeRequest = {
        id: `cr_${Date.now()}`,
        title,
        description,
        requestedBy: currentUser.fullName,
        requestedDay: project.currentDay || 7,
        classification: aiAnalysis.classification,
        status: 'pending_negotiation',
        aiAnalysis,
        freelancerCounter: {
          proposedCost: aiAnalysis.estimatedCost > 0 ? aiAnalysis.estimatedCost - 10 : 0,
          proposedDays: aiAnalysis.estimatedDays,
          note: 'I can deliver these additional components cleanly without impacting checkout delivery.',
        },
      };

      updateProject((prev) => ({
        ...prev,
        changeRequests: [newChangeRequest, ...prev.changeRequests],
      }));

      navigate('/change-impact', { state: { changeRequest: newChangeRequest } });
    } catch (err) {
      console.error('Error classifying change request:', err);
    } finally {
      setIsClassifying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-3 border-b border-stone-200">
        <div className="flex items-center space-x-2">
          <GitPullRequest className="w-5 h-5 text-purple-700" />
          <h1 className="text-2xl font-black text-stone-900">Submit Scope Change Request</h1>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          AI Scope Sentinel compares requests against the baseline agreement to differentiate in-scope corrections from billable new scope.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-6 text-xs">
        {/* Judge Shortcuts */}
        <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl space-y-2">
          <div className="font-bold text-purple-900 text-xs">Judge Demonstration Shortcuts:</div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handlePreloadScenarioC}
              className="px-3 py-1.5 bg-white hover:bg-purple-100 text-purple-900 border border-purple-300 rounded-lg font-bold transition-colors"
            >
              Test Scenario C: New Scope (Dark Mode & Extra Pages)
            </button>
            <button
              type="button"
              onClick={handlePreloadCorrection}
              className="px-3 py-1.5 bg-white hover:bg-purple-100 text-purple-900 border border-purple-300 rounded-lg font-bold transition-colors"
            >
              Test In-Scope Correction (Missing Sticky Nav)
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-bold text-stone-800 mb-1">Request Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-semibold text-stone-900"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-800 mb-1">Detailed Description of Change</label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-stone-800 leading-relaxed font-medium"
            />
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-600 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>AI will classify this request into: In-Scope Correction, New Scope, Review Delay, or Disputed.</span>
          </div>

          <button
            type="submit"
            disabled={isClassifying}
            className="w-full py-3.5 bg-purple-900 hover:bg-purple-950 text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2 text-xs"
          >
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span>{isClassifying ? 'AI Scope Sentinel Analyzing Contract...' : 'Run AI Scope Classification & Impact Analysis'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
