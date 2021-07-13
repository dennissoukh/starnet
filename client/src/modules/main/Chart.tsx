import React from 'react';
import { useApplicationStore } from '../../global-stores/useApplicationStore';
import { useStarChartStore } from '../../global-stores/useStarChartStore';
import ecliptic from '../../utils/chart/objects/ecliptic';
import equator from '../../utils/chart/objects/equator';
import setup from '../../utils/chart/objects/setup';
import Canvas from './Canvas';

const length = 900;
const width = 900;

export const Chart: React.FC = () => {
  const settings = useStarChartStore(state => state.settings);
  const geolocation = useApplicationStore(state => state.geolocation);

  const draw = (ctx: CanvasRenderingContext2D) => {
    setup(ctx, length, width, settings.azimuthOffset);

    if (settings.equator) {
      equator(ctx, length, width, geolocation.latitude, settings.azimuthOffset);
    }

    if (settings.ecliptic) {
      ecliptic(ctx, length, width, geolocation.latitude, settings.azimuthOffset);
    }
  }

  return (
    <Canvas draw={draw} width="900px" height="900px"/>
  )
}

