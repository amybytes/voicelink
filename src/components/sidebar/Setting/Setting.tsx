import "./Setting.css";

interface SettingProps {
  label: string,
  value: number | string,
  Input: React.ReactNode,
};

export default function Setting({label, value, Input}: SettingProps) {
  return (
    <div className="setting">
      <div className="header">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      {Input}
    </div>
  )
}
