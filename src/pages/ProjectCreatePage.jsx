import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, DollarSign, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { generateSmartAgreement } from '../services/aiService';
import { useProject } from '../context/ProjectContext';

export default function ProjectCreatePage() {
  const navigate = useNavigate();
  const { updateProject } = useProject();

  const [prompt, setPrompt] = useState(
    'I need an e-commerce website with a product catalogue, shopping cart, user authentication, payment integration and an admin dashboard. The project should be completed within 21 days for $600.'
  );
  const [budget, setBudget] = useState(600);
  const [durationDays, setDurationDays] = useState(21);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePreloadPrompt = () => {
    setPrompt(
      'I need an e-commerce website with a product catalogue, shopping cart, user authentication, payment integration and an admin dashboard. The project should be completed within 21 days for $600.'
    );
    setBudget(600);
    setDurationDays(21);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const generated = await generateSmartAgreement({
        description: prompt,
        budget: Number(budget),
        durationDays: Number(durationDays),
      });

      // Save to project state
      updateProject((prev) => ({
        ...prev,
        title: generated.title,
        budget: generated.budget,
        durationDays: generated.durationDays,
        agreement: {
          ...prev.agreement,
          terms: generated.delayPolicy?.terms || prev.agreement.terms,
        },
      }));

      // Route to agreement generator review view
      navigate('/agreement-generator', { state: { agreementData: generated } });
    } catch (err) {
      console.error('Error generating agreement:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-3 border-b border-stone-200">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-emerald-700" />
          <h1 className="text-2xl font-black text-stone-900">Create Project with Natural Language AI</h1>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Describe what you want to build in plain English. The AI Smart Agreement Architect will parse your goals into contractual milestones, acceptance criteria, and delay policies.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-6">
        {/* Judge Helper Button */}
        <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
          <div className="flex items-center space-x-2 text-xs text-emerald-900 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Judge Shortcut: Test the Official E-Commerce Prompt</span>
          </div>
          <button
            type="button"
            onClick={handlePreloadPrompt}
            className="px-3 py-1 bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold transition-colors"
          >
            Preload Hackathon Prompt ($600, 21d)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div>
            <label className="block font-bold text-stone-800 mb-1.5">
              Natural Language Project Requirements
            </label>
            <textarea
              rows={5}
              required
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe deliverables, features, and expectations..."
              className="w-full p-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium text-stone-800 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-stone-800 mb-1">Total Target Budget (USD)</label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="number"
                  required
                  min={50}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-800 mb-1">Target Duration (Days)</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="number"
                  required
                  min={3}
                  max={365}
                  value={durationDays}
                  onChange={(e) => setDurationDays(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-semibold"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 disabled:bg-stone-400 text-white font-bold rounded-xl transition-all shadow-card flex items-center justify-center space-x-2 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'AI Synthesizing Agreement & Milestones...' : 'Generate AI Smart Agreement'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
