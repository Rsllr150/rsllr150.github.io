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
    location: "Paris, France (Remote)",
    duration: "June 2025 \u2014 Present",
    blurb:
      "Founding engineer on a seed-funded RegTech: a B2B fraud-scoring platform from 0 to 1, now scoring for paying clients across European equipment leasing.",
    constraint:
      "A bank cannot act on a score it cannot explain. Every point of risk has to trace back to a fact a compliance officer can read, challenge, and sign off on \u2014 which rules out the model that would have been easiest to ship.",
    metrics: [
      { value: "500k+", label: "companies scored" },
      { value: "+35%", label: "accuracy vs incumbent" },
      { value: "20+", label: "tenants in prod" },
      { value: "$550k", label: "raised" },
    ],
    owned: [
      "The scoring engine: Explainable Boosting Machine plus declarative rules \u2014 35% more accurate than the incumbent, and every score carries per-feature decision traces compliance can audit",
      "Multi-tenant FastAPI / MongoDB backend with real-time scoring APIs, fed by async ETL over OSINT and corporate-registry sources",
      "Infrastructure on Kubernetes \u2014 Helm, Terraform, ArgoCD, OVHcloud \u2014 under bank-grade constraints, with 20+ tenants in production",
      "An MCP (Model Context Protocol) tool integrated into the main platform",
      "Client calls, and the translation from what a leasing risk team complains about into what we build next",
    ],
    description:
      "Three engineers, zero product, one bet: that leasing and banking risk teams would pay for a fraud score they could actually defend. Eighteen months later it is in production with paying clients across European equipment leasing, 500,000+ company checks scored, and $550k raised.\n\n" +
      "The constraint shaped everything. A gradient-boosted black box would have been faster to build and impossible to sell \u2014 when a leasing company declines an application, someone has to be able to say why, to the applicant and to a regulator. So the engine is an Explainable Boosting Machine layered with declarative rules: additive by construction, so the contribution of every feature is a number you can read off directly, not a post-hoc approximation of one. It beats the incumbent by 35% on accuracy and, unlike the incumbent, it shows its work.\n\n" +
      "Underneath that sits the part nobody demos: a multi-tenant FastAPI and MongoDB backend serving real-time scoring APIs, fed by async ETL over OSINT sources and corporate registries that are slow, rate-limited, inconsistently formatted, and occasionally just wrong. Most of the accuracy lives in that pipeline rather than in the model.\n\n" +
      "I own the infrastructure too \u2014 Kubernetes with Helm, Terraform, and ArgoCD on OVHcloud, under bank-grade constraints, 20+ tenants in production. Being there from day one means the whole surface is yours: the model, the pipeline, the cluster, and the client call where you find out which of the three was actually the problem.",
    tags: ["Explainable Boosting", "FastAPI", "MongoDB", "Kubernetes", "MCP"],
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
    title: "Data & Execution Intern",
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
