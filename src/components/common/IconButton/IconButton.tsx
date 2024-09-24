import "./IconButton.css";
import React, {MouseEventHandler} from 'react';
import clsx from 'clsx';

interface IconButtonProps {
  Icon: React.FunctionComponent,
  className?: string,
  onClick: MouseEventHandler,
}

export default function IconButton({Icon, className, onClick}: IconButtonProps) {
  return (
    <div className={clsx("icon-button", className)} onClick={onClick}>
      <Icon />
    </div>
  );
}
