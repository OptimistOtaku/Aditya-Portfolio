import * as THREE from 'three';

// A long body lies along -X; the leading mouth faces +X. The scene bends this
// continuous skin through the same dune field that conceals the creature.
export function createSandworm() {
  const worm = new THREE.Group();
  const curve = new THREE.LineCurve3(new THREE.Vector3(), new THREE.Vector3(-24, 0, 0));
  const shellGeo = new THREE.TubeGeometry(curve, 256, 1.5, 40, false);
  const position = shellGeo.attributes.position, uv = shellGeo.attributes.uv;
  const colors = new Float32Array(position.count * 3);
  const center = new THREE.Vector3(), offset = new THREE.Vector3(), color = new THREE.Color();
  for (let i = 0; i < position.count; i++) {
    const u = uv.getX(i), v = uv.getY(i);
    curve.getPointAt(u, center);
    offset.set(position.getX(i), position.getY(i), position.getZ(i)).sub(center);
    const rib = .975 + .035 * Math.pow(.5 + .5 * Math.cos(u * Math.PI * 100), 3);
    const scab = 1 + .018 * Math.sin(v * 91 + Math.sin(u * 48) * 2);
    const tail = 1 - .88 * THREE.MathUtils.smoothstep(u, .78, 1);
    offset.multiplyScalar((1 - u * .09) * rib * scab * tail).add(center);
    position.setXYZ(i, offset.x, offset.y, offset.z);
    color.setHSL(.095, .19, .36 + .014 * Math.sin(u * Math.PI * 100) + .015 * Math.sin(v * 65 + u * 29), THREE.SRGBColorSpace);
    colors.set([color.r, color.g, color.b], i * 3);
  }
  shellGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  shellGeo.computeVertexNormals();
  worm.add(new THREE.Mesh(shellGeo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, side: THREE.DoubleSide })));

  const throat = new THREE.CylinderGeometry(1.45, .28, 2.7, 40, 8, true);
  throat.rotateZ(-Math.PI / 2); throat.translate(-1.35, 0, 0);
  worm.add(new THREE.Mesh(throat, new THREE.MeshStandardMaterial({ color: '#35291d', roughness: 1, side: THREE.DoubleSide })));
  const dark = new THREE.CircleGeometry(.3, 24); dark.rotateY(Math.PI / 2); dark.translate(-2.65, 0, 0);
  worm.add(new THREE.Mesh(dark, new THREE.MeshStandardMaterial({ color: '#15120c', roughness: 1 })));
  const lipMaterial = new THREE.MeshStandardMaterial({ color: '#887353', roughness: 1 });
  for (let i = 0; i < 3; i++) {
    const lip = new THREE.TorusGeometry(1.45, .075, 8, 32, Math.PI * 2 / 3 - .035);
    lip.rotateZ(i * Math.PI * 2 / 3); lip.rotateY(Math.PI / 2);
    worm.add(new THREE.Mesh(lip, lipMaterial));
  }

  // Bake the teeth into one draw, in body coordinates, so every detail can
  // follow the same surface deformation without separate moving segments.
  const tooth = new THREE.ConeGeometry(.025, .42, 4).toNonIndexed();
  const basePositions = tooth.attributes.position, baseNormals = tooth.attributes.normal;
  const teethPositions = new Float32Array(basePositions.count * 96 * 3);
  const teethNormals = new Float32Array(teethPositions.length);
  const dummy = new THREE.Object3D(), direction = new THREE.Vector3(), point = new THREE.Vector3();
  const normalMatrix = new THREE.Matrix3();
  for (let i = 0; i < 96; i++) {
    const row = Math.floor(i / 48), angle = (i % 48 + row * .5) / 48 * Math.PI * 2;
    const radius = 1.35 - row * .23;
    dummy.position.set(-.06 - row * .38, Math.cos(angle) * radius, Math.sin(angle) * radius);
    direction.set(-.6, -Math.cos(angle), -Math.sin(angle)).normalize();
    dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    dummy.updateMatrix(); normalMatrix.getNormalMatrix(dummy.matrix);
    for (let j = 0; j < basePositions.count; j++) {
      point.fromBufferAttribute(basePositions, j).applyMatrix4(dummy.matrix);
      teethPositions.set([point.x, point.y, point.z], (i * basePositions.count + j) * 3);
      point.fromBufferAttribute(baseNormals, j).applyMatrix3(normalMatrix).normalize();
      teethNormals.set([point.x, point.y, point.z], (i * basePositions.count + j) * 3);
    }
  }
  tooth.dispose();
  const teeth = new THREE.BufferGeometry();
  teeth.setAttribute('position', new THREE.BufferAttribute(teethPositions, 3));
  teeth.setAttribute('normal', new THREE.BufferAttribute(teethNormals, 3));
  worm.add(new THREE.Mesh(teeth, new THREE.MeshStandardMaterial({ color: '#b7a17d', roughness: 1 })));
  return worm;
}
