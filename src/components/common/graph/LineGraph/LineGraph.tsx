import "./LineGraph.css";
import {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import useDimensions from "hooks/useDimensions";

export interface LineGraphRange {
  label?: string,
  color: string,
  start: number,
  end: number,
};

export interface LineGraphProps {
  max: number,
  min: number,
  verticalStep: number,
  horizontalStep: number,
  ranges: Array<LineGraphRange>,
  updateData: Function,
};

const BACKGROUND_COLOR = "#393939";

export default function LineGraph({min, max, verticalStep, horizontalStep, ranges, updateData}: LineGraphProps) {
  const [init, setInit] = useState(false);
  
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const frame = useRef<number | null>(null);
  const dataPoints = useRef<Array<number>>([]);

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
  }, [init, ctx, graphDimensions, updateData]);

  // Converts a Y value from graph space to screen space
  const graphToScreenY = useCallback((graphY: number) => {
    return graphHeight - (graphHeight/(max - min))*(graphY - min);
  }, [graphHeight, max, min]);

  const renderBackground = useCallback(() => {
    if (!ctx) {
      return;
    }

    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, graphWidth, graphHeight);
  }, [ctx, graphWidth, graphHeight]);

  const renderRanges = useCallback(() => {
    if (!ctx) {
      return;
    }

    for (let range of ranges) {
      ctx.fillStyle = range.color;
      const startY = graphToScreenY(range.start);
      const endY = graphToScreenY(range.end);
      ctx.fillRect(0, startY, graphWidth, endY - startY);
    }

    // TODO: draw range labels

  }, [ctx, ranges, graphWidth]);

  const renderGridLines = useCallback(() => {
    if (!ctx) {
      return;
    }
    
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    for (let i = 1; i < numRows + 1; i++) {
      const rowY = graphToScreenY(i*verticalStep);
      ctx.beginPath();
      ctx.moveTo(0, rowY);
      ctx.lineTo(graphWidth, rowY);
      ctx.stroke();
    }
  }, [ctx, numRows, graphWidth, verticalStep]);

  const renderData = useCallback(() => {
    if (!ctx) {
      return;
    }

    const maxWidth = graphWidth/horizontalStep;
    const pitchFreq = updateData();
    const yVal = pitchFreq !== -1 ? graphToScreenY(pitchFreq) : -1;
    dataPoints.current.unshift(yVal);

    if (dataPoints.current.length > maxWidth) {
      dataPoints.current.splice(maxWidth, 1);
    }

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3;

    const points = dataPoints.current;
    let lastPoint = -1;
    let path = false;
    for (let i = 0; i < points.length; i++) {
      if (lastPoint === -1) {
        if (path) {
          ctx.stroke();
          path = false;
        }
        if (points[i] !== -1) {
          ctx.beginPath();
          ctx.moveTo(i*horizontalStep, points[i]);
          path = true;
        }
      }
      else if (points[i] !== -1) {
        ctx.lineTo(i*horizontalStep, points[i]);
      }
      lastPoint = points[i];
    }
    if (lastPoint !== -1) {
      ctx.stroke();
    }

  }, [ctx, updateData, horizontalStep, graphToScreenY]);

  const render = useCallback(() => {
    renderBackground();
    renderRanges();
    renderGridLines();
    renderData();
    frame.current = requestAnimationFrame(render);
  }, [renderBackground, renderRanges, renderGridLines, renderData]);

  return (
    <canvas
      ref={(node) => {
        canvas.current = node;
        setInit(true);
      }}
      className="line-graph"
      width={graphWidth}
      height={graphHeight}
    />
  )
}