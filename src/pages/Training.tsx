import { BookOpen, Video, FileText, CheckCircle2, Sparkles, Award } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import ResourceLibrary from '../components/ResourceLibrary';

const modules = [
  { id: 1, title: 'Nexora Introduction', category: 'Basics', type: 'video', duration: '5 min', completed: true },
  { id: 2, title: 'How to explain Nexora', category: 'Sales', type: 'video', duration: '12 min', completed: true },
  { id: 3, title: 'Shop Onboarding', category: 'Process', type: 'document', duration: '8 min', completed: false },
  { id: 4, title: 'Website Setup', category: 'Process', type: 'video', duration: '15 min', completed: false },
  { id: 5, title: 'QR & Payment Process', category: 'Process', type: 'document', duration: '5 min', completed: false },
];

export default function Training() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12 max-w-[1600px] mx-auto pb-24 px-4 sm:px-6"
    >
      {/* Premium Hero */}
      <div className="relative bg-slate-950 rounded-[3rem] p-12 overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/20 via-slate-950 to-slate-950" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-orange-200 border border-white/10 font-bold text-xs uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4" />
            Premium Academy
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-4">Master Your Growth</h1>
          <p className="text-lg text-slate-300 font-medium">Learn everything you need to succeed as a Nexora Growth Partner with our structured training path.</p>
        </div>
      </div>
      
      {/* Modules */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-8">Learning Roadmap</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {modules.map((module, idx) => (
            <motion.div 
              key={module.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl transition-all"
            >
               <div className={cn(
                  "h-40 p-6 flex flex-col justify-end relative",
                  module.type === 'video' ? "bg-gradient-to-br from-indigo-600 to-violet-600" : "bg-gradient-to-br from-slate-700 to-slate-800"
               )}>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="bg-white/20 text-white backdrop-blur-md px-3 py-1 text-[10px] font-bold rounded-full tracking-wider uppercase">
                      {module.category}
                    </span>
                  </div>
                  {module.type === 'video' ? <Video className="w-10 h-10 text-white/50 mb-2" /> : <FileText className="w-10 h-10 text-white/50 mb-2" />}
               </div>
               <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-black text-slate-900 mb-2">{module.title}</h3>
                  <div className="flex items-center text-slate-500 text-sm font-semibold mb-6">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {module.duration}
                  </div>
                  <button className={cn(
                    "mt-auto w-full py-3 rounded-2xl text-sm font-black transition-all",
                    module.completed ? "bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100" : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:shadow-md"
                  )}>
                    {module.completed ? "Review Module" : "Start Learning"}
                  </button>
               </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Resource Library */}
      <ResourceLibrary />
    </motion.div>
  );
}
