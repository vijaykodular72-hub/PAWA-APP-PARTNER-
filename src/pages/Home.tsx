import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Star, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Scissors, 
  User,
  Heart,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Map,
  Zap,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [city, setCity] = useState('Delhi NCR');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { name: 'Hair Cut', icon: Scissors, color: 'bg-rose-50 text-rose-600' },
    { name: 'Facial', icon: Sparkles, color: 'bg-amber-50 text-amber-600' },
    { name: 'Manicure', icon: Heart, color: 'bg-pink-50 text-pink-600' },
    { name: 'Bridal', icon: Star, color: 'bg-indigo-50 text-indigo-600' },
    { name: 'Massage', icon: Zap, color: 'bg-emerald-50 text-emerald-600' },
  ];

  const featuredSalons = [
    {
      id: 1,
      name: 'Elegance Premium Spa',
      location: 'GK-II, New Delhi',
      rating: 4.9,
      reviews: 1240,
      price: '₹₹₹',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
      tag: 'Best Rated'
    },
    {
      id: 2,
      name: 'Urban Cuts Salon',
      location: 'Indiranagar, Bangalore',
      rating: 4.8,
      reviews: 850,
      price: '₹₹',
      image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800',
      tag: 'Top Pick'
    },
    {
      id: 3,
      name: 'Glamour Studio',
      location: 'Bandra, Mumbai',
      rating: 4.7,
      reviews: 2100,
      price: '₹₹₹',
      image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&q=80&w=800',
      tag: 'Verified'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-rose-100 selection:text-rose-900">
      
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur-xl border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 block">Nexora</span>
              <span className="text-[10px] font-black tracking-widest text-rose-600 uppercase block -mt-1">SalonOS</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-sm font-bold text-slate-600 hover:text-rose-600 transition-colors">Services</a>
            <a href="#salons" className="text-sm font-bold text-slate-600 hover:text-rose-600 transition-colors">Find Salons</a>
            <button 
              onClick={() => navigate('/growth-partner')}
              className="text-sm font-bold text-slate-600 hover:text-rose-600 transition-colors"
            >
              Become a Partner
            </button>
            <button className="px-6 py-2.5 bg-slate-900 text-white rounded-full font-black text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
              Sign In
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <a href="#services" className="block text-lg font-bold text-slate-900">Services</a>
                <a href="#salons" className="block text-lg font-bold text-slate-900">Find Salons</a>
                <button 
                  onClick={() => navigate('/growth-partner')}
                  className="block text-lg font-bold text-slate-900"
                >
                  Become a Partner
                </button>
                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black">
                  Sign In
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose-50/50 to-transparent -z-10" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-50 rounded-full blur-[120px] -z-10 opacity-60" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-rose-50 text-rose-600 text-xs font-black mb-8 border border-rose-100 uppercase tracking-widest">
                India's #1 Salon OS
              </span>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.9]">
                Salon Ja Rahe Ho?<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">Nexora Kiya Kya?</span>
              </h1>
              <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-xl font-medium">
                Book premium salon experiences with verified professionals. No waiting, no hassle, just Nexora.
              </p>

              {/* Search Bar */}
              <div className="bg-white p-2 rounded-[2rem] shadow-2xl shadow-rose-200/40 border border-slate-100 flex flex-col sm:flex-row items-stretch gap-2 max-w-2xl">
                <div className="flex-1 flex items-center px-6 py-4 gap-3 bg-slate-50 rounded-[1.5rem] border border-slate-100 focus-within:bg-white focus-within:border-rose-200 transition-all">
                  <Search className="w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search hair cut, facial..." 
                    className="bg-transparent border-none focus:outline-none text-slate-900 font-bold placeholder:text-slate-400 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center px-6 py-4 gap-3 bg-slate-50 rounded-[1.5rem] border border-slate-100 focus-within:bg-white focus-within:border-rose-200 transition-all sm:w-48">
                  <MapPin className="w-5 h-5 text-slate-400" />
                  <select 
                    className="bg-transparent border-none focus:outline-none text-slate-900 font-bold appearance-none cursor-pointer"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option>Delhi NCR</option>
                    <option>Mumbai</option>
                    <option>Bangalore</option>
                  </select>
                </div>
                <button className="px-10 py-4 bg-rose-600 text-white rounded-[1.5rem] font-black hover:bg-rose-700 transition-all shadow-lg shadow-rose-200 flex items-center justify-center gap-2">
                  Search
                </button>
              </div>

              <div className="mt-12 flex items-center gap-8 text-slate-400">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-bold">
                  <span className="text-slate-900">50k+ Happy customers</span> joined this month
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1200" 
                  alt="Modern Salon" 
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>

              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -left-12 top-1/4 bg-white p-5 rounded-3xl shadow-2xl shadow-rose-200/40 border border-slate-100 z-20 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Verified Shops</p>
                  <p className="text-lg font-black text-slate-900">500+ Cities</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -right-8 bottom-1/4 bg-white p-5 rounded-3xl shadow-2xl shadow-orange-200/40 border border-slate-100 z-20 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Average Rating</p>
                  <p className="text-lg font-black text-slate-900">4.9/5 stars</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-slate-50" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Popular Services</h2>
              <p className="text-slate-500 font-bold mt-2">Book the best services from top professionals</p>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-rose-600 font-black text-sm uppercase tracking-widest hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((cat, i) => (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group text-center"
              >
                <div className={cn("w-20 h-20 rounded-3xl mx-auto flex items-center justify-center mb-6 transition-transform group-hover:scale-110", cat.color)}>
                  <cat.icon className="w-10 h-10" />
                </div>
                <p className="text-lg font-black text-slate-900">{cat.name}</p>
                <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Starting ₹499</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Salons Section */}
      <section className="py-24 bg-white" id="salons">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Top Rated Salons</h2>
              <p className="text-slate-500 font-bold mt-2">Exclusively verified premium partners</p>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-rose-600 font-black text-sm uppercase tracking-widest hover:gap-3 transition-all">
              See All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredSalons.map((salon, i) => (
              <motion.div 
                key={salon.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img src={salon.image} alt={salon.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                    {salon.tag}
                  </div>
                  <button className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-400 hover:text-rose-600 transition-colors shadow-sm">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-black text-slate-900">{salon.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="font-black text-slate-900 text-sm">{salon.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-bold text-slate-400 mb-6">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {salon.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {salon.price}
                    </div>
                  </div>
                  <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all">
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Nexora Section */}
      <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-500/5 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">Why Choose Nexora?</h2>
            <p className="text-slate-400 font-medium text-lg leading-relaxed">
              We've redesigned the salon experience to be seamless, transparent, and completely focused on you.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'Verified Experts', desc: 'Every professional is hand-picked and verified for quality.', icon: ShieldCheck, color: 'text-emerald-400' },
              { title: 'Zero Wait Time', desc: 'Book fixed slots and get served on time, every time.', icon: Clock, color: 'text-rose-400' },
              { title: 'Safe Payments', desc: 'Secure online payments with Nexora Protection.', icon: CheckCircle2, color: 'text-indigo-400' },
              { title: 'Map View', desc: 'Find the best rated salons exactly where you are.', icon: Map, color: 'text-amber-400' }
            ].map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <feature.icon className={cn("w-12 h-12 mb-6", feature.color)} />
                <h3 className="text-xl font-black mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-rose-600 to-orange-600 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-rose-200">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative z-10"
          >
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-8 tracking-tighter">Ready for your transformation?</h2>
            <p className="text-rose-100 text-xl font-medium mb-12 max-w-2xl mx-auto">
              Download the Nexora App or book online today and get ₹200 off on your first visit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="w-full sm:w-auto px-12 py-5 bg-white text-rose-600 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl">
                Get Started Now
              </button>
              <button className="w-full sm:w-auto px-12 py-5 bg-rose-700/30 text-white border border-white/20 backdrop-blur-md rounded-2xl font-black text-lg hover:bg-rose-700/50 transition-all">
                Download App
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900">Nexora</span>
          </div>
          <div className="flex items-center gap-8 text-sm font-bold text-slate-400">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Contact Us</a>
          </div>
          <p className="text-sm font-bold text-slate-400">
            © 2026 Nexora SalonOS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
