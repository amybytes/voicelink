import "./Slider.css";

interface SliderProps {
  min: number,
  max: number,
  value: number,
  step?: number,
  onChange: Function,
};

const DEFAULT_STEP = 1;

export default function Slider({min, max, value, step=DEFAULT_STEP, onChange}: SliderProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange(Number.parseFloat(e.target.value));
    }
  }
  
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      step={step}
      onChange={handleChange}
    />
  );
}
