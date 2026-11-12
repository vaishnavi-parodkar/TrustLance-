import React, { useState } from 'react';
import { DollarSign, ShieldCheck, Scale, ArrowRight, Calculator } from 'lucide-react';
import { calculateDelayDeduction } from '../services/delayAttributionEngine';
import { Link } from 'react-router-dom';

export default function PaymentDeductionPage() {
  const [calcBudget, setCalcBudget] = useState(150);
  const [calcDays, setCalcDays] = useState(3);
  const [calcRate, setCalcRate] = useState(1.0);
  const [calcMaxCap, setCalcMaxCap] = useState(10.0);

  const calcResult = calculateDelayDeduction({
    milestoneBudget: calcBudget,
    freelancerAttributableDays: calcDays,
    ratePerDayPct: calcRate,
    maxDeductionPct: calcMaxCap,
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="pb-3 border-b border-stone-200">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-emerald-700" />
          <h1 className="text-2xl font-black text-stone-900">Contractual Payment Deduction Breakdown</h1>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Deterministic financial mathematical formulation per Section 8.C of TRUSTLANCE Specification.
        </p>
      </div>

      {/* Mathematical Formulation Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-5 text-xs">
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
          <span className="text-[10px] font-mono font-bold text-emerald-900 uppercase">OFFICIAL FORMULA</span>
          <div className="text-lg sm:text-xl font-mono font-bold text-emerald-950">
            D = min(M × 0.01 × L, M × 0.10)
          </div>
          <div className="text-base font-mono font-bold text-emerald-800">
            P = M - D
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] text-emerald-900">
            <div><strong>M:</strong> Milestone Budget</div>
            <div><strong>L:</strong> Attributable Late Days</div>
            <div><strong>D:</strong> Calculated Deduction</div>
            <div><strong>P:</strong> Net Payable Amount</div>
          </div>
        </div>

        {/* Safeguards Summary */}
        <div className="space-y-2 pt-1">
          <h3 className="font-bold text-stone-900 text-sm">Vital Financial Safeguards</h3>
          <ul className="space-y-1.5 text-stone-600 leading-relaxed">
            <li className="flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Affected Milestone Only:</strong> Deductions are evaluated solely against the $150 UI Design milestone, never the total $600 project budget.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>10% Maximum Cap:</strong> No matter how many days a milestone is delayed, the penalty cannot exceed 10% of that milestone.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Zero Penalty for Client Delays:</strong> Client review lags are explicitly excluded (L = 0 for client-caused days).
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Deterministic Precision:</strong> Calculations are strictly performed by JavaScript/PostgreSQL arithmetic, never by LLM hallucinations.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Interactive Live Formula Calculator for Judges */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-5 text-xs">
        <div className="flex items-center space-x-2 text-stone-900 font-bold text-sm pb-2 border-b border-stone-200">
          <Calculator className="w-5 h-5 text-emerald-700" />
          <span>Interactive Formula Simulator for Hackathon Judges</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Milestone Budget (M in USD)
            </label>
            <input
              type="number"
              min={10}
              value={calcBudget}
              onChange={(e) => setCalcBudget(Number(e.target.value))}
              className="w-full p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-semibold"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Freelancer Late Days (L)
            </label>
            <input
              type="number"
              min={0}
              max={60}
              value={calcDays}
              onChange={(e) => setCalcDays(Number(e.target.value))}
              className="w-full p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-semibold"
            />
          </div>
        </div>

        {/* Calculation Result Card */}
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-2 bg-white rounded-lg border border-stone-200">
            <span className="text-stone-500 font-medium">Applied Deduction (D)</span>
            <div className="text-xl font-black text-amber-700 mt-1">
              -${calcResult.deductionAmount.toFixed(2)} USD
            </div>
            <div className="text-[10px] text-stone-500 mt-0.5">
              {calcResult.deductionPct}% {calcResult.isCapped ? '(10% Cap Reached)' : ''}
            </div>
          </div>

          <div className="p-2 bg-white rounded-lg border border-stone-200">
            <span className="text-stone-500 font-medium">10% Maximum Cap Ceiling</span>
            <div className="text-xl font-black text-stone-700 mt-1">
              ${calcResult.maxCapAmount.toFixed(2)} USD
            </div>
            <div className="text-[10px] text-stone-500 mt-0.5">Absolute Limit</div>
          </div>

          <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200">
            <span className="text-emerald-800 font-medium">Net Payable to Freelancer (P)</span>
            <div className="text-xl font-black text-emerald-800 mt-1">
              ${calcResult.netPayableAmount.toFixed(2)} USD
            </div>
            <div className="text-[10px] text-emerald-700 mt-0.5">Ready for PayPal Release</div>
          </div>
        </div>

        {/* Quick Presets for Demo Scenarios */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-stone-500 font-semibold">Test Scenario Presets:</span>
          <button
            onClick={() => {
              setCalcBudget(150);
              setCalcDays(3);
            }}
            className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded font-semibold text-stone-700 transition-colors"
          >
            Scenario A (3 Days: -$4.50)
          </button>
          <button
            onClick={() => {
              setCalcBudget(150);
              setCalcDays(0);
            }}
            className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded font-semibold text-stone-700 transition-colors"
          >
            Scenario B (0 Days: $0.00)
          </button>
          <button
            onClick={() => {
              setCalcBudget(150);
              setCalcDays(15);
            }}
            className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded font-semibold text-stone-700 transition-colors"
          >
            Extreme Delay (15 Days: Capped at -$15.00)
          </button>
        </div>
      </div>
    </div>
  );
}
