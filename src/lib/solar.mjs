// One minute of active viewing makes one Arrakis day; night lasts six seconds.
export const DAY_SECONDS = 60;
const stops = [
  { at: 0, sky: [74, 49, 47], horizon: [155, 88, 52], sun: [255, 189, 111], light: .95, stars: .18, x: 14, y: 43 },
  { at: 6.4, sky: [91, 79, 58], horizon: [182, 129, 69], sun: [255, 224, 163], light: 1.7, stars: 0, x: 29, y: 22 },
  { at: 22, sky: [74, 83, 74], horizon: [174, 136, 84], sun: [255, 237, 191], light: 2.3, stars: 0, x: 55, y: 12 },
  { at: 42, sky: [97, 68, 47], horizon: [184, 117, 54], sun: [255, 205, 128], light: 1.7, stars: 0, x: 80, y: 25 },
  { at: 49, sky: [46, 35, 51], horizon: [142, 66, 46], sun: [246, 139, 90], light: .65, stars: .5, x: 92, y: 56 },
  { at: 52, sky: [15, 23, 38], horizon: [42, 48, 65], sun: [179, 191, 219], light: .3, stars: 1, x: 96, y: 72 },
  { at: 55, sky: [27, 29, 46], horizon: [74, 48, 61], sun: [215, 184, 172], light: .45, stars: .85, x: 3, y: 70 },
  { at: 60, sky: [74, 49, 47], horizon: [155, 88, 52], sun: [255, 189, 111], light: .95, stars: .18, x: 14, y: 43 },
];
const mix = (a, b, t) => a + (b - a) * t;
const smooth = (start, end, value) => {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
};
function sunOrbit(time) {
  // The return trip happens below the horizon, never backwards across the sky.
  if (time >= 49 && time < 55) return { x: 112, y: 65, sunVisibility: 0 };
  const arc = (time >= 55 ? time - 55 : time + 5) / 54;
  return {
    x: -12 + arc * 124,
    y: 65 - Math.sin(arc * Math.PI) * 55,
    sunVisibility: smooth(.025, .085, arc) * (1 - smooth(.91, .97, arc)),
  };
}
export function sampleSolarDay(elapsed) {
  const time = ((elapsed % DAY_SECONDS) + DAY_SECONDS) % DAY_SECONDS;
  const index = stops.findIndex((stop, i) => i < stops.length - 1 && time >= stop.at && time < stops[i + 1].at);
  const a = stops[Math.max(0, index)], b = stops[Math.max(0, index) + 1];
  const linear = (time - a.at) / (b.at - a.at);
  const t = linear * linear * (3 - 2 * linear);
  return {
    time,
    phase: time < 6.4 || time >= 55 ? 'Dawn' : time < 42 ? 'Daylight' : time < 49 ? 'Dusk' : 'Night',
    sky: a.sky.map((v, i) => mix(v, b.sky[i], t)),
    horizon: a.horizon.map((v, i) => mix(v, b.horizon[i], t)),
    sun: a.sun.map((v, i) => mix(v, b.sun[i], t)),
    light: mix(a.light, b.light, t), stars: mix(a.stars, b.stars, t),
    ...sunOrbit(time),
  };
}
export function advanceSolarTime(elapsed, deltaSeconds, visible) {
  return elapsed + (visible ? Math.max(0, deltaSeconds) : 0);
}
