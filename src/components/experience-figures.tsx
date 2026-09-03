import { LineFigure } from "@/components/line-figure"

const round1 = (v: number) => Math.round(v * 10) / 10

/* ------------------------------------------------------------------ */
/* 1. Impact decomposition — temporary (concave) vs permanent (linear) */
/* ------------------------------------------------------------------ */

const PARTICIPATION = Array.from({ length: 21 }, (_, i) => round1(i * 1.25)) // % of ADV
const temporary = PARTICIPATION.map((x) => round1(9.5 * Math.sqrt(x / 10)))
const permanent = PARTICIPATION.map((x) => round1(0.42 * x))
const bandHalf = PARTICIPATION.map((x) => 1.0 + 0.1 * x)
const tempLower = temporary.map((y, i) => round1(Math.max(0, y - bandHalf[i])))
const tempUpper = temporary.map((y, i) => round1(y + bandHalf[i]))

/* ------------------------------------------------------------------ */
/* 2. Predictive variance → participation cap (the pacing rule)        */
/* ------------------------------------------------------------------ */

const SIGMA = Array.from({ length: 17 }, (_, i) => round1(i * 0.5)) // bps of predictive std
const cap = SIGMA.map((s) => round1(Math.max(4, 20 * Math.exp(-0.38 * Math.max(0, s - 2)))))

/* ------------------------------------------------------------------ */
/* 3. Implementation shortfall — baseline vs uncertainty-aware pacing  */
/* ------------------------------------------------------------------ */

const ORDER_SIZE = Array.from({ length: 12 }, (_, i) => 5 + i * 5) // % of ADV
const isBaseline = ORDER_SIZE.map((x) => round1(6 + 0.38 * x))
const isPaced = ORDER_SIZE.map((x) => round1(6 + 0.38 * x - (0.3 + 0.046 * x)))

const SCHEMATIC =
  "Schematic: the curve shapes illustrate the mechanism, not desk data — bank output stays inside the bank. The headline figures quoted below each figure are the measured out-of-sample results."

function CmCicFigures() {
  return (
    <div>
      <h3 className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/45">
        <span className="text-foreground/25">{">"}</span> How it works
      </h3>

      <LineFigure
        title="1 — Impact splits in two, and only one half comes back"
        subtitle="Temporary impact is the price you pay for demanding liquidity now; it decays after the order stops. Permanent impact is the part the market keeps. The model forecasts both from flow, and returns a posterior rather than a point — the band is what pays for the pacing rule in figure 2."
        xs={PARTICIPATION}
        xTicks={[0, 5, 10, 15, 20, 25]}
        yTicks={[0, 5, 10, 15, 20]}
        xUnit="participation rate (% of ADV)"
        yUnit="impact (bps)"
        series={[
          { id: "temporary", label: "Temporary", values: temporary, tone: "ink" },
          { id: "permanent", label: "Permanent", values: permanent, tone: "muted", dashed: true },
        ]}
        band={{ label: "90% credible", lower: tempLower, upper: tempUpper }}
        note={`Bayesian neural network, 4 years of equity and fixed-income flow. Out-of-sample R² 0.68, MAE 1.4 bps, NLL 25% below deterministic baselines. ${SCHEMATIC}`}
      />

      <LineFigure
        title="2 — The width of the posterior is the control signal"
        subtitle="A point forecast can only tell the scheduler what impact to expect. A posterior also tells it how much it does not know. Below the threshold the model is confident and the schedule runs at its normal cap; above it, epistemic uncertainty curtails participation until the order is paced back into the range the model was actually trained on."
        xs={SIGMA}
        xTicks={[0, 2, 4, 6, 8]}
        yTicks={[0, 5, 10, 15, 20, 25]}
        xUnit="predictive std (bps)"
        yUnit="participation cap (% of ADV)"
        series={[{ id: "cap", label: "Allowed cap", values: cap, tone: "ink" }]}
        marker={{ x: 2, label: "threshold" }}
        shadeFrom={{ x: 2, label: "curtail" }}
        note={`The floor is deliberate: the desk still needs to trade when the model is unsure, just slower. ${SCHEMATIC}`}
      />

      <LineFigure
        title="3 — What that buys, in basis points"
        subtitle="Implementation shortfall against arrival price, baseline schedule versus the uncertainty-aware one. The two agree on small orders — there is nothing to curtail. The gap opens on large meta-orders, which is exactly where the posterior is widest and the baseline overtrades."
        xs={ORDER_SIZE}
        xTicks={[10, 20, 30, 40, 50, 60]}
        yTicks={[0, 10, 20, 30]}
        xUnit="meta-order size (% of ADV)"
        yUnit="implementation shortfall (bps)"
        series={[
          { id: "baseline", label: "Baseline pacing", values: isBaseline, tone: "muted", dashed: true },
          { id: "paced", label: "Uncertainty-aware", values: isPaced, tone: "ink" },
        ]}
        gap={{ index: 9, label: "−2.6 bps" }}
        note={`Mean saving 1.8 bps across large meta-orders. Shipped as production Python the desk runs daily, not a notebook. ${SCHEMATIC}`}
      />
    </div>
  )
}

export function ExperienceFigures({ slug }: { slug: string }) {
  if (slug === "cm-cic") return <CmCicFigures />
  return null
}
