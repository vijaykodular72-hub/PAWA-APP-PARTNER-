import { Search, Filter, Plus, Phone, Mail, MoreHorizontal, LayoutDashboard, Target } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { motion } from 'motion/react';

const statuses = [
  'New', 'Contacted', 'Meeting Scheduled', 'Demo Given', 'Interested', 
  'Documents Pending', 'Shop Registered', 'Verification', 'Website Setup', 'Training', 'Active', 'Lost', 'Rejected'
];

const mockLeads = [
  { id: 1, name: 'Elegance Spa', owner: 'Priya Singh', mobile: '+91 9988776655', area: 'Viman Nagar', date: 'Oct 14, 2023', status: 'Interested' },
  { id: 2, name: 'Mens Grooming Room', owner: 'Vikram Joshi', mobile: '+91 9988774433', area: 'Kalyani Nagar', date: 'Oct 13, 2023', status: 'Demo Given' },
  { id: 3, name: 'Looks Salon', owner: 'Anita Desai', mobile: '+91 8877665544', area: 'Aundh', date: 'Oct 12, 2023', status: 'Documents Pending' },
  { id: 4, name: 'The Hair Story', owner: 'Suresh Kumar', mobile: '+91 7766554433', area: 'Hinjewadi', date: 'Oct 10, 2023', status: 'New' },
];

export default function Leads() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 max-w-[1600px] mx-auto pb-24 px-4 sm:px-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Lead Pipeline</h1>
          <p className="text-slate-500 font-medium">Track and manage your prospective salons through the growth pipeline.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all flex items-center shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Shop Lead
        </button>
      </div>

      {/* Pipeline Funnel Visualization */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-2 overflow-x-auto pb-4">
        {statuses.slice(0, 8).map((status, i) => (
            <div key={status} className={cn("flex-1 min-w-[120px] text-center p-3 rounded-xl", i === 0 ? "bg-indigo-50 border border-indigo-100" : "bg-slate-50")}>
                <p className="text-[10px] font-black uppercase text-slate-400">{status}</p>
                <p className="text-lg font-black text-slate-900">{Math.floor(Math.random() * 10) + 2}</p>
            </div>
        ))}
      </div>

      {showAddForm && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black text-slate-900">Add New Shop</h2>
            <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-slate-600 font-bold">Close</button>
          </div>
          <form className="grid sm:grid-cols-2 md:grid-cols-3 gap-6" onSubmit={(e) => { e.preventDefault(); setShowAddForm(false); }}>
            {['Shop Name', 'Owner Name', 'WhatsApp Number', 'Area', 'Partner Code'].map((field) => (
              <div key={field} className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">{field}</label>
                <input required type="text" className="w-full px-4 py-3 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-semibold text-sm" placeholder={`e.g. ${field}`} />
              </div>
            ))}
            <div className="flex items-end">
              <button type="submit" className="w-full bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-slate-800 transition-all">
                Save Shop Lead
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search leads by name..." 
              className="w-full pl-11 pr-4 py-3 text-sm border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-semibold"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center justify-center px-6 py-3 border border-slate-200 rounded-2xl text-sm font-black text-slate-700 hover:bg-slate-50 transition-all">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-black text-xs uppercase tracking-wider">
              <tr>
                <th className="px-8 py-5">Shop Details</th>
                <th className="px-8 py-5">Contact</th>
                <th className="px-8 py-5">Pipeline Stage</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <p className="font-black text-slate-900 text-base">{lead.name}</p>
                    <p className="text-xs text-slate-500 font-semibold mt-1">{lead.owner} • {lead.area}</p>
                  </td>
                  <td className="px-8 py-6 text-slate-700 font-semibold">
                    {lead.mobile}
                  </td>
                  <td className="px-8 py-6">
                    <select 
                      defaultValue={lead.status}
                      className={cn(
                        "text-xs font-black px-4 py-2 rounded-full border outline-none cursor-pointer",
                        lead.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        'bg-indigo-50 text-indigo-700 border-indigo-200'
                      )}
                    >
                      {statuses.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-all">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
