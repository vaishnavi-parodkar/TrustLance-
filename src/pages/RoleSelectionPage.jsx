import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';

export default function RoleSelectionPage() {
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    switchRole(role);
    navigate(role === 'client' ? '/client-dashboard' : '/freelancer-dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-stone-50">
      <div className="max-w-xl w-full bg-white rounded-2xl border border-stone-200 shadow-card p-8 text-center">
        <div className="w-12 h-12 bg-emerald-900 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-black text-stone-900">Choose Your Perspective</h2>
        <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
          Explore TRUSTLANCE as either a Client safeguarding project delivery or a Freelancer earning protected payments.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <div
            onClick={() => handleSelectRole('client')}
            className="p-6 rounded-2xl border-2 border-stone-200 hover:border-emerald-600 bg-stone-50/50 hover:bg-emerald-50/30 cursor-pointer transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-stone-900">Alex Morgan (Client)</h3>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                Create projects, review AI verification, request scope changes, and approve PayPal payouts.
              </p>
            </div>
            <div className="mt-4 flex items-center space-x-1.5 text-xs font-bold text-emerald-800 group-hover:translate-x-1 transition-transform">
              <span>Enter Client Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => handleSelectRole('freelancer')}
            className="p-6 rounded-2xl border-2 border-stone-200 hover:border-emerald-600 bg-stone-50/50 hover:bg-emerald-50/30 cursor-pointer transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-stone-900">Jordan Lee (Freelancer)</h3>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                Submit evidence, view AI schedule recovery in Bryntum Gantt, negotiate scope, and receive payments.
              </p>
            </div>
            <div className="mt-4 flex items-center space-x-1.5 text-xs font-bold text-emerald-800 group-hover:translate-x-1 transition-transform">
              <span>Enter Freelancer Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
