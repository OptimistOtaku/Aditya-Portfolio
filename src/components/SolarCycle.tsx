'use client';
import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import { advanceSolarTime, sampleSolarDay } from '@/lib/solar.mjs';

const SolarContext = createContext<ReturnType<typeof useSolarCycle> | null>(null);
export function useSolarEnvironment() {
  const value = useContext(SolarContext);
  if (!value) throw new Error('Solar environment must be inside SolarProvider');
  return value;
}
export function SolarProvider({ children }: { children: ReactNode }) {
  const cycle = useSolarCycle();
  return <SolarContext.Provider value={cycle}>{children}</SolarContext.Provider>;
}

function useSolarCycle() {
  const elapsed = useRef(14);
  const light = useRef(sampleSolarDay(14));
  useEffect(() => {
    const storageKey = 'arrakis-minute';
    try {
      const saved = Number(sessionStorage.getItem(storageKey) || 14);
      elapsed.current = Number.isFinite(saved) ? saved : 14;
    } catch {}
    let last = performance.now(), lastSaved = -1;
    const root = document.documentElement;
    const keys = ['--sky-rgb', '--horizon-rgb', '--sun-rgb', '--star-opacity', '--sun-x', '--sun-y', '--sun-visibility', '--day-glow', '--light-heading', '--light-beam'];
    const previous = keys.map(key => root.style.getPropertyValue(key));
    const save = () => { try { sessionStorage.setItem(storageKey, String(elapsed.current)); } catch {} };
    const tick = () => {
      const now = performance.now();
      elapsed.current = advanceSolarTime(elapsed.current, (now - last) / 1000, !document.hidden);
      last = now;
      if (document.hidden) return;
      const value = sampleSolarDay(elapsed.current); light.current = value;
      root.style.setProperty('--sky-rgb', value.sky.map(Math.round).join(' '));
      root.style.setProperty('--horizon-rgb', value.horizon.map(Math.round).join(' '));
      root.style.setProperty('--sun-rgb', value.sun.map(Math.round).join(' '));
      root.style.setProperty('--star-opacity', String(value.stars));
      root.style.setProperty('--sun-x', `${value.x}%`);
      root.style.setProperty('--sun-y', `${value.y}%`);
      root.style.setProperty('--sun-visibility', String(value.sunVisibility));
      root.style.setProperty('--day-glow', String(value.light / 2.3));
      root.style.setProperty('--light-heading', `${Math.round(18 + value.x * .6)}%`);
      root.style.setProperty('--light-beam', String((.15 + value.light * .16) * value.sunVisibility));
      const second = Math.floor(elapsed.current / 5);
      if (lastSaved !== second) { lastSaved = second; save(); }
    };
    const visibility = () => { last = performance.now(); if (document.hidden) save(); };
    document.addEventListener('visibilitychange', visibility);
    tick(); const timer = window.setInterval(tick, 100);
    return () => {
      clearInterval(timer); document.removeEventListener('visibilitychange', visibility);
      keys.forEach((key, i) => previous[i] ? root.style.setProperty(key, previous[i]) : root.style.removeProperty(key));
      save();
    };
  }, []);
  return { light };
}
