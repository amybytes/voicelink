import "./Logo.css";
import LogoIcon from 'images/logo_cropped.png';

const SIZE = "96px";

export default function Logo() {
  return (
    <div className="logo">
      Voice
      <img src={LogoIcon} width={SIZE} />
      Link
    </div>
  );
}
