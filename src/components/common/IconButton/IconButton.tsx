import './IconButton.css';
import React, {MouseEventHandler} from 'react';
import clsx from 'clsx';

interface IconButtonProps {
  Icon: React.FunctionComponent;
  IconProps?: object;
  showBackgroundOnHover?: boolean;
  animate?: boolean;
  className?: string;
  onClick: MouseEventHandler;
}

export default function IconButton({
  Icon,
  IconProps,
  showBackgroundOnHover,
  animate,
  className,
  onClick,
}: IconButtonProps) {
  const classes = ['icon-button', className];
  if (animate) {
    classes.push('animate');
  }
  if (showBackgroundOnHover) {
    classes.push('hover-background');
  }

  return (
    <div className={clsx(classes)} onClick={onClick}>
      <Icon {...IconProps} />
    </div>
  );
}
