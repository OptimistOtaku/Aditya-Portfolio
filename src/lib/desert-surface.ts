import * as THREE from 'three';

export function createSurfaceUniforms() {
  return {
    uHeadX: { value: -40 }, uProgress: { value: 0 },
    uExposure: { value: 0 }, uWake: { value: 0 }, uScale: { value: 1 },
  };
}
export type SurfaceUniforms = ReturnType<typeof createSurfaceUniforms>;

export const surfaceGLSL = /* glsl */ `
uniform float uHeadX;
uniform float uProgress;
uniform float uExposure;
uniform float uWake;
uniform float uScale;
float pathZ(float x) { return -10.0 + sin(x * 0.045) * 1.7; }
float duneHeight(vec2 p) {
  return sin(p.x * 0.075 + p.y * 0.11) * 0.7
    + cos(p.x * 0.12 - p.y * 0.09) * 0.4;
}
float sandHeight(vec2 p) {
  float behind = uHeadX - p.x;
  float side = abs(p.y - pathZ(p.x));
  float trail = smoothstep(-1.0, 2.0, behind) * (1.0 - smoothstep(24.0, 34.0, behind));
  float flank = side - (1.3 + max(behind, 0.0) * 0.17);
  float shoulders = exp(-flank * flank / 1.1) * trail;
  float bow = exp(-pow((behind - 0.8) / 2.2, 2.0) - pow(side / 2.4, 2.0));
  float rolling = sin(behind * 2.3 - side * 2.0 - uProgress * 18.0) * 0.11;
  float wake = shoulders * (1.15 + rolling) + bow * 1.25;
  return duneHeight(p) + wake * uWake;
}
vec3 wormSurface(vec3 p) {
  float x = p.x + uHeadX;
  float z = pathZ(x);
  float along = clamp(-p.x / 24.0, 0.0, 1.0);
  float back = pow(sin(along * 3.14159265), 2.0);
  float lift = uExposure * back * (1.0 + sin(along * 7.0 - uProgress * 5.0) * 0.13);
  float roll = sin(uProgress * 5.0 + along * 1.6) * uExposure * 0.10;
  vec2 crossSection = mat2(cos(roll), -sin(roll), sin(roll), cos(roll)) * p.yz;
  return vec3(x, duneHeight(vec2(x, z)) + (-1.48 + crossSection.x + lift) * uScale, z + crossSection.y * uScale);
}
`;

export function deformTerrain(material: THREE.MeshStandardMaterial, uniforms: SurfaceUniforms) {
  material.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader.replace('#include <common>', `#include <common>\n${surfaceGLSL}\nvarying vec2 vSandPoint;`)
      .replace('#include <beginnormal_vertex>', `
        float e = 0.18;
        float dx = sandHeight(position.xz + vec2(e, 0.0)) - sandHeight(position.xz - vec2(e, 0.0));
        float dz = sandHeight(position.xz + vec2(0.0, e)) - sandHeight(position.xz - vec2(0.0, e));
        vec3 objectNormal = normalize(vec3(-dx, 2.0 * e, -dz));
      `)
      .replace('#include <begin_vertex>', `vec3 transformed = vec3(position.x, sandHeight(position.xz), position.z); vSandPoint = position.xz;`);
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>\nvarying vec2 vSandPoint;`)
      .replace('#include <color_fragment>', `#include <color_fragment>
        float grain = fract(sin(dot(floor(vSandPoint * 22.0), vec2(127.1, 311.7))) * 43758.5453);
        diffuseColor.rgb *= 0.97 + grain * 0.06;
      `);
  };
  material.customProgramCacheKey = () => 'arrakis-sand-wake-1';
}

export function deformWorm(material: THREE.Material, uniforms: SurfaceUniforms) {
  material.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader.replace('#include <common>', `#include <common>\n${surfaceGLSL}`)
      .replace('#include <beginnormal_vertex>', `
        vec3 objectNormal = normal;
        float x = position.x + uHeadX;
        float slope = (duneHeight(vec2(x + 0.1, pathZ(x + 0.1))) - duneHeight(vec2(x - 0.1, pathZ(x - 0.1)))) / 0.2;
        objectNormal.x -= objectNormal.y * slope + objectNormal.z * cos(x * 0.045) * 0.0765;
      `)
      .replace('#include <begin_vertex>', 'vec3 transformed = wormSurface(position);');
  };
  material.customProgramCacheKey = () => 'arrakis-submerged-worm-1';
}
