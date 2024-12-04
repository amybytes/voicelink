import {PAGE_PATHS, PAGES} from 'src/assets/constants/app';
import './SidebarSettings.css';
import {useLocation} from 'react-router-dom';

export default function SidebarSettings() {
  const location = useLocation();
  const page = PAGE_PATHS[location?.pathname] ?? PAGES.PITCH_MONITOR;

  return (
    <div className="sidebar-settings">
      <h2>Settings</h2>
      {page && <page.Settings />}
    </div>
  );
}
