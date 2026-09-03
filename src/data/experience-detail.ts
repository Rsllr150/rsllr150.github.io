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
    title: "Founding Software Engineer",
    org: "Cirkles.ai",
    location: "Paris, France (Remote)",
    duration: "July 2025 — Present",
    blurb: "Founding team of an AI fraud-detection SaaS for leasing and banking — backend, data, and AI, end to end.",
    constraint: "Early-stage means the whole product is your surface — the backend, the data, the model, and the client call.",
    metrics: [],
    owned: [
      "Backend architecture in FastAPI, and the database design that holds the data securely",
      "Data engineering and web scraping pipelines that feed the detection systems",
      "Model research on the AI side — fraud detection that has to hold up in real banking scenarios",
      "Direct client work, turning feedback into product decisions",
      "An MCP (Model Context Protocol) tool integrated into the main Cirkles platform",
    ],
    description:
      "I joined Cirkles.ai from the very beginning, as part of the founding team. We are building an AI fraud-detection SaaS designed specifically for leasing and banking companies. It is a really exciting environment: we are now actively deploying our production product to our first clients.\n\n" +
      "Being there since day one means I got to participate in building the entire software product from end to end. Because it is an early-stage startup, my technical work covers a lot of different areas. I built the backend architecture using FastAPI and designed the databases that handle the information securely. A large part of my time went into data engineering and web scraping — gathering and shaping the data our systems actually run on.\n\n" +
      "On the AI side I was involved in model research, making sure our fraud-detection algorithms are accurate and ready for real-world banking scenarios rather than only for a clean dataset. Besides the pure engineering work, I interact directly with our clients: it is how I learn what the product is missing, and their feedback is what decides where it goes next.\n\n" +
      "Most recently, my main focus has been developing an MCP (Model Context Protocol) tool to integrate directly into our main Cirkles software platform.\n\n" +
      "This role has given me incredible hands-on experience in the thing I care about most: taking a complex AI idea and turning it into a live product that companies actually pay for and use.",
    tags: ["FastAPI", "AI", "SaaS", "Data Engineering", "MCP"],
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
