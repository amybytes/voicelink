import "./IconButton.css";
import React, {MouseEventHandler} from 'react';
import clsx from 'clsx';

interface IconButtonProps {
  Icon: React.FunctionComponent,
  IconProps?: object,
  animate?: boolean,
  className?: string,
  onClick: MouseEventHandler,
}

export default function IconButton({Icon, IconProps, animate, className, onClick}: IconButtonProps) {
  return (
    <div className={clsx("icon-button", animate ? 'animate' : '', className)} onClick={onClick}>
      <Icon {...IconProps} />
    </div>
  );
}
