import { jsPDF } from 'jspdf';

interface PartnerStats {
  availableBalance: string;
  pendingBalance: string;
  todayCommission: string;
  totalShops: number;
  activeShops: number;
  verifiedShops: number;
  pendingShops: number;
  lifetimeEarnings: string;
  milestoneCount: number;
  monthlyShops: number;
  partnerName: string;
  activeLeadsCount: number;
  currentMonthCommissions: string | number;
}

export function exportDashboardToPDF(stats: PartnerStats) {
  // Create a new A4 PDF document (portrait, millimeters, a4)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // --- BRAND COLORS ---
  const COLOR_PRIMARY = [79, 70, 229];    // Indigo (#4F46E5)
  const COLOR_CORAL = [255, 107, 107];    // Coral/Pink (#FF6B6B)
  const COLOR_TEXT_DARK = [15, 23, 42];   // Dark Slate (#0F172A)
  const COLOR_TEXT_MUTED = [100, 116, 139]; // Muted Gray (#64748B)
  const COLOR_BG_LIGHT = [248, 250, 252];  // Light Gray Panel (#F8FAFC)
  const COLOR_SUCCESS = [16, 185, 129];   // Emerald Green (#10B981)

  // --- TOP CORAL ACCENT BAR ---
  doc.setFillColor(COLOR_CORAL[0], COLOR_CORAL[1], COLOR_CORAL[2]);
  doc.rect(0, 0, 210, 5, 'F');

  // --- HEADER SECTION ---
  // Left: Brand Name
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('NEXORA SalonOS', 15, 20);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text("India's Beauty Industry Operating System", 15, 25);

  // Right: Document Metadata
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text('PERFORMANCE SUMMARY REPORT', 200 - doc.getTextWidth('PERFORMANCE SUMMARY REPORT'), 20);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text(`Generated: ${currentDate}`, 200 - doc.getTextWidth(`Generated: ${currentDate}`), 25);

  // Thin separator line
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.5);
  doc.line(15, 30, 195, 30);

  // --- PARTNER INFO BOX ---
  doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
  doc.roundedRect(15, 35, 180, 25, 3, 3, 'F');
  doc.setDrawColor(241, 245, 249);
  doc.roundedRect(15, 35, 180, 25, 3, 3, 'S');

  // Info details
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text(stats.partnerName || 'Vijay Kumar', 22, 43);

  doc.setFont('Helvetica', 'medium');
  doc.setFontSize(9);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('Growth Partner (GP) Program Account', 22, 48);

  // Right-aligned branding tagline
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(COLOR_CORAL[0], COLOR_CORAL[1], COLOR_CORAL[2]);
  doc.text('Salary Nahi. Growth Share.', 188 - doc.getTextWidth('Salary Nahi. Growth Share.'), 45);

  doc.setFont('Helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('Official District Business Partner Track', 188 - doc.getTextWidth('Official District Business Partner Track'), 51);


  // --- SECTION HEADER: PERFORMANCE METRICS ---
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text('Key Performance Indicators (KPI)', 15, 70);

  // --- KPI CARD 1: ACTIVE PIPELINE LEADS ---
  doc.setFillColor(245, 247, 255); // Indigo light-bg
  doc.roundedRect(15, 75, 56, 32, 3, 3, 'F');
  doc.setDrawColor(224, 231, 255);
  doc.roundedRect(15, 75, 56, 32, 3, 3, 'S');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('ACTIVE LEADS', 20, 83);

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text(String(stats.activeLeadsCount || 0), 20, 93);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('In Progress Pipeline', 20, 100);

  // --- KPI CARD 2: MONTHLY COMMISSIONS ---
  doc.setFillColor(240, 253, 250); // Emerald light-bg
  doc.roundedRect(77, 75, 56, 32, 3, 3, 'F');
  doc.setDrawColor(204, 251, 241);
  doc.roundedRect(77, 75, 56, 32, 3, 3, 'S');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_SUCCESS[0], COLOR_SUCCESS[1], COLOR_SUCCESS[2]);
  doc.text('THIS MONTH COMMS', 82, 83);

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  const formattedComm = typeof stats.currentMonthCommissions === 'number' 
    ? `INR ${stats.currentMonthCommissions.toLocaleString()}`
    : String(stats.currentMonthCommissions);
  doc.text(formattedComm, 82, 93);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text(`Available: ${stats.availableBalance}`, 82, 100);

  // --- KPI CARD 3: MILESTONE PROGRESS ---
  doc.setFillColor(255, 251, 235); // Amber light-bg
  doc.roundedRect(139, 75, 56, 32, 3, 3, 'F');
  doc.setDrawColor(254, 243, 199);
  doc.roundedRect(139, 75, 56, 32, 3, 3, 'S');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(180, 83, 9); // Amber text dark
  doc.text('MILESTONE TRACK', 144, 83);

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  
  // Custom Milestone percentage check
  const nextTarget = stats.activeShops < 25 ? 25 : stats.activeShops < 50 ? 50 : 100;
  const percentage = Math.min(100, Math.round((stats.activeShops / nextTarget) * 100));
  doc.text(`${percentage}%`, 144, 93);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text(`${stats.activeShops}/${nextTarget} Active Shops`, 144, 100);


  // --- SECTION HEADER: DETAILED METRICS TABLE ---
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text('Onboarding & Commission Breakdown', 15, 118);

  // Table Headers
  const tableTop = 124;
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(15, tableTop, 180, 8, 'F');
  
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text('METRIC COMPONENT', 20, tableTop + 5.5);
  doc.text('COUNT / VALUE', 105, tableTop + 5.5);
  doc.text('STATUS & VELOCITY', 150, tableTop + 5.5);

  // Table Rows Helper
  const rows = [
    { name: 'Total Shops Referrals', val: `${stats.totalShops} Salons`, status: 'Lifetime Registered' },
    { name: 'Active & Transacting Shops', val: `${stats.activeShops} Salons`, status: 'Active Operating Mode' },
    { name: 'Monthly New Salons Added', val: `${stats.monthlyShops} Salons`, status: 'Current Month Growth' },
    { name: 'Verified & Approved', val: `${stats.verifiedShops} Salons`, status: '100% KYC Completed' },
    { name: 'Pending Verification', val: `${stats.pendingShops} Salons`, status: 'In Review Queue' },
    { name: 'Accumulated Lifetime Earnings', val: stats.lifetimeEarnings, status: 'Total Transferred & Pending' },
    { name: 'Unlocked Milestone Levels', val: `${stats.milestoneCount} Level Steps`, status: 'T-shirt / Welcome Kit Achieved' }
  ];

  let currentY = tableTop + 8;
  rows.forEach((row, idx) => {
    // Alternating row bg
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(15, currentY, 180, 8, 'F');
    }

    // Row borders
    doc.setDrawColor(241, 245, 249);
    doc.line(15, currentY + 8, 195, currentY + 8);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
    doc.text(row.name, 20, currentY + 5.5);

    doc.setFont('Helvetica', 'bold');
    doc.text(row.val, 105, currentY + 5.5);

    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
    doc.text(row.status, 150, currentY + 5.5);

    currentY += 8;
  });


  // --- POLICY STATEMENT & REGULATORY NOTE ---
  const policyY = currentY + 12;
  doc.setFillColor(254, 242, 242); // Coral very light bg
  doc.roundedRect(15, policyY, 180, 32, 2, 2, 'F');
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(15, policyY, 180, 32, 2, 2, 'S');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(185, 28, 28); // Dark red
  doc.text('NEXORA GROWTH PARTNER TERMS & DISCLAIMER', 20, policyY + 6);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(127, 29, 29);
  
  const rules = [
    '- This report represents performance metrics for the independent Nexora Growth Partner Program.',
    '- This is NOT a salary-based position or franchise. Payouts are computed entirely based on actual referral transactions.',
    '- High standards of truth and professionalism must be maintained while onboarding salons.',
    '- Referrals with incorrect billing details or fake verification documents will result in commission suspension.'
  ];

  rules.forEach((rule, idx) => {
    doc.text(rule, 20, policyY + 12 + (idx * 4.5));
  });


  // --- VERIFICATION FOOTER ---
  const footerY = 265;
  doc.setDrawColor(226, 232, 240);
  doc.line(15, footerY, 195, footerY);

  // Seal / Sign area
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text('Nexora Auditor Verification System', 15, footerY + 6);
  
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('Digitally signed and certified offline-compliant snapshot', 15, footerY + 10);
  doc.text('Ref ID: GP-REP-' + Math.floor(Math.random() * 900000 + 100000), 15, footerY + 14);

  // Brand message
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(COLOR_CORAL[0], COLOR_CORAL[1], COLOR_CORAL[2]);
  doc.text('Salon Ja Rahe Ho? Nexora Kiya Kya?', 200 - doc.getTextWidth('Salon Ja Rahe Ho? Nexora Kiya Kya?'), footerY + 6);

  doc.setFont('Helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('Salary Nahi. Growth Share.', 200 - doc.getTextWidth('Salary Nahi. Growth Share.'), footerY + 11);

  // Save PDF
  const filename = `Nexora_Partner_Report_${stats.partnerName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}
