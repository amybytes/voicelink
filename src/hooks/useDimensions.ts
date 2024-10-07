import {useState, useEffect} from 'react';

interface Dimensions {
  width: number,
  height: number,
};

export default function useDimensions(element: HTMLElement) {
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);

  useEffect(() => {
    if (!element) {
      return;
    }

    const observer = new ResizeObserver(() => {
      const rect = element.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height,
      });
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element]);

  return dimensions;
}
