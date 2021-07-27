import React from 'react';
import { useApplicationStore } from '../../global-stores/useApplicationStore';
import { useStarChartStore } from '../../global-stores/useStarChartStore';
import { useTimeStore } from '../../global-stores/useTimeStore';
import ecliptic from '../../utils/chart/objects/ecliptic';
import equator from '../../utils/chart/objects/equator';
import planets from '../../utils/chart/objects/planets';
import stars from '../../utils/chart/objects/stars';
import setup from '../../utils/chart/objects/setup';
import { processTimestamp } from '../../utils/chart/time';
import Canvas from './Canvas';
import lines from '../../utils/chart/objects/lines';
import names from '../../utils/chart/objects/names';
import galaxy from '../../utils/chart/objects/galaxy';
// import dso from '../../utils/chart/objects/dso';

const length = 900;
const width = 900;

export const Chart: React.FC = () => {
  const settings = useStarChartStore(state => state.settings);
  const geolocation = useApplicationStore(state => state.geolocation);
  const timestamp = useTimeStore(state => state.date);

  const draw = (ctx: CanvasRenderingContext2D) => {
    setup(ctx, length, width, settings.azimuthOffset);

    // Time parameters
    const time = processTimestamp(timestamp, geolocation.longitude);
    const TD = time.T + time.dT;

    stars(ctx, length, width, geolocation.latitude, settings.azimuthOffset, time.LST.rad);

    if (settings.equator) {
      equator(ctx, length, width, geolocation.latitude, settings.azimuthOffset);
    }

    if (settings.ecliptic) {
      ecliptic(ctx, length, width, geolocation.latitude, settings.azimuthOffset, TD, time.LST.rad);
    }

    if (settings.constellationLines) {
      lines(ctx, length, width, geolocation.latitude, settings.azimuthOffset, time.LST.rad);
    }

    if (settings.solarSystem) {
      planets(ctx, length, width, geolocation.latitude, settings.azimuthOffset, TD, time.LST.rad);
    }

    if (settings.constellationNames) {
      names(ctx, length, width, geolocation.latitude, settings.azimuthOffset, time.LST.rad);
    }

    if (settings.galacticCenter) {
      galaxy(ctx, length, width, geolocation.latitude, settings.azimuthOffset, time.LST.rad, TD);
    }
  }

  return (
    <Canvas draw={draw} width="900px" height="900px"/>
  )
}

