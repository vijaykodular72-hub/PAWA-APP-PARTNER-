import { Search, Filter, Plus, Phone, Mail, MoreHorizontal } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

const statuses = [
  'New', 'Contacted', 'Interested', 'Demo Given', 'Documents Pending', 
  'Registered', 'Verified', 'Website Published', 'Active', 'Lost', 'Rejected'
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
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Lead Management</h1>
          <p className="text-slate-500 text-sm">Track and manage your prospective salons through the pipeline.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-800 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Lead
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Add New Lead</h2>
            <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-slate-600">Close</button>
          </div>
          <form className="grid sm:grid-cols-2 md:grid-cols-3 gap-6" onSubmit={(e) => { e.preventDefault(); setShowAddForm(false); }}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Shop Name</label>
              <input required type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm" placeholder="e.g. Looks Salon" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Owner Name</label>
              <input required type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm" placeholder="e.g. Rahul Sharma" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Mobile Number</label>
              <input required type="tel" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm" placeholder="10-digit number" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Area</label>
              <input required type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm" placeholder="e.g. Baner" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Initial Status</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm">
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
              </select>
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                Save Lead
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search leads by name, owner, or area..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 outline-none">
              <option value="">All Statuses</option>
              {statuses.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button className="flex items-center justify-center px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Lead Details</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Area</th>
                <th className="px-6 py-4">Added On</th>
                <th className="px-6 py-4">Status Pipeline</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{lead.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{lead.owner}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-slate-600 mb-1">
                      <Phone className="w-3 h-3 mr-1.5" />
                      {lead.mobile}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-900 font-medium">{lead.area}</td>
                  <td className="px-6 py-4 text-slate-500">{lead.date}</td>
                  <td className="px-6 py-4">
                    <select 
                      defaultValue={lead.status}
                      className={cn(
                        "text-xs font-medium px-2 py-1.5 rounded-md border outline-none cursor-pointer",
                        lead.status === 'Active' || lead.status === 'Website Published' || lead.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        lead.status === 'Lost' || lead.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                        'bg-indigo-50 text-indigo-700 border-indigo-200'
                      )}
                    >
                      {statuses.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreHorizontal className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
