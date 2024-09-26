import "./SidebarButton.css";
import { MouseEventHandler } from "react";
import IconButton from "components/common/IconButton/IconButton";
import MenuIcon from "icons/menu.svg?react";
import CloseIcon from "icons/close.svg?react";

interface SidebarButtonProps {
  open: boolean,
  onClick: MouseEventHandler
};

export default function SidebarButton({open, onClick}: SidebarButtonProps) {
  return (
    <div className="sidebar-button">
      <IconButton
        Icon={open ? CloseIcon : MenuIcon}
        onClick={onClick}
      />
    </div>
  )
}
