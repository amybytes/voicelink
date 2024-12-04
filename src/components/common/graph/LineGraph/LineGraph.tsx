import './LineGraph.css';
import {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import useDimensions from 'hooks/useDimensions';

export interface LineGraphRange {
  label?: string;
  color: string;
  start: number;
  end: number;
}

export interface LineGraphProps {
  max: number;
  min: number;
  verticalStep: number;
  horizontalStep: number;
  verticalUnits?: string;
  ranges: Array<LineGraphRange>;
  updateData: () => number;
}

const BACKGROUND_COLOR = '#393939';

export default function LineGraph({
  min,
  max,
  verticalStep,
  horizontalStep,
  verticalUnits = '',
  ranges,
  updateData,
}: LineGraphProps) {
  const [init, setInit] = useState(false);

  const canvas = useRef<HTMLCanvasElement | null>(null);
  const frame = useRef<number | null>(null);
  const dataPoints = useRef<Array<number>>([]);

  const ctx = useMemo(() => (init ? canvas.current?.getContext('2d') : null), [init]);

  const graphDimensions = useDimensions(canvas.current as HTMLElement);
  const graphWidth = graphDimensions?.width ?? 0;
  const graphHeight = graphDimensions?.height ?? 0;

  const numRows = (max - min) / verticalStep;

  // Converts a Y value from graph space to screen space
  const graphToScreenY = useCallback(
    (graphY: number) => {
      return graphHeight - (graphHeight / (max - min)) * (graphY - min);
    },
    [graphHeight, max, min],
  );

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

    ctx.font = '14px system-ui';
    ctx.textBaseline = 'bottom';

    for (const range of ranges) {
      ctx.fillStyle = range.color;
      const startY = graphToScreenY(range.start);
      const endY = graphToScreenY(range.end);
      ctx.fillRect(0, startY, graphWidth, endY - startY);
      if (range.label) {
        ctx.fillStyle = '#000';
        ctx.fillText(range.label, 0, startY);
      }
    }
  }, [ctx, ranges, graphWidth, graphToScreenY]);

  const renderGridLines = useCallback(() => {
    if (!ctx) {
      return;
    }

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;

    ctx.font = '14px system-ui';
    ctx.textBaseline = 'bottom';

    let graphY = min;
    for (let i = 1; i < numRows + 1; i++) {
      const rowY = graphToScreenY(i * verticalStep);
      ctx.beginPath();
      ctx.moveTo(0, rowY);
      ctx.lineTo(graphWidth, rowY);
      ctx.stroke();

      const yLabel = graphY + ' ' + verticalUnits;
      const textWidth = ctx.measureText(yLabel).width;
      ctx.fillText(yLabel, graphWidth - textWidth - 10, rowY);
      graphY += verticalStep;
    }
  }, [ctx, numRows, graphWidth, verticalStep, min, verticalUnits, graphToScreenY]);

  const renderData = useCallback(() => {
    if (!ctx) {
      return;
    }

    const maxWidth = graphWidth / horizontalStep;
    const pitchFreq = updateData();
    const yVal = pitchFreq !== -1 ? graphToScreenY(pitchFreq) : -1;
    dataPoints.current.unshift(yVal);

    if (dataPoints.current.length > maxWidth) {
      dataPoints.current.splice(maxWidth, 1);
    }

    ctx.strokeStyle = '#000';
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
          ctx.moveTo(i * horizontalStep, points[i]);
          path = true;
        }
      } else if (points[i] !== -1) {
        ctx.lineTo(i * horizontalStep, points[i]);
      }
      lastPoint = points[i];
    }
    if (lastPoint !== -1) {
      ctx.stroke();
    }
  }, [ctx, updateData, horizontalStep, graphWidth, graphToScreenY]);

  const render = useCallback(() => {
    renderBackground();
    renderRanges();
    renderGridLines();
    renderData();
    frame.current = requestAnimationFrame(render);
  }, [renderBackground, renderRanges, renderGridLines, renderData]);

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
  }, [init, ctx, graphDimensions, updateData, horizontalStep, render]);

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
  );
}
