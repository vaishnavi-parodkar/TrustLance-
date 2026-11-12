import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Calendar,
  DollarSign,
  Scale,
  CheckCircle2,
  Lock,
  Layers,
  FileCheck2,
  TrendingUp,
} from 'lucide-react';

export default function LandingPage() {
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = (role) => {
    switchRole(role);
    if (role === 'client') {
      navigate('/client-dashboard');
    } else {
      navigate('/freelancer-dashboard');
    }
  };

  const problemsAndSolutions = [
    {
      num: '01',
      problem: 'Unclear project requirements & scope drift',
      solution: 'AI Smart Agreement Generator',
      desc: 'Transforms natural language project descriptions into structured contracts with concrete milestones, acceptance criteria, revision rounds, and delay policies.',
      icon: Sparkles,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      num: '02',
      problem: 'Incomplete or disputed deliverables',
      solution: 'AI Deliverable Verification',
      desc: 'Compares submitted screenshots, documents, GitHub repositories, and live URLs against original criteria without hallucination.',
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      num: '03',
      problem: 'Client-requested changes disrupting deadlines',
      solution: 'AI Scope Sentinel',
      desc: 'Distinguishes in-scope defect corrections from new scope. Estimates cost/time impact and generates formal contract amendments before schedule changes occur.',
      icon: Layers,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      num: '04',
      problem: 'Freelancer delays & missed commitments',
      solution: 'AI Schedule Recovery & Bryntum Gantt',
      desc: 'Attempts to recover lost time targeting the original delivery deadline (Day 21) via parallel execution and dependency compression in interactive Bryntum Gantt.',
      icon: Calendar,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      num: '05',
      problem: 'Unfair payment deductions & disputes',
      solution: 'Fair Delay Attribution & PayPal Sandbox',
      desc: 'Applies transparent formula D = min(M * 0.01 * L, M * 0.10) for freelancer-caused days only (0% for client review lag), paired with PayPal Orders & Captures.',
      icon: DollarSign,
      color: 'text-emerald-700',
      bg: 'bg-emerald-100',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-stone-200 bg-gradient-to-b from-stone-100/60 to-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>PayPal × AI Hackathon 2026 Submission</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-tight max-w-4xl mx-auto">
            Work delivered. <br className="hidden sm:inline" />
            <span className="text-emerald-800">Payments deserved.</span>
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            The AI-powered freelance trust, scheduling, and payment platform that protects client delivery commitments while guaranteeing freelancers are paid fairly for accepted work.
          </p>

          {/* Call to Actions & Demo Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleDemoLogin('client')}
              className="px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl shadow-card transition-all flex items-center space-x-2 text-sm"
            >
              <span>Judge Demo: Enter as Alex Morgan (Client)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleDemoLogin('freelancer')}
              className="px-6 py-3.5 bg-white hover:bg-stone-100 text-stone-800 font-bold rounded-xl border border-stone-300 shadow-sm transition-all flex items-center space-x-2 text-sm"
            >
              <span>Enter as Jordan Lee (Freelancer)</span>
            </button>
          </div>

          {/* Key Integrations Bar */}
          <div className="mt-12 pt-8 border-t border-stone-200/80 flex flex-wrap items-center justify-center gap-8 text-xs text-stone-500 font-medium">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-stone-800">PayPal Developer Platform:</span>
              <span>Orders & Capture API</span>
            </div>
            <span className="text-stone-300">•</span>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-stone-800">Bryntum Gantt:</span>
              <span>Official React Timeline & Baselines</span>
            </div>
            <span className="text-stone-300">•</span>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-stone-800">AI Intelligence:</span>
              <span>Groq LLaMA 3.3 70B & Gemini</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Real-World Problems Solved */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
            The Trust Dilemma
          </div>
          <h2 className="text-3xl font-black text-stone-900">
            5 Critical Problems Broken Contracts Create
          </h2>
          <p className="mt-2 text-stone-600 text-sm">
            TRUSTLANCE eliminates the gray zone between clients and freelancers through deterministic financial rules and advisory AI workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemsAndSolutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-card hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-stone-400">PROBLEM {item.num}</span>
                    <div className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mb-1">{item.problem}</h3>
                  <div className="text-xs font-bold text-emerald-800 mb-2">Solution: {item.solution}</div>
                  <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}

          {/* Quick Scenario Spotlight Card */}
          <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-card flex flex-col justify-between border border-stone-800">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400">FEATURED HACKATHON DEMO</span>
              <h3 className="text-base font-bold mt-2">Scenario A: Freelancer Delay & Recovery</h3>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                UI Design delivered on Day 7 instead of Day 4. AI preserves the Day 21 deadline by parallelizing Frontend and Backend on Days 12–13. Formula applies a 3% deduction (-$4.50), releasing $145.50 via PayPal Sandbox.
              </p>
            </div>
            <Link
              to="/delay-attribution"
              className="mt-4 inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
            >
              <span>Explore Scenario A Workflow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-stone-200 text-center text-xs text-stone-500 bg-white">
        <p>© 2026 TRUSTLANCE. Built for PayPal × AI Hackathon. Work delivered. Payments deserved.</p>
      </footer>
    </div>
  );
}
