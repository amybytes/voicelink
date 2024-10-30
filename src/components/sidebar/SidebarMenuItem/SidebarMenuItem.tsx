import "./SidebarMenuItem.css";
import { Link } from "react-router-dom";

interface SidebarMenuItemProps {
  text: string,
  route: string,
  Icon: React.FunctionComponent,
  onClick?: Function,
};

export default function SidebarMenuItem({text, route, Icon, onClick}: SidebarMenuItemProps) {
  function handleClick() {
    if (onClick) {
      onClick();
    }
  }
  
  return (
    <Link className="sidebar-menu-item" to={route} onClick={handleClick}>
      <Icon />
      <span>{text}</span>
    </Link>
  );
}
