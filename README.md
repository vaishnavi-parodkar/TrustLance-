# TRUSTLANCE — AI-Powered Freelance Trust & Payment Platform
> **Tagline: Work delivered. Payments deserved.**
> Built for the **PayPal × AI Hackathon 2026**

---

## 1. Product Vision

TRUSTLANCE is an end-to-end freelance trust, scheduling, and payment platform built to protect both clients and freelancers. It tackles the five fundamental friction points that derail freelance work:

1. **Unclear project requirements & misunderstandings** $\rightarrow$ AI Smart Agreement Generator extracts structured deliverables, acceptance criteria, revision rounds, and delay policies from natural language.
2. **Incomplete or disputed deliverables** $\rightarrow$ Advisory AI Deliverable Verification checks submitted screenshots, documents, and repositories against original criteria without hallucination.
3. **Client scope creep disrupting agreed deadlines** $\rightarrow$ AI Scope Sentinel separates in-scope corrections from new scope, estimates time/cost impact, and requires mutual agreement amendments before schedules change.
4. **Freelancer-caused delays & missed commitments** $\rightarrow$ AI Schedule Recovery & Delay Mitigation Engine identifies safe parallel tasks to preserve the client's original final deadline (Day 21) in an interactive **Bryntum Gantt** timeline.
5. **Unfair payment deductions & disputes** $\rightarrow$ Contractual Delay Attribution applies a transparent formula ($D = \min(M \times 0.01 \times L, M \times 0.10)$) for freelancer-caused late days only, paired with **PayPal Developer Platform Sandbox Orders & Captures**, an auditable **Project Trust Timeline**, and an objective **Dispute Copilot**.

---

## 2. Technology Stack

- **Frontend:** React 18, Vite, React Router v6, Tailwind CSS, Lucide React
- **Scheduling:** Official **Bryntum Gantt** (`@bryntum/gantt-trial` v7.3.8) with baselines, dependencies, critical path calculation, and parallel recovery visualization.
- **Payments:** **PayPal Developer Platform Sandbox** (`@paypal/react-paypal-js`), Orders API, Capture API, and webhook reconciliation.
- **Backend:** **Supabase** (PostgreSQL schema with 24 normalized tables, Row Level Security, Storage, Edge Functions).
- **AI Intelligence:** **Groq API** (`llama-3.3-70b-versatile`) as primary, **Gemini API** as configurable fallback, with structured JSON schemas and deterministic math execution.

---

## 3. Judge Demonstration Scenarios (1-Click Judge Demo Bar)

At the bottom of the screen, the floating **Judge Demo Bar** provides instantaneous 1-click execution for all hackathon demo flows:

### Scenario A: Freelancer-Caused Delay & PayPal Capture
1. Alex Morgan (Client) and Jordan Lee (Freelancer) agree to the $600, 21-day project.
2. UI Design milestone ($150 budget) was due on Day 4.
3. Freelancer submits on **Day 7** (3 days late).
4. AI detects 3 days delay and generates a Recovery Schedule:
   - Frontend Development (Day 8–13) and Backend Integration (Day 12–18) run in **parallel on Days 12–13**.
   - **Target Day 21 final delivery deadline is preserved!**
5. Delay Attribution attributes 3 late days to the freelancer.
6. Formula calculates $3\% \times \$150 = \$4.50$ deduction.
7. Client approves deliverable and executes **PayPal Sandbox Checkout for the net \$145.50 amount**.
8. Transaction receipt is recorded to PayPal Sandbox and the immutable **Project Trust Timeline**.

### Scenario B: Client-Caused Delay (Zero Penalty)
1. Freelancer submits deliverable on time (Day 4).
2. Client takes 5 days to review instead of agreed 2-day SLA (3 days client hold).
3. Schedule extends without penalty.
4. Freelancer deduction is **$0.00**. Full **$150.00** payable.

### Scenario C: Client Scope Change (New Scope)
1. Client requests "Dark Mode Theme and 2 Extra Product Landing Pages".
2. AI Scope Sentinel classifies request as **New Scope** (not in-scope defect).
3. AI estimates +$120 / +3 days. Freelancer counters with +$110 / +3 days.
4. Client approves $\rightarrow$ **Amendment #1 (Agreement v2.0)** created $\rightarrow$ Bryntum Gantt schedule updates.

### Scenario D: Neutral Dispute Copilot
1. Client disputes deliverable completeness.
2. AI Dispute Copilot creates a neutral, evidence-based report comparing Figma evidence, timestamps, and contract terms.
3. Proposes 3 objective resolution options without unilateral penalties.

---

## 4. Mathematical Formula Verification

Per Section 8.C of the specification:
$$D = \min(M \times 0.01 \times L,\ M \times 0.10)$$
$$P = M - D$$

- $M = \$150.00$ (UI Design milestone budget)
- $L = 3$ (Freelancer-attributable late days)
- $D = \min(150 \times 0.01 \times 3,\ 150 \times 0.10) = \min(4.50,\ 15.00) = \$4.50$
- $P = 150 - 4.50 = \$145.50$ (Net payable amount captured via PayPal)

---

## 5. Getting Started & Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production (Vercel)
npm run build
```

---

## 6. Environment Variables

Create `.env` based on `.env.example`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_GROQ_API_KEY=your-groq-api-key
VITE_GEMINI_API_KEY=your-gemini-api-key
VITE_PAYPAL_CLIENT_ID=test # or your PayPal Sandbox Client ID
VITE_PAYPAL_CURRENCY=USD
```
*Note: If no API keys are provided, TRUSTLANCE operates in full high-fidelity offline demonstration mode.*
