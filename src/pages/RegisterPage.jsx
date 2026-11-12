import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, ArrowRight, UserCheck, Briefcase } from 'lucide-react';

export default function RegisterPage() {
  const { switchRole } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('client');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    switchRole(role);
    navigate(role === 'client' ? '/client-dashboard' : '/freelancer-dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-stone-50">
      <div className="max-w-md w-full bg-white rounded-2xl border border-stone-200 shadow-card p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-emerald-900 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-stone-900">Create TRUSTLANCE Account</h2>
          <p className="text-xs text-stone-500 mt-1">Select your primary role to continue</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          {/* Role Selection Tabs */}
          <div>
            <label className="block font-semibold text-stone-700 mb-2">Account Role</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('client')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  role === 'client'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600/20'
                    : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Briefcase className="w-4 h-4 mb-1 text-emerald-700" />
                <div className="font-bold">Client</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Hire, escrow & review</div>
              </button>

              <button
                type="button"
                onClick={() => setRole('freelancer')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  role === 'freelancer'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600/20'
                    : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                <UserCheck className="w-4 h-4 mb-1 text-emerald-700" />
                <div className="font-bold">Freelancer</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Deliver & get paid</div>
              </button>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={role === 'client' ? 'Alex Morgan' : 'Jordan Lee'}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === 'client' ? 'alex.morgan@client.demo' : 'jordan.lee@freelance.demo'}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg transition-colors flex items-center justify-center space-x-1.5 shadow-sm mt-4"
          >
            <span>Complete Registration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-stone-500">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-700 font-semibold hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
