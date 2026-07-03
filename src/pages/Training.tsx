import { BookOpen, Video, FileText, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

const modules = [
  { id: 1, title: 'Nexora Introduction', category: 'Basics', type: 'video', duration: '5 min', completed: true },
  { id: 2, title: 'How to explain Nexora', category: 'Sales', type: 'video', duration: '12 min', completed: true },
  { id: 3, title: 'Shop Onboarding', category: 'Process', type: 'document', duration: '8 min', completed: false },
  { id: 4, title: 'Website Setup', category: 'Process', type: 'video', duration: '15 min', completed: false },
  { id: 5, title: 'QR & Payment Process', category: 'Process', type: 'document', duration: '5 min', completed: false },
  { id: 6, title: 'Commission Rules', category: 'Policy', type: 'document', duration: '10 min', completed: false },
  { id: 7, title: 'Payout Rules', category: 'Policy', type: 'document', duration: '5 min', completed: false },
  { id: 8, title: 'Fraud Policy', category: 'Policy', type: 'document', duration: '7 min', completed: false },
  { id: 9, title: 'Brand Policy', category: 'Policy', type: 'document', duration: '6 min', completed: false },
];

export default function Training() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Training Center</h1>
        <p className="text-slate-500 text-sm">Learn everything you need to know to succeed as a Nexora Growth Partner.</p>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modules.map(module => (
          <div key={module.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
             <div className={cn(
               "h-32 p-6 flex flex-col justify-end relative",
               module.type === 'video' ? "bg-indigo-900" : "bg-slate-800"
             )}>
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="bg-white/20 text-white backdrop-blur-md px-2 py-1 text-xs font-medium rounded-md">
                    {module.category}
                  </span>
                  {module.completed && (
                    <span className="bg-emerald-500 text-white px-2 py-1 text-xs font-medium rounded-md flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Done
                    </span>
                  )}
                </div>
                {module.type === 'video' ? <Video className="w-8 h-8 text-white/50 mb-2" /> : <FileText className="w-8 h-8 text-white/50 mb-2" />}
             </div>
             <div className="p-5 flex-1 flex flex-col">
               <h3 className="text-lg font-bold text-slate-900 mb-2">{module.title}</h3>
               <div className="flex items-center text-slate-500 text-sm mt-auto">
                 <BookOpen className="w-4 h-4 mr-2" />
                 {module.duration} read/watch
               </div>
               <button className={cn(
                 "mt-4 w-full py-2 rounded-xl text-sm font-medium transition-colors",
                 module.completed ? "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100" : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
               )}>
                 {module.completed ? "Review Module" : "Start Learning"}
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
