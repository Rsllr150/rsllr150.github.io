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

/** Resolve a `public/` asset URL (PDFs, images). Relative paths use Vite `base` (e.g. /blog/). */
export function resolveProjectAssetHref(href: string): string {
  if (/^https?:\/\//i.test(href.trim())) return href.trim()
  const base = import.meta.env.BASE_URL.replace(/\/?$/, "/")
  const path = href.replace(/^\//, "")
  return `${base}${path}`
}

export const projectDetails: ProjectDetail[] = [
  {
    slug: "maskon",
    title: "MaskON",
    subtitle: "PII detection and masking for French formats — checksum-validated, measured, streamable",
    year: "2026",
    venue: "Personal systems project",
    tags: ["Python", "FastAPI", "PII", "Property Testing"],
    repoHref: "https://github.com/Rsllr150/maskON",
    abstract:
      "Send MaskON text, it returns the same text with the personal data masked plus a report of what it found — to scrub logs, LLM prompts, or shared datasets before they leak in clear. Six detectors specialised in French formats: IBAN, SIREN/SIRET, NIR, bank card, email, phone. Each one is a regex plus a checksum, not a regex alone.",
    problem:
      "Homemade regexes are the usual answer and the usual failure: an invoice number shaped like a SIREN gets masked, a lowercase IBAN gets missed, and nobody measures either error. Two harder constraints follow. Streaming a huge log file naively cuts an IBAN across a chunk boundary and both halves survive in clear. And a masked dataset still has to be correlatable — the same customer must yield the same token without revealing the value.",
    approach:
      "Every detector is shape plus proof: a regex locates a candidate, a checksum confirms it — Luhn for cards, mod 97 for IBANs, the control key for NIR. Each finding carries a confidence (1.0 for a checksum match, lower for shape-only) and the service merges overlapping spans, keeping the most confident. Three masking strategies: label, partial, and an HMAC-SHA256 keyed hash for deterministic tokens. Streaming redacts chunk by chunk with a sliding overlap buffer, so a split PII is still caught. Strict layering — the detection core has zero HTTP dependency, which is what makes it testable. Hypothesis property tests, mypy --strict, Ruff, and a four-gate CI on every push.",
    outcome:
      "97% precision, 90% recall, F1 0.93 — by exact span matching on a hand-annotated corpus of 74 examples that deliberately includes lowercase IBANs, parenthesized phones, and order numbers shaped like phones. The checksum types are near-perfect; the residual errors sit on the shape-only detectors, and the corpus tracks them instead of hiding them. Throughput is ~10 MB/s: an earlier O(n²) redaction that rebuilt the whole string per finding was 130× slower, and the benchmark is what caught it. A property test also found the IBAN and CB regexes bridging two adjacent PII into a single span.",
    gallery: [],
  },
  {
    slug: "enedis-data-challenge",
    title: "Enedis — Challenge Data (ENS)",
    subtitle: "Industrial load-curve imputation. Public leaderboard, one metric: MAE.",
    year: "2026",
    venue: "Challenge Data · École Normale Supérieure — Enedis",
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
