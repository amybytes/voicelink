import "./SidebarContent.css";
import SidebarHeader from "components/sidebar/SidebarHeader/SidebarHeader";
import SidebarFooter from "components/sidebar/SidebarFooter/SidebarFooter";

export default function SidebarContent() {
  return (
    <div className="sidebar-content">
      <SidebarHeader />
      <SidebarFooter />
    </div>
  )
}
