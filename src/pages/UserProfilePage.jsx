import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useProject } from '../context/ProjectContext';
import {
  User,
  ShieldCheck,
  CreditCard,
  Sparkles,
  Calendar,
  CheckCircle2,
  UserCheck,
} from 'lucide-react';

export default function UserProfilePage() {
  const { currentUser, switchRole, isClient } = useAuth();
  const { project } = useProject();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-3 border-b border-stone-200">
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-emerald-700" />
          <h1 className="text-2xl font-black text-stone-900">User Profile & Account Settings</h1>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Manage your verified credentials, PayPal payout accounts, and hackathon judge role perspective.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-6 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div className="flex items-center space-x-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.fullName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600 shadow-sm"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-stone-900">{currentUser.fullName}</h2>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full capitalize">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-stone-500 text-xs mt-0.5">{currentUser.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => switchRole(isClient ? 'freelancer' : 'client')}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl transition-colors flex items-center space-x-1.5"
            >
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <span>Switch to {isClient ? 'Jordan Lee (Freelancer)' : 'Alex Morgan (Client)'}</span>
            </button>
          </div>
        </div>

        {/* Credentials & Payouts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <span className="font-bold text-stone-800 flex items-center space-x-1.5">
              <CreditCard className="w-4 h-4 text-emerald-700" />
              <span>PayPal Sandbox Payout Account</span>
            </span>
            <div className="font-mono text-stone-900 text-xs bg-white p-2.5 rounded-lg border border-stone-300">
              {currentUser.paypalEmail}
            </div>
            <div className="text-[10px] text-stone-500">
              Configured for automated sandbox orders and payouts.
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <span className="font-bold text-stone-800 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Trust & Reliability Rating</span>
            </span>
            <div className="text-2xl font-black text-emerald-700 mt-1">
              {currentUser.reliabilityScore}%
            </div>
            <div className="text-[10px] text-stone-500">
              Calculated from delivery punctuality and verified milestone completions.
            </div>
          </div>
        </div>

        {/* System Diagnostic Status */}
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
          <div className="font-bold text-stone-900 text-sm">Active Platform Architecture Status</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-2 text-stone-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span><strong>Bryntum Gantt:</strong> Operational (v7.3.8)</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span><strong>AI Providers:</strong> Groq LLaMA 3.3 70B & Gemini Fallback</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span><strong>PayPal Sandbox:</strong> Orders & Capture APIs Enabled</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span><strong>Supabase PostgreSQL:</strong> 24 Tables & Audited Ledger</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
