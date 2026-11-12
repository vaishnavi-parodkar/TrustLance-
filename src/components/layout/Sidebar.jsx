import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  Sparkles,
  FileCheck2,
  FileText,
  UploadCloud,
  CheckSquare,
  RefreshCw,
  GitPullRequest,
  TrendingUp,
  Clock,
  DollarSign,
  CreditCard,
  History,
  Scale,
  User,
  History as TimelineIcon,
} from 'lucide-react';

export default function Sidebar() {
  const { isClient } = useAuth();
  const location = useLocation();

  const navSections = [
    {
      label: 'Platform Hub',
      items: [
        {
          to: isClient ? '/client-dashboard' : '/freelancer-dashboard',
          label: isClient ? 'Client Dashboard' : 'Freelancer Dashboard',
          icon: LayoutDashboard,
        },
        {
          to: '/workspace',
          label: 'Bryntum Gantt Workspace',
          icon: Calendar,
          badge: 'Bryntum',
        },
      ],
    },
    {
      label: 'AI Agreements & Terms',
      items: [
        {
          to: '/agreement-generator',
          label: 'AI Agreement Generator',
          icon: Sparkles,
          badge: 'AI',
        },
        {
          to: '/agreement-review',
          label: 'Agreement Review & Sign',
          icon: FileCheck2,
        },
        {
          to: '/amendment-history',
          label: 'Amendment History',
          icon: FileText,
        },
      ],
    },
    {
      label: 'Milestones & Evidence',
      items: [
        {
          to: '/milestone/m1',
          label: 'Milestone 1: UI Design',
          icon: CheckSquare,
        },
        {
          to: '/deliverable-submission',
          label: 'Submit Deliverables',
          icon: UploadCloud,
        },
        {
          to: '/ai-verification',
          label: 'AI Verification Report',
          icon: Sparkles,
          badge: 'Advisory',
        },
        {
          to: '/revision-request',
          label: 'Revision Request',
          icon: RefreshCw,
        },
      ],
    },
    {
      label: 'Scope Changes & Impact',
      items: [
        {
          to: '/change-request',
          label: 'Submit Change Request',
          icon: GitPullRequest,
        },
        {
          to: '/change-impact',
          label: 'AI Scope Classification',
          icon: TrendingUp,
          badge: 'AI',
        },
        {
          to: '/change-negotiation',
          label: 'Negotiate & Approve',
          icon: FileCheck2,
        },
      ],
    },
    {
      label: 'Delays & Deductions',
      items: [
        {
          to: '/schedule-recovery',
          label: 'AI Schedule Recovery',
          icon: Clock,
          badge: 'Day 21',
        },
        {
          to: '/delay-attribution',
          label: 'Delay Attribution Report',
          icon: Scale,
        },
        {
          to: '/payment-deduction',
          label: 'Fair Payment Deduction',
          icon: DollarSign,
          badge: 'Formula',
        },
      ],
    },
    {
      label: 'Payments & Neutral Trust',
      items: [
        {
          to: '/paypal-checkout',
          label: 'PayPal Sandbox Checkout',
          icon: CreditCard,
          badge: 'PayPal',
        },
        {
          to: '/transactions',
          label: 'Transaction History',
          icon: History,
        },
        {
          to: '/dispute-copilot',
          label: 'AI Dispute Copilot',
          icon: Scale,
          badge: 'AI',
        },
        {
          to: '/profile',
          label: 'Profile & Settings',
          icon: User,
        },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-stone-200 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between shrink-0 hidden md:block">
      <div className="space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx}>
            <div className="px-3 text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-2">
              {section.label}
            </div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/60 shadow-subtle'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-700' : 'text-stone-500'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                          item.badge === 'PayPal'
                            ? 'bg-blue-100 text-blue-800'
                            : item.badge === 'Bryntum'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.badge === 'AI'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Trust Badge at bottom of sidebar */}
      <div className="mt-8 pt-4 border-t border-stone-200 text-center">
        <div className="text-[11px] text-stone-600 font-medium">TRUSTLANCE Protocol v1.0</div>
        <div className="text-[10px] text-stone-600 mt-0.5">PayPal × AI Hackathon 2026</div>
      </div>
    </aside>
  );
}
