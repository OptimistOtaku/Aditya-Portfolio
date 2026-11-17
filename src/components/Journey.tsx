'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSolarEnvironment } from './SolarCycle';
import DesertWorld from './DesertWorld';

export function DesertBackdrop() {
  const { light } = useSolarEnvironment();
  return <div className="desert-art" aria-hidden="true">
    <div className="desert-stars"/>
    <div className="sun sun-one"/><div className="sun sun-two"/>
    <div className="mountains"/><div className="dune dune-back"/>
    <DesertWorld light={light}/>
    <div className="dune dune-front"/><div className="spice-veil"/>
  </div>;
}

export default function Journey() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.to('.hero-copy', { y: 65, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: '65% top', end: 'bottom top', scrub: true } });
        gsap.to('.dune-back', { y: -45, xPercent: -2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to('.dune-front', { y: -115, xPercent: 3, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
        gsap.fromTo('.sietch-world', { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: '.hero', start: '45% top', end: 'bottom top', scrub: true } });
        gsap.fromTo('.passage-rock.left', { xPercent: -30 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.passage', start: 'top bottom', end: 'center center', scrub: 1 } });
        gsap.fromTo('.passage-rock.right', { xPercent: 30 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.passage', start: 'top bottom', end: 'center center', scrub: 1 } });
        gsap.to('.sietch-ribs', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: '#work', start: 'top bottom', endTrigger: '#contact', end: 'bottom bottom', scrub: 1 } });
        gsap.utils.toArray<HTMLElement>('.project-card,.section-heading,.about-grid,.award-list').forEach(el => gsap.fromTo(el, { y: 25 }, { y: 0, clearProps: 'transform', duration: .9, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true } }));
      });
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);
  return <>
    <div className="sietch-world" aria-hidden="true"><div className="sietch-ribs"/><div className="sietch-beam"/></div>
    <div className="spice-field" aria-hidden="true">{Array.from({ length: 48 }, (_, i) => <i key={i} style={{ left: `${(i * 47.17) % 100}%`, width: `${i % 4 === 0 ? 2.5 : 1.3}px`, height: `${i % 4 === 0 ? 2.5 : 1.3}px`, animationDuration: `${14 + i % 19}s`, animationDelay: `${-(i * 1.73) % 31}s` }}/>)}</div>
  </>;
}
