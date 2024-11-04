import "./PitchSettings.css";
import Slider from "components/common/Slider/Slider";
import {useSettingsContext} from "contexts/SettingsContext";
import {MIN_VOLUME, MAX_VOLUME, STEP_VOLUME, MIN_HORIZONTAL_STEP, MAX_HORIZONTAL_STEP} from "constants/settings";
import Setting from "../Setting/Setting";

export default function PitchSettings() {
  const {minPitchVolume, horizontalStep, setMinPitchVolume, setHorizontalStep} = useSettingsContext();

  const minPitchVolumePercent = getRangePercentage(minPitchVolume*25, MIN_VOLUME, MAX_VOLUME*25, 25);
  const horizontalStepPercent = getRangePercentage(horizontalStep, MIN_HORIZONTAL_STEP, MAX_HORIZONTAL_STEP);

  function getRangePercentage(value: number, min: number, max: number, maxPercent: number = 100) {
    const n = (value - min) / (max - min);
    return Math.floor(n * maxPercent) + "%";
  }

  return (
    <div className="pitch-settings">
      <Setting
        label="Minimum volume"
        value={minPitchVolumePercent}
        Input={
          <Slider
            min={MIN_VOLUME}
            max={MAX_VOLUME}
            step={STEP_VOLUME}
            value={minPitchVolume}
            onChange={(vol: number) => setMinPitchVolume(vol)}
          />
        }
      />
      <Setting
        label="Scrolling speed"
        value={horizontalStepPercent}
        Input={
          <Slider
            min={MIN_HORIZONTAL_STEP}
            max={MAX_HORIZONTAL_STEP}
            value={horizontalStep}
            onChange={(step: number) => setHorizontalStep(step)}
          />
        }
      />
    </div>
  )
}
