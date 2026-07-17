import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Copy, 
  FileText, 
  Presentation, 
  Image, 
  Sparkles, 
  Check, 
  Eye, 
  BookOpen, 
  ExternalLink, 
  ArrowRight, 
  Share2, 
  FileDown,
  X,
  MapPin,
  Clock,
  ThumbsUp,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useNotifications } from './NotificationProvider';
import { jsPDF } from 'jspdf';

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: 'scripts' | 'decks' | 'marketing';
  type: string;
  fileType: string;
  size: string;
  downloads: number;
  tags: string[];
  content: string;
  detailedPoints?: string[];
}

const resources: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Elevator Pitch & Introduction Script',
    description: 'A punchy, conversational script designed for your first cold visit to a salon. Includes the signature hook: "Salon Ja Rahe Ho? Nexora Kiya Kya?".',
    category: 'scripts',
    type: 'PDF Script Doc',
    fileType: 'pdf',
    size: '1.2 MB',
    downloads: 1420,
    tags: ['Pitching', 'Hindi/English', 'Cold Call'],
    content: `NEXORA SALONOS - SALON INTRODUCTORY PITCH SCRIPT
------------------------------------------------------
Tagline: "Salon Ja Rahe Ho? Nexora Kiya Kya?"
Core Message: "Salary Nahi. Growth Share."

[PHASE 1: THE HOOK & TRUST BUILDING]
Partner: "Namaste bhaiya/didi! Main Nexora SalonOS se baat kar raha hoon. Aapka salon Pune me kaafi famous hai! Mujhe aapse bas 2 minute baat karni thi. Kya main aapse ek sawaal poochh sakta hoon?

Aapne hamara Pune ka advertisement suna ya dekha hai? 'Salon Ja Rahe Ho? Nexora Kiya Kya?'"

Owner: "Nahi, kya hai ye?" OR "Haan, suna toh hai. Kya hai?"

Partner: "Bhaiya, Nexora ek aisi operating system aur app hai jo offline salons ko online white-label websites aur booking system pradaan karta hai. Iska matlab aapke salon ki khud ki branded website hogi, jahan se Pune ke log direct appointments book kar sakte hain!"

[PHASE 2: VALUE PROPOSITION (BENEFITS)]
Partner: "Hamara core motive hai aapki occupancy aur daily bookings ko badhana. Hamare software se aap:
1. Apne salon ki branded website paate hain.
2. 25% Advance Booking amount receive karte hain (jis se customers booking cancel nahi karte).
3. Google Maps aur local discovery ke zariye naye customers attract karte hain.
4. Home services aur store services dono manage kar sakte hain."

[PHASE 3: COMMISSION & NO RISK]
Partner: "Sabse acchi baat? Isme koi upfront fees nahi hai, koi software purchase cost nahi hai. Hum aapse koi bada subscription nahi lete. Jab aapke paas customer aayega, tabhi hamara 10% operating cost share hota hai. Baaki 90% revenue seedhe aapka!
Jaise hum kehte hain: 'Salary Nahi. Growth Share!'"

[PHASE 4: CALL TO ACTION]
Partner: "Main abhi aapke mobile number se aapka premium salon digital profile create kar deta hoon. Bas 5 minute lagenge, aur kal se aapke area me log aapka online profile dekh payenge. Chaliye shuru karein?"`,
    detailedPoints: [
      "Ask permission before diving into the pitch - respect their busy client slots.",
      "Use local area references (e.g., Baner, Kothrud) to prove local presence.",
      "Emphasize the '25% advance' to show how it protects them from empty slot losses.",
      "Clearly mention: 'No Monthly Fixed Subscription Cost'."
    ]
  },
  {
    id: 'res-2',
    title: 'Objection Handling Guide Matrix',
    description: 'Expert responses to the top 4 critical questions and objections asked by salon owners, helping you build trust and onboard them quickly.',
    category: 'scripts',
    type: 'Sales Manual',
    fileType: 'pdf',
    size: '850 KB',
    downloads: 980,
    tags: ['Closing', 'Objections', 'Strategy'],
    content: `OBJECTION HANDLING GUIDE - NEXORA SALONOS
--------------------------------------------------

OBJECTION 1: "Main 10% commission kyun doon?"
RESPONSE: "Bhaiya, ye koi commission agent fee nahi hai. Ye platform hosting, payment gateway transactions, branded website running cost, aur local Pune promotion/advertisement ki fees hai. Hum aapse koi upfront ₹15,000-20,000 software ka charge nahi le rahe. Jab aapka business badhega, tabhi hum earn karenge. It's a growth partnership!"

OBJECTION 2: "Mera regular customer toh offline hi aata hai."
RESPONSE: "Bilkul sahi baat hai bhaiya! Lekin online website hone se aapko naye customers milenge jo is area me naye aaye hain ya Google pe search kar rahe hain. Aur regular customer bhi weekend pe queue me khade hone ke bajay direct book karke aayenge, jisse aapka counter rush manage hoga."

OBJECTION 3: "Customers 25% advance kyun pay karenge?"
RESPONSE: "Pune me har customer busy hai. Unhe guarantee chahiye ki jab woh aayenge, unhe seat milegi. 25% advance lene se bookings secure hoti hain, customer timing pe aata hai, aur zero no-shows hote hain. Aapki chair kabhi khali nahi rahegi."

OBJECTION 4: "Mera paisa mujhe kab aur kaise milega?"
RESPONSE: "Aapke customers jo 25% advance pay karenge, woh hamare secure escrow system me rehta hai. Roz raat ko 10 PM pe hum automatic settlement karte hain. Saara kamaaya hua paisa seedhe aapke bank account me transfer ho jata hai, zero manual request needed!"`,
    detailedPoints: [
      "Always agree with the owner first. Say 'Aap bilkul sahi bol rahe hain bhaiya, lekin...' to prevent defense.",
      "Use simple local analogies like food delivery or cab booking.",
      "Emphasize daily automatic settlements at 10:00 PM.",
      "Frame the 10% operating fee as an advertisement partner invest rather than a tax."
    ]
  },
  {
    id: 'res-3',
    title: 'Official SalonOS Pitch Deck (July 2026)',
    description: 'The comprehensive visual presentation deck outlining salon market problems, the Nexora product ecosystem, and pricing structures.',
    category: 'decks',
    type: 'Pitch Slides PDF',
    fileType: 'pdf',
    size: '4.8 MB',
    downloads: 2150,
    tags: ['Presentation', 'Sales Tool', 'Owner Meeting'],
    content: `NEXORA SALONOS OFFICIAL PITCH DECK
----------------------------------
Slide 1: Title
NEXORA SALONOS: India's Beauty Industry Operating System
"Empowering offline salons with digital white-label solutions"

Slide 2: The Core Problem
- Salons run at 40% empty chair capacity during weekdays.
- High cancellation rate (no-shows) because bookings have no advance payments.
- Zero local brand visibility as they do not have a custom website.
- Over-dependence on discount-aggregators which kill profits.

Slide 3: The Nexora Solution
- Get Your Custom Branded Website: e.g. nexora.in/s/elite-salon
- Direct Online Bookings with 25% Secure Advance Collection.
- Intuitive Salon Manager Dashboard: services, slots, staff.
- Automatic Daily Settlement at 10 PM directly to Bank account.

Slide 4: Zero Capital Risk for Owners
- No Subscription Fee.
- No Setup Cost.
- 10% Platform commission ONLY on successful online bookings.
- Growth Share Model: We grow when your salon grows!`,
    detailedPoints: [
      "Best shown on a tablet or mobile screen during a face-to-face meeting.",
      "Has side-by-side comparisons of 'Old Booking Way' vs 'Nexora SalonOS Way'.",
      "Highlights security badges of payment processing.",
      "Can be shared with owners via WhatsApp post-visit."
    ]
  },
  {
    id: 'res-4',
    title: 'Printable Counter Standee with QR',
    description: 'Ready-to-print vector standee designed for the billing counter. Helps onboarding salons prompt walking customers to book online next time.',
    category: 'marketing',
    type: 'High-Res A5 PDF',
    fileType: 'pdf',
    size: '3.4 MB',
    downloads: 1840,
    tags: ['Print', 'QR Code', 'Counter Asset'],
    content: `NEXORA STAND ORDER TEMPLATE (A5 SIZE)
--------------------------------------
[TOP BRANDING SECTION]
Nexora SalonOS logo
"Salon Ja Rahe Ho? Nexora Kiya Kya?"

[CENTER HERO STANDEE GRAPHIC]
*A beautiful illustrative smartphone showing a booking completion with a sparkling badge*

[COUNTER HOOK TEXT]
"Book your next haircut or massage in 10 seconds!"
Scan the QR below to check slot availability, active hair experts, and claim a 10% flat booking cashback!

[MOCK QR BARCODE WINDOW]
*QR Code linked to custom salon URL: nexora.in/s/[salon-slug]*

[FOOTER BRAND MESSAGE]
Powering Pune's leading beauty salons.
Salary Nahi. Growth Share. Nexora Partner Network.`,
    detailedPoints: [
      "Download and print on A5 size thick glossy card board (300 GSM).",
      "Features a large center space for mounting a custom QR sticker.",
      "Includes steps for the client on how to scan and book in 3 steps.",
      "Perfect for reducing customer wait stress at reception desk."
    ]
  },
  {
    id: 'res-5',
    title: 'Door & Glass Sticker Branding',
    description: 'Elegant "Online Booking Partner" circular sticker designs for salon entrance doors to signify tech-enabled services.',
    category: 'marketing',
    type: 'Circular Vinyl Sticker',
    fileType: 'pdf',
    size: '1.8 MB',
    downloads: 650,
    tags: ['Marketing', 'Print', 'Salon Branding'],
    content: `NEXORA GLASS STICKER BRANDING SHEET
----------------------------------------
Dimensions: 6" x 6" Circular Vinyl Sticker

[BORDER RING]
Branded Coral pink border with text: "Nexora Growth Partner Salon"

[CENTRAL LOGO]
Bold NEXORA logo with stars.

[TEXT]
"ONLINE BOOKINGS ACCEPTED HERE"
Book anytime, avoid counter queues.
Check slots on nexora.in`,
    detailedPoints: [
      "Meant for glass door entry points (eye-level placement).",
      "Features weatherproof high-gloss circular vector bounds.",
      "Instantly builds trust among passersby and walking traffic.",
      "Features the Nexora trust seal."
    ]
  }
];

export default function ResourceLibrary() {
  const { addNotification } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'scripts' | 'decks' | 'marketing'>('all');
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Filter resources based on tabs and search query
  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchesTab = activeCategory === 'all' || res.category === activeCategory;
      const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            res.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTab && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCopyText = (res: ResourceItem) => {
    navigator.clipboard.writeText(res.content);
    addNotification(
      'Copied to Clipboard! 📋',
      `"${res.title}" contents copied successfully. You can now paste and share.`,
      'success'
    );
  };

  const handleDownloadPDF = (res: ResourceItem) => {
    setDownloadingId(res.id);
    addNotification('Initiating Download...', `Preparing dynamic PDF for "${res.title}"...`, 'info');

    setTimeout(() => {
      try {
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const gpName = localStorage.getItem('partner_name') || 'Vijay Kumar';
        const currentDate = new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        });

        // Brand colors
        const COLOR_PRIMARY = [79, 70, 229];    // Indigo (#4F46E5)
        const COLOR_CORAL = [255, 107, 107];    // Coral/Pink (#FF6B6B)
        const COLOR_TEXT_DARK = [15, 23, 42];   // Dark Slate (#0F172A)
        const COLOR_TEXT_MUTED = [100, 116, 139]; // Muted Gray (#64748B)

        // Draw top accent bar
        doc.setFillColor(COLOR_CORAL[0], COLOR_CORAL[1], COLOR_CORAL[2]);
        doc.rect(0, 0, 210, 5, 'F');

        // Logo & Tagline
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
        doc.text('NEXORA SalonOS', 15, 18);

        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
        doc.text("India's Beauty Industry Operating System | Growth Partner Hub", 15, 23);

        // Resource header details
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
        doc.text('OFFICIAL GROWTH ENABLER RESOURCE', 200 - doc.getTextWidth('OFFICIAL GROWTH ENABLER RESOURCE'), 18);

        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(8);
        doc.text(`Downloaded by: ${gpName}`, 200 - doc.getTextWidth(`Downloaded by: ${gpName}`), 23);

        // Separate line
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.4);
        doc.line(15, 27, 195, 27);

        // Resource Title Box
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(15, 32, 180, 24, 2, 2, 'F');
        doc.setDrawColor(241, 245, 249);
        doc.roundedRect(15, 32, 180, 24, 2, 2, 'S');

        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
        doc.text(res.title, 20, 40);

        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
        doc.text(`Category: ${res.category.toUpperCase()} | Format: PDF Document | Stamp: ${currentDate}`, 20, 46);

        // Render main content body
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
        doc.text('DOCUMENT OUTLINE & MATERIAL CONTENTS:', 15, 65);

        // Content parser - split content into lines
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85); // Slate 700

        const lines = res.content.split('\n');
        let currentY = 72;
        
        lines.forEach(line => {
          if (line.trim().startsWith('[') && line.trim().endsWith(']')) {
            // Section heading
            doc.setFont('Helvetica', 'bold');
            doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
            doc.text(line, 15, currentY + 2);
            doc.setFont('Helvetica', 'normal');
            doc.setTextColor(51, 65, 85);
            currentY += 7;
          } else if (line.trim() === '------------------------------------------------------' || line.trim() === '--------------------------------------------------' || line.trim() === '----------------------------------' || line.trim() === '--------------------------------------' || line.trim() === '----------------------------------------') {
            doc.setDrawColor(241, 245, 249);
            doc.line(15, currentY, 195, currentY);
            currentY += 4;
          } else {
            // Normal text with word wrap
            const splitText = doc.splitTextToSize(line, 175);
            splitText.forEach((textLine: string) => {
              if (currentY > 265) {
                // Trigger page break
                doc.addPage();
                // Redraw top accent on new page
                doc.setFillColor(COLOR_CORAL[0], COLOR_CORAL[1], COLOR_CORAL[2]);
                doc.rect(0, 0, 210, 4, 'F');
                currentY = 20;
              }
              doc.text(textLine, 15, currentY);
              currentY += 5;
            });
          }
        });

        // Add detailed execution points
        if (res.detailedPoints && res.detailedPoints.length > 0) {
          currentY += 6;
          if (currentY > 250) {
            doc.addPage();
            doc.setFillColor(COLOR_CORAL[0], COLOR_CORAL[1], COLOR_CORAL[2]);
            doc.rect(0, 0, 210, 4, 'F');
            currentY = 20;
          }

          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(10.5);
          doc.setTextColor(COLOR_CORAL[0], COLOR_CORAL[1], COLOR_CORAL[2]);
          doc.text('GROWTH PARTNER FIELD EXECUTION TIPS:', 15, currentY);
          currentY += 6;

          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);

          res.detailedPoints.forEach((point, pIdx) => {
            const wrappedPoint = doc.splitTextToSize(`${pIdx + 1}. ${point}`, 175);
            wrappedPoint.forEach((pLine: string) => {
              doc.text(pLine, 15, currentY);
              currentY += 4.5;
            });
          });
        }

        // Regulatory footer message
        const footerY = 275;
        doc.setDrawColor(226, 232, 240);
        doc.line(15, footerY, 195, footerY);

        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
        doc.text('Nexora Training & Resource Network', 15, footerY + 5);

        doc.setFont('Helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(COLOR_CORAL[0], COLOR_CORAL[1], COLOR_CORAL[2]);
        doc.text('Salary Nahi. Growth Share.', 200 - doc.getTextWidth('Salary Nahi. Growth Share.'), footerY + 5);

        const filename = `Nexora_Resource_${res.title.replace(/\s+/g, '_')}.pdf`;
        doc.save(filename);

        setDownloadingId(null);
        addNotification(
          'Resource Downloaded! 📥',
          `"${res.title}" successfully compiled and downloaded to your local device.`,
          'success'
        );
      } catch (error) {
        console.error('Failed to download resource:', error);
        setDownloadingId(null);
        addNotification('Download Failed ❌', 'There was an issue compiling this resource PDF.', 'error');
      }
    }, 1200);
  };

  return (
    <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 md:p-8 mt-12 shadow-sm" id="resource-library">
      
      {/* Library Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Growth Partner Sales Enabler Library</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-indigo-950 tracking-tight">
            Sales Collateral & Resource Library
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Empower your merchant conversations. Instantly copy optimized pitch scripts, download official slide decks, and print high-conversion marketing materials.
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
          <input
            type="text"
            placeholder="Search script hooks, flyers, decks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
          />
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 mb-6">
        {[
          { key: 'all', label: 'All Resources', icon: BookOpen },
          { key: 'scripts', label: 'Sales Scripts & Objections', icon: FileText },
          { key: 'decks', label: 'Pitch Decks & Presentations', icon: Presentation },
          { key: 'marketing', label: 'Marketing & Printable Assets', icon: Image }
        ].map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key as any)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer",
                activeCategory === tab.key
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100"
                  : "bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:border-slate-300 shadow-sm"
              )}
            >
              <TabIcon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Resources Card Grid */}
      {filteredResources.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl py-12 px-4 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">No Resources Found</p>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search filters or browse other categories.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => {
            return (
              <div 
                key={res.id} 
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Decorative Blur Background on Hover */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-50/30 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

                <div>
                  {/* Category Stamp & Download count */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider",
                      res.category === 'scripts' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                      res.category === 'decks' ? "bg-indigo-50 text-indigo-700 border border-indigo-100" :
                      "bg-amber-50 text-amber-700 border border-amber-100"
                    )}>
                      {res.category === 'scripts' ? 'Sales Script' : res.category === 'decks' ? 'Pitch Deck' : 'Brand Asset'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                      <FileDown className="w-3.5 h-3.5" />
                      {res.downloads.toLocaleString()} downloads
                    </span>
                  </div>

                  {/* Resource Info */}
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-2 leading-relaxed">
                    {res.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {res.tags.map((tag) => (
                      <span key={tag} className="bg-slate-50 text-slate-500 border border-slate-200/60 rounded-md px-2 py-0.5 text-[10px] font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Action Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedResource(res)}
                    className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl py-2 px-3 text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </button>

                  {res.category === 'scripts' && (
                    <button
                      type="button"
                      onClick={() => handleCopyText(res)}
                      className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-xl p-2 cursor-pointer transition-colors"
                      title="Copy Script to Clipboard"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    type="button"
                    disabled={downloadingId === res.id}
                    onClick={() => handleDownloadPDF(res)}
                    className={cn(
                      "bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2 px-3 text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors",
                      res.category !== 'scripts' ? 'flex-1' : '',
                      downloadingId === res.id ? "opacity-60 cursor-not-allowed" : ""
                    )}
                  >
                    {downloadingId === res.id ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        Download PDF
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Preview Dialog Backdrop/Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider">
                  Resource Preview
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1">
                  {selectedResource.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedResource(null)}
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content Scrollable Area */}
            <div className="p-6 overflow-y-auto space-y-6 max-h-[60vh] text-left">
              
              {/* Summary Pitch Box */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200/60 p-4">
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  {selectedResource.description}
                </p>
                <div className="mt-3 flex items-center gap-4 text-[11px] font-bold text-slate-500">
                  <span>File size: <span className="text-slate-700">{selectedResource.size}</span></span>
                  <span>Category: <span className="text-indigo-600 capitalize">{selectedResource.category}</span></span>
                </div>
              </div>

              {/* Resource Content Block */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">File Content Preview</h4>
                <pre className="bg-indigo-950 text-indigo-50 border border-indigo-900 rounded-2xl p-5 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[280px]">
                  {selectedResource.content}
                </pre>
              </div>

              {/* Training Tips & Strategy checklist */}
              {selectedResource.detailedPoints && (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    How to pitch / utilize this asset:
                  </h4>
                  <ul className="space-y-2">
                    {selectedResource.detailedPoints.map((point, index) => (
                      <li key={index} className="flex gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedResource(null)}
                className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer"
              >
                Close Preview
              </button>

              {selectedResource.category === 'scripts' && (
                <button
                  type="button"
                  onClick={() => {
                    handleCopyText(selectedResource);
                    setSelectedResource(null);
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  Copy Text Content
                </button>
              )}

              <button
                type="button"
                disabled={downloadingId === selectedResource.id}
                onClick={() => {
                  handleDownloadPDF(selectedResource);
                  setSelectedResource(null);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-100"
              >
                <Download className="w-4 h-4" />
                Download Complete PDF
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
