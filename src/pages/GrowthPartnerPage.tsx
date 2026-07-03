import { motion } from 'motion/react';
import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Wallet, 
  CheckCircle2, 
  XCircle,
  Briefcase,
  Store,
  Award,
  BookOpen,
  MapPin,
  MessageCircle,
  Smartphone,
  FileCheck,
  Building,
  ShieldCheck,
  LayoutDashboard,
  Rocket,
  LucideIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function GrowthPartnerPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur-xl border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Nexora</span>
            <span className="text-xl font-light text-slate-400 hidden sm:inline">Partner</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/partner/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Login
            </Link>
            <Link 
              to="/partner/dashboard" 
              className="px-5 py-2 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all shadow-sm hover:shadow"
            >
              Join Program
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 text-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 text-white">
        {/* Subtle background glow & grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 text-indigo-100 text-sm font-semibold mb-8 border border-white/20 shadow-sm backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-400 mr-2 animate-pulse" />
            NEXORA GROWTH PARTNER PROGRAM
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white mb-8 leading-[1.05]">
            Salary Nahi. <br />
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">Growth Share.</span>
          </h1>
          <p className="text-xl text-indigo-100/80 mb-10 leading-relaxed max-w-2xl mx-auto">
            Leverage your beauty industry network. Onboard salons, activate their business, and build long-term wealth with Nexora.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/partner/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-900 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center group"
            >
              Apply as Growth Partner
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://wa.me/yourwhatsappnumber" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-indigo-900/50 text-white border border-indigo-500/30 backdrop-blur-md rounded-full font-medium text-lg hover:bg-indigo-800/50 hover:border-indigo-400/50 transition-all shadow-sm hover:shadow hover:-translate-y-0.5 flex items-center justify-center"
            >
              <MessageCircle className="mr-2 w-5 h-5 text-[#25D366]" />
              WhatsApp Now
            </a>
          </div>
          
          <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-indigo-100/70">
            <span className="flex items-center"><CheckCircle2 className="w-4.5 h-4.5 mr-2 text-indigo-400" /> Zero Joining Fee</span>
            <span className="flex items-center"><CheckCircle2 className="w-4.5 h-4.5 mr-2 text-indigo-400" /> No Investment</span>
            <span className="flex items-center"><CheckCircle2 className="w-4.5 h-4.5 mr-2 text-indigo-400" /> Weekly Payouts</span>
            <span className="flex items-center"><CheckCircle2 className="w-4.5 h-4.5 mr-2 text-indigo-400" /> Transparent Dashboard</span>
          </div>
        </motion.div>
      </section>

      {/* Why Join Nexora */}
      <section className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8 border-y border-slate-100">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Why Join Nexora?</h2>
            <p className="mt-4 text-lg text-slate-500">The most transparent and lucrative partner program in the beauty industry.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <BenefitCard icon={Wallet} title="No Joining Fee" desc="Start your journey with zero upfront costs or hidden charges." delay={0.1} />
            <BenefitCard icon={Briefcase} title="Zero Investment" desc="You invest your time and network, not your capital." delay={0.2} />
            <BenefitCard icon={BookOpen} title="Free Training" desc="Comprehensive sales and product training provided." delay={0.3} />
            <BenefitCard icon={TrendingUp} title="Weekly Payout" desc="Automated weekly settlements directly to your bank." delay={0.4} />
            <BenefitCard icon={MapPin} title="District Recognition" desc="Become the official Nexora partner for your district." delay={0.5} />
            <BenefitCard icon={Award} title="Long-Term Share" desc="Earn recurring commission as long as the shop is active." delay={0.6} />
            <BenefitCard icon={Store} title="Revenue Based" desc="Earn on actual platform revenue generated by shops." delay={0.7} />
            <BenefitCard icon={Users} title="Milestone Rewards" desc="Unlock gadgets, vehicles, and premium rewards." delay={0.8} />
          </div>
        </div>
      </section>

      {/* How It Works - Stepper */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">How It Works</h2>
          <p className="mt-4 text-lg text-slate-500">A streamlined process to get you onboarded and earning quickly.</p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-slate-100 via-indigo-100 to-slate-100" />
            
            <StepCard number="1" title="Apply Online" desc="Fill out the basic application form." icon={FileCheck} />
            <StepCard number="2" title="Verification" desc="Mobile, email and KYC document check." icon={ShieldCheck} />
            <StepCard number="3" title="Training" desc="Complete our short certification module." icon={BookOpen} />
            <StepCard number="4" title="Start Earning" desc="Dashboard activated. Begin onboarding." icon={Rocket} />
          </div>
        </div>
      </section>
      
      {/* Earning Model */}
      <section className="py-24 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Real Earning Model</h2>
            <p className="text-lg text-slate-400">
              Partners earn commissions purely on the successful Nexora platform revenue generated by verified, active shops they onboarded.
            </p>
            <div className="mt-8 inline-flex items-center space-x-2 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-5 py-2.5 rounded-full font-medium text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>No Collection = No Commission. Real Collection = Real Partner Earning.</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Activation Commission */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 lg:p-10 rounded-3xl border border-slate-700/50 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors" />
              
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6 border border-indigo-500/30">
                <Wallet className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Activation Commission</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">Earn 10% commission on the shop's active Nexora platform revenue during their first 15 days.</p>
              
              <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700/50">
                <h4 className="font-semibold text-slate-300 mb-4 text-xs uppercase tracking-wider">Example Calculation</h4>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Shop's daily Nexora revenue:</span>
                    <span className="font-bold text-white">₹100/day</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">15 days total revenue:</span>
                    <span className="font-bold text-white">₹1,500</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-700/50">
                    <span className="text-indigo-400 font-medium">Your 10% commission:</span>
                    <span className="font-bold text-indigo-400 text-lg">₹150</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recurring Growth Share */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 lg:p-10 rounded-3xl border border-slate-700/50 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors" />
              
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 border border-purple-500/30">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Recurring Growth Share</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">Earn a continuous percentage of the platform revenue from your active shops over their lifetime.</p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between p-4 bg-slate-900/80 rounded-xl border border-slate-700/50">
                  <span className="font-medium text-slate-300">Months 1 to 6</span>
                  <span className="text-xl font-bold text-purple-400">10%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-900/80 rounded-xl border border-slate-700/50">
                  <span className="font-medium text-slate-300">Months 7 to 12</span>
                  <span className="text-xl font-bold text-purple-400">5%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-900/80 rounded-xl border border-slate-700/50">
                  <span className="font-medium text-slate-300">After 12 Months</span>
                  <span className="text-xl font-bold text-slate-400">2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Payout */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-16 border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden max-w-6xl mx-auto">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-50 to-transparent pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 text-sm font-semibold mb-6">
                Fast & Transparent
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
                Weekly Payouts.<br />No Follow-ups.
              </h2>
              <p className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed">
                Track your daily commission on a transparent dashboard. Eligible balances are automatically processed for payout every 7 days.
              </p>
              
              <ul className="space-y-5">
                {[
                  "Withdraw available balance at any time.",
                  "Transparent tracking for every shop's collection.",
                  "One-click statement downloads for tax & accounting."
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                     <CheckCircle2 className="w-6 h-6 text-indigo-600 mr-4 flex-shrink-0" />
                     <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl relative transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
               <div className="flex justify-between items-center mb-8">
                 <div>
                   <p className="text-sm font-medium text-slate-400">Available Balance</p>
                   <p className="text-4xl font-bold text-white mt-1">₹24,500</p>
                 </div>
                 <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
                   <Wallet className="w-7 h-7 text-emerald-400" />
                 </div>
               </div>
               
               <div className="space-y-4 mb-8">
                 <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                   <span className="text-slate-300">Pending Commission</span>
                   <span className="font-semibold text-white">₹4,200</span>
                 </div>
                 <div className="flex justify-between items-center p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                   <span className="text-indigo-200">Next Auto-Payout Date</span>
                   <span className="font-semibold text-indigo-400">Friday, 12th Oct</span>
                 </div>
               </div>
               
               <button className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-lg">
                 Withdraw Now
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Work */}
      <section className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8 border-y border-slate-100">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight text-slate-900">Partner Responsibilities</h2>
              <ul className="space-y-6">
                {[
                  "Explain the Nexora platform value to salon owners.",
                  "Assist with shop onboarding and profile setup.",
                  "Help set up digital catalogs and service menus.",
                  "Train staff on QR and payment collection processes.",
                  "Foster shops to become active, revenue-generating businesses."
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                      </div>
                    </div>
                    <p className="ml-4 text-lg text-slate-700">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-[2rem] p-8 lg:p-12 border border-slate-200 shadow-lg shadow-slate-200/50">
               <h3 className="text-2xl font-bold mb-8 text-slate-900 flex items-center">
                 <ShieldCheck className="w-8 h-8 mr-3 text-red-500" />
                 Strict Guidelines
               </h3>
               <ul className="space-y-4">
                 {[
                   "Partners must NEVER collect cash on behalf of Nexora.",
                   "Partners are independent contractors, not salaried employees.",
                   "Do not make false promises or guarantees to salon owners."
                 ].map((item, i) => (
                   <li key={i} className="flex items-center space-x-4 bg-red-50/50 p-4 rounded-2xl border border-red-100">
                     <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                     <span className="font-medium text-slate-700">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Form */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Apply Now</h2>
            <p className="mt-4 text-lg text-slate-500">Join the Nexora Growth Partner Program.</p>
          </div>
          
          <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-slate-200 shadow-2xl shadow-slate-200/40">
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              alert("Application submitted successfully. Nexora team will verify your profile and activate your Growth Partner dashboard after approval.");
            }}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Full Name</label>
                  <input required type="text" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Email Address</label>
                  <input required type="email" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Mobile Number</label>
                  <input required type="tel" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="10-digit mobile number" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">WhatsApp Number</label>
                  <input required type="tel" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="WhatsApp number" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">State</label>
                  <input required type="text" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="E.g., Maharashtra" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">District</label>
                  <input required type="text" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="E.g., Pune" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-slate-900">City</label>
                  <input required type="text" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="E.g., Baner" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-slate-900">Current Work Type</label>
                  <select required className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-700">
                    <option value="">Select work type</option>
                    <option value="beauty_sales">Beauty Product Sales</option>
                    <option value="distributor">Distributor / Agency</option>
                    <option value="consultant">Beauty Consultant</option>
                    <option value="other">Other Field Sales</option>
                  </select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-slate-900">Beauty Industry Experience</label>
                  <select required className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-700">
                    <option value="">Select experience</option>
                    <option value="0-2">0 - 2 Years</option>
                    <option value="3-5">3 - 5 Years</option>
                    <option value="5+">5+ Years</option>
                  </select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-slate-900">Number of Salons in Network</label>
                  <input required type="number" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="E.g., 50" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-slate-900">ID / KYC Upload</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-slate-700">Click to upload Aadhar/PAN</p>
                    <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG, PDF</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-6">
                <input required type="checkbox" className="mt-1 w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <p className="text-sm text-slate-500 leading-relaxed">
                  I agree to the Growth Partner terms and conditions. I understand this is a performance-based partnership and not a salaried employment.
                </p>
              </div>

              <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-xl font-medium text-lg hover:bg-slate-800 transition-all shadow-lg hover:-translate-y-0.5">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function BenefitCard({ icon: Icon, title, desc, delay }: { icon: LucideIcon, title: string, desc: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-indigo-100 transition-all group"
    >
      <div className="w-14 h-14 bg-slate-50 group-hover:bg-indigo-50 text-slate-600 group-hover:text-indigo-600 rounded-2xl flex items-center justify-center mb-6 transition-colors border border-slate-100 group-hover:border-indigo-100">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function StepCard({ number, title, desc, icon: Icon }: { number: string, title: string, desc: string, icon: LucideIcon }) {
  return (
    <div className="relative pt-8 md:pt-12 text-center group">
      <div className="w-20 h-20 mx-auto bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm relative z-10 group-hover:border-indigo-200 group-hover:shadow-md transition-all">
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-white">
          {number}
        </div>
        <Icon className="w-8 h-8 text-slate-400 group-hover:text-indigo-600 transition-colors" />
      </div>
      <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed max-w-[200px] mx-auto">{desc}</p>
    </div>
  );
}
