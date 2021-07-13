import React from 'react';
import { useStarChartStore } from '../../global-stores/useStarChartStore';
import setup from '../../utils/chart/setup';
import Canvas from './Canvas';

const length = 900;
const width = 900;

export const Chart: React.FC = () => {
  const settings = useStarChartStore(state => state.settings);

  const draw = (ctx: CanvasRenderingContext2D) => {
    setup(ctx, length, width);
  }

  return (
    <Canvas draw={draw} width="900px" height="900px" />
  )
}

