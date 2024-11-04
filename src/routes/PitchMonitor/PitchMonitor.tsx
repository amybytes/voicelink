import "./PitchMonitor.css";
import {useCallback} from 'react';
import LineGraph, {LineGraphRange} from "src/components/common/graph/LineGraph/LineGraph";
import Page from "components/common/Page/Page";
import {useMicContext} from 'contexts/MicContext';
import {useSettingsContext} from "contexts/SettingsContext";
import {PitchDetector} from "pitchy";

const MIN_FREQ = 50;
const MAX_FREQ = 350;
const STEP_FREQ = 50;

// TODO: add custom (user-defined) ranges
const GENDER_RANGES: Array<LineGraphRange> = [
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
  const {audioComponents} = useMicContext();
  const {minPitchVolume, horizontalStep} = useSettingsContext();

  const handleUpdateData = useCallback(() => {
    if (audioComponents) {
      const analyzer = audioComponents.analyzer;
      const data = audioComponents.data;
      const context = audioComponents.context;
      
      analyzer.getFloatTimeDomainData(data);
      const detector = PitchDetector.forFloat32Array(data.length);
      detector.minVolumeAbsolute = minPitchVolume;
      const pitch = detector.findPitch(data, context.sampleRate)[0];

      if (pitch >= MIN_FREQ && pitch <= MAX_FREQ) {
        return pitch;
      }
    }
    return -1;
  }, [audioComponents, minPitchVolume]);

  return (
    <Page name="pitch-monitor" displayName="" description="">
      <LineGraph
        min={MIN_FREQ}
        max={MAX_FREQ}
        verticalStep={STEP_FREQ}
        horizontalStep={horizontalStep}
        verticalUnits="Hz"
        ranges={GENDER_RANGES}
        updateData={handleUpdateData}
      />

      {/* play/pause/record audio controls can be in their own hover panel (or fixed)
      similar to the sidebar (but not collapsable) */}
    </Page>
  )
}
