
import React, { useState } from 'react';
import { Invoice, InvoiceStatus, AppView } from '../types';

interface InvoiceListProps {
  invoices: Invoice[];
  onNavigate: (view: AppView, id?: string) => void;
}

const InvoiceList: React.FC<InvoiceListProps> = ({ invoices, onNavigate }) => {
  const [filter, setFilter] = useState<string>('all');

  const filtered = invoices.filter(inv => {
    if (filter === 'all') return true;
    return inv.status === filter;
  });

  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.COMPLETED: return 'bg-green-100 text-green-700';
      case InvoiceStatus.ACTIVE: return 'bg-blue-100 text-blue-700';
      case InvoiceStatus.PENDING: return 'bg-amber-100 text-amber-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-900">📄 My Invoices</h2>
        <button onClick={() => onNavigate('create')} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
          <i className="fa-solid fa-plus mr-2"></i> New Invoice
        </button>
      </div>

      <div className="bg-white p-2 rounded-2xl border border-slate-200 flex flex-wrap gap-2">
        {['all', 'pending', 'active', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
              filter === f ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.length > 0 ? (
          filtered.map((inv) => (
            <div 
              key={inv.id} 
              onClick={() => onNavigate('details', inv.id)}
              className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-300 transition-all hover:shadow-xl hover:shadow-slate-200/50 cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-slate-400">{inv.id}</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${getStatusColor(inv.status)}`}>
                      {inv.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{inv.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mt-2 text-sm text-slate-500">
                    <div className="flex items-center gap-1.5"><i className="fa-solid fa-user-tie text-slate-300"></i> {inv.client_name}</div>
                    <div className="flex items-center gap-1.5"><i className="fa-solid fa-layer-group text-slate-300"></i> {inv.milestones.length} Milestones</div>
                    <div className="flex items-center gap-1.5"><i className="fa-solid fa-calendar text-slate-300"></i> {new Date(inv.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:flex-col md:items-end gap-2 md:pl-6 md:border-l border-slate-100">
                  <div>
                    <p className="text-2xl font-black text-slate-900">{inv.total_amount} <span className="text-sm font-bold text-slate-400">{inv.currency}</span></p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                      <i className="fa-solid fa-copy"></i>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-3xl text-slate-300 mb-6">
              <i className="fa-solid fa-file-invoice"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-900">No invoices found</h3>
            <p className="text-slate-500 mt-2">Try changing your filters or create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceList;
