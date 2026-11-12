import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProject } from '../../context/ProjectContext';
import {
  ShieldCheck,
  FolderGit2,
  Calendar,
  DollarSign,
  Bell,
  Scale,
  Sparkles,
} from 'lucide-react';

export default function Navbar() {
  const { currentUser, isClient, switchRole } = useAuth();
  const { project } = useProject();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-emerald-900 flex items-center justify-center text-emerald-400 shadow-sm group-hover:bg-emerald-800 transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-lg font-black tracking-tight text-stone-900">
                    TRUST<span className="text-emerald-700">LANCE</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                    PAYPAL × AI
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-medium hidden sm:block">
                  Work delivered. Payments deserved.
                </p>
              </div>
            </Link>

            {/* Project Quick Meta */}
            <div className="hidden lg:flex items-center space-x-3 pl-4 border-l border-stone-200 text-xs">
              <div className="flex items-center space-x-1.5 text-stone-700 font-semibold">
                <FolderGit2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>{project.title}</span>
              </div>
              <span className="text-stone-300">•</span>
              <div className="flex items-center space-x-1 text-stone-500">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>Day {project.currentDay} of {project.durationDays}</span>
              </div>
              <span className="text-stone-300">•</span>
              <div className="flex items-center space-x-1 text-emerald-700 font-bold">
                <DollarSign className="w-3.5 h-3.5" />
                <span>${project.budget.toFixed(2)} {project.currency}</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
            <Link
              to={isClient ? '/client-dashboard' : '/freelancer-dashboard'}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                location.pathname.includes('dashboard')
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/workspace"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                location.pathname === '/workspace'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Bryntum Gantt
            </Link>
            <Link
              to="/agreement-generator"
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1 ${
                location.pathname.includes('agreement')
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI Agreement</span>
            </Link>
            <Link
              to="/dispute-copilot"
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1 ${
                location.pathname.includes('dispute')
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-stone-500" />
              <span>Dispute Copilot</span>
            </Link>
          </nav>

          {/* User Profile & Role Switch Badge */}
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-stone-900">{currentUser.fullName}</div>
              <div className="text-[11px] text-emerald-700 font-semibold capitalize flex items-center justify-end space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>{currentUser.role} View</span>
              </div>
            </div>

            <img
              src={currentUser.avatar}
              alt={currentUser.fullName}
              className="w-9 h-9 rounded-full object-cover border-2 border-emerald-600 shadow-sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
