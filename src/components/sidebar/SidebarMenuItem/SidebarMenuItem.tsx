import "./SidebarMenuItem.css";
import { Link } from "react-router-dom";

interface SidebarMenuItemProps {
  text: string,
  route: string,
};

export default function SidebarMenuItem({text, route}: SidebarMenuItemProps) {
  return (
    <Link className="sidebar-menu-item" to={route}>
      {text}
    </Link>
  );
}
