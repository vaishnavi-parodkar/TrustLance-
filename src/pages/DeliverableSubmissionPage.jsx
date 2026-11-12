import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import {
  UploadCloud,
  FileText,
  Link as LinkIcon,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { uploadDeliverableFile } from '../services/supabaseService';

export default function DeliverableSubmissionPage() {
  const navigate = useNavigate();
  const { project, updateProject } = useProject();
  const { currentUser } = useAuth();

  const [milestoneId, setMilestoneId] = useState('m1');
  const [evidenceTitle, setEvidenceTitle] = useState('Figma Responsive Prototype & Asset Pack v1');
  const [evidenceUrl, setEvidenceUrl] = useState('https://figma.com/file/trustlance-demo-ecommerce-v1');
  const [notes, setNotes] = useState(
    'Included all 4 agreed screens (Home, Catalogue, Cart, Admin Dashboard) with desktop and mobile responsive grids.'
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let fileUploadResult = null;
    if (selectedFile) {
      fileUploadResult = await uploadDeliverableFile(selectedFile, milestoneId);
    }

    const newEvidence = {
      id: `ev_${Date.now()}`,
      type: fileUploadResult ? 'archive' : 'live_url',
      title: evidenceTitle,
      url: fileUploadResult?.url || evidenceUrl,
      description: notes,
      fileSize: fileUploadResult ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : undefined,
      submittedAt: `Day ${project.currentDay || 7}, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    };

    updateProject((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const m = next.milestones.find((item) => item.id === milestoneId);
      if (m) {
        m.status = 'submitted';
        m.actualSubmissionDay = next.currentDay || 7;
        m.evidence = m.evidence || [];
        m.evidence.unshift(newEvidence);
      }
      next.trustTimeline.unshift({
        id: `tl_${Date.now()}`,
        day: next.currentDay || 7,
        timestamp: new Date().toLocaleString(),
        actor: currentUser.fullName,
        role: 'Freelancer',
        type: 'deliverable_submitted',
        title: `Deliverables Submitted for Milestone 1 (${evidenceTitle})`,
        description: `Uploaded evidence files and live preview link for client review and AI verification.`,
      });
      return next;
    });

    setIsSubmitting(false);
    navigate('/ai-verification');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-3 border-b border-stone-200">
        <div className="flex items-center space-x-2">
          <UploadCloud className="w-5 h-5 text-emerald-700" />
          <h1 className="text-2xl font-black text-stone-900">Submit Milestone Deliverables</h1>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Upload screenshots, PDFs, documents, or supply GitHub and live prototype URLs to Supabase Storage.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6">
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div>
            <label className="block font-bold text-stone-800 mb-1">Select Target Milestone</label>
            <select
              value={milestoneId}
              onChange={(e) => setMilestoneId(e.target.value)}
              className="w-full p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
            >
              {project.milestones.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title} (${m.budget.toFixed(2)} USD • Due Day {m.endDay})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-stone-800 mb-1">Deliverable Title / Summary</label>
            <input
              type="text"
              required
              value={evidenceTitle}
              onChange={(e) => setEvidenceTitle(e.target.value)}
              className="w-full p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-800 mb-1">Live URL or GitHub Repository</label>
            <div className="relative">
              <LinkIcon className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="url"
                value={evidenceUrl}
                onChange={(e) => setEvidenceUrl(e.target.value)}
                placeholder="https://github.com/... or https://figma.com/..."
                className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* File Upload Box */}
          <div>
            <label className="block font-bold text-stone-800 mb-1">
              Upload Files (Screenshots, PDFs, Zips) — Supabase Storage
            </label>
            <div className="p-6 border-2 border-dashed border-stone-300 hover:border-emerald-600 rounded-xl bg-stone-50/50 hover:bg-emerald-50/20 text-center transition-all cursor-pointer">
              <UploadCloud className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <input
                type="file"
                id="file-upload"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="font-bold text-emerald-800 hover:underline">Click to browse files</span>
                <span className="text-stone-500"> or drag and drop</span>
                <div className="text-[10px] text-stone-400 mt-1">PNG, JPG, PDF, ZIP up to 50MB</div>
              </label>
              {selectedFile && (
                <div className="mt-3 p-2 bg-white border border-stone-200 rounded-lg inline-flex items-center space-x-2 text-stone-800 font-semibold text-xs">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span>{selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-800 mb-1">Implementation Notes for Client</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center space-x-2 text-stone-600">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>AI Verification will evaluate criteria immediately upon submission.</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2 text-xs"
          >
            <span>{isSubmitting ? 'Uploading to Supabase & Verifying...' : 'Submit Deliverable & Trigger AI Audit'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
