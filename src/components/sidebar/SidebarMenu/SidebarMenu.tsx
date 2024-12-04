import './SidebarMenu.css';
import SidebarMenuItem from 'components/sidebar/SidebarMenuItem/SidebarMenuItem';
import CollectionIcon from 'icons/collection.svg?react';
import GraphIcon from 'icons/graph.svg?react';

const MENU_ITEMS = [
  {text: 'Pitch Monitor', route: 'pitch', Icon: GraphIcon},
  {text: 'My Recordings', route: 'recordings', Icon: CollectionIcon},
];

interface SidebarMenuProps {
  onNavigate?: (item: object) => void;
}

export default function SidebarMenu({onNavigate}: SidebarMenuProps) {
  function handleClick(item: object) {
    if (onNavigate) {
      onNavigate(item);
    }
  }

  return (
    <div className="sidebar-menu">
      <h2>Tools</h2>
      <div className="menu-items">
        {MENU_ITEMS.map((item, i) => (
          <SidebarMenuItem
            key={i}
            text={item.text}
            route={item.route}
            Icon={item.Icon}
            onClick={() => handleClick(item)}
          />
        ))}
      </div>
    </div>
  );
}
