import {PAGE_PATHS} from "src/assets/constants/app";
import "./SidebarSettings.css";
import {useLocation} from "react-router-dom";

export default function SidebarSettings() {
  const location = useLocation();
  const page = location ? PAGE_PATHS[location.pathname] : null;

  return (
    <div className="sidebar-settings">
      <h2>Settings</h2>
      {page && <page.Settings />}
    </div>
  )
}
