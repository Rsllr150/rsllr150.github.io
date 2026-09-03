export type ExperienceGalleryItem = {
  id: string
  caption: string
  /**
   * Image under `public/`, e.g. `images/experience/cirkles/c1.webp`.
   * Omit for placeholder.
   */
  imageHref?: string
}

export type ExperienceMetric = {
  value: string
  label: string
}

export type ExperienceDetail = {
  slug: string
  title: string
  org: string
  location: string
  duration: string
  /** One line on the home card — outcome, not duties. */
  blurb: string
  /** The constraint that made the job hard (what recruiters remember). */
  constraint: string
  metrics: ExperienceMetric[]
  owned: string[]
  description: string
  tags: string[]
  gallery: ExperienceGalleryItem[]
}

export const experienceDetails: ExperienceDetail[] = [
  {
    slug: "cirkles",
    title: "Founding Engineer",
    org: "Cirkles.ai",
    location: "Paris, France",
    duration: "June 2025 — Present",
    blurb: "ML fraud detection. Platform to fight and prevent financial fraud with ML.",
    constraint: "You fight fraud by understanding it — a score without a why does not get used.",
    metrics: [],
    owned: [
      "ML core: Explainable Boosting Machine + rules, with a why on every decision",
      "Data pipelines and scraping that feed the model; document parse (IBAN, fields) as one input",
      "Technical, security and compliance documentation for regulated institutions",
      "Secrets management hardening",
      "MCP into the Cirkles platform; client feedback back into the product",
    ],
    description:
      "I joined Cirkles.ai as part of the founding team and have been building the product from day one. Cirkles is an AI fraud-detection SaaS for leasing and banking. Stack: Python, FastAPI, MongoDB, Kubernetes (Helm, Terraform, ArgoCD).\n\n" +
      "Being there since the start means the work spans the product, not a single ticket. I own the ML layer: an Explainable Boosting Machine — additive feature contributions, shape functions you can plot — and a declarative rules engine for cuts and overrides, so an analyst can see what moved the score and which rule fired. Data engineering and scraping pipelines feed that system. A document-processing slice (parse, IBAN checks, field extraction) sits on the same path and nourishes the model; it is not a separate tool.\n\n" +
      "I also chip in on the frontend when the product needs it — not as the owner of that surface, just enough to keep the stack one piece. A large part of the technical documentation is mine as well — guides, internal references, and the security and compliance write-ups regulated institutions ask for — and I helped harden secrets management. I work directly with clients, turn their feedback into product decisions, and my current focus is an MCP (Model Context Protocol) integration into the Cirkles platform.\n\n" +
      "The through-line is taking a complex AI idea and turning it into a live product people actually run.",
    tags: ["FastAPI", "MCP", "EBM", "Feature engineering", "Kubernetes", "OVH"],
    gallery: [],
  },
  {
    slug: "cm-cic",
    title: "Buy-Side ML Intern",
    org: "CM-CIC",
    location: "Paris, France",
    duration: "January 2025 — June 2025",
    blurb: "Bayesian equity signals into production. FI desk automation that runs daily.",
    constraint: "A notebook is not a signal. If the desk cannot consume it, it does not exist.",
    metrics: [
      { value: "2 desks", label: "equities + FI" },
      { value: "Prod", label: "not a prototype" },
      { value: "Daily", label: "desk workflow" },
    ],
    owned: [
      "Bayesian inference for equity strategies — statistical theory as runnable code",
      "Cross-trading automation for fixed-income: decision → fill with fewer manual hops",
    ],
    description:
      "Buy-side, between research and execution. The brief was not “try Bayesian methods.” It was: make the posterior something the equity process can call.\n\n" +
      "Same bar on fixed income: a cross-trading tool the desk actually runs, not a script that needs a babysitter. The internships that stick are the ones where the handoff is a workflow, not a slide.",
    tags: ["Bayesian ML", "Python", "Equities", "Fixed Income"],
    gallery: [
      {
        id: "m1",
        caption: "Research → production — two desks, one handoff rule",
        imageHref: "images/experience/cm-cic/1.png",
      },
    ],
  },
  {
    slug: "oddo-bhf",
    title: "Data Trading & Execution Intern",
    org: "ODDO BHF",
    location: "Paris, France",
    duration: "June 2024 — December 2024",
    blurb: "Front-office pipeline + 12 desk tools. Algo trading optimization: VWAP, dark, liquidity-seeker — TCA back into the choice.",
    constraint: "Traders will not wait for an end-of-day batch. Compliance will not accept a number they cannot trace.",
    metrics: [
      { value: "20k+", label: "trades / day" },
      { value: "400+", label: "parameters" },
      { value: "12", label: "desk tools" },
    ],
    owned: [
      "Front-office pipeline between traders and IT — 400+ parameters, 20k+ daily trades",
      "12 FastAPI / React tools: daily P&L and TCA without a batch wait",
      "Algo trading optimization: VWAP / dark / liquidity-seeker — fill quality back into how the desk chooses an algo",
    ],
    description:
      "The desk already had trades. It did not have a trusted path from fill to P&L and TCA on the same day.\n\n" +
      "I rebuilt that path and shipped twelve tools on top of it. The research piece was algo trading optimization, not a new algo: VWAP versus dark versus liquidity-seeker — which venue and tactic actually moved cost, then feed that back into execution choice.",
    tags: ["FastAPI", "React", "TCA", "VWAP", "Dark"],
    gallery: [
      {
        id: "o1",
        caption: "Fill → P&L / TCA — same day, same numbers",
        imageHref: "images/experience/oddo-bhf/1.png",
      },
    ],
  },
]

export function getExperienceBySlug(slug: string): ExperienceDetail | undefined {
  return experienceDetails.find((e) => e.slug === slug)
}
