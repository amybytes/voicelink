import './SeekBar.css';

interface SeekBarProps {
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
}

export default function SeekBar({min, max, value, onChange}: SeekBarProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(parseInt(e.target.value));
  }

  return (
    <input
      className="seekbar"
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={handleChange}
    />
  );
}
