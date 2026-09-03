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
    duration: "January 2025 \u2014 June 2025",
    blurb:
      "Bayesian market-impact model in production: R\u00b2 0.68 out-of-sample, and its predictive variance drives the execution schedule.",
    constraint:
      "A point forecast tells the desk what to expect. It cannot tell the desk when to stop trusting it \u2014 and on a large meta-order, that second number is the one that costs money.",
    metrics: [
      { value: "0.68", label: "out-of-sample R\u00b2" },
      { value: "1.4 bps", label: "impact MAE" },
      { value: "\u221225%", label: "NLL vs baseline" },
      { value: "\u22121.8 bps", label: "shortfall saved" },
    ],
    owned: [
      "Bayesian neural network forecasting permanent and temporary market impact, trained on 4 years of equity and fixed-income flow \u2014 R\u00b2 0.68, MAE 1.4 bps, NLL 25% below deterministic baselines",
      "An execution-pacing model that reads the predictive variance and curtails participation under high epistemic uncertainty \u2014 mean implementation shortfall down 1.8 bps on large meta-orders",
      "Production Python the desk runs daily: the model ships as a callable, not a notebook handed over at the end of the internship",
      "A cross-desk fixed-income automation tool built on Bloomberg API grey-market data, improving execution on the FI side",
    ],
    description:
      "Buy-side, between research and execution. The brief was not \u201ctry Bayesian methods.\u201d It was: make the posterior something the equity process can call.\n\n" +
      "The model forecasts market impact in two parts \u2014 the temporary component you pay for demanding liquidity now, and the permanent component the market keeps \u2014 from four years of equity and fixed-income flow. Out-of-sample it lands at R\u00b2 0.68 and 1.4 bps MAE, with negative log-likelihood 25% below the deterministic baselines it replaced. That last number is the one that matters: it says the uncertainty is calibrated, not just the mean.\n\n" +
      "Which is the whole point, because the variance is the product. A schedule that only knows the expected impact overtrades exactly when the model is furthest outside its training distribution. Feeding the predictive variance back into pacing \u2014 curtail participation when epistemic uncertainty is high \u2014 cut mean implementation shortfall by 1.8 bps on large meta-orders.\n\n" +
      "Same bar on fixed income: a cross-desk automation tool on Bloomberg API grey-market data that the desk actually runs, not a script that needs a babysitter. The internships that stick are the ones where the handoff is a workflow, not a slide.",
    tags: ["Bayesian ML", "PyTorch", "Market Impact", "Execution", "Fixed Income"],
    gallery: [
      {
        id: "m1",
        caption: "Research \u2192 production \u2014 two desks, one handoff rule",
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
