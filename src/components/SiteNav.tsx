'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const sections = ['Work', 'Recognition', 'About', 'Writing', 'Contact'];
export default function SiteNav() {
  const pathname = usePathname();
  const [on, setOn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const audio = useRef<AudioContext | null>(null);
  const gain = useRef<GainNode | null>(null);
  useEffect(() => {
    const scroll = () => {
      setScrolled(window.scrollY > 60);
      if (gain.current && audio.current) gain.current.gain.setTargetAtTime(window.scrollY > 700 ? .055 : .12, audio.current.currentTime, 1);
      if (pathname === '/' && window.scrollY < 100) setActive('');
    };
    const visibility = () => { if (document.hidden) void audio.current?.suspend(); else if (on) void audio.current?.resume(); };
    window.addEventListener('scroll', scroll, { passive: true });
    document.addEventListener('visibilitychange', visibility); scroll();
    return () => { window.removeEventListener('scroll', scroll); document.removeEventListener('visibilitychange', visibility); };
  }, [on, pathname]);
  useEffect(() => {
    if (pathname !== '/') { setActive(pathname.startsWith('/projects/') ? 'work' : ''); return; }
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: '-12% 0px -65% 0px' });
    sections.forEach(label => { const element = document.getElementById(label.toLowerCase()); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, [pathname]);
  useEffect(() => () => { void audio.current?.close(); }, []);
  async function toggle() {
    try {
      if (!audio.current) {
        const ctx = new AudioContext(); audio.current = ctx;
        const master = ctx.createGain(); master.gain.value = .10; master.connect(ctx.destination); gain.current = master;
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
        const data = buffer.getChannelData(0); let last = 0;
        for (let i = 0; i < data.length; i++) { last = (last + Math.random() * .04 - .02) / 1.02; data[i] = last * 3; }
        const wind = ctx.createBufferSource(); wind.buffer = buffer; wind.loop = true;
        const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 420;
        wind.connect(filter).connect(master); wind.start();
        const drone = ctx.createOscillator(); drone.frequency.value = 55;
        const level = ctx.createGain(); level.gain.value = .1;
        drone.connect(level).connect(master); drone.start();
      }
      if (on) await audio.current.suspend(); else await audio.current.resume(); setOn(!on);
    } catch { setOn(false); }
  }
  return <header className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
    <a className="brand" href="/#home" aria-label="Aditya Singh home"><span className="brand-mark" aria-hidden="true">◈</span>ADITYA SINGH</a>
    <nav aria-label="Main navigation">{sections.map(label => <a key={label} href={`/#${label.toLowerCase()}`} aria-current={active === label.toLowerCase() ? 'location' : undefined}>{label}</a>)}</nav>
    <button className="sound-toggle" aria-pressed={on} onClick={toggle}>Sound {on ? 'on' : 'off'}</button>
  </header>;
}
