import "./Graph.css";
import {useState, useEffect, useMemo, useRef} from 'react';
import useDimensions from "hooks/useDimensions";

export interface GraphRange {
  label?: string,
  color: string,
  start: number,
  end: number,
};

export interface GraphProps {
  max: number,
  min: number,
  verticalStep: number,
  horizontalStep: number,
  ranges: Array<GraphRange>,
};

const BACKGROUND_COLOR = "#393939";

export default function Graph({min, max, verticalStep, horizontalStep, ranges}: GraphProps) {
  const [init, setInit] = useState(false);
  
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const frame = useRef<number | null>(null);

  const ctx = useMemo(() => (init ? canvas.current?.getContext("2d") : null), [init]);

  const graphDimensions = useDimensions(canvas.current as HTMLElement);
  const graphWidth = graphDimensions?.width ?? 0;
  const graphHeight = graphDimensions?.height ?? 0;
  
  const numRows = (max - min) / verticalStep;

  useEffect(() => {
    if (init && ctx) {
      render();
    }

    return () => {
      if (frame.current) {
        cancelAnimationFrame(frame.current);
        frame.current = null;
      }
    };
  }, [init, ctx, graphDimensions]);

  // Converts a Y value from graph space to screen space
  function graphToScreenY(graphY: number) {
    return graphHeight - (graphHeight/max)*(graphY + min);
  }

  function renderBackground() {
    if (!ctx) {
      return;
    }

    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, graphWidth, graphHeight);
  }

  function renderRanges() {
    if (!ctx) {
      return;
    }

    for (let range of ranges) {
      ctx.fillStyle = range.color;
      const startY = graphToScreenY(range.start);
      const endY = graphToScreenY(range.end);
      ctx.fillRect(0, startY, graphWidth, endY - startY);
    }
  }

  function renderGridLines() {
    if (!ctx) {
      return;
    }
    
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    for (let i = 0; i < numRows; i++) {
      const rowY = graphToScreenY(i*verticalStep);
      ctx.beginPath();
      ctx.moveTo(0, rowY);
      ctx.lineTo(graphWidth, rowY);
      ctx.stroke();
    }
  }

  function renderData() {
    
  }

  function render() {
    renderBackground();
    renderRanges();
    renderGridLines();
    renderData();
    // frame.current = requestAnimationFrame(render);
  }

  return (
    <canvas
      ref={(node) => {
        canvas.current = node;
        setInit(true);
      }}
      className="graph"
      width={graphWidth}
      height={graphHeight}
    />
  )
}
