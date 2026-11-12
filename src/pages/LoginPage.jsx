import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, ArrowRight, UserCheck, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const { loginAs, switchRole } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCustomLogin = (e) => {
    e.preventDefault();
    if (email.includes('freelancer') || email.includes('jordan')) {
      switchRole('freelancer');
      navigate('/freelancer-dashboard');
    } else {
      switchRole('client');
      navigate('/client-dashboard');
    }
  };

  const handleQuickDemo = (role) => {
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
          <h2 className="text-2xl font-black text-stone-900">Sign in to TRUSTLANCE</h2>
          <p className="text-xs text-stone-500 mt-1">Work delivered. Payments deserved.</p>
        </div>

        {/* 1-Click Judge Quick Login Options */}
        <div className="space-y-3 mb-6 p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80">
          <div className="text-xs font-bold text-emerald-900">Judge Demonstration 1-Click Access:</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('client')}
              className="p-2.5 bg-white border border-emerald-300 hover:bg-emerald-100/50 rounded-lg text-left transition-all shadow-2xs"
            >
              <div className="text-xs font-bold text-stone-900 flex items-center space-x-1">
                <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Alex Morgan</span>
              </div>
              <div className="text-[10px] text-emerald-800 font-semibold mt-0.5">Role: Client</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('freelancer')}
              className="p-2.5 bg-white border border-emerald-300 hover:bg-emerald-100/50 rounded-lg text-left transition-all shadow-2xs"
            >
              <div className="text-xs font-bold text-stone-900 flex items-center space-x-1">
                <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Jordan Lee</span>
              </div>
              <div className="text-[10px] text-emerald-800 font-semibold mt-0.5">Role: Freelancer</div>
            </button>
          </div>
        </div>

        <div className="relative my-6 text-center text-xs text-stone-400 before:absolute before:inset-0 before:top-1/2 before:border-t before:border-stone-200">
          <span className="relative bg-white px-2">or continue with credentials</span>
        </div>

        <form onSubmit={handleCustomLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">Email address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.morgan@client.demo"
                className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-stone-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-emerald-700 font-semibold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
