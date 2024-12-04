import './Collapse.css';
import {useState, useRef} from 'react';

interface CollapseProps {
  show: boolean;
  children: React.ReactNode;
}

export default function Collapse({show, children}: CollapseProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [init, setInit] = useState<boolean>(false);

  const container = useRef<HTMLDivElement | null>(null);
  const maxWidth = (container.current?.scrollWidth ?? 0) + 12;
  const maxHeight = (container.current?.scrollHeight ?? 0) + 12;

  return (
    <div
      ref={(node) => {
        container.current = node;
        setInit(true);
      }}
      style={{
        maxWidth: show ? maxWidth : 0,
        maxHeight: show ? maxHeight : 0,
      }}
      className="collapse">
      {children}
    </div>
  );
}
