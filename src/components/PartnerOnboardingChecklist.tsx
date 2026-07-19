import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  User, 
  FileText, 
  Video, 
  Upload, 
  AlertCircle, 
  Play, 
  Clock, 
  Sparkles, 
  Lock,
  ArrowRight,
  UserCheck,
  Check
} from 'lucide-react';
import PartnerKYCUpload from './PartnerKYCUpload';

interface ChecklistState {
  profileSetup: boolean;
  kycUploaded: boolean;
  trainingCompleted: boolean;
  
  // Profile fields
  altPhone: string;
  preferredLanguage: string;
  nativeDistrict: string;
  
  // KYC files
  panCardName: string;
  aadhaarName: string;
  bankDetailsName: string;
  
  // Training watch counts
  videosWatched: Record<number, boolean>;
}

export default function PartnerOnboardingChecklist() {
  const [state, setState] = useState<ChecklistState>({
    profileSetup: false,
    kycUploaded: false,
    trainingCompleted: false,
    altPhone: '',
    preferredLanguage: 'Hindi',
    nativeDistrict: '',
    panCardName: '',
    aadhaarName: '',
    bankDetailsName: '',
    videosWatched: {}
  });

  const [expandedSection, setExpandedSection] = useState<'profile' | 'kyc' | 'training' | null>('profile');
  const [kycProgress, setKycProgress] = useState<Record<string, number>>({});
  const [currentVideoId, setCurrentVideoId] = useState<number | null>(null);
  const [videoProgress, setVideoProgress] = useState(0);

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('nexora_onboarding_state');
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing onboarding state', e);
      }
    }
  }, []);

  // Save state helper
  const saveState = (newState: ChecklistState) => {
    setState(newState);
    localStorage.setItem('nexora_onboarding_state', JSON.stringify(newState));
  };

  const refreshOnboardingState = () => {
    const saved = localStorage.getItem('nexora_onboarding_state');
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing onboarding state', e);
      }
    }
  };

  // Compute overall percentage
  const completedSteps = 
    (state.profileSetup ? 1 : 0) + 
    (state.kycUploaded ? 1 : 0) + 
    (state.trainingCompleted ? 1 : 0);
  const overallPercentage = Math.round((completedSteps / 3) * 100);

  // Handle Profile Submission
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.altPhone || !state.nativeDistrict) {
      alert('Kripya sabhi fields enter karein.');
      return;
    }
    const updated = {
      ...state,
      profileSetup: true
    };
    saveState(updated);
    // Auto collapse profile and open KYC if next
    if (!state.kycUploaded) {
      setExpandedSection('kyc');
    } else if (!state.trainingCompleted) {
      setExpandedSection('training');
    } else {
      setExpandedSection(null);
    }
  };

  // Simulated Document Upload handler
  const handleFileUpload = (docType: 'pan' | 'aadhaar' | 'bank', fileName: string) => {
    setKycProgress(prev => ({ ...prev, [docType]: 5 }));
    
    // Simulate progression of uploading
    let progress = 5;
    const interval = setInterval(() => {
      progress += 25;
      if (progress >= 100) {
        clearInterval(interval);
        setKycProgress(prev => ({ ...prev, [docType]: 100 }));
        
        const keyMap = {
          pan: 'panCardName',
          aadhaar: 'aadhaarName',
          bank: 'bankDetailsName'
        };
        
        const newState = {
          ...state,
          [keyMap[docType]]: fileName
        };
        
        // If all three uploaded, mark KYC as completed
        if (
          (docType === 'pan' || state.panCardName) &&
          (docType === 'aadhaar' || state.aadhaarName) &&
          (docType === 'bank' || state.bankDetailsName)
        ) {
          newState.kycUploaded = true;
        }
        
        saveState(newState);
        
        // Clear status animation after 1 sec
        setTimeout(() => {
          setKycProgress(prev => {
            const copy = { ...prev };
            delete copy[docType];
            return copy;
          });
          
          // Auto route focus if KYC is now done
          if (newState.kycUploaded && !state.trainingCompleted) {
            setExpandedSection('training');
          }
        }, 1200);
      } else {
        setKycProgress(prev => ({ ...prev, [docType]: progress }));
      }
    }, 250);
  };

  // Video lessons definitions
  const trainingVideos = [
    { id: 1, title: 'Welcome to Nexora: App Intro', duration: '2 mins' },
    { id: 2, title: 'How to pitch to Salons in India', duration: '5 mins' },
    { id: 3, title: 'Onboarding Process & Documents', duration: '4 mins' }
  ];

  const handleStartVideo = (id: number) => {
    setCurrentVideoId(id);
    setVideoProgress(0);
    
    // Simulate watching the lesson
    let prog = 0;
    const timer = setInterval(() => {
      prog += 10;
      if (prog >= 100) {
        clearInterval(timer);
        setVideoProgress(100);
        setTimeout(() => {
          const updatedVideos = { ...state.videosWatched, [id]: true };
          const allCompleted = trainingVideos.every(v => updatedVideos[v.id]);
          
          const newState = {
            ...state,
            videosWatched: updatedVideos,
            trainingCompleted: allCompleted
          };
          saveState(newState);
          setCurrentVideoId(null);
        }, 600);
      } else {
        setVideoProgress(prog);
      }
    }, 200);
  };

  const handleResetChecklist = () => {
    const resetState: ChecklistState = {
      profileSetup: false,
      kycUploaded: false,
      trainingCompleted: false,
      altPhone: '',
      preferredLanguage: 'Hindi',
      nativeDistrict: '',
      panCardName: '',
      aadhaarName: '',
      bankDetailsName: '',
      videosWatched: {}
    };
    saveState(resetState);
    setExpandedSection('profile');
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50/70 via-white to-slate-50/50 rounded-2xl border border-indigo-100 shadow-sm overflow-hidden mb-6">
      <div className="p-5 border-b border-indigo-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-md shadow-indigo-600/10">
              {overallPercentage}%
            </div>
            {overallPercentage === 100 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 items-center justify-center text-[10px] text-white font-bold">✓</span>
              </span>
            )}
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              Partner Onboarding Checklist
              {overallPercentage === 100 && <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />}
            </h2>
            <p className="text-xs text-slate-500">
              Salary Nahi, Growth Share partner banne ke liye apna registration complete kijiye.
            </p>
          </div>
        </div>
        
        {/* Visual Progress Bar */}
        <div className="flex items-center gap-4 w-full md:w-64">
          <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/50">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${overallPercentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`h-full rounded-full ${overallPercentage === 100 ? 'bg-emerald-500' : 'bg-indigo-600'}`}
            />
          </div>
          <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
            {completedSteps} / 3 Completed
          </span>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {/* STEP 1: Profile Setup */}
        <div className="bg-white/40">
          <button
            onClick={() => setExpandedSection(expandedSection === 'profile' ? null : 'profile')}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-3.5 text-left">
              <div className="flex-shrink-0">
                {state.profileSetup ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Step 1</span>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-500" />
                  Complete Profile Info
                </h3>
              </div>
            </div>
            {expandedSection === 'profile' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          <AnimatePresence>
            {expandedSection === 'profile' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden border-t border-slate-50 bg-slate-50/50"
              >
                <form onSubmit={handleProfileSubmit} className="p-5 max-w-2xl space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Alternate WhatsApp</label>
                      <input 
                        type="tel"
                        value={state.altPhone}
                        onChange={(e) => saveState({ ...state, altPhone: e.target.value })}
                        placeholder="Alternate mobile no."
                        required
                        disabled={state.profileSetup}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-slate-100 disabled:text-slate-500 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Preferred Language</label>
                      <select
                        value={state.preferredLanguage}
                        onChange={(e) => saveState({ ...state, preferredLanguage: e.target.value })}
                        disabled={state.profileSetup}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-slate-100 disabled:text-slate-500 transition-all"
                      >
                        <option value="Hindi">Hindi (Default)</option>
                        <option value="English">English</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Gujarati">Gujarati</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Home District</label>
                      <input 
                        type="text"
                        value={state.nativeDistrict}
                        onChange={(e) => saveState({ ...state, nativeDistrict: e.target.value })}
                        placeholder="e.g. Pune / Mumbai"
                        required
                        disabled={state.profileSetup}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-slate-100 disabled:text-slate-500 transition-all"
                      />
                    </div>
                  </div>
                  
                  {!state.profileSetup ? (
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center gap-1"
                    >
                      Save Profile & Continue
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold bg-emerald-50 border border-emerald-100 rounded-lg p-2.5 w-fit">
                      <Check className="w-4 h-4" /> Profile Info saved successfully!
                    </div>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* STEP 2: KYC Documents Upload */}
        <div className="bg-white/40">
          <button
            onClick={() => setExpandedSection(expandedSection === 'kyc' ? null : 'kyc')}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-3.5 text-left">
              <div className="flex-shrink-0">
                {state.kycUploaded ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Step 2</span>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  Upload KYC Documents
                </h3>
              </div>
            </div>
            {expandedSection === 'kyc' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          <AnimatePresence>
            {expandedSection === 'kyc' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden border-t border-slate-50 bg-slate-50/50"
              >
                <div className="p-5">
                  <PartnerKYCUpload onSuccess={refreshOnboardingState} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* STEP 3: Training & Orientation */}
        <div className="bg-white/40">
          <button
            onClick={() => setExpandedSection(expandedSection === 'training' ? null : 'training')}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-3.5 text-left">
              <div className="flex-shrink-0">
                {state.trainingCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Step 3</span>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Video className="w-4 h-4 text-indigo-500" />
                  Orientation Training
                </h3>
              </div>
            </div>
            {expandedSection === 'training' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          <AnimatePresence>
            {expandedSection === 'training' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden border-t border-slate-50 bg-slate-50/50"
              >
                <div className="p-5 space-y-4">
                  <p className="text-xs text-slate-500">
                    Watch our short training modules to learn the onboarding pitch and complete your partner activation.
                  </p>
                  
                  <div className="space-y-3">
                    {trainingVideos.map(video => {
                      const isWatched = state.videosWatched[video.id];
                      const isCurrentlyPlaying = currentVideoId === video.id;
                      
                      return (
                        <div 
                          key={video.id} 
                          className={`p-3 bg-white border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${isWatched ? 'border-emerald-100 bg-emerald-50/20' : 'border-slate-200'}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isWatched ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                              {isWatched ? <Check className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-800">{video.title}</h4>
                              <p className="text-[10px] text-slate-400">Duration: {video.duration}</p>
                            </div>
                          </div>
                          
                          <div>
                            {isCurrentlyPlaying ? (
                              <div className="flex items-center gap-3">
                                <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${videoProgress}%` }} />
                                </div>
                                <span className="text-[10px] font-bold text-slate-500">{videoProgress}%</span>
                              </div>
                            ) : isWatched ? (
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 w-fit">
                                Completed
                              </span>
                            ) : (
                              <button 
                                onClick={() => handleStartVideo(video.id)}
                                className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                              >
                                <Play className="w-3 h-3 fill-indigo-700" />
                                Watch Video
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {state.trainingCompleted && (
                    <div className="mt-2 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl flex items-center gap-1.5 w-fit animate-pulse">
                      <CheckCircle2 className="w-4 h-4" /> Brilliant! Training course complete.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {overallPercentage === 100 && (
        <div className="p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50/50 border-t border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-emerald-800">You are Onboarded! 🎉</h3>
              <p className="text-[11px] text-emerald-600 font-medium">
                Sabh steps complete ho chuke hain. Verification pending hai. Start boarding salons now to make commission!
              </p>
            </div>
          </div>
          <button 
            onClick={handleResetChecklist}
            className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600 px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow transition-all"
          >
            Reset checklist state
          </button>
        </div>
      )}
    </div>
  );
}
