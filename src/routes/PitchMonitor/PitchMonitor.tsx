import "./PitchMonitor.css";
import Graph, {GraphRange} from "src/components/common/graph/Graph/Graph";
import Page from "components/common/Page/Page";

const MIN_FREQ = 50;
const MAX_FREQ = 450;
const STEP_FREQ = 50;

// TODO: add custom (user-defined) ranges
const GENDER_RANGES: Array<GraphRange> = [
  {
    label: "Male",
    color: "#5bcffa",
    start: 90,
    end: 155,
  },
  {
    label: "Androgynous",
    color: "white",
    start: 155,
    end: 165,
  },
  {
    label: "Female",
    color: "#f5abb9",
    start: 165,
    end: 255,
  },
];

export default function PitchMonitor() {
  return (
    <Page name="pitch-monitor" displayName="" description="">
      <Graph
        min={MIN_FREQ}
        max={MAX_FREQ}
        verticalStep={STEP_FREQ}
        horizontalStep={100}
        ranges={GENDER_RANGES}
      />

      {/* play/pause/record audio controls can be in their own hover panel (or fixed)
      similar to the sidebar (but not collapsable) */}
    </Page>
  )
}
