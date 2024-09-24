import "./HeaderMenu.css";


interface HeaderMenuProps {
  open: boolean,
};

export default function HeaderMenu({open}: HeaderMenuProps) {
  // menu button in top-right, sliding menu from the right
  
  return (
    <div className="header-menu" hidden={!open}>
      test
    </div>
  )
}
