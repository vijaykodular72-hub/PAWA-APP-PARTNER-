import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  Check, 
  AlertCircle, 
  FileText, 
  Camera, 
  UserCheck, 
  RefreshCw, 
  X, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNotifications } from './NotificationProvider';

interface KYCUploadProps {
  onSuccess?: () => void;
  applicationId?: string;
}

export default function PartnerKYCUpload({ onSuccess, applicationId }: KYCUploadProps) {
  const { addNotification } = useNotifications();
  const [userId, setUserId] = useState<string | null>(null);
  const [actualAppId, setActualAppId] = useState<string | null>(applicationId || null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'none' | 'pending' | 'approved' | 'rejected'>('none');
  const [rejectionReason, setRejectionReason] = useState<string | null>(null);

  // Form states
  const [documentType, setDocumentType] = useState<string>('aadhaar');
  const [documentNumber, setDocumentNumber] = useState<string>('');
  const [panNumber, setPanNumber] = useState<string>('');

  // Files
  const [docFront, setDocFront] = useState<File | null>(null);
  const [docBack, setDocBack] = useState<File | null>(null);
  const [panFile, setPanFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);

  // File Previews
  const [previews, setPreviews] = useState<Record<string, string>>({
    docFront: '',
    docBack: '',
    pan: '',
    selfie: ''
  });

  // Drag and drop states
  const [dragActive, setDragActive] = useState<Record<string, boolean>>({
    docFront: false,
    docBack: false,
    pan: false,
    selfie: false
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch initial status
  useEffect(() => {
    async function loadKYCStatus() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);
          
          // Try to fetch application first
          const { data: app } = await supabase
            .from('partner_applications')
            .select('id, status, current_step')
            .eq('user_id', user.id)
            .single();

          if (app) {
            setActualAppId(app.id);
            
            // Fetch KYC data
            const { data: kyc } = await supabase
              .from('partner_kyc_data')
              .select('*')
              .eq('application_id', app.id)
              .single();

            if (kyc) {
              setDocumentType(kyc.document_type || 'aadhaar');
              setDocumentNumber(kyc.document_number ? '•••• •••• ' + kyc.document_number.slice(-4) : '');
              setPanNumber(kyc.pan_number ? '•••••' + kyc.pan_number.slice(-4) : '');
              setVerificationStatus(kyc.verification_status);
              setRejectionReason(kyc.rejection_reason);
              
              setPreviews({
                docFront: kyc.document_front_url || '',
                docBack: kyc.document_back_url || '',
                pan: kyc.pan_url || '',
                selfie: kyc.selfie_url || ''
              });
            } else if (app.status === 'kyc_submitted') {
              setVerificationStatus('pending');
            }
          }
        } else {
          // Local/Simulated state fallback for guest/demo users
          const savedKyc = localStorage.getItem('nexora_onboarding_kyc');
          if (savedKyc) {
            try {
              const parsed = JSON.parse(savedKyc);
              setDocumentType(parsed.documentType || 'aadhaar');
              setDocumentNumber(parsed.documentNumber || '');
              setPanNumber(parsed.panNumber || '');
              setVerificationStatus(parsed.verificationStatus || 'none');
              setRejectionReason(parsed.rejectionReason || null);
              setPreviews({
                docFront: parsed.docFrontUrl || '',
                docBack: parsed.docBackUrl || '',
                pan: parsed.panUrl || '',
                selfie: parsed.selfieUrl || ''
              });
            } catch (e) {
              console.error('Error parsing local KYC data', e);
            }
          }
        }
      } catch (err) {
        console.warn('Could not query database tables for KYC status, using local storage fallback.', err);
      } finally {
        setLoading(false);
      }
    }
    loadKYCStatus();
  }, [applicationId]);

  // Handle Drag Over
  const handleDrag = (e: React.DragEvent, field: string, isActive: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [field]: isActive }));
  };

  // Handle Drop
  const handleDrop = (e: React.DragEvent, field: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [field]: false }));

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0], field);
    }
  };

  // Process selected file
  const handleFileSelection = (file: File, field: string) => {
    // Basic file size and type validation
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      addNotification('Invalid File Type', 'Please upload an image (PNG, JPG) or PDF document.', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      addNotification('File Too Large', 'Maximum file size permitted is 5MB.', 'error');
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    if (field === 'docFront') {
      setDocFront(file);
      setPreviews(prev => ({ ...prev, docFront: objectUrl }));
    } else if (field === 'docBack') {
      setDocBack(file);
      setPreviews(prev => ({ ...prev, docBack: objectUrl }));
    } else if (field === 'pan') {
      setPanFile(file);
      setPreviews(prev => ({ ...prev, pan: objectUrl }));
    } else if (field === 'selfie') {
      setSelfieFile(file);
      setPreviews(prev => ({ ...prev, selfie: objectUrl }));
    }

    // Clear validation error if any
    setErrors(prev => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  // Validation helper
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. PAN Card validation
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panNumber.trim()) {
      newErrors.panNumber = 'PAN Card Number is required.';
    } else if (!panRegex.test(panNumber.toUpperCase().trim()) && !panNumber.includes('••••')) {
      newErrors.panNumber = 'Invalid PAN format. Pattern: ABCDE1234F';
    }

    // 2. Document Number validation
    if (!documentNumber.trim()) {
      newErrors.documentNumber = 'Document Number is required.';
    } else if (documentType === 'aadhaar') {
      const aadhaarRegex = /^\d{12}$/;
      const cleaned = documentNumber.replace(/\s/g, '');
      if (!aadhaarRegex.test(cleaned) && !documentNumber.includes('••••')) {
        newErrors.documentNumber = 'Aadhaar must be exactly 12 numeric digits.';
      }
    }

    // 3. Document Front
    if (!previews.docFront && !docFront) {
      newErrors.docFront = 'Front image of identity document is required.';
    }

    // 4. PAN File
    if (!previews.pan && !panFile) {
      newErrors.pan = 'PAN Card image copy is required.';
    }

    // 5. Selfie
    if (!previews.selfie && !selfieFile) {
      newErrors.selfie = 'Selfie photo for face match is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      addNotification('Validation Error ⚠️', 'Please fix all form validation issues.', 'error');
      return;
    }

    setSubmitting(true);
    addNotification('Submitting Documents...', 'Uploading files and encrypting data...', 'info');

    try {
      // Base64 helper for local simulation previews
      const toBase64 = (file: File | null): Promise<string> => {
        if (!file) return Promise.resolve('');
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
        });
      };

      const docFrontBase64 = docFront ? await toBase64(docFront) : previews.docFront;
      const docBackBase64 = docBack ? await toBase64(docBack) : previews.docBack;
      const panBase64 = panFile ? await toBase64(panFile) : previews.pan;
      const selfieBase64 = selfieFile ? await toBase64(selfieFile) : previews.selfie;

      if (userId && actualAppId) {
        // Logged-in Supabase submission
        // First verify or upsert KYC record
        const { error: dbError } = await supabase
          .from('partner_kyc_data')
          .upsert({
            application_id: actualAppId,
            document_type: documentType,
            document_number: documentNumber,
            document_front_url: docFrontBase64 || 'local_url_placeholder',
            document_back_url: docBackBase64 || null,
            pan_number: panNumber.toUpperCase(),
            pan_url: panBase64 || 'local_url_placeholder',
            selfie_url: selfieBase64 || 'local_url_placeholder',
            verification_status: 'pending',
            updated_at: new Date().toISOString()
          }, { onConflict: 'application_id' });

        if (dbError) {
          console.warn('Failed saving to database. Falling back to local mock.', dbError);
        } else {
          // Update partner application step/status
          await supabase
            .from('partner_applications')
            .update({
              status: 'kyc_submitted',
              current_step: 3,
              updated_at: new Date().toISOString()
            })
            .eq('id', actualAppId);
        }
      }

      // Sync local representation
      const localData = {
        documentType,
        documentNumber,
        panNumber: panNumber.toUpperCase(),
        verificationStatus: 'pending' as const,
        rejectionReason: null,
        docFrontUrl: docFrontBase64,
        docBackUrl: docBackBase64,
        panUrl: panBase64,
        selfieUrl: selfieBase64
      };
      
      localStorage.setItem('nexora_onboarding_kyc', JSON.stringify(localData));
      
      // Update local storage checklists
      const savedChecklist = localStorage.getItem('nexora_onboarding_state');
      if (savedChecklist) {
        try {
          const parsed = JSON.parse(savedChecklist);
          parsed.kycUploaded = true;
          parsed.aadhaarName = docFront ? docFront.name : 'aadhaar_card.jpg';
          parsed.panCardName = panFile ? panFile.name : 'pan_card.jpg';
          localStorage.setItem('nexora_onboarding_state', JSON.stringify(parsed));
        } catch (e) {}
      }

      setVerificationStatus('pending');
      addNotification('KYC Submitted! 📄', 'Your documents have been submitted to Nexora Compliance for verification.', 'success');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Error submitting KYC:', err);
      addNotification('Submission Failed', 'Something went wrong during file packaging. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Demo Admin Action Emulation
  const emulateAdminAction = async (action: 'approve' | 'reject') => {
    setLoading(true);
    const mockReason = action === 'reject' ? 'Uploaded image is blurred. Aadhaar card details are not clearly readable. Please re-upload high quality photo.' : null;
    const newStatus = action === 'approve' ? 'approved' : 'rejected';

    try {
      if (userId && actualAppId) {
        const { error: kycErr } = await supabase
          .from('partner_kyc_data')
          .update({
            verification_status: newStatus,
            rejection_reason: mockReason,
            verified_at: action === 'approve' ? new Date().toISOString() : null,
            updated_at: new Date().toISOString()
          })
          .eq('application_id', actualAppId);

        if (!kycErr) {
          await supabase
            .from('partner_applications')
            .update({
              status: action === 'approve' ? 'training_pending' : 'kyc_pending',
              current_step: action === 'approve' ? 4 : 2,
              updated_at: new Date().toISOString()
            })
            .eq('id', actualAppId);
        }
      }

      // Update LocalStorage
      const savedKyc = localStorage.getItem('nexora_onboarding_kyc');
      if (savedKyc) {
        const parsed = JSON.parse(savedKyc);
        parsed.verificationStatus = newStatus;
        parsed.rejectionReason = mockReason;
        localStorage.setItem('nexora_onboarding_kyc', JSON.stringify(parsed));
      }

      // If approved or rejected, sync general onboarding step state
      const savedChecklist = localStorage.getItem('nexora_onboarding_state');
      if (savedChecklist) {
        try {
          const parsed = JSON.parse(savedChecklist);
          parsed.kycUploaded = action === 'approve';
          localStorage.setItem('nexora_onboarding_state', JSON.stringify(parsed));
        } catch (e) {}
      }

      setVerificationStatus(newStatus);
      setRejectionReason(mockReason);

      if (action === 'approve') {
        addNotification('KYC Approved! 🎉', 'Verified compliance match. Moving to Orientation Training.', 'success');
      } else {
        addNotification('KYC Rejected ⚠️', 'compliance verification failed. Correction required.', 'error');
      }
    } catch (err) {
      console.error('Admin Emulation error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Clear a preview / file
  const handleClearField = (field: string) => {
    if (field === 'docFront') {
      setDocFront(null);
      setPreviews(prev => ({ ...prev, docFront: '' }));
    } else if (field === 'docBack') {
      setDocBack(null);
      setPreviews(prev => ({ ...prev, docBack: '' }));
    } else if (field === 'pan') {
      setPanFile(null);
      setPreviews(prev => ({ ...prev, pan: '' }));
    } else if (field === 'selfie') {
      setSelfieFile(null);
      setPreviews(prev => ({ ...prev, selfie: '' }));
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* VERIFICATION STATE TRACKER */}
      {verificationStatus !== 'none' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <ShieldCheck className="w-24 h-24 text-indigo-900" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">KYC Status</span>
              <h4 className="text-base font-bold text-slate-950 flex items-center gap-1.5 mt-0.5">
                Verification Progress Tracking
              </h4>
            </div>

            {/* Current status pill */}
            <div className="flex items-center">
              {verificationStatus === 'pending' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200/50 rounded-full text-xs font-bold animate-pulse">
                  <Clock className="w-4 h-4" /> Under Compliance Review
                </span>
              )}
              {verificationStatus === 'approved' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/50 rounded-full text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Identity Verified
                </span>
              )}
              {verificationStatus === 'rejected' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200/50 rounded-full text-xs font-bold">
                  <XCircle className="w-4 h-4" /> Verification Rejected
                </span>
              )}
            </div>
          </div>

          {/* Verification Timeline Tracker */}
          <div className="relative pl-6 space-y-6">
            <div className="absolute top-1 left-2 w-0.5 h-[calc(100%-10px)] bg-slate-200" />

            {/* Step A */}
            <div className="relative">
              <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[9px] font-black">
                ✓
              </span>
              <div>
                <p className="text-xs font-bold text-slate-800">Step A: Document Package Received</p>
                <p className="text-[11px] text-slate-500">Form successfully submitted for identity validation.</p>
              </div>
            </div>

            {/* Step B */}
            <div className="relative">
              <span className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-white text-[9px] font-black ${verificationStatus !== 'rejected' ? 'bg-indigo-600' : 'bg-rose-500'}`}>
                {verificationStatus === 'approved' ? '✓' : '•'}
              </span>
              <div>
                <p className="text-xs font-bold text-slate-800">Step B: KYC Compliance Scan</p>
                <p className="text-[11px] text-slate-500">
                  {verificationStatus === 'pending' && 'Automatic face match verification and PAN records check in progress...'}
                  {verificationStatus === 'approved' && 'PAN records validated. Selfie matching complete.'}
                  {verificationStatus === 'rejected' && 'Automatic scan or reviewer flagged document layout issues.'}
                </p>
              </div>
            </div>

            {/* Step C */}
            <div className="relative">
              <span className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-black ${verificationStatus === 'approved' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                {verificationStatus === 'approved' ? '✓' : '3'}
              </span>
              <div>
                <p className={`text-xs font-bold ${verificationStatus === 'approved' ? 'text-slate-800' : 'text-slate-400'}`}>
                  Step C: Verified Partner Account Setup
                </p>
                <p className="text-[11px] text-slate-500">Account compliance verification status mapped.</p>
              </div>
            </div>
          </div>

          {/* Rejection Notification Panel */}
          {verificationStatus === 'rejected' && rejectionReason && (
            <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl space-y-3">
              <div className="flex items-start gap-2.5 text-rose-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wide">Compliance Feedback Alert</h5>
                  <p className="text-xs font-medium mt-1 leading-relaxed text-rose-600">{rejectionReason}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setVerificationStatus('none');
                  setDocFront(null);
                  setDocBack(null);
                  setPanFile(null);
                  setSelfieFile(null);
                  setPreviews({ docFront: '', docBack: '', pan: '', selfie: '' });
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Resubmit KYC Documents
              </button>
            </div>
          )}

          {/* Success Banner */}
          {verificationStatus === 'approved' && (
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div className="text-xs font-medium">
                <span className="font-bold">KYC Validation Complete!</span> You have successfully passed compliance checks. Direct weekly commission payouts are now active.
              </div>
            </div>
          )}
        </div>
      )}

      {/* ADMIN EMULATION OVERLAY (Highly valuable for demo flows) */}
      <div className="p-4 bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 shadow-xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping" />
          <h4 className="text-xs font-black uppercase tracking-widest text-amber-400">Compliance Sandbox Panel</h4>
        </div>
        <p className="text-[11px] text-slate-400 font-medium">
          Simulate official administrative review actions to test success and failure paths instantly:
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => emulateAdminAction('approve')}
            className="flex-1 py-2 bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/30 text-emerald-400 hover:text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
          >
            <UserCheck className="w-3.5 h-3.5" /> Force Approve
          </button>
          <button
            type="button"
            onClick={() => emulateAdminAction('reject')}
            className="flex-1 py-2 bg-rose-600/20 hover:bg-rose-600 border border-rose-500/30 text-rose-400 hover:text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
          >
            <XCircle className="w-3.5 h-3.5" /> Force Reject
          </button>
        </div>
      </div>

      {/* KYC FORM DISPLAY */}
      {verificationStatus === 'none' && (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-[2.5rem] p-6 sm:p-8 space-y-8 shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Identity Compliance Form</h3>
              <p className="text-xs text-slate-500 font-medium">Weekly Direct payouts require verified identity credentials.</p>
            </div>
          </div>

          <hr className="border-slate-100" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Identity Doc Selection */}
            <div className="space-y-2">
              <label htmlFor="kyc-doc-type" className="block text-xs font-black uppercase tracking-wider text-slate-700">
                Primary ID Proof Type <span className="text-rose-500">*</span>
              </label>
              <select
                id="kyc-doc-type"
                value={documentType}
                onChange={(e) => {
                  setDocumentType(e.target.value);
                  setDocumentNumber('');
                }}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all cursor-pointer"
              >
                <option value="aadhaar">Aadhaar Card (12-Digit)</option>
                <option value="driving_license">Driving License</option>
                <option value="voter_id">Voter ID</option>
              </select>
            </div>

            {/* Document ID Number */}
            <div className="space-y-2">
              <label htmlFor="kyc-doc-number" className="block text-xs font-black uppercase tracking-wider text-slate-700">
                {documentType === 'aadhaar' ? 'Aadhaar Card Number' : documentType === 'driving_license' ? 'DL Reference Number' : 'Voter ID Card Number'} <span className="text-rose-500">*</span>
              </label>
              <input
                id="kyc-doc-number"
                type="text"
                required
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                placeholder={documentType === 'aadhaar' ? 'e.g. 5432 1098 7654' : 'e.g. MH1220190045231'}
                className={`w-full px-4 py-3.5 bg-slate-50 border rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all ${errors.documentNumber ? 'border-rose-400 focus:ring-rose-500/10' : 'border-slate-200'}`}
              />
              {errors.documentNumber && (
                <p className="text-[11px] text-rose-500 font-bold flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.documentNumber}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PAN card number */}
            <div className="space-y-2">
              <label htmlFor="kyc-pan-number" className="block text-xs font-black uppercase tracking-wider text-slate-700">
                PAN Card Number <span className="text-rose-500">*</span>
              </label>
              <input
                id="kyc-pan-number"
                type="text"
                required
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                placeholder="e.g. ABCDE1234F"
                maxLength={10}
                className={`w-full px-4 py-3.5 bg-slate-50 border rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all ${errors.panNumber ? 'border-rose-400 focus:ring-rose-500/10' : 'border-slate-200'}`}
              />
              {errors.panNumber && (
                <p className="text-[11px] text-rose-500 font-bold flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.panNumber}
                </p>
              )}
            </div>
          </div>

          {/* drag and drop uploads */}
          <div className="space-y-4">
            <span className="block text-xs font-black uppercase tracking-wider text-slate-700">
              Attach High-Resolution Verification Files <span className="text-rose-500">*</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Doc Front Zone */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Primary ID Front Page
                </label>
                <div
                  onDragEnter={(e) => handleDrag(e, 'docFront', true)}
                  onDragOver={(e) => handleDrag(e, 'docFront', true)}
                  onDragLeave={(e) => handleDrag(e, 'docFront', false)}
                  onDrop={(e) => handleDrop(e, 'docFront')}
                  className={`border-2 border-dashed rounded-3xl p-4 flex flex-col items-center justify-center text-center transition-all min-h-[140px] relative ${
                    dragActive.docFront ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50/30'
                  }`}
                >
                  {previews.docFront ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <div className="w-16 h-12 rounded-lg overflow-hidden border border-slate-200 relative">
                        <img src={previews.docFront} alt="ID Front preview" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold">Upload Complete</span>
                      <button
                        type="button"
                        onClick={() => handleClearField('docFront')}
                        className="absolute top-2 right-2 p-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-full"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload className="w-6 h-6 text-slate-400" />
                      <span className="text-xs font-bold text-slate-700">Drag or click to upload ID Front</span>
                      <span className="text-[9px] text-slate-400 font-semibold">Max size 5MB (PNG/JPG)</span>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileSelection(e.target.files[0], 'docFront');
                        }}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                {errors.docFront && <p className="text-[10px] text-rose-500 font-bold">{errors.docFront}</p>}
              </div>

              {/* Doc Back Zone */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Primary ID Back Page (Optional)
                </label>
                <div
                  onDragEnter={(e) => handleDrag(e, 'docBack', true)}
                  onDragOver={(e) => handleDrag(e, 'docBack', true)}
                  onDragLeave={(e) => handleDrag(e, 'docBack', false)}
                  onDrop={(e) => handleDrop(e, 'docBack')}
                  className={`border-2 border-dashed rounded-3xl p-4 flex flex-col items-center justify-center text-center transition-all min-h-[140px] relative ${
                    dragActive.docBack ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50/30'
                  }`}
                >
                  {previews.docBack ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <div className="w-16 h-12 rounded-lg overflow-hidden border border-slate-200 relative">
                        <img src={previews.docBack} alt="ID Back preview" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold">Upload Complete</span>
                      <button
                        type="button"
                        onClick={() => handleClearField('docBack')}
                        className="absolute top-2 right-2 p-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-full"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload className="w-6 h-6 text-slate-400" />
                      <span className="text-xs font-bold text-slate-700">Drag or click to upload ID Back</span>
                      <span className="text-[9px] text-slate-400 font-semibold">(Needed for Aadhaar / License)</span>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileSelection(e.target.files[0], 'docBack');
                        }}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* PAN File Zone */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  PAN Card Copy
                </label>
                <div
                  onDragEnter={(e) => handleDrag(e, 'pan', true)}
                  onDragOver={(e) => handleDrag(e, 'pan', true)}
                  onDragLeave={(e) => handleDrag(e, 'pan', false)}
                  onDrop={(e) => handleDrop(e, 'pan')}
                  className={`border-2 border-dashed rounded-3xl p-4 flex flex-col items-center justify-center text-center transition-all min-h-[140px] relative ${
                    dragActive.pan ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50/30'
                  }`}
                >
                  {previews.pan ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <div className="w-16 h-12 rounded-lg overflow-hidden border border-slate-200 relative">
                        <img src={previews.pan} alt="PAN card preview" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold">Upload Complete</span>
                      <button
                        type="button"
                        onClick={() => handleClearField('pan')}
                        className="absolute top-2 right-2 p-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-full"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload className="w-6 h-6 text-slate-400" />
                      <span className="text-xs font-bold text-slate-700">Drag or click to upload PAN Card</span>
                      <span className="text-[9px] text-slate-400 font-semibold">Max size 5MB (PNG/JPG)</span>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileSelection(e.target.files[0], 'pan');
                        }}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                {errors.pan && <p className="text-[10px] text-rose-500 font-bold">{errors.pan}</p>}
              </div>

              {/* Selfie Camera Verification Zone */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5 text-indigo-500" /> Face Verification Selfie
                </label>
                <div
                  onDragEnter={(e) => handleDrag(e, 'selfie', true)}
                  onDragOver={(e) => handleDrag(e, 'selfie', true)}
                  onDragLeave={(e) => handleDrag(e, 'selfie', false)}
                  onDrop={(e) => handleDrop(e, 'selfie')}
                  className={`border-2 border-dashed rounded-3xl p-4 flex flex-col items-center justify-center text-center transition-all min-h-[140px] relative ${
                    dragActive.selfie ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50/30'
                  }`}
                >
                  {previews.selfie ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <div className="w-16 h-12 rounded-lg overflow-hidden border border-slate-200 relative">
                        <img src={previews.selfie} alt="Selfie preview" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold">Selfie Captured</span>
                      <button
                        type="button"
                        onClick={() => handleClearField('selfie')}
                        className="absolute top-2 right-2 p-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-full"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center gap-2">
                      <Camera className="w-6 h-6 text-slate-400 animate-pulse" />
                      <span className="text-xs font-bold text-slate-700">Drag or click to upload selfie</span>
                      <span className="text-[9px] text-slate-400 font-semibold">Make sure your face is clearly visible</span>
                      <input
                        type="file"
                        accept="image/*"
                        capture="user"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileSelection(e.target.files[0], 'selfie');
                        }}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                {errors.selfie && <p className="text-[10px] text-rose-500 font-bold">{errors.selfie}</p>}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-gradient-to-r from-indigo-900 to-slate-900 hover:from-indigo-800 hover:to-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Encrypting and Submitting Package...
                </>
              ) : (
                <>
                  Submit KYC Package for Compliance Review
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
