import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProject } from '../../context/ProjectContext';
import {
  Sparkles,
  UserCheck,
  RotateCcw,
  Clock,
  DollarSign,
  FileCode,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function JudgeDemoBar() {
  const { currentUser, switchRole, isClient } = useAuth();
  const { activeScenario, runScenario, resetAll, project } = useProject();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleScenarioClick = (key, route) => {
    runScenario(key);
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-5xl bg-stone-900/95 backdrop-blur-md text-white rounded-2xl shadow-elevated border border-stone-700/80 p-3 transition-all duration-300">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Hackathon Tag & Role Switcher */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-lg text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JUDGE DEMO BAR</span>
          </div>

          <div className="flex items-center space-x-1 bg-stone-800 rounded-lg p-1 border border-stone-700">
            <button
              onClick={() => switchRole('client')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors flex items-center space-x-1.5 ${
                isClient
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Alex (Client)</span>
            </button>
            <button
              onClick={() => switchRole('freelancer')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors flex items-center space-x-1.5 ${
                !isClient
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Jordan (Freelancer)</span>
            </button>
          </div>
        </div>

        {/* Middle: 4 Hackathon Demo Scenarios */}
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-x-auto py-1 text-xs">
            <button
              onClick={() => handleScenarioClick('A', '/delay-attribution')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 shrink-0 ${
                activeScenario === 'A'
                  ? 'bg-amber-500/30 text-amber-300 border border-amber-500/60 shadow-sm'
                  : 'bg-stone-800/80 text-stone-300 hover:bg-stone-750 border border-stone-700'
              }`}
              title="UI delivered Day 7 instead of Day 4 -> 3% ($4.50) deduction -> PayPal $145.50"
            >
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              <span>Scenario A: Freelancer Delay (-$4.50)</span>
            </button>

            <button
              onClick={() => handleScenarioClick('B', '/delay-attribution')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 shrink-0 ${
                activeScenario === 'B'
                  ? 'bg-blue-500/30 text-blue-300 border border-blue-500/60 shadow-sm'
                  : 'bg-stone-800/80 text-stone-300 hover:bg-stone-750 border border-stone-700'
              }`}
              title="Client review lag -> 0% penalty -> Full $150 payable"
            >
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Scenario B: Client Delay ($0)</span>
            </button>

            <button
              onClick={() => handleScenarioClick('C', '/change-request')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 shrink-0 ${
                activeScenario === 'C'
                  ? 'bg-purple-500/30 text-purple-300 border border-purple-500/60 shadow-sm'
                  : 'bg-stone-800/80 text-stone-300 hover:bg-stone-750 border border-stone-700'
              }`}
              title="Client adds Dark Mode -> AI classifies as New Scope -> +$110 Amendment"
            >
              <FileCode className="w-3.5 h-3.5 text-purple-400" />
              <span>Scenario C: Scope Change (+110)</span>
            </button>

            <button
              onClick={() => handleScenarioClick('D', '/dispute-copilot')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 shrink-0 ${
                activeScenario === 'D'
                  ? 'bg-rose-500/30 text-rose-300 border border-rose-500/60 shadow-sm'
                  : 'bg-stone-800/80 text-stone-300 hover:bg-stone-750 border border-stone-700'
              }`}
              title="Client disputes deliverable -> Neutral AI evidence report & options"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Scenario D: Dispute Copilot</span>
            </button>
          </div>
        )}

        {/* Right: Reset & Collapse Toggle */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => {
              resetAll();
              navigate('/workspace');
            }}
            className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
            title="Reset to initial project state"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
            title={collapsed ? 'Expand Demo Bar' : 'Collapse Demo Bar'}
          >
            {collapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
