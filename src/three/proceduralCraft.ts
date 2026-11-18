import * as THREE from 'three';

/**
 * Generates a tileable brushed-metal linear roughness/bump CanvasTexture
 * in linear space (NoColorSpace) with anisotropic sharpness.
 */
export function createBrushedMetalTexture(maxAnisotropy = 4): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y++) {
      const v = 104 + Math.floor(((Math.sin(y * 1.93) + 1) * 0.5) * 48);
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(0, y, 256, 1);
      // subtle micro-scratches
      if (y % 7 === 0) {
        const xStart = (y * 37) % 180;
        ctx.fillStyle = 'rgba(220,220,220,0.18)';
        ctx.fillRect(xStart, y, 68, 1);
      }
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.NoColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 2);
  tex.anisotropy = Math.min(8, Math.max(1, maxAnisotropy));
  tex.needsUpdate = true;
  return tex;
}

/**
 * Generates a soft radial contact-shadow CanvasTexture (SRGBColorSpace)
 * so grounded composite sculptures sit flush without floating.
 */
export function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 124);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
    grad.addColorStop(0.55, 'rgba(0, 0, 0, 0.35)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Stepped obsidian-chrome plinth profile via LatheGeometry (grounded at y = 0).
 */
export function createSteppedPedestalGeometry(): THREE.LatheGeometry {
  const pts = [
    new THREE.Vector2(0.01, 0.0),
    new THREE.Vector2(2.45, 0.0),
    new THREE.Vector2(2.45, 0.1),
    new THREE.Vector2(2.22, 0.16),
    new THREE.Vector2(2.15, 0.28),
    new THREE.Vector2(1.86, 0.32),
    new THREE.Vector2(1.8, 0.4),
    new THREE.Vector2(0.01, 0.4),
  ];
  const geo = new THREE.LatheGeometry(pts, 48);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Beveled hexagonal core geometry via ExtrudeGeometry for database/routing assemblies.
 */
export function createBeveledHexCoreGeometry(
  radius = 0.72,
  depth = 0.9,
  bevelSize = 0.08
): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize,
    bevelThickness: bevelSize,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
}

/**
 * Beveled architectural fin / monolith plate via ExtrudeGeometry.
 */
export function createBeveledBladeGeometry(
  width = 1.6,
  height = 2.2,
  depth = 0.12
): THREE.ExtrudeGeometry {
  const hw = width / 2;
  const hh = height / 2;
  const chamfer = Math.min(hw, hh) * 0.18;

  const shape = new THREE.Shape();
  shape.moveTo(-hw + chamfer, -hh);
  shape.lineTo(hw, -hh);
  shape.lineTo(hw, hh - chamfer);
  shape.lineTo(hw - chamfer, hh);
  shape.lineTo(-hw, hh);
  shape.lineTo(-hw, -hh + chamfer);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
}

/**
 * Smooth orbital conduit curve via TubeGeometry.
 */
export function createOrbitalArcGeometry(
  radius = 2.25,
  arcStart = 0,
  arcEnd = Math.PI * 1.35,
  tubeRadius = 0.045
): THREE.TubeGeometry {
  const points: THREE.Vector3[] = [];
  const steps = 28;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = THREE.MathUtils.lerp(arcStart, arcEnd, t);
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle * 2) * 0.38,
        Math.sin(angle) * radius
      )
    );
  }
  const curve = new THREE.CatmullRomCurve3(points);
  const geo = new THREE.TubeGeometry(curve, 56, tubeRadius, 12, false);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Curved Segment Routing conduit between router nodes via TubeGeometry.
 */
export function createConduitCurve(
  points: [number, number, number][],
  tubeRadius = 0.045
): { curve: THREE.CatmullRomCurve3; geometry: THREE.TubeGeometry } {
  const vecs = points.map(([x, y, z]) => new THREE.Vector3(x, y, z));
  const curve = new THREE.CatmullRomCurve3(vecs);
  const geometry = new THREE.TubeGeometry(curve, 48, tubeRadius, 12, false);
  geometry.computeVertexNormals();
  return { curve, geometry };
}
