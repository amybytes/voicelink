import "./Logo.css";
import LogoIcon from 'images/logo_transparent.png';

const SIZE = "96";

export default function Logo() {
  return (
    <div className="logo">
      Voice
      <img src={LogoIcon} width={SIZE} height={SIZE} />
      Link
    </div>
  );
}
