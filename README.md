# TRUSTLANCE

**AI-powered freelance trust, scheduling and payment platform.**
*Work delivered. Payments deserved.*

Built for the **PayPal × AI Hackathon 2026**.

**Live demo:** https://trust-lance-two.vercel.app/

<!-- Add 2-3 screenshots in docs/screenshots/ and uncomment: -->
<!-- ![Dashboard](docs/screenshots/dashboard.png) -->

---

## Product Vision

TRUSTLANCE is an end-to-end platform that protects both clients and freelancers. Freelance projects usually break down in five places:

| Problem | How TRUSTLANCE handles it |
|---|---|
| Unclear requirements | **AI Smart Agreement Generator** turns plain-language briefs into deliverables, acceptance criteria, revision rounds and delay policies |
| Disputed or incomplete deliverables | **AI Deliverable Verification** (advisory) checks submissions against the original criteria |
| Scope creep | **AI Scope Sentinel** separates in-scope fixes from new scope, estimates time and cost impact, and requires a mutual amendment |
| Freelancer-caused delays | **Schedule Recovery Engine** finds safe parallel tasks to protect the final deadline, shown on a **Bryntum Gantt** |
| Unfair payment deductions | **Delay Attribution** deducts only for freelancer-caused late days, then pays the net amount through **PayPal Sandbox**, with an auditable **Trust Timeline** and a neutral **Dispute Copilot** |

## Payment Deduction Formula

```
D = min(M × 0.01 × L,  M × 0.10)
P = M − D
```

`M` = milestone amount, `L` = freelancer-attributable late days, `D` = deduction (1% per late day, capped at 10%), `P` = net payable.

**Worked example:** M = $150, L = 3

```
D = min(150 × 0.01 × 3, 150 × 0.10) = min(4.50, 15.00) = $4.50
P = 150 − 4.50 = $145.50
```

Client-caused delays never reduce the freelancer's payment.

## Try It: Judge Demo Bar

Open the live demo and use the floating bar at the bottom to run each scenario in one click.

### Scenario A: Freelancer delay and PayPal payment
1. Alex Morgan (Client) and Jordan Lee (Freelancer) agree on a $600, 21-day project.
2. The UI Design milestone ($150) is due on Day 4.
3. The freelancer submits on **Day 7**, 3 days late.
4. The Schedule Recovery Engine runs Frontend Development (Day 8–13) and Backend Integration (Day 12–18) **in parallel**, so the **Day 21 final deadline is preserved**.
5. Delay Attribution assigns 3 late days to the freelancer, giving a **$4.50** deduction.
6. The client approves and pays the net **$145.50** through **PayPal Sandbox**.
7. The transaction is recorded in the **Trust Timeline**.

### Scenario B: Client delay (zero penalty)
1. The freelancer submits on time (Day 4).
2. The client takes 5 days to review instead of the agreed 2-day SLA.
3. The schedule extends with no penalty. The deduction is **$0.00** and the full **$150.00** is payable.

### Scenario C: Scope change
1. The client requests "Dark Mode Theme and 2 Extra Product Landing Pages".
2. AI Scope Sentinel classifies it as **new scope**, not an in-scope defect.
3. AI estimates +$120 / +3 days, and the freelancer counters with **+$110 / +3 days**.
4. The client approves, **Amendment #1 (Agreement v2.0)** is created, and the Gantt schedule updates.

### Scenario D: Neutral dispute
1. The client disputes the completeness of a deliverable.
2. Dispute Copilot produces a neutral, evidence-based report comparing evidence, timestamps and contract terms.
3. It proposes **3 resolution options** without any unilateral penalty.

## Tech Stack

- **Frontend:** React 18, Vite, React Router v6, Tailwind CSS, Lucide React
- **Scheduling:** Bryntum Gantt (`@bryntum/gantt-trial` 7.3.8) with baselines, dependencies and parallel-recovery visualization
- **Payments:** PayPal Sandbox via `@paypal/react-paypal-js`
- **AI:** Groq (`llama-3.3-70b-versatile`) primary, Gemini fallback, plus a built-in deterministic simulation engine
- **Data:** Built-in demo data engine (runs in the browser, saved in `localStorage`)
- **Supabase:** optional and **not used by default**. The schema, storage integration and Edge Functions are included for future use.

## Run Locally

Requires **Node.js 18+**.

```bash
git clone https://github.com/vaishnavi-parodkar/TrustLance-.git
cd TrustLance-
npm install
npm run dev
```

Open **http://localhost:3000**. No setup or API keys are needed.

## Configuration (all optional)

By default the app runs in **demo mode**: simulated AI, local demo data and the PayPal `test` client. To switch on real services, copy `.env.example` to `.env`:

```env
VITE_GROQ_API_KEY=your-groq-api-key        # real AI
VITE_GEMINI_API_KEY=your-gemini-api-key    # AI fallback
VITE_PAYPAL_CLIENT_ID=test                 # or your PayPal Sandbox Client ID
VITE_PAYPAL_CURRENCY=USD
VITE_PAYPAL_ENVIRONMENT=sandbox

# Only if you want to use Supabase (not needed):
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Restart `npm run dev` after editing `.env`.

> **Security note:** every `VITE_` variable is bundled into the browser. Never put a PayPal **Secret** or any private key here.

Key sources: Groq at console.groq.com, Gemini at aistudio.google.com, PayPal Sandbox Client ID at developer.paypal.com (Apps & Credentials).

### Supabase (future use)

Supabase is off unless both Supabase variables are set. To enable it later: run `supabase/schema.sql` in the SQL Editor and create a public Storage bucket named `deliverables`. The Edge Functions in `supabase/functions/` (`ai-orchestrator`, `paypal-create-order`, `paypal-capture-order`, `paypal-webhook`) are not called by the frontend.

## Project Structure

```
src/
├── components/   # gantt, paypal, trust-timeline, layout, demo bar
├── context/      # AuthContext, ProjectContext
├── pages/        # dashboards, agreement, workspace, AI reports, payments
└── services/     # aiService, paypalService, supabaseService,
                  # delayAttributionEngine, scheduleRecoveryEngine, demoDataService
supabase/         # optional schema + Edge Functions
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build |

## Deployment

Deployed on **Vercel** (build command `npm run build`, output directory `dist`). `vercel.json` rewrites all routes to `index.html` so React Router works on refresh.

## Notes and Limitations

- PayPal runs in **Sandbox only**. No real money moves, and the app does not claim escrow.
- AI verification and dispute output is **advisory**, not a legal decision.
- This is a client-side app: demo data is stored in the browser, not on a server.
- Bryntum Gantt is the **trial** version and is subject to its trial terms.


## Contact

For questions or collaborations, feel free to reach out:

- 📧 Email: vaishnaviparodkar@gmail.com
- 🐙 GitHub: [@vaishnavi-parodkar](https://github.com/vaishnavi-parodkar)
