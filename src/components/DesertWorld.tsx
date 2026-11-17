'use client';
import { useEffect, useRef, type MutableRefObject } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createSandworm } from '@/lib/sandworm';
import { createSurfaceUniforms, deformTerrain, deformWorm, surfaceGLSL } from '@/lib/desert-surface';
import { sampleSolarDay } from '@/lib/solar.mjs';

type Props = { light: MutableRefObject<ReturnType<typeof sampleSolarDay>> };

export default function DesertWorld({ light }: Props) {
  const mount = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = mount.current, hero = document.getElementById('home');
    if (!host || !hero) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
    catch { return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    host.style.display = '';
    host.appendChild(renderer.domElement);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog('#8e704d', 48, 115);
    const camera = new THREE.OrthographicCamera(-30, 30, 10, -10, .1, 160);
    camera.position.set(0, 12, 32); camera.lookAt(0, 0, -12);
    const ambient = new THREE.HemisphereLight('#ecd6ae', '#30271c', 1.3);
    const sun = new THREE.DirectionalLight('#ffe4b4', 2);
    sun.position.set(-25, 28, 10); scene.add(ambient, sun);
    const uniforms = createSurfaceUniforms();

    // Static geometry, GPU displacement and analytic normals: no per-frame
    // vertex uploads, CPU normal rebuilds, shadow maps or frame-skipping cap.
    const initialMobile = innerWidth < 700;
    const terrainGeo = new THREE.PlaneGeometry(160, 150, initialMobile ? 192 : 320, initialMobile ? 110 : 180);
    terrainGeo.rotateX(-Math.PI / 2); terrainGeo.translate(0, 0, -25);
    const sandMaterial = new THREE.MeshStandardMaterial({ color: '#9e784b', roughness: 1 });
    deformTerrain(sandMaterial, uniforms);
    const terrain = new THREE.Mesh(terrainGeo, sandMaterial); terrain.frustumCulled = false; scene.add(terrain);
    const worm = createSandworm();
    worm.traverse(object => {
      if (object instanceof THREE.Mesh) {
        object.frustumCulled = false;
        (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => deformWorm(material, uniforms));
      }
    });
    scene.add(worm);

    const count = initialMobile ? 240 : 480;
    const seeds = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < 3; j++) {
        const hash = Math.sin((i + 1) * 127.1 + j * 311.7) * 43758.5453;
        seeds[i * 3 + j] = hash - Math.floor(hash);
      }
    }
    const dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute('position', new THREE.BufferAttribute(seeds, 3));
    const dustUniforms = {
      ...uniforms, uTime: { value: 0 }, uMotion: { value: 0 },
      uPointScale: { value: 24 }, uDustColor: { value: new THREE.Color('#c49d69') },
    };
    const dustMaterial = new THREE.ShaderMaterial({
      uniforms: dustUniforms, transparent: true, depthWrite: false,
      vertexShader: /* glsl */ `
        ${surfaceGLSL}
        uniform float uTime;
        uniform float uMotion;
        uniform float uPointScale;
        varying float vAlpha;
        void main() {
          float age = fract(position.z + uTime * (0.21 + position.x * 0.07));
          float x = uHeadX - 1.5 - position.x * 27.0 - age * (3.0 + uMotion);
          float side = position.y < 0.5 ? -1.0 : 1.0;
          float z = pathZ(x) + side * (0.7 + age * (3.0 + position.y * 2.0));
          float cascade = uExposure * pow(sin(position.x * 3.14159265), 2.0) * max(0.0, 1.0 - age * 2.0);
          float y = sandHeight(vec2(x, z)) + 0.1 + cascade * 0.7 + sin(age * 3.14159265) * (0.35 + position.x * 0.4 + uMotion * 0.3);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(x, y, z, 1.0);
          gl_PointSize = uPointScale * (0.8 + age * 1.4) * (0.7 + position.x * 0.7);
          vAlpha = sin(age * 3.14159265) * uWake * (0.024 + uExposure * 0.026 + uMotion * 0.035);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uDustColor;
        varying float vAlpha;
        void main() {
          vec2 p = gl_PointCoord - 0.5;
          float distance2 = dot(p, p);
          float alpha = exp(-distance2 * 16.0) * (1.0 - smoothstep(0.17, 0.25, distance2)) * vAlpha;
          gl_FragColor = vec4(uDustColor, alpha);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
    });
    const dust = new THREE.Points(dustGeo, dustMaterial); dust.frustumCulled = false; scene.add(dust);

    gsap.registerPlugin(ScrollTrigger);
    const driver = { progress: 0 };
    const scroll = gsap.to(driver, {
      progress: 1, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: () => `+=${hero.offsetHeight * .78}`, scrub: .65, invalidateOnRefresh: true },
    });
    let frame = 0, lastTime = performance.now(), lastStaticDraw = 0, previousProgress = 0, motion = 0;
    let failed = false, visible = true, halfWidth = 30;
    const resize = () => {
      const width = host.clientWidth, height = host.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height);
      halfWidth = 10 * width / height;
      camera.left = -halfWidth; camera.right = halfWidth; camera.updateProjectionMatrix();
      uniforms.uScale.value = width < 700 ? .8 : 1;
      dustUniforms.uPointScale.value = height / 20 * renderer.getPixelRatio();
    };
    const setRGB = (color: THREE.Color, values: number[]) => color.setRGB(values[0] / 255, values[1] / 255, values[2] / 255, THREE.SRGBColorSpace);
    const rgb = new THREE.Color();
    function draw(now: number) {
      frame = 0;
      if (document.hidden || !visible || failed) return;
      frame = requestAnimationFrame(draw);
      const delta = Math.min((now - lastTime) / 1000, .05); lastTime = now;
      if (reduced.matches && now - lastStaticDraw < 200) return;
      lastStaticDraw = now;
      const progress = reduced.matches ? .46 : driver.progress;
      const speed = Math.min(1, Math.abs(progress - previousProgress) / Math.max(delta, .001) * 3);
      motion = THREE.MathUtils.damp(motion, speed, 4, delta); previousProgress = progress;
      const wake = THREE.MathUtils.smoothstep(progress, .015, .10) * (1 - THREE.MathUtils.smoothstep(progress, .88, 1));
      const phase = THREE.MathUtils.clamp((progress - .12) / .70, 0, 1);
      uniforms.uHeadX.value = THREE.MathUtils.lerp(-halfWidth - 4, halfWidth + 29, progress);
      uniforms.uProgress.value = progress;
      uniforms.uExposure.value = Math.pow(Math.sin(phase * Math.PI), 1.4);
      uniforms.uWake.value = wake;
      dustUniforms.uMotion.value = motion;
      if (!reduced.matches) dustUniforms.uTime.value += delta;
      dust.visible = !reduced.matches && wake > .001;
      worm.visible = wake > .001;
      const day = light.current;
      setRGB(rgb, day.horizon); sandMaterial.color.copy(rgb).multiplyScalar(.72);
      scene.fog!.color.copy(rgb).multiplyScalar(.6);
      setRGB(sun.color, day.sun); sun.intensity = .12 + day.light * .7 * day.sunVisibility;
      setRGB(ambient.color, day.sun); ambient.intensity = .65 + day.light * .4;
      sun.position.x = (day.x - 50) * .7;
      dustUniforms.uDustColor.value.copy(sandMaterial.color).multiplyScalar(.85);
      renderer.render(scene, camera);
    }
    const resume = () => { lastTime = performance.now(); if (!document.hidden && visible && !frame && !failed) frame = requestAnimationFrame(draw); };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; resume(); }); observer.observe(hero);
    const sizeObserver = new ResizeObserver(resize); sizeObserver.observe(host);
    const loss = (event: Event) => { event.preventDefault(); failed = true; host.style.display = 'none'; };
    renderer.domElement.addEventListener('webglcontextlost', loss);
    document.addEventListener('visibilitychange', resume);
    resize(); frame = requestAnimationFrame(draw);
    return () => {
      failed = true; cancelAnimationFrame(frame); observer.disconnect(); sizeObserver.disconnect();
      scroll.scrollTrigger?.kill(); scroll.kill();
      document.removeEventListener('visibilitychange', resume);
      renderer.domElement.removeEventListener('webglcontextlost', loss);
      const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>();
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          geometries.add(object.geometry);
          (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material));
        }
      });
      geometries.forEach(geometry => geometry.dispose()); materials.forEach(material => material.dispose());
      renderer.dispose(); renderer.domElement.remove();
    };
  }, [light]);
  return <div className="desert-sandworm" ref={mount} aria-hidden="true"/>;
}
