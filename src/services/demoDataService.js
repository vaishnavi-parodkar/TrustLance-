/**
 * TRUSTLANCE Demo Data & Scenario State Manager
 * Pre-seeds Alex Morgan (Client) and Jordan Lee (Freelancer)
 * Handles Scenarios A, B, C, D for PayPal x AI Hackathon Judge Demos.
 */

export const USERS = {
  alex: {
    id: 'usr_client_alex',
    email: 'alex.morgan@client.demo',
    fullName: 'Alex Morgan',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    company: 'Nexus Brands Inc.',
    paypalEmail: 'sb-client-alex@business.example.com',
    reliabilityScore: 99.2,
  },
  jordan: {
    id: 'usr_freelancer_jordan',
    email: 'jordan.lee@freelance.demo',
    fullName: 'Jordan Lee',
    role: 'freelancer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    title: 'Senior Full-Stack Engineer & UI Architect',
    paypalEmail: 'sb-freelancer-jordan@personal.example.com',
    reliabilityScore: 97.8,
  },
};

const STORAGE_KEY = 'trustlance_project_state_v1';

export function getInitialProjectState() {
  const startDate = new Date();
  const deadlineDate = new Date();
  deadlineDate.setDate(startDate.getDate() + 21);

  return {
    id: 'proj_ecommerce_600',
    title: 'E-commerce Website Development',
    tagline: 'Full-stack responsive retail store with catalogue, cart, Supabase auth & PayPal Checkout.',
    budget: 600.0,
    currency: 'USD',
    durationDays: 21,
    currentDay: 7,
    status: 'active', // active, recovery_mode, completed, disputed
    client: USERS.alex,
    freelancer: USERS.jordan,
    agreement: {
      id: 'agr_001',
      version: 1,
      status: 'approved',
      approvedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      revisionRounds: 2,
      clientReviewDays: 2,
      delayPenaltyRatePct: 1.0,
      maxPenaltyPct: 10.0,
      terms: '1% deduction per freelancer-attributable late day, maximum 10% of affected milestone. 0% deduction for client delays.',
    },
    amendments: [],
    milestones: [
      {
        id: 'm1',
        order: 1,
        title: 'UI Design & System Mockups',
        description: 'Figma mockups and responsive design system for home, catalogue, cart, and dashboard.',
        budget: 150.0,
        originalDurationDays: 4,
        startDay: 1,
        endDay: 4,
        actualSubmissionDay: 7, // 3 days late
        status: 'submitted', // pending, in_progress, submitted, approved, delayed
        paymentStatus: 'adjusted_pending', // unpaid, adjusted_pending, paid
        deliverables: [
          'Figma design system file with tokens and responsive grids',
          'Desktop (1440px) and Mobile (390px) screens for Catalogue & Cart',
          'Interactive clickable prototype flow',
        ],
        acceptanceCriteria: [
          'All 4 core templates designed (Home, Catalogue, Cart, Admin)',
          'High-resolution asset export package included',
          'Interactive checkout flow preview verified',
        ],
        evidence: [
          {
            id: 'ev1',
            type: 'live_url',
            title: 'Figma Design Workspace & Prototype',
            url: 'https://figma.com/file/trustlance-demo-ecommerce-v1',
            description: 'Contains complete UI kit, 4 screens, and interactive prototype.',
            submittedAt: 'Day 7, 03:30 PM',
          },
          {
            id: 'ev2',
            type: 'archive',
            title: 'Exported UI Assets (SVG & PNG Pack)',
            url: 'https://storage.trustlance.io/evidence/ui-assets-pack-v1.zip',
            fileSize: '14.2 MB',
            submittedAt: 'Day 7, 03:32 PM',
          },
        ],
        delayAssessment: {
          originalDeadlineDay: 4,
          actualSubmissionDay: 7,
          totalDelayDays: 3,
          freelancerDays: 3,
          clientDays: 0,
          excusedDays: 0,
          classification: 'freelancer_caused',
          rationale: 'Deliverable submitted 3 days after agreed Day 4 deadline without documented client review lag.',
          deductionPct: 3.0,
          deductionAmount: 4.5, // 3% of $150
          netPayableAmount: 145.5, // $150 - $4.50
          status: 'proposed', // proposed, accepted, disputed
        },
      },
      {
        id: 'm2',
        order: 2,
        title: 'Frontend Development & State Management',
        description: 'React components, cart state management, checkout flows, and responsive UI views.',
        budget: 200.0,
        originalDurationDays: 7,
        startDay: 5,
        endDay: 11,
        recoveryStartDay: 8,
        recoveryEndDay: 13, // Compressed to 6 days
        status: 'pending',
        paymentStatus: 'unpaid',
        deliverables: ['React Vite source code', 'State management for cart', 'Responsive views'],
        acceptanceCriteria: ['Mobile responsive', 'Cart persistence', 'Form input validation'],
        evidence: [],
      },
      {
        id: 'm3',
        order: 3,
        title: 'Backend Integration & Payment Processing',
        description: 'REST APIs, Supabase Auth, PostgreSQL schema, and PayPal Checkout endpoints.',
        budget: 150.0,
        originalDurationDays: 6,
        startDay: 12,
        endDay: 17,
        recoveryStartDay: 12, // Runs in parallel with Frontend on Days 12-13!
        recoveryEndDay: 18,
        isParallel: true,
        status: 'pending',
        paymentStatus: 'unpaid',
        deliverables: ['Database schemas', 'Auth integration', 'PayPal Sandbox capture endpoints'],
        acceptanceCriteria: ['Passes integration tests', 'Secure sessions', 'Verified PayPal order callbacks'],
        evidence: [],
      },
      {
        id: 'm4',
        order: 4,
        title: 'Testing, Security Audit & Deployment',
        description: 'End-to-end testing, payment verification, bug triage, and production deployment on Vercel.',
        budget: 100.0,
        originalDurationDays: 4,
        startDay: 18,
        endDay: 21,
        recoveryStartDay: 19,
        recoveryEndDay: 21, // Finishes on Day 21!
        status: 'pending',
        paymentStatus: 'unpaid',
        deliverables: ['Test coverage report', 'Vercel live deployment URL', 'Hand-off documentation'],
        acceptanceCriteria: ['Zero blocking bugs', '100% green test suite', 'Live URL functional'],
        evidence: [],
      },
    ],
    // Bryntum Gantt Tasks backing model
    ganttTasks: [
      {
        id: 't1',
        name: 'UI Design & System Mockups',
        startDate: '2026-11-10',
        endDate: '2026-11-14', // Original 4 days
        actualEndDate: '2026-11-17', // Day 7 actual
        duration: 7,
        percentDone: 100,
        cls: 'delayed-task',
        baseline: {
          startDate: '2026-11-10',
          endDate: '2026-11-14',
        },
      },
      {
        id: 't2',
        name: 'Frontend Development & State Management',
        startDate: '2026-11-18',
        endDate: '2026-11-23',
        duration: 6,
        percentDone: 0,
        cls: 'recovered-task',
        baseline: {
          startDate: '2026-11-15',
          endDate: '2026-11-21',
        },
      },
      {
        id: 't3',
        name: 'Backend Integration & Payment Processing',
        startDate: '2026-11-22', // Overlaps on 22-23 (parallel!)
        endDate: '2026-11-28',
        duration: 7,
        percentDone: 0,
        cls: 'parallel-task',
        baseline: {
          startDate: '2026-11-22',
          endDate: '2026-11-27',
        },
      },
      {
        id: 't4',
        name: 'Testing, Security Audit & Deployment',
        startDate: '2026-11-29',
        endDate: '2026-12-01', // Target Day 21 preserved!
        duration: 3,
        percentDone: 0,
        cls: 'recovered-task',
        baseline: {
          startDate: '2026-11-28',
          endDate: '2026-12-01',
        },
      },
    ],
    ganttDependencies: [
      { from: 't1', to: 't2', type: 2 },
      { from: 't2', to: 't4', type: 2 },
      { from: 't3', to: 't4', type: 2 },
    ],
    changeRequests: [
      {
        id: 'cr_001',
        title: 'Dark Mode Theme & 2 Extra Product Landing Pages',
        description: 'Client requested full dark mode toggle and two specialized promotional landing pages after initial review.',
        requestedBy: 'Alex Morgan',
        requestedDay: 7,
        classification: 'new_scope',
        status: 'pending_negotiation', // pending_negotiation, approved, rejected
        aiAnalysis: {
          classification: 'new_scope',
          reasoning: 'The client requests features (Dark Mode toggle and 2 additional page templates) not defined in the 4-screen approved agreement.',
          estimatedHours: 12,
          estimatedCost: 120.0,
          estimatedDays: 3,
        },
        freelancerCounter: {
          proposedCost: 110.0,
          proposedDays: 3,
          note: 'I can deliver the dark mode color variables and two landing pages for +$110 within +3 days without affecting checkout.',
        },
      },
    ],
    disputes: [
      {
        id: 'dsp_001',
        milestoneId: 'm1',
        raisedBy: 'Alex Morgan',
        raisedDay: 8,
        status: 'open',
        title: 'Dispute regarding UI Design delivery delay and secondary screen scope',
        clientClaim: 'Freelancer delivered 3 days late and omitted secondary checkout modal variations.',
        freelancerClaim: 'All 4 primary contractual screens were provided in full Figma fidelity; secondary checkout variations were never in the signed criteria.',
        aiReport: null,
      },
    ],
    transactions: [],
    trustTimeline: [
      {
        id: 'tl_1',
        day: 1,
        timestamp: 'Nov 10, 2026, 09:00 AM',
        actor: 'Alex Morgan',
        role: 'Client',
        type: 'agreement_created',
        title: 'Project Initiated via AI Smart Agreement Generator',
        description: 'Alex Morgan generated contract terms: $600 budget, 4 milestones, 21-day timeline, 1% per day late deduction policy.',
      },
      {
        id: 'tl_2',
        day: 1,
        timestamp: 'Nov 10, 2026, 10:15 AM',
        actor: 'Jordan Lee',
        role: 'Freelancer',
        type: 'agreement_approved',
        title: 'Contract Approved & Mutually Signed',
        description: 'Jordan Lee reviewed and accepted all acceptance criteria, milestones, and contractual delay policies.',
      },
      {
        id: 'tl_3',
        day: 4,
        timestamp: 'Nov 14, 2026, 11:59 PM',
        actor: 'TRUSTLANCE Engine',
        role: 'System',
        type: 'milestone_due',
        title: 'Milestone 1 (UI Design) Due Date Reached',
        description: 'Agreed Day 4 delivery deadline passed without deliverable submission. Late day counter initialized.',
      },
      {
        id: 'tl_4',
        day: 7,
        timestamp: 'Nov 17, 2026, 03:30 PM',
        actor: 'Jordan Lee',
        role: 'Freelancer',
        type: 'deliverable_submitted',
        title: 'UI Design Deliverables Submitted (Day 7)',
        description: 'Submitted Figma live prototype and 14.2 MB SVG/PNG UI asset package.',
      },
      {
        id: 'tl_5',
        day: 7,
        timestamp: 'Nov 17, 2026, 03:31 PM',
        actor: 'AI Verification Engine',
        role: 'System',
        type: 'ai_verification',
        title: 'AI Deliverable Verification Completed (94.5% Score)',
        description: 'Verified 4 primary screens, design tokens, and responsive layouts. Noted 3 days submission delay.',
      },
      {
        id: 'tl_6',
        day: 7,
        timestamp: 'Nov 17, 2026, 03:32 PM',
        actor: 'AI Schedule Recovery Engine',
        role: 'System',
        type: 'schedule_recovery_proposed',
        title: 'Recovery Schedule Generated (Day 21 Target Preserved)',
        description: 'Engine mapped parallel execution between Frontend & Backend on Days 12–13, maintaining Day 21 final delivery.',
      },
      {
        id: 'tl_7',
        day: 7,
        timestamp: 'Nov 17, 2026, 03:33 PM',
        actor: 'Fair Payment Engine',
        role: 'System',
        type: 'deduction_calculated',
        title: 'Contractual Delay Deduction Calculated: -$4.50',
        description: 'Applied formula D = min(150 * 0.01 * 3, 150 * 0.10) = $4.50. Net payable: $145.50 for Alex Morgan approval.',
      },
    ],
  };
}

/**
 * Load or initialize project state from localStorage
 */
export function loadProjectState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Could not read from localStorage:', err);
  }
  const initial = getInitialProjectState();
  saveProjectState(initial);
  return initial;
}

/**
 * Persist project state
 */
export function saveProjectState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('Could not save to localStorage:', err);
  }
}

/**
 * Reset project to initial seed state
 */
export function resetProjectState() {
  const initial = getInitialProjectState();
  saveProjectState(initial);
  return initial;
}

/**
 * SCENARIO A RUNNER: Freelancer Delay & PayPal Capture ($145.50)
 */
export function executeScenarioA(state, capturePayPal = false) {
  const next = JSON.parse(JSON.stringify(state));
  const m1 = next.milestones[0];
  m1.delayAssessment = {
    originalDeadlineDay: 4,
    actualSubmissionDay: 7,
    totalDelayDays: 3,
    freelancerDays: 3,
    clientDays: 0,
    excusedDays: 0,
    classification: 'freelancer_caused',
    rationale: 'Freelancer submitted UI Design on Day 7 instead of Day 4. Full 3 days attributable to freelancer.',
    deductionPct: 3.0,
    deductionAmount: 4.5,
    netPayableAmount: 145.5,
    status: capturePayPal ? 'accepted' : 'proposed',
  };

  if (capturePayPal) {
    m1.status = 'approved';
    m1.paymentStatus = 'paid';

    // Add PayPal transaction
    const tx = {
      transactionId: `CAP-PAYPAL-SANDBOX-${Date.now()}`,
      orderId: `ORD-SB-${Date.now()}`,
      milestoneId: 'm1',
      milestoneTitle: 'UI Design & System Mockups',
      originalAmount: 150.0,
      deductionAmount: 4.5,
      netAmount: 145.5,
      currency: 'USD',
      status: 'COMPLETED',
      timestamp: new Date().toISOString(),
      payer: 'Alex Morgan',
      payee: 'Jordan Lee',
    };
    next.transactions.unshift(tx);

    // Add Trust Timeline event
    next.trustTimeline.unshift({
      id: `tl_${Date.now()}`,
      day: 7,
      timestamp: new Date().toLocaleString(),
      actor: 'Alex Morgan',
      role: 'Client',
      type: 'payment_captured',
      title: 'Milestone 1 Approved & PayPal Sandbox Payment Captured: $145.50',
      description: 'Original $150.00 minus $4.50 (3% delay deduction). Net $145.50 paid via PayPal to Jordan Lee.',
    });
  }

  saveProjectState(next);
  return next;
}

/**
 * SCENARIO B RUNNER: Client-Caused Delay (No Penalty, $150.00)
 */
export function executeScenarioB(state) {
  const next = JSON.parse(JSON.stringify(state));
  const m1 = next.milestones[0];
  m1.actualSubmissionDay = 4; // Submitted on time!
  m1.delayAssessment = {
    originalDeadlineDay: 4,
    actualSubmissionDay: 4,
    totalDelayDays: 3,
    freelancerDays: 0,
    clientDays: 3,
    excusedDays: 0,
    classification: 'client_caused',
    rationale: 'Freelancer delivered on Day 4. Client feedback took 5 days instead of the agreed 2-day review SLA (3 days client hold).',
    deductionPct: 0.0,
    deductionAmount: 0.0,
    netPayableAmount: 150.0,
    status: 'proposed',
  };

  next.trustTimeline.unshift({
    id: `tl_${Date.now()}`,
    day: 7,
    timestamp: new Date().toLocaleString(),
    actor: 'TRUSTLANCE Engine',
    role: 'System',
    type: 'client_delay_detected',
    title: 'Client Review Lag Identified (3 Days Client-Side Hold)',
    description: 'Schedule adjusted by 3 days. Per contract policy, 0% penalty applied to freelancer. Full $150.00 payable.',
  });

  saveProjectState(next);
  return next;
}

/**
 * SCENARIO C RUNNER: New Scope Amendment Approved
 */
export function executeScenarioC(state) {
  const next = JSON.parse(JSON.stringify(state));
  const cr = next.changeRequests[0];
  cr.status = 'approved';

  // Add amendment
  next.amendments.push({
    id: 'amd_001',
    version: 2,
    title: 'Amendment #1: Dark Mode & Promotional Landing Pages',
    addedBudget: 110.0,
    addedDays: 3,
    newTotalBudget: 710.0,
    newDurationDays: 24,
    approvedByClient: 'Alex Morgan',
    approvedByFreelancer: 'Jordan Lee',
    approvedAt: new Date().toISOString(),
  });

  // Update budget
  next.budget = 710.0;
  next.durationDays = 24;

  // Add task to Gantt
  next.ganttTasks.splice(2, 0, {
    id: 't_darkmode',
    name: '[Amendment] Dark Mode & 2 Promotional Pages',
    startDate: '2026-11-20',
    endDate: '2026-11-23',
    duration: 3,
    percentDone: 0,
    cls: 'parallel-task',
  });

  next.trustTimeline.unshift({
    id: `tl_${Date.now()}`,
    day: 7,
    timestamp: new Date().toLocaleString(),
    actor: 'Alex Morgan & Jordan Lee',
    role: 'Mutual Approval',
    type: 'amendment_approved',
    title: 'Amendment #1 Approved: +$110 Budget, +3 Days',
    description: 'Contract amended for Dark Mode and 2 extra landing pages. Bryntum Gantt schedule updated.',
  });

  saveProjectState(next);
  return next;
}

/**
 * SCENARIO D RUNNER: Dispute Copilot Activated
 */
export function executeScenarioD(state) {
  const next = JSON.parse(JSON.stringify(state));
  next.status = 'disputed';
  const dsp = next.disputes[0];
  dsp.status = 'ai_analyzed';
  dsp.aiReport = {
    summary: 'Dispute regarding UI Design delivery delay and secondary screen scope.',
    clientPosition: dsp.clientClaim,
    freelancerPosition: dsp.freelancerClaim,
    contractualBaseline: 'Signed agreement specifies 4 primary screens with 1% per day late deduction policy.',
    evidenceEvaluation: [
      'Figma exports verified: Home, Product Catalogue, Cart, and Admin Dashboard exist.',
      'Deliverable submitted on Day 7 (3 days late).',
      'Secondary checkout modal variations were not part of signed criteria.',
    ],
    neutralAssessment: 'The core deliverables satisfy the signed contract scope. The 3-day submission delay is subject to the agreed 3% ($4.50) contractual deduction. The additional requested checkout sub-views represent new scope.',
    resolutionOptions: [
      {
        title: 'Option A: Deliverable Approval with Agreed Deduction',
        description: 'Client approves UI Design milestone with the 3% ($4.50) delay deduction. Net payment of $145.50 released via PayPal.',
        impact: 'Project proceeds on the AI Recovery Schedule targeting Day 21.',
      },
      {
        title: 'Option B: Scope Amendment for Additional Screens',
        description: 'Client creates an Amendment for the secondary checkout screens (+$40, +1 day). Freelancer implements requested sub-views.',
        impact: 'Broadens scope while compensating freelancer fairly.',
      },
    ],
  };

  next.trustTimeline.unshift({
    id: `tl_${Date.now()}`,
    day: 8,
    timestamp: new Date().toLocaleString(),
    actor: 'AI Dispute Copilot',
    role: 'System',
    type: 'dispute_analyzed',
    title: 'AI Dispute Copilot Generated Neutral Evidence Report',
    description: 'Evaluated signed contract, Figma evidence, and timeline. Formulated 2 objective resolution options.',
  });

  saveProjectState(next);
  return next;
}
