import "./SidebarMenu.css";
import SidebarMenuItem from "components/sidebar/SidebarMenuItem/SidebarMenuItem";

const MENU_ITEMS = [
  {text: "Pitch Monitor", route: "pitch"},
  {text: "My Recordings", route: "recordings"},
]

export default function SidebarMenu() {
  return (
    <div className="sidebar-menu">
      {MENU_ITEMS.map((item, i) => (
        <SidebarMenuItem key={i} text={item.text} route={item.route} />
      ))}
    </div>
  );
}
