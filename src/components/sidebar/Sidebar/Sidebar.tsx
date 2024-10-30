import "./Sidebar.css";
import {useState} from 'react';
import clsx from 'clsx';
import SidebarButton from "components/sidebar/SidebarButton/SidebarButton";
import SidebarHeader from "components/sidebar/SidebarHeader/SidebarHeader";
import SidebarMenu from "components/sidebar/SidebarMenu/SidebarMenu";
import SidebarSettings from "components/sidebar/SidebarSettings/SidebarSettings";
import SidebarFooter from "components/sidebar/SidebarFooter/SidebarFooter";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <div className={clsx("sidebar", open ? 'open' : '')}>
      <SidebarButton open={open} onClick={handleClick} />
      <SidebarHeader />
      <SidebarMenu onNavigate={() => setOpen(false)} />
      <SidebarSettings />
      <SidebarFooter />
    </div>
  )
}
