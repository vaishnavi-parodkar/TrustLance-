import React from 'react';
import { useProject } from '../context/ProjectContext';
import { History, CreditCard, DollarSign, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TransactionHistoryPage() {
  const { project } = useProject();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200">
        <div>
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-emerald-700" />
            <h1 className="text-2xl font-black text-stone-900">PayPal Transaction History & Audit Ledger</h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Section 11 Engine: Transparent ledger separating gross budgets, delay deductions, and net captured payouts.
          </p>
        </div>

        <Link
          to="/paypal-checkout"
          className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center space-x-1.5"
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>New Milestone Payment</span>
        </Link>
      </div>

      {project.transactions.length > 0 ? (
        <div className="space-y-4">
          {project.transactions.map((tx, idx) => (
            <div
              key={tx.transactionId || idx}
              className="bg-white rounded-2xl border border-stone-200 shadow-card p-6 space-y-4 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200">
                <div className="flex items-center space-x-2.5">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  </span>
                  <div>
                    <span className="font-bold text-stone-900 text-sm">{tx.milestoneTitle}</span>
                    <div className="text-stone-500 text-[11px] mt-0.5">
                      Capture ID: <span className="font-mono">{tx.transactionId}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-black text-emerald-800">
                    ${Number(tx.netAmount).toFixed(2)} USD
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                    {tx.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-500 font-medium">Gross Milestone Budget:</span>
                  <div className="font-bold text-stone-900 mt-0.5">
                    ${Number(tx.originalAmount || tx.financials?.grossMilestoneAmount || 150).toFixed(2)} USD
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-amber-800 font-medium">Delay Deduction (3%):</span>
                  <div className="font-bold text-amber-700 mt-0.5">
                    -${Number(tx.deductionAmount || tx.financials?.contractualDelayDeduction || 0).toFixed(2)} USD
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-500 font-medium">Payer (Client):</span>
                  <div className="font-bold text-stone-900 mt-0.5">Alex Morgan</div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-500 font-medium">Payee (Freelancer):</span>
                  <div className="font-bold text-emerald-700 mt-0.5">Jordan Lee</div>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500">
                <span>Recorded: {tx.formattedDate || new Date(tx.timestamp).toLocaleString()}</span>
                <span className="font-mono text-[10px] text-emerald-700">VERIFIED PAYPAL SANDBOX CAPTURE</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-12 text-center text-xs space-y-3">
          <CreditCard className="w-12 h-12 text-stone-400 mx-auto" />
          <h3 className="font-bold text-stone-800 text-base">No Captured Transactions Yet</h3>
          <p className="text-stone-500 max-w-sm mx-auto">
            Once Alex Morgan approves a submitted deliverable, you can trigger PayPal Checkout to capture the payment.
          </p>
          <Link
            to="/delay-attribution"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg transition-colors shadow-sm"
          >
            <span>Proceed to Deliverable Review & Checkout</span>
          </Link>
        </div>
      )}
    </div>
  );
}
