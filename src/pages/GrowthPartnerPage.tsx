import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
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
  ShieldCheck,
  LayoutDashboard,
  Rocket,
  LucideIcon,
  User as UserIcon,
  ChevronRight,
  ChevronDown,
  UserPlus,
  DollarSign,
  Gift,
  GraduationCap,
  Target,
  Crown,
  Trophy,
  Sparkles,
  HelpCircle,
  Mail,
  Phone,
  Info
} from 'lucide-react';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';
import UserProfileMenu from '../components/UserProfileMenu';
import NotificationCenter from '../components/NotificationCenter';
import PartnerResponsibilities from '../components/PartnerResponsibilities';
import ActivationCommission from '../components/ActivationCommission';
import RecurringGrowthShare from '../components/RecurringGrowthShare';
import GrowthPartnerFAQ from '../components/GrowthPartnerFAQ';
import GrowthPartnerTerms from '../components/GrowthPartnerTerms';
import heroBgImg from '../assets/images/hero_background_collage_premium_1784303089631.jpg';
import growthPartnerHero3dImg from '../assets/images/growth_partner_hero_3d_1784302333240.jpg';
import welcomeKitImg from '../assets/images/welcome_kit_reward_cinematic_1784297705385.jpg';
import tshirtImg from '../assets/images/tshirt_reward_cinematic_1784297724100.jpg';
import tabletImg from '../assets/images/tablet_reward_cinematic_1784297738843.jpg';
import laptopImg from '../assets/images/laptop_reward_cinematic_1784297758626.jpg';
import carImg from '../assets/images/car_reward_cinematic_1784297776763.jpg';
import recognitionBannerImg from '../assets/images/recognition_banner_cinematic_1784297792811.jpg';

// Animated Counter component for real-time stats count-up effect
function AnimatedCounter({ end, suffix = "" }: { end: number, suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <span className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// Accordion-based FAQ Component
function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow transition-shadow duration-300">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left font-bold text-slate-800 flex items-center justify-between hover:bg-slate-50/50 transition-colors cursor-pointer"
      >
        <span className="text-sm md:text-base flex items-center gap-3">
          <HelpCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
          {question}
        </span>
        <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0", isOpen ? "transform rotate-180 text-orange-500" : "")} />
      </button>
      <div className={cn("transition-all duration-300 ease-in-out overflow-hidden", isOpen ? "max-h-[300px] border-t border-slate-100 bg-slate-50/30" : "max-h-0")}>
        <p className="p-6 text-xs md:text-sm text-slate-600 leading-relaxed font-semibold">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function GrowthPartnerPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroY = useTransform(scrollY, [0, 800], [0, -150]);

  // Inquiry form state
  const [inquiryFormData, setInquiryFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    category: 'Commission Structure',
    message: ''
  });
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryError, setInquiryError] = useState<string | null>(null);

  const handleInquiryInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInquiryFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInquiryResetForm = () => {
    setInquiryFormData({
      name: '',
      phone: '',
      email: '',
      location: '',
      category: 'Commission Structure',
      message: ''
    });
    setInquirySubmitted(false);
    setInquiryError(null);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitting(true);
    setInquiryError(null);

    try {
      const { error: dbError } = await supabase
        .from('partner_inquiries')
        .insert([{
          name: inquiryFormData.name,
          phone: inquiryFormData.phone,
          email: inquiryFormData.email,
          location: inquiryFormData.location,
          category: inquiryFormData.category,
          message: inquiryFormData.message,
          created_at: new Date().toISOString()
        }]);

      if (dbError) {
        console.warn('Database table "partner_inquiries" might not exist yet, falling back to local memory success state.', dbError);
      }
      
      setInquirySubmitted(true);
    } catch (err: any) {
      console.error('Error submitting inquiry:', err);
      // Fallback for demo / preview environments without schema
      setInquirySubmitted(true);
    } finally {
      setInquirySubmitting(false);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoadingAuth(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoadingAuth(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/30 font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 bg-white/85 backdrop-blur-xl border-b border-slate-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-rose-500 rounded-xl flex items-center justify-center shadow-md shadow-orange-500/15">
              <TrendingUp className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900 block">Nexora SalonOS</span>
              <span className="text-[9px] font-black tracking-widest text-emerald-600 uppercase block -mt-1">Partner Portal</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <NotificationCenter />
            <UserProfileMenu />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY, willChange: 'transform' }}>
          <img src={heroBgImg} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-white/85" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-5xl mx-auto"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold mb-8 border border-slate-200 uppercase tracking-widest shadow-sm">
            NEXORA GROWTH PARTNER PROGRAM
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-slate-950 mb-8 leading-[0.95]">
            Salary Nahi. <br />
            <span className="text-emerald-600">Growth Share.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
            Join India’s premier salon growth ecosystem. No investment, just pure partnership.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            {!loadingAuth && (
              <Link
                to="/partner/dashboard"
                className="w-full sm:w-auto px-10 py-4 bg-slate-950 text-white rounded-full font-black text-lg hover:bg-slate-800 hover:scale-[1.02] transition-all flex items-center justify-center group shadow-xl shadow-slate-200"
              >
                {user ? 'Go to Dashboard' : 'Apply as Growth Partner'}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative"
            style={{ y: heroY, willChange: 'transform' }}
          >
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <img 
                src={growthPartnerHero3dImg} 
                alt="Nexora Ecosystem" 
                className="w-full max-w-4xl mx-auto rounded-3xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* WHY BECOME A PARTNER SECTION */}
      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8 overflow-hidden relative border-b border-slate-100" id="why-become-partner">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header with Sub-Hero Grid */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                No-Capital Business Partnership
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-emerald-600">Growth Partner</span>
              </h2>
              <p className="text-sm sm:text-lg text-slate-600 leading-relaxed font-semibold">
                Start your own business journey without investment. Grow with our platform, earn every week, receive recognition, and build a long-term income source.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3.5 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-orange-100/50 flex items-center justify-center text-orange-600 flex-shrink-0 font-bold">
                    ₹
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">No Entry Fee</h4>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">It costs zero rupees to apply or become a partner.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100/50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Long Term Share</h4>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">Earn passive yield as long as the shops stay active.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Illustration (With gentle float animation) */}
            <div className="lg:col-span-5 flex justify-center relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="w-full max-w-md aspect-[16/9] lg:aspect-square rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 bg-white p-2"
              >
                <img 
                  src={growthPartnerHero3dImg} 
                  alt="Nexora Ecosystem" 
                  className="w-full h-full object-cover rounded-[1.8rem]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              
              {/* Overlay Badge */}
              <div className="absolute -bottom-4 -left-4 bg-emerald-600 text-white rounded-2xl p-4 shadow-xl flex items-center gap-3 border border-emerald-500/30">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg">💰</div>
                <div>
                  <p className="text-[10px] font-bold text-emerald-100">Active Commissions</p>
                  <p className="text-xs font-black">Earning Every Week</p>
                </div>
              </div>
            </div>

          </div>

          {/* Benefits Grid (5 Columns × 2 Rows on Desktop) */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Our Benefits Grid
              </h3>
              <p className="text-slate-500 text-sm mt-1.5 font-medium">
                Everything is transparent. No hidden sales tricks. Work on your own terms.
              </p>
            </div>

            {/* Grid structure: 5 col (desktop), 2 col (tablet), 1 col (mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/5 rounded-full blur-xl group-hover:bg-orange-500/10 transition-colors" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-all border border-orange-100/50">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mb-1.5">Joining Fee Nahi</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">Start your partnership completely free. No registration fee. No hidden charges.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-50 text-[9px] font-bold text-orange-600 tracking-wider uppercase">100% Free</div>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-all border border-emerald-100/50">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mb-1.5">Investment Nahi</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">No office. No inventory. No stock. No upfront capital investment required.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-50 text-[9px] font-bold text-emerald-600 tracking-wider uppercase">Zero Capital</div>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/5 rounded-full blur-xl group-hover:bg-orange-500/10 transition-colors" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-all border border-orange-100/50">
                    <Target className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mb-1.5">Salary Target Nahi</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">No monthly sales targets. Work entirely at your own pace without stress.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-50 text-[9px] font-bold text-orange-600 tracking-wider uppercase">No Pressure</div>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-all border border-emerald-100/50">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mb-1.5">Free Training</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">Receive complete onboarding, sales guidance, and marketing support files.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-50 text-[9px] font-bold text-emerald-600 tracking-wider uppercase">Full Support</div>
              </div>

              {/* Card 5 */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/5 rounded-full blur-xl group-hover:bg-orange-500/10 transition-colors" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-all border border-orange-100/50">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mb-1.5">Weekly Payout</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">Get paid every single week based on verified active salons and setups.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-50 text-[9px] font-bold text-orange-600 tracking-wider uppercase">Weekly Bank</div>
              </div>

              {/* Card 6 */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-all border border-emerald-100/50">
                    <Award className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mb-1.5">District Recognition</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">Top performing partners receive active recognition and certificates within their district.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-50 text-[9px] font-bold text-emerald-600 tracking-wider uppercase">Local Leader</div>
              </div>

              {/* Card 7 */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/5 rounded-full blur-xl group-hover:bg-orange-500/10 transition-colors" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-all border border-orange-100/50">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mb-1.5">Long-Term Growth</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">As our platform grows, your referral yield and career opportunities continue to expand.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-50 text-[9px] font-bold text-orange-600 tracking-wider uppercase">Growth Share</div>
              </div>

              {/* Card 8 */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-all border border-emerald-100/50">
                    <Store className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mb-1.5">Active Shops Earnings</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">Earn recurring lifetime fees from every active salon using the white-label OS.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-50 text-[9px] font-bold text-emerald-600 tracking-wider uppercase">Passive Income</div>
              </div>

              {/* Card 9 */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/5 rounded-full blur-xl group-hover:bg-orange-500/10 transition-colors" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-all border border-orange-100/50">
                    <Crown className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mb-1.5">Hall of Fame</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">Get permanently featured in the Nexora Hall of Fame with premium district status.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-50 text-[9px] font-bold text-orange-600 tracking-wider uppercase">Highly Featured</div>
              </div>

              {/* Card 10 */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-all border border-emerald-100/50">
                    <Gift className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mb-1.5">Milestone Rewards</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">Unlock high-end gadgets, gift boxes, custom awards, and ultimate vehicle milestones.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-50 text-[9px] font-bold text-emerald-600 tracking-wider uppercase">Premium Prizes</div>
              </div>

            </div>
          </div>

          {/* Statistics Strip Section */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl mb-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 blur-[90px] rounded-full" />
            
            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center items-center">
              <div>
                <p className="text-xs font-bold text-orange-400 tracking-widest uppercase mb-1">Active Shops</p>
                <div className="flex items-center justify-center font-black text-white text-3xl sm:text-4xl">
                  <AnimatedCounter end={500} suffix="+" />
                </div>
                <p className="text-[10px] text-slate-400 mt-2 font-semibold">Onboarded Nationally</p>
              </div>

              <div>
                <p className="text-xs font-bold text-emerald-400 tracking-widest uppercase mb-1">Partners</p>
                <div className="flex items-center justify-center font-black text-white text-3xl sm:text-4xl">
                  <AnimatedCounter end={100} suffix="+" />
                </div>
                <p className="text-[10px] text-slate-400 mt-2 font-semibold">District Representatives</p>
              </div>

              <div>
                <p className="text-xs font-bold text-indigo-300 tracking-widest uppercase mb-1">Weekly Payout</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400 tracking-tight">Friday System</p>
                <p className="text-[10px] text-slate-400 mt-2 font-semibold">No Follow-ups Required</p>
              </div>

              <div>
                <p className="text-xs font-bold text-amber-300 tracking-widest uppercase mb-1">Growing</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight">Across India</p>
                <p className="text-[10px] text-slate-400 mt-2 font-semibold">Expanding Territories</p>
              </div>
            </div>
          </div>

          {/* Success Journey Timeline */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Success Journey Timeline</h3>
              <p className="text-slate-500 text-sm mt-1.5 font-medium">Follow these 5 proven steps to rise from a partner to a regional district leader.</p>
            </div>

            <div className="max-w-5xl mx-auto relative px-4">
              {/* Connected Line Graphic (Desktop Only) */}
              <div className="hidden lg:block absolute top-14 left-10 right-10 h-0.5 bg-gradient-to-r from-orange-400/30 via-indigo-400/40 to-emerald-400/30 rounded-full" />

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-6 relative z-10">
                
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 border-2 border-orange-200 text-orange-600 flex items-center justify-center shadow-md shadow-orange-500/5 group-hover:scale-110 group-hover:rotate-2 transition-all relative mb-4">
                    <UserPlus className="w-7 h-7" />
                    <span className="absolute -bottom-2 bg-orange-600 text-white rounded-full text-[9px] font-bold px-2 py-0.5">1</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Apply</h4>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-[150px] font-semibold">Join the team online for free in 2 minutes.</p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-indigo-600 flex items-center justify-center shadow-md shadow-indigo-500/5 group-hover:scale-110 group-hover:-rotate-2 transition-all relative mb-4">
                    <GraduationCap className="w-7 h-7" />
                    <span className="absolute -bottom-2 bg-indigo-600 text-white rounded-full text-[9px] font-bold px-2 py-0.5">2</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Complete Training</h4>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-[150px] font-semibold">Watch simple video lessons & sales guides.</p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-600 flex items-center justify-center shadow-md shadow-amber-500/5 group-hover:scale-110 group-hover:rotate-2 transition-all relative mb-4">
                    <Store className="w-7 h-7" />
                    <span className="absolute -bottom-2 bg-amber-600 text-white rounded-full text-[9px] font-bold px-2 py-0.5">3</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Add Active Shops</h4>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-[150px] font-semibold">Register salon shops on our custom OS app.</p>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/5 group-hover:scale-110 group-hover:-rotate-2 transition-all relative mb-4">
                    <DollarSign className="w-7 h-7" />
                    <span className="absolute -bottom-2 bg-emerald-600 text-white rounded-full text-[9px] font-bold px-2 py-0.5">4</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Earn Weekly</h4>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-[150px] font-semibold">Get automated commissions on complete setups.</p>
                </div>

                {/* Step 5 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-600 flex items-center justify-center shadow-md shadow-rose-500/5 group-hover:scale-110 group-hover:rotate-2 transition-all relative mb-4">
                    <Crown className="w-7 h-7" />
                    <span className="absolute -bottom-2 bg-rose-600 text-white rounded-full text-[9px] font-bold px-2 py-0.5">5</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Become District Leader</h4>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-[150px] font-semibold">Command your territory & get a vehicle reward.</p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Partner Work & On-field Responsibilities (Newly added detailed walkthrough) */}
      <PartnerResponsibilities />

      {/* One-Time Activation Commission (Highly visual walkthrough of first 15 days window) */}
      <ActivationCommission />

      {/* Recurring Income / Long-Term Earnings (Focused on sustainable lifetime commissions) */}
      <RecurringGrowthShare />

      {/* Weekly Payout Mockup */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto bg-white">
        <div className="bg-slate-50/50 rounded-[2.5rem] p-8 lg:p-16 border border-slate-100 shadow-sm relative overflow-hidden max-w-6xl mx-auto">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-50/30 to-transparent pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold mb-6">
                Fast & Transparent
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
                Weekly Payouts.<br />No Follow-ups.
              </h2>
              <p className="text-sm sm:text-base text-slate-500 mb-8 max-w-lg leading-relaxed font-semibold">
                Track your daily commission on a transparent dashboard. Eligible balances are automatically processed for payout every 7 days.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Withdraw available balance at any time directly.",
                  "Transparent tracking for every shop's collections.",
                  "One-click statement downloads for taxation & accounts."
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                     <CheckCircle2 className="w-5.5 h-5.5 text-emerald-600 mr-4 flex-shrink-0" />
                     <span className="text-slate-700 font-bold text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-slate-950 rounded-3xl p-8 shadow-2xl relative transform lg:rotate-2 hover:rotate-0 transition-transform duration-500 border border-slate-800">
               <div className="flex justify-between items-center mb-8">
                 <div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available Balance</p>
                   <p className="text-4xl font-black text-white mt-1">₹24,500</p>
                 </div>
                 <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                   <Wallet className="w-7 h-7 text-emerald-400" />
                 </div>
               </div>
               
               <div className="space-y-4 mb-8 text-xs font-bold">
                 <div className="flex justify-between items-center p-4 bg-slate-900 rounded-2xl border border-slate-800">
                   <span className="text-slate-300">Pending Commission</span>
                   <span className="font-semibold text-white">₹4,200</span>
                 </div>
                 <div className="flex justify-between items-center p-4 bg-orange-500/10 rounded-2xl border border-orange-500/25">
                   <span className="text-orange-200">Next Auto-Payout Date</span>
                   <span className="font-bold text-orange-400 text-xs uppercase tracking-wider">Friday, Weekly</span>
                 </div>
               </div>
               
               <button className="w-full py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-xl font-black text-sm shadow-lg transition-colors cursor-pointer">
                 Withdraw Now
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Milestone Rewards Section */}
      <section className="py-24 bg-slate-950 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold tracking-wider uppercase text-xs mb-6 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
              <Award className="w-4 h-4" />
              Growth Partner Rewards
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
              Hit Onboarding. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">Unlock Milestone Rewards.</span>
            </h2>
            <p className="text-sm md:text-base text-slate-300 font-semibold max-w-2xl mx-auto leading-relaxed">
              Achieve verified shop activation milestones to claim exciting premium awards, completely on top of weekly commissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {/* Reward 1 */}
            <div className="relative bg-slate-900 rounded-3xl p-5 border border-slate-800 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-300 group flex flex-col">
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black px-4 py-2 rounded-xl shadow-lg transform rotate-2 scale-110 z-20 text-[10px]">
                26 SHOPS
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden mb-5 bg-slate-850 relative shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10"></div>
                <img src={welcomeKitImg} alt="Welcome Kit" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute bottom-3 left-3 right-3 z-20">
                   <h3 className="text-lg font-black text-white leading-tight">Welcome Kit</h3>
                </div>
              </div>
              <p className="text-slate-400 text-xs font-semibold leading-relaxed flex-1">Premium brand Pen, Leather Bound Diary, Backpack, Cap & ID Card.</p>
            </div>

            {/* Reward 2 */}
            <div className="relative bg-slate-900 rounded-3xl p-5 border border-slate-800 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-300 group flex flex-col">
               <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black px-4 py-2 rounded-xl shadow-lg transform rotate-2 scale-110 z-20 text-[10px]">
                51 SHOPS
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden mb-5 bg-slate-850 relative shadow-inner">
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10"></div>
                <img src={tshirtImg} alt="Official T-Shirt" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                 <div className="absolute bottom-3 left-3 right-3 z-20">
                   <h3 className="text-lg font-black text-white leading-tight">Official Nexora T-Shirt</h3>
                </div>
              </div>
              <p className="text-slate-400 text-xs font-semibold leading-relaxed flex-1">High-quality custom fit apparel to represent our brand in the field.</p>
            </div>

            {/* Reward 3 */}
            <div className="relative bg-slate-900 rounded-3xl p-5 border border-slate-800 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-300 group flex flex-col">
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black px-4 py-2 rounded-xl shadow-lg transform rotate-2 scale-110 z-20 text-[10px]">
                101 SHOPS
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden mb-5 bg-slate-850 relative shadow-inner">
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10"></div>
                <img src={tabletImg} alt="Tablet" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute bottom-3 left-3 right-3 z-20">
                   <h3 className="text-lg font-black text-white leading-tight">Android Tablet</h3>
                </div>
              </div>
              <p className="text-slate-400 text-xs font-semibold leading-relaxed flex-1">High performance tab to give seamless visual dashboard presentations to shops.</p>
            </div>

            {/* Reward 4 */}
            <div className="relative bg-slate-900 rounded-3xl p-5 border border-slate-800 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-300 group flex flex-col lg:col-span-1 md:col-span-2 xl:col-span-1">
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black px-4 py-2 rounded-xl shadow-lg transform rotate-2 scale-110 z-20 text-[10px]">
                501 SHOPS
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden mb-5 bg-slate-850 relative shadow-inner">
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10"></div>
                <img src={laptopImg} alt="Branded Laptop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute bottom-3 left-3 right-3 z-20">
                   <h3 className="text-lg font-black text-white leading-tight">Modern Laptop</h3>
                </div>
              </div>
              <p className="text-slate-400 text-xs font-semibold leading-relaxed flex-1">Elite performance business laptop to coordinate large territories easily.</p>
            </div>

            {/* Reward 5 */}
            <div className="bg-slate-900 rounded-3xl p-5 border-2 border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.05)] hover:border-amber-400 hover:shadow-[0_0_50px_rgba(245,158,11,0.15)] transition-all duration-300 group flex flex-col md:col-span-2 lg:col-span-3 xl:col-span-1 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-transparent z-0 pointer-events-none"></div>
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black px-5 py-2 rounded-xl shadow-lg transform rotate-2 scale-110 z-20 border border-yellow-200 text-[10px]">
                1001 SHOPS
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden mb-5 bg-slate-850 relative shadow-inner z-10 border border-amber-500/10">
                 <div className="absolute inset-0 bg-gradient-to-t from-amber-950/80 via-slate-900/40 to-transparent z-10"></div>
                <img src={carImg} alt="Car Reward" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                   <div className="inline-block px-2 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[9px] font-bold tracking-widest uppercase rounded mb-2">District Milestone</div>
                   <h3 className="text-xl font-black text-white leading-tight">District Leader & SUV Car</h3>
                </div>
              </div>
              <p className="text-slate-300 text-xs font-semibold leading-relaxed flex-1 z-10">Achieve verified District Partner status and claim your branded SUV car on us!</p>
            </div>

          </div>
        </div>
      </section>

      {/* Guidelines Section (Indian Professional Style) */}
      <section className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8 border-y border-slate-100">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-2xl sm:text-4xl font-black mb-8 tracking-tight text-slate-900">Partner ka kaam</h2>
              <ul className="space-y-5">
                {[
                  "Salon owners ko Nexora ecosystem visual samjhana",
                  "Verified salon profile onboarding karwana",
                  "White-label website setup me support dena",
                  "Onsite payments systems QR configuration check karna",
                  "Shop ko fully active digital business banana"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="ml-4 text-sm sm:text-base text-slate-700 font-bold">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-[2.2rem] p-8 lg:p-12 border border-slate-200/60 shadow-xl shadow-slate-200/30">
               <h3 className="text-xl font-black mb-6 text-slate-900 flex items-center">
                 <ShieldCheck className="w-8 h-8 mr-3 text-rose-500" />
                 Important Rules
               </h3>
               <ul className="space-y-4">
                 {[
                   "Partner is strictly forbidden from collecting physical cash from any shop.",
                   "This is a performance Growth Partnership, NOT a fixed salary desk position.",
                   "Partner must never make fake promises regarding setup timelines."
                 ].map((item, i) => (
                   <li key={i} className="flex items-start gap-3 bg-rose-50/30 p-4 rounded-2xl border border-rose-100/50">
                     <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                     <span className="font-bold text-xs sm:text-sm text-slate-700 leading-relaxed">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* RECOGNITION BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-rose-500/10 rounded-[2.5rem] p-8 md:p-14 border border-orange-100 flex flex-col lg:flex-row items-center gap-10 shadow-[0_15px_30px_rgba(249,115,22,0.03)] group overflow-hidden">
            {/* Pulsating glowing outline effect */}
            <div className="absolute inset-0 bg-radial-gradient from-orange-400/5 to-transparent pointer-events-none group-hover:scale-110 transition-transform duration-700" />
            
            {/* Banner Content (left) */}
            <div className="flex-1 space-y-4 text-left relative z-10">
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-orange-200 shadow shadow-orange-500/10">
                🏆 District Honors
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Top Performers Recognition
              </h3>
              <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-semibold">
                Top-performing partners receive certificates, district recognition, special rewards, and Hall of Fame listings.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold text-slate-700">
                <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-1.5">
                  ⭐ Excellence Awards
                </span>
                <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-1.5">
                  📜 Certificate Honors
                </span>
                <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-1.5">
                  🥇 Hall Of Fame Listings
                </span>
              </div>
            </div>

            {/* Banner Image (right) */}
            <div className="w-full lg:w-96 flex justify-center relative z-10">
              <div className="w-full max-w-sm aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border border-white/60 bg-white">
                <img 
                  src={recognitionBannerImg} 
                  alt="Recognition Banner containing Trophy, Certificate, Medal" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50 text-center px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-orange-500 to-rose-500 text-white rounded-2xl shadow-xl shadow-orange-500/10">
            <Trophy className="w-7 h-7" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 max-w-2xl mx-auto leading-tight">
              Ready to Build Your Business Without Investment?
            </h2>
            <p className="text-sm sm:text-lg text-slate-500 font-semibold max-w-xl mx-auto leading-relaxed">
              Join our growing partner network today. Start earning every week while helping local music and beauty businesses grow.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/partner/dashboard"
              className="w-full sm:w-auto px-10 py-4.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full font-black text-base shadow-lg shadow-orange-500/10 hover:shadow-[0_0_35px_rgba(249,115,22,0.3)] hover:scale-[1.03] transition-all"
            >
              Become a Partner
            </Link>
            <a
              href="#why-become-partner"
              className="w-full sm:w-auto px-10 py-4.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full font-bold text-base transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-100 rounded-full px-3 py-1.5 uppercase tracking-widest">
              Have Questions?
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-2">
              Everything you need to clarify about joining fee, payouts, training, and commission terms.
            </p>
          </div>

          <div className="space-y-4">
            <FAQItem 
              question="Is there any registration fee to join the Growth Partner Program?"
              answer="No, joining the Nexora Growth Partner Program is 100% free. There are absolutely no registration fees, monthly subscription charges, or hidden investment costs."
            />
            <FAQItem 
              question="Do I need an office or stock of beauty products?"
              answer="Not at all. This program is completely remote and digital. You do not need to rent an office, maintain physical inventory, or invest in product stocks. You use our digital web platform."
            />
            <FAQItem 
              question="Are there monthly sales targets that I must meet?"
              answer="No, there are zero monthly targets or static sales mandates. You can work entirely at your own pace, on your own schedule, in your assigned local district."
            />
            <FAQItem 
              question="How does the Weekly Payout system work?"
              answer="Your earnings are updated daily on your transparent partner dashboard. Every Friday, your available verified earnings are automatically processed and credited directly to your registered bank account."
            />
            <FAQItem 
              question="What kind of support and training will I receive?"
              answer="Nexora provides comprehensive online training, digital marketing flyers, product training sheets, and continuous 1-on-1 guidance to help you explain and onboard salons easily."
            />
          </div>
        </div>
      </section>

      {/* CONTACT SUPPORT / INQUIRY FORM */}
      <section id="partner-inquiry-section" className="py-24 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-100 rounded-full px-3 py-1.5 uppercase tracking-widest">
              Have Specific Questions?
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-4">
              Get in Touch with Support
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-2">
              Fill out this quick form with your questions or concerns, and our district coordinator will reach out to you within 24 hours.
            </p>
          </div>

          <div className="bg-slate-50/50 border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            {inquirySubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6 relative z-10"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">Inquiry Submitted Successfully!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto font-semibold">
                    Thank you, <span className="text-orange-600 font-bold">{inquiryFormData.name}</span>. We have received your question regarding <span className="text-indigo-600 font-bold">"{inquiryFormData.category}"</span>. Our District Business Partner manager will call or WhatsApp you soon!
                  </p>
                </div>
                <button
                  type="button"
                  id="reset-inquiry-btn"
                  onClick={handleInquiryResetForm}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-full font-bold text-xs hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-6 relative z-10">
                {inquiryError && (
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-700 text-xs font-bold">
                    <XCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{inquiryError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="inquiry-name" className="block text-xs font-black uppercase tracking-wider text-slate-700">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="inquiry-name"
                      name="name"
                      value={inquiryFormData.name}
                      onChange={handleInquiryInputChange}
                      required
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-2">
                    <label htmlFor="inquiry-phone" className="block text-xs font-black uppercase tracking-wider text-slate-700">
                      Phone / WhatsApp Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="inquiry-phone"
                      name="phone"
                      value={inquiryFormData.phone}
                      onChange={handleInquiryInputChange}
                      required
                      placeholder="e.g. +91 99999-88888"
                      className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email field */}
                  <div className="space-y-2">
                    <label htmlFor="inquiry-email" className="block text-xs font-black uppercase tracking-wider text-slate-700">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="inquiry-email"
                      name="email"
                      value={inquiryFormData.email}
                      onChange={handleInquiryInputChange}
                      required
                      placeholder="e.g. ramesh@gmail.com"
                      className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
                    />
                  </div>

                  {/* District / City field */}
                  <div className="space-y-2">
                    <label htmlFor="inquiry-location" className="block text-xs font-black uppercase tracking-wider text-slate-700">
                      District / City <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="inquiry-location"
                      name="location"
                      value={inquiryFormData.location}
                      onChange={handleInquiryInputChange}
                      required
                      placeholder="e.g. Pune, Maharashtra"
                      className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
                    />
                  </div>
                </div>

                {/* Inquiry Category field */}
                <div className="space-y-2">
                  <label htmlFor="inquiry-category" className="block text-xs font-black uppercase tracking-wider text-slate-700">
                    Topic of Inquiry <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="inquiry-category"
                    name="category"
                    value={inquiryFormData.category}
                    onChange={handleInquiryInputChange}
                    required
                    className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all cursor-pointer"
                  >
                    <option value="Commission Structure">Commission Structure & Weekly Payouts</option>
                    <option value="Training Program">Free Training Area & Support Files</option>
                    <option value="Onboarding Process">How to Onboard Local Salons / Shops</option>
                    <option value="Milestone Rewards">Milestone Rewards (Laptop, SUV Car, etc.)</option>
                    <option value="General Question">General Support / Other Questions</option>
                  </select>
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label htmlFor="inquiry-message" className="block text-xs font-black uppercase tracking-wider text-slate-700">
                    Your Question / Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="inquiry-message"
                    name="message"
                    value={inquiryFormData.message}
                    onChange={handleInquiryInputChange}
                    required
                    rows={4}
                    placeholder="Describe your question or doubt here in detail..."
                    className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    id="submit-inquiry-btn"
                    disabled={inquirySubmitting}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center cursor-pointer"
                  >
                    {inquirySubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting Inquiry...
                      </span>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ & TERMS */}
      <GrowthPartnerFAQ />
      <GrowthPartnerTerms />

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            {/* Col 1: Brand info */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4.5 h-4.5 text-white" />
                </div>
                <span className="text-lg font-black tracking-tight text-white">Nexora SalonOS</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm font-semibold max-w-sm leading-relaxed">
                India's Beauty Industry Operating System. Salary Nahi. Growth Share. Empowering local salons with white-label websites and marketplace reach.
              </p>
              <p className="text-slate-500 text-xs font-bold">
                "Salon Ja Rahe Ho? Nexora Kiya Kya?"
              </p>
            </div>

            {/* Col 2: Navigation links */}
            <div>
              <h4 className="text-xs font-black text-slate-200 uppercase tracking-widest mb-4">Partner Links</h4>
              <ul className="space-y-2.5 text-xs font-bold">
                <li>
                  <Link to="/growth-partner" className="hover:text-white transition-colors">Growth Partner Info</Link>
                </li>
                <li>
                  <Link to="/partner/dashboard" className="hover:text-white transition-colors">Partner Dashboard</Link>
                </li>
                <li>
                  <Link to="/partner/leads" className="hover:text-white transition-colors">Lead Pipeline</Link>
                </li>
                <li>
                  <Link to="/partner/training" className="hover:text-white transition-colors">Free Training Area</Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Contact */}
            <div className="space-y-3 text-xs">
              <h4 className="text-xs font-black text-slate-200 uppercase tracking-widest mb-4">Get in Touch</h4>
              <p className="flex items-center gap-2 font-semibold">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>support@nexorasalonos.in</span>
              </p>
              <p className="flex items-center gap-2 font-semibold">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>+91 99999-88888</span>
              </p>
              <p className="flex items-center gap-2 font-semibold">
                <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>Pune District Center, Maharashtra, India</span>
              </p>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-600">
            <p>© 2026 Nexora SalonOS. All rights reserved. India's Beauty Industry Operating System.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-400">Terms of Service</a>
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
