/** New poster page: add `projects/<slug>/index.html`, then append slug to `project-poster-build.ts`. */

export type ProjectGalleryItem = {
  id: string
  caption: string
  /**
   * Image under `public/images/projects/<this-project-slug>/` (no leading slash), e.g.
   * `images/projects/enedis-data-challenge/1.png`. One folder per project; use `1.png`, `2.png`, … to match figure order.
   * Omit to show the dashed placeholder until you add the file.
   */
  imageHref?: string
}

export type ProjectDetail = {
  slug: string
  title: string
  subtitle: string
  year: string
  venue: string
  /** Prize or ranking, shown as a badge on the card and the poster. Omit when there is none. */
  award?: string
  tags: string[]
  /** Site-relative path (e.g. papers/foo.pdf) or https URL — files live under `public/` when relative */
  paperHref?: string
  posterHref?: string
  repoHref?: string
  abstract: string
  problem: string
  approach: string
  outcome: string
  gallery: ProjectGalleryItem[]
}

/** Resolve a `public/` asset URL (PDFs, images). Relative paths use Vite `base` (e.g. /). */
export function resolveProjectAssetHref(href: string): string {
  if (/^https?:\/\//i.test(href.trim())) return href.trim()
  const base = import.meta.env.BASE_URL.replace(/\/?$/, "/")
  const path = href.replace(/^\//, "")
  return `${base}${path}`
}

export const projectDetails: ProjectDetail[] = [
  {
    slug: "geste",
    title: "Geste",
    subtitle:
      "A craftsperson's phone video becomes a dataset a robotics lab can buy.",
    year: "2026",
    venue: "B@BHacks 2.0 · Blockchain at Berkeley, Berkeley Haas · 11 October 2026",
    award: "Winner · 1st place, Most Creative track · B@BHacks 2.0",
    tags: ["TypeScript", "React", "Gemini", "ElevenLabs", "x402", "AUSD", "Base"],
    abstract:
      "Built in about six hours at B@BHacks 2.0 by a team of four: Romain Seiller, Willem Larras, Adnan Ahali, Julius Graf. A pastry chef or a butcher films their workbench and explains out loud what they are doing. Geste turns that video into gesture clips with provenance and consent attached, prices them live per trade, and lets a lab's AI agent buy them. I handled deployment, the frontend, the demo video, and the submission.",
    problem:
      "A robotics lab wants recordings of skilled hands at work, cut gesture by gesture and labelled. The people who have those skills have a phone, not a data pipeline. And a clip bought off the internet says nothing about who recorded it or whether they agreed to sell it.",
    approach:
      "The pipeline segments the video into timestamped gestures, aligns each one with the transcript, and cuts one clip per gesture. Every clip is hashed into a manifest that the craftsperson signs with EIP-712, so provenance and consent are verifiable. Each trade has a live price driven by supply, demand, and a web signal. The lab's AI agent pays in AUSD over HTTP 402 — gasless, x402 on Base — under a budget it cannot exceed.",
    outcome:
      "Winner, 1st place, Most Creative track at B@BHacks 2.0 (Blockchain at Berkeley, Berkeley Haas, 11 October 2026). My first hackathon. 70% of every sale goes to the craftsperson. The code and the demo stay private while we keep building.",
    gallery: [
      { id: "ge0", caption: "The live app — artisan films on a phone, the lab buys on a crypto market", imageHref: "images/projects/geste/app.png" },
      { id: "ge1", caption: "From the workbench to the lab — film, segment, align, clip, sign", imageHref: "images/projects/geste/1.svg" },
      { id: "ge2", caption: "Lab side — live price per trade, HTTP 402, AUSD over x402 on Base", imageHref: "images/projects/geste/2.svg" },
    ],
  },
  {
    slug: "agentic-wave",
    title: "agentic-wave",
    subtitle: "Coding with agents under machine guards — one planner, a swarm of coders in a tmux mosaic, a 0/1 gate before anything is accepted",
    year: "2026",
    venue: "Claude Code plugin · with Nael Ghoundale",
    tags: ["Python", "Claude Code", "tmux", "Hooks", "CI"],
    abstract:
      "A Claude Code plugin, built with Nael Ghoundale, for running a fleet of coding agents without losing control of the repo. One planner session writes briefs and never touches the code; coder agents run in a tmux mosaic you can watch; hooks, exit codes and a gate command hold the rules instead of the prompt. Not a framework — what a month of measured use settled on, packed so it can be installed rather than described.",
    problem:
      "Every rule held only by the wording of a prompt was eventually violated — late in a long session, quietly, at the moment it mattered. An agent edits a file nobody declared, a piped test command hides a red suite, two sessions on one laptop share a lot pointer and a review runs git diff in the wrong checkout. Exploration is 63% of an agent's wall time and writing is 3.7%, so the expensive part is not the code; it is the coordination around it.",
    approach:
      "The rules that matter are mechanical. A declared perimeter is passed as a flag, so an out-of-perimeter edit is refused by the guard and fails the gate. wave gate runs the slice's own command under pipefail, subtracts what was already dirty, and fails a manifest that moved without its lock. Briefs carry file:line anchors, and the spawner refuses one without. Failures are routed by type: a red test goes back once with the verdict, a violated perimeter goes back to the planner. My share: the animated flow diagrams, drawn from one JSON file and checked in CI so they cannot drift; agent-side guard rules; review staleness and incident filing; per-lot usage accounting; the opt-in OS sandbox for Claude agents; and the eval CI matrix across Linux, macOS, Python 3.9 and 3.13.",
    outcome:
      "Used on real lots, including MaskON, with the trials and their evidence kept in the repo. A suite of evals exercises the mechanism — guards, lot rules, confinement, providers. What it does not have yet is said plainly: no eval of the method itself, and one n=1 comparison where the reviewed arm caught a real defect the other missed, at 6.6× the time. The repo is private.",
    gallery: [
      { id: "aw1", caption: "The whole workflow — idea to merge, a machine verdict at every step", imageHref: "images/projects/agentic-wave/1.svg" },
      { id: "aw2", caption: "Guards — what happens to a tool call", imageHref: "images/projects/agentic-wave/2.svg" },
      { id: "aw3", caption: "Slice states, as the machine derives them", imageHref: "images/projects/agentic-wave/3.svg" },
    ],
  },
  {
    slug: "maskon",
    title: "MaskON",
    subtitle: "PII detection and masking for French formats — checksum-validated, measured, streamable",
    year: "2026",
    venue: "Personal systems project",
    tags: ["Python", "FastAPI", "PII", "Property Testing"],
    repoHref: "https://github.com/Rsllr150/maskON",
    abstract:
      "Send MaskON text, it returns the same text with the personal data masked plus a report of what it found — to scrub logs, LLM prompts, or shared datasets before they leak in clear. Eleven detectors specialised in French formats — IBAN, SIREN, SIRET, VAT, NIR, tax number, bank card, email, phone, passport, licence plate. Every structured type is a regex plus a checksum, not a regex alone.",
    problem:
      "Homemade regexes are the usual answer and the usual failure: an invoice number shaped like a SIREN gets masked, a lowercase IBAN gets missed, and nobody measures either error. Two harder constraints follow. Streaming a huge log file naively cuts an IBAN across a chunk boundary and both halves survive in clear. And a masked dataset still has to be correlatable — the same customer must yield the same token without revealing the value.",
    approach:
      "Every structured detector is shape plus proof: a regex locates a candidate, a checksum confirms it — Luhn for cards and SIREN, mod 97 for IBANs, the control key for NIR, mod 511 for the tax number. Each finding carries a confidence (1.0 for a checksum match, lower for shape-only) and the service merges overlapping spans, keeping the most confident. Three masking strategies: label, partial, and an HMAC-SHA256 keyed hash for deterministic tokens. Streaming redacts chunk by chunk with a sliding overlap buffer, so a split PII is still caught. Strict layering — the detection core has zero HTTP dependency, which is what makes it testable. Hypothesis property tests, mypy --strict, Ruff, and a four-gate CI on every push.",
    outcome:
      "98% precision, 93% recall, F1 0.95 — by exact span matching on a hand-annotated corpus of 99 examples that deliberately includes lowercase IBANs, parenthesized phones, and order numbers shaped like phones. The checksum types are near-perfect; the residual errors sit on the shape-only detectors, and the corpus tracks them instead of hiding them. Throughput is ~10 MB/s: an earlier O(n²) redaction that rebuilt the whole string per finding was 130× slower, and the benchmark is what caught it. A property test also found the IBAN and CB regexes bridging two adjacent PII into a single span, and a ReDoS test caught an email regex that took ~45 min on 1 MB of hostile input — now ~10 ms.",
    gallery: [
      { id: "mk1", caption: "Shape, then proof — detect, confirm, merge, mask", imageHref: "images/projects/maskon/1.svg" },
      { id: "mk2", caption: "Streaming — a 64-char overlap buffer catches a split IBAN", imageHref: "images/projects/maskon/2.svg" },
    ],
  },
  {
    slug: "enedis-data-challenge",
    title: "Enedis — Challenge Data (ENS)",
    subtitle: "Industrial load-curve imputation. Public leaderboard, one metric: MAE.",
    year: "2025",
    venue: "Challenge Data · École Normale Supérieure — Enedis",
    award: "Top 25 · public leaderboard",
    tags: ["Time Series", "KNN", "XGBoost", "Python"],
    posterHref: "papers/enedis-data-challenge-poster.pdf",
    abstract:
      "Not a weekend hackathon. Challenge Data is the ENS platform: a real industrial problem, weeks of work, a public leaderboard, one number. Enedis needs to fill holes in Linky load curves without touching real customers (GDPR) — ~69k synthetic series, 1k with artificial gaps, 48 points/day. I reconstructed the missing 30-minute measurements from other series only. Statistical, gradient-boosted, and deep models were all on the table — the submission that ranked is a two-regime hybrid.",
    problem:
      "Gap length is heavy-tailed: most holes are 1–2 steps (30–60 min), but the rare multi-hour holes dominate missing volume. Mean inter-series correlation is 0.066, so global factorizations fail. Load is skewed (μ = 354 kW, median = 173 kW, skewness = 2.13): distance methods on raw amplitudes chase the largest clients, not the shape of the curve.",
    approach:
      "Per-series z-score so neighbors match on shape. Self-supervised masks on train to mimic test holes. KNN (k = 4, inverse-distance) is a strong baseline on cyclic residential profiles. XGBoost + iterative MICE, cyclic hour encodings, lags at 30 min / 24 h / 7 days: MAE 105–130. Short holes are almost linear; boosting injects noise, then the next lag inherits the error. Diagnostic by gap length: interpolate if L ≤ τ, else KNN. Grid search → τ* = 3 steps (1h30).",
    outcome:
      "Public MAE 81.15, top 25, team Romain-Seyf. Internal KNN at k = 4 was 79.13; the hybrid is the submission that survives the public set. Complexity did not win. Inertia on micro-cutouts, neighbors on long gaps. Next: exogenous weather, replace the hard threshold with a learned stack.",
    gallery: [
      {
        id: "en1",
        caption: "Load-curve archetypes — 30 min, three weeks",
        imageHref: "images/projects/enedis-data-challenge/1.png",
      },
      {
        id: "en2",
        caption: "MAE vs gap length — interpolation · KNN · XGBoost",
        imageHref: "images/projects/enedis-data-challenge/2.png",
      },
      {
        id: "en3",
        caption: "Hybrid threshold τ* = 3 steps (1h30)",
        imageHref: "images/projects/enedis-data-challenge/3.png",
      },
    ],
  },
  {
    slug: "high-order-acoustics",
    title: "High-Order Acoustic Solver",
    subtitle: "7th-order linearized Euler — heterogeneous media, 2D Strang splitting",
    year: "2025–2026",
    venue: "Arts et Métiers — Numerical methods in fluid mechanics",
    tags: ["Numba", "Finite Differences", "Acoustics", "Python"],
    paperHref: "papers/high-order-acoustics-paper.pdf",
    abstract:
      "I built a 7th-order one-step finite-difference solver for linearized Euler acoustics. Validate the flux on 1D advection, lift it to heterogeneous 1D through Riemann invariants plus conservative corrections, then to 2D by alternating-direction Strang splitting. The kernel runs under Numba.",
    problem:
      "Long-range acoustics dies on first-order Roe: truncation error acts like fake viscosity. After 50 m a wave packet has lost more than 80% of its amplitude; after 500 m it is gone. OS7 keeps energy but Gibbs-rings on discontinuities. Variable density ρ_m(x) makes the system non-conservative, so a single global flux does not exist. A naïve 2D 7×7 stencil is too expensive.",
    approach:
      "Conservative update, Roe baseline versus OS7 flux corrections (recursive C2–C7, stencil ±3, ghost cells). Heterogeneous 1D: transport Riemann invariants w = p′ ± Z u′ at ±c, then add conservative OS7 corrections; interface density is an arithmetic mean to kill spurious reflections. 2D: compose Lx and Ly, swap order on even/odd steps (Strang). Tests: Attenborough refraction, solid-wall cavity, moving-source Doppler on a 1501² grid at CFL 0.8. Numba on the flux kernel, about 10× versus plain Python.",
    outcome:
      "OS7 amplitude stays flat at 1.0 over 500 m; Roe collapses exponentially. In a ρ = 4 slab the wavelength halves as λ = c/f predicts. 2D reproduces refraction toward the ground, cavity interference, and Doppler compression ahead of a moving source. Linear model: no shocks. Next: full Euler and PML instead of simple outflow ghosts.",
    gallery: [
      {
        id: "ac1",
        caption: "Wave packet after one lap — Roe dissipates, OS7 holds amplitude",
        imageHref: "images/projects/high-order-acoustics/1.png",
      },
      {
        id: "ac2",
        caption: "Peak amplitude vs distance — 500 m, N = 200",
        imageHref: "images/projects/high-order-acoustics/2.png",
      },
      {
        id: "ac3",
        caption: "Moving source — Doppler compression of the wavefronts",
        imageHref: "images/projects/high-order-acoustics/3.png",
      },
    ],
  },
  {
    slug: "botbot",
    title: "BotBot",
    subtitle: "Fault-tolerant browser-worker fleet — hundreds of isolated sessions inside a window that lasts minutes",
    year: "2025–2026",
    venue: "Personal systems project",
    tags: ["Playwright", "asyncio", "Azure", "FastAPI"],
    abstract:
      "A concurrent worker fleet that turns a job queue into isolated browser sessions, classifies every failure, and leaves a reproducible artifact when one fails. The scarce resource is not CPU — it is a worker inside a window that closes in minutes, so most of the engineering is about not wasting one.",
    problem:
      "Burst load turns ordinary choices into expensive ones. Hundreds of jobs share a few minutes, and a worker spent on the wrong retry is gone for the rest of the window. Failures are not interchangeable: a page that will never succeed and a timeout that would succeed on a second attempt demand opposite policies, and treating them alike burns the fleet either way. Two constraints follow from the concurrency itself. Parallel browser sessions cannot share one network path without interfering. And some targets are not addressable until the window opens, so the queue has to accept a job whose required parameter does not exist yet.",
    approach:
      "Python 3.11 and Playwright, with an asyncio semaphore as the explicit concurrency bound and asyncio.gather(return_exceptions=True) so one crashed worker never takes the batch down with it. Each worker owns exactly one session and one network path, which makes isolation structural rather than advisory. Failures fall into three classes with three policies: terminal (write the artifact, move to the next job), transient (bounded retries on a fresh path), and fast-recovery (short backoff, keep the worker warm) — the retry budget is capped in config, not left to chance. Late binding is its own subsystem: a 507-line listener holds PENDING jobs whose target is unknown at launch and binds it the moment the window opens. A forensics layer makes a failure reproducible long after it happened — HTML capped at 2 MB so a huge page cannot fill the disk, a screenshot, and a DOM inventory. Configuration is read through bounded helpers that clamp every value to a valid range instead of trusting the environment. Shipped as Docker to Azure Container Instances: private registry, mounted storage for the queue and the artifacts, 1 GiB shm for Chromium, 60 s graceful stop.",
    outcome:
      "21 modules and roughly 5,700 lines of Python behind one CLI, with 8 test suites aimed at the parts that actually break — retry logic, config bounds, session selection, URL handling. Runs are repeatable and every failed job leaves something you can open after the window has closed. The transferable surface is the control plane: an explicit concurrency bound, a failure taxonomy where the retry policy follows the class, deferred binding of a required parameter, and forensics treated as a first-class output rather than an afterthought.",
    gallery: [
      { id: "bb1", caption: "Control plane — fan-out, workers, sinks", imageHref: "images/projects/botbot/1.png" },
      { id: "bb2", caption: "Failure classification — terminal / transient / fast-recovery", imageHref: "images/projects/botbot/2.png" },
      { id: "bb3", caption: "Azure deploy — ACR, ACI, Files", imageHref: "images/projects/botbot/3.png" },
    ],
  },
]

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projectDetails.find((p) => p.slug === slug)
}
