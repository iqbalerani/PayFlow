
import React from 'react';
import { Invoice, MilestoneStatus } from '../types';

interface PaymentsViewProps {
  invoices: Invoice[];
}

const PaymentsView: React.FC<PaymentsViewProps> = ({ invoices }) => {
  const inEscrow = invoices.reduce((acc, inv) => {
    return acc + inv.milestones
      .filter(m => m.status === MilestoneStatus.PAID)
      .reduce((sum, m) => sum + m.amount, 0);
  }, 0);

  const totalReleased = invoices.reduce((acc, inv) => {
    return acc + inv.milestones
      .filter(m => m.status === MilestoneStatus.RELEASED)
      .reduce((sum, m) => sum + m.amount, 0);
  }, 0);

  const transactions = invoices.flatMap(inv => 
    inv.milestones
      .filter(m => m.status !== MilestoneStatus.PENDING)
      .map(m => ({
        id: m.id,
        invoiceId: inv.id,
        title: `${inv.title} - ${m.title}`,
        client: inv.client_name,
        amount: m.amount,
        status: m.status,
        date: m.released_at || m.paid_at || inv.created_at
      }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">💰 Payments & Escrow</h2>
        <button className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline">
          <i className="fa-solid fa-file-export"></i> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-widest">Locked in Escrow</p>
            <h3 className="text-4xl font-black">{inEscrow.toLocaleString()} <span className="text-lg font-bold text-slate-500">MNEE</span></h3>
            <p className="text-xs text-blue-400 mt-4 flex items-center gap-2">
              <i className="fa-solid fa-shield-halved"></i> Secured by smart contracts
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm font-medium mb-2 uppercase tracking-widest">Total Released</p>
          <h3 className="text-4xl font-black text-slate-900">{totalReleased.toLocaleString()} <span className="text-lg font-bold text-slate-300">MNEE</span></h3>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-6 overflow-hidden">
            <div 
              className="h-full bg-green-500" 
              style={{ width: `${(totalReleased / (totalReleased + inEscrow || 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Transaction History</h3>
          <div className="flex gap-2">
            <select className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg p-2 outline-none">
              <option>All Assets</option>
              <option>MNEE</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Transaction</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900 text-sm">{tx.title}</p>
                    <p className="text-[10px] font-mono text-slate-400">{tx.invoiceId}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{tx.client}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      tx.status === MilestoneStatus.RELEASED ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">
                    +{tx.amount} <span className="text-[10px] text-slate-400">MNEE</span>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-slate-400">
                    <i className="fa-solid fa-receipt text-3xl mb-4 block opacity-20"></i>
                    No transaction history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsView;
