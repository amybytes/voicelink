import "./Header.css";
import {useState} from 'react';
import HeaderMenu from "components/header/HeaderMenu/HeaderMenu";
import IconButton from "components/common/IconButton/IconButton";
import Logo from "components/header/Logo/Logo";
import MenuIcon from "images/menu.svg?react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  function handleClick() {

  }

  return (
    <div className="header">
      <Logo />
      <IconButton Icon={MenuIcon} onClick={handleClick} />
      {/* <HeaderMenu open={open} /> */}
    </div>
  )
}
