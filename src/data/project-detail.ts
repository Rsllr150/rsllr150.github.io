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
    slug: "enedis-data-challenge",
    title: "Enedis — Challenge Data (ENS)",
    subtitle: "Industrial load-curve imputation. Public leaderboard, one metric: MAE.",
    year: "2026",
    venue: "Challenge Data · École Normale Supérieure — Enedis",
    tags: ["Time Series", "KNN", "XGBoost", "Python"],
    posterHref: "papers/enedis-data-challenge-poster.pdf",
    abstract:
      "Not a weekend hackathon. Challenge Data is the ENS platform: a real industrial problem, weeks of work, a public leaderboard, one number. Enedis needs to fill holes in Linky load curves without touching real customers (GDPR) — ~69k synthetic series, 1k with artificial gaps, 48 points/day. With Seyf I reconstructed the missing 30-minute measurements from other series only. Statistical, gradient-boosted, and deep models were all on the table — the submission that ranked is a two-regime hybrid.",
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
      "With Seyf and Gabin I built a 7th-order one-step finite-difference solver for linearized Euler acoustics. Validate the flux on 1D advection, lift it to heterogeneous 1D through Riemann invariants plus conservative corrections, then to 2D by alternating-direction Strang splitting. The kernel runs under Numba.",
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
    subtitle: "Concurrent checkout automation for live-event ticketing",
    year: "2025–2026",
    venue: "Personal systems project",
    tags: ["Playwright", "asyncio", "Azure", "FastAPI"],
    abstract:
      "A worker fleet that turns a CSV of checkout tasks into isolated browser sessions, classifies failures, and emits cart events onto a signed bus. Built for live-event ticketing: short windows, flaky pages, and a control plane that can bind an event URL at open time.",
    problem:
      "Live-event checkout is a bursty distributed-systems problem. Hundreds of rows share a few minutes. Failures are not equal: retrying a closed sale wastes a worker; retrying a timeout on the same network path usually fails the same way. Parallel browser sessions cannot share a single egress without colliding. Some event URLs are not public until the window opens, so the job queue has to accept a late bind.",
    approach:
      "Python 3.11, asyncio semaphore, Playwright (headed or headless). The CSV is the job queue; a Discord slot is late-binding for PENDING rows. Each worker owns one session and one network path. Errors are classified: terminal (artifact, next row), transient (fresh egress, bounded retries), fast-recovery (short backoff, keep the worker). Sinks are JSONL run files, a token-gated FastAPI webhook, and a cart API. Ship as Docker to Azure Container Instances — private ACR, Azure Files for CSV and artifacts, 1 GiB shm for Chromium, 60 s graceful stop.",
    outcome:
      "Repeatable batch runs with per-row success/failure artifacts, structured logs, and tests around config, retries, and session selection. The interesting surface is the control plane — isolation, classification, deploy — not the click path.",
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
