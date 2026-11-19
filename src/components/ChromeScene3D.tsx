import { Float } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { CameraMode, LightingPreset } from '../context/FirebaseContext';
import {
  createBeveledBladeGeometry,
  createBeveledHexCoreGeometry,
  createBrushedMetalTexture,
  createConduitCurve,
  createContactShadowTexture,
  createOrbitalArcGeometry,
  createSteppedPedestalGeometry,
} from '../three/proceduralCraft';
import { detectSoftwareWebGL } from '../utils/webgl';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';

interface ChromeScene3DProps {
  scrollProgressRef: React.MutableRefObject<number>;
  lightingPreset?: LightingPreset;
  cameraMode?: CameraMode;
}

// Module-scope scratch math helpers (Zero GC allocations in useFrame)
const _lookAtTarget = new THREE.Vector3();
const _packetPos = new THREE.Vector3();
const _rimColorTarget = new THREE.Color();

const RIM_COLORS: Record<LightingPreset, string> = {
  cyan: '#00D9FF',
  tungsten: '#F59E0B',
  chrome: '#E2E8F0',
};

function generateJKTargets(count: number): Float32Array {
  const targets = new Float32Array(count * 3);
  const segments: [number, number, number, number][] = [
    [-2.4, 1.55, -0.9, 1.55],
    [-1.4, 1.55, -1.4, -0.9],
    [-1.4, -0.9, -2.0, -1.5],
    [-2.0, -1.5, -2.6, -0.9],
    [0.35, 1.55, 0.35, -1.5],
    [0.35, 0.0, 2.05, 1.55],
    [0.35, 0.0, 2.15, -1.5],
    [2.65, -1.35, 2.85, -1.35],
  ];

  for (let i = 0; i < count; i++) {
    const seg = segments[i % segments.length];
    const t = (i * 0.61803398875) % 1;
    const jx = Math.sin(i * 12.9898) * 0.06;
    const jy = Math.cos(i * 78.233) * 0.06;
    const jz = Math.sin(i * 41.17) * 0.07;
    targets[i * 3] = THREE.MathUtils.lerp(seg[0], seg[2], t) + jx;
    targets[i * 3 + 1] = THREE.MathUtils.lerp(seg[1], seg[3], t) + jy;
    targets[i * 3 + 2] = jz;
  }
  return targets;
}

function ObsidianChromeRig({
  scrollProgressRef,
  isMobile,
  isSoftwareGl,
  lightingPresetRef,
  cameraModeRef,
}: {
  scrollProgressRef: React.MutableRefObject<number>;
  isMobile: boolean;
  isSoftwareGl: boolean;
  lightingPresetRef: React.MutableRefObject<LightingPreset>;
  cameraModeRef: React.MutableRefObject<CameraMode>;
}) {
  const { camera, gl, scene } = useThree();
  const pointerRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const introZoomRef = useRef(0);
  const lastFovRef = useRef(46);

  // Light refs for smooth color-temperature transitions without remounting
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const heroGroupRef = useRef<THREE.Group>(null);
  const heroSculptureRef = useRef<THREE.Group>(null);
  const liquidTimeRef = useRef({ value: 0 });

  const aboutGroupRef = useRef<THREE.Group>(null);
  const projAlumniRef = useRef<THREE.Group>(null);
  const projStudentRef = useRef<THREE.Group>(null);
  const projRoutineRef = useRef<THREE.Group>(null);
  const projTrafficTeRef = useRef<THREE.Group>(null);
  const srPacketRefs = useRef<(THREE.Mesh | null)[]>([]);
  const expGroupRef = useRef<THREE.Group>(null);
  const skillsInstRef = useRef<THREE.InstancedMesh>(null);
  const achGroupRef = useRef<THREE.Group>(null);
  const particleGeoRef = useRef<THREE.BufferGeometry>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Mandatory Studio Environment Reflection via RoomEnvironment + PMREMGenerator
  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    const roomEnv = new RoomEnvironment();
    const renderTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = renderTarget.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    return () => {
      scene.environment = null;
      renderTarget.dispose();
    };
  }, [gl, scene]);

  // Procedural CanvasTextures & Custom Extrude/Lathe/Tube Geometries
  const {
    brushedBumpMap,
    contactShadowMap,
    pedestalGeo,
    hexCoreGeo,
    bladeGeo,
    routineBarGeo,
    orbitalArcGeo,
  } = useMemo(() => {
    const maxAniso = gl.capabilities.getMaxAnisotropy();
    return {
      brushedBumpMap: createBrushedMetalTexture(maxAniso),
      contactShadowMap: createContactShadowTexture(),
      pedestalGeo: createSteppedPedestalGeometry(),
      hexCoreGeo: createBeveledHexCoreGeometry(0.75, 0.92, 0.09),
      bladeGeo: createBeveledBladeGeometry(1.75, 2.35, 0.14),
      routineBarGeo: createBeveledBladeGeometry(0.46, 1.48, 0.24),
      orbitalArcGeo: createOrbitalArcGeometry(2.15, 0.1, Math.PI * 1.45, 0.045),
    };
  }, [gl]);

  useEffect(() => {
    return () => {
      brushedBumpMap.dispose();
      contactShadowMap.dispose();
      pedestalGeo.dispose();
      hexCoreGeo.dispose();
      bladeGeo.dispose();
      routineBarGeo.dispose();
      orbitalArcGeo.dispose();
    };
  }, [
    brushedBumpMap,
    contactShadowMap,
    pedestalGeo,
    hexCoreGeo,
    bladeGeo,
    routineBarGeo,
    orbitalArcGeo,
  ]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerRef.current.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerRef.current.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  // Liquid Chrome PBR Material with vertex ripple via onBeforeCompile & brushed micro-bump
  const liquidChromeMat = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#e2e8f0'),
      metalness: 0.98,
      roughness: 0.06,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      anisotropy: 0.75,
      bumpMap: brushedBumpMap,
      bumpScale: 0.008,
      envMapIntensity: 1.55,
    });
    const uTime = liquidTimeRef.current;
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uTime;
      shader.vertexShader = `uniform float uTime;\n` + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
          #include <begin_vertex>
          float ripple = sin(position.x * 2.2 + uTime * 1.4) * cos(position.y * 2.0 - uTime * 1.1) * 0.075;
          transformed += normal * ripple;
        `
      );
    };
    return mat;
  }, [brushedBumpMap]);

  useEffect(() => {
    return () => {
      liquidChromeMat.dispose();
    };
  }, [liquidChromeMat]);

  // Volumetric Overhead Spotlight Cone
  const volumetricShader = useMemo(
    () => ({
      uniforms: {
        uColor: { value: new THREE.Color('#00D9FF') },
        uOpacity: { value: 0.09 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        varying vec2 vUv;
        void main() {
          float fade = smoothstep(0.0, 0.85, vUv.y) * (1.0 - smoothstep(0.75, 1.0, vUv.y));
          float edge = sin(vUv.x * 3.14159);
          gl_FragColor = vec4(uColor, fade * edge * uOpacity);
        }
      `,
    }),
    []
  );

  // Act 3D: Segment Routing Multi-Router Topology Nodes & Curved TubeGeometry Conduits
  const teNodes = useMemo<[number, number, number][]>(
    () => [
      [-2.1, 0.0, 0.5],
      [-0.7, 1.1, -0.3],
      [0.8, 1.1, 0.4],
      [-0.7, -1.0, 0.4],
      [0.8, -1.0, -0.3],
      [2.2, 0.0, 0.2],
    ],
    []
  );

  const teLinks = useMemo(
    () => [
      [0, 1],
      [0, 3],
      [1, 2],
      [3, 4],
      [1, 4],
      [2, 5],
      [4, 5],
    ],
    []
  );

  const { srConduit, backupConduits } = useMemo(() => {
    const primary = createConduitCurve([
      teNodes[0],
      [-1.4, -0.65, 0.55],
      teNodes[3],
      [0.05, -1.15, 0.15],
      teNodes[4],
      [1.55, -0.55, -0.05],
      teNodes[5],
    ]);

    const backups = teLinks
      .filter(
        ([a, b]) => !((a === 0 && b === 3) || (a === 3 && b === 4) || (a === 4 && b === 5))
      )
      .map(([a, b]) => {
        const mid: [number, number, number] = [
          (teNodes[a][0] + teNodes[b][0]) * 0.5,
          (teNodes[a][1] + teNodes[b][1]) * 0.5 + 0.16,
          (teNodes[a][2] + teNodes[b][2]) * 0.5,
        ];
        return createConduitCurve([teNodes[a], mid, teNodes[b]], 0.022);
      });

    return { srConduit: primary, backupConduits: backups };
  }, [teNodes, teLinks]);

  useEffect(() => {
    return () => {
      srConduit.geometry.dispose();
      backupConduits.forEach((c) => c.geometry.dispose());
    };
  }, [srConduit, backupConduits]);

  // Act 5 Skills Polyhedra Matrix
  const skillCount = isMobile ? 18 : 30;
  const skillSeeds = useMemo(
    () =>
      Array.from({ length: skillCount }, (_, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        return {
          x: (col - 3) * 1.9 + Math.sin(i * 1.7) * 0.3,
          y: (row - 1.5) * 1.65 + Math.cos(i * 2.1) * 0.25,
          z: -93 - (i % 4) * 2.2,
          scale: 0.42 + ((i * 0.37) % 1) * 0.36,
          phase: i * 0.65,
        };
      }),
    [skillCount]
  );

  useEffect(() => {
    if (!skillsInstRef.current) return;
    const cSilver = new THREE.Color('#cbd5e1');
    const cGraphite = new THREE.Color('#1e2430');
    const cCyan = new THREE.Color('#00D9FF');
    for (let i = 0; i < skillCount; i++) {
      skillsInstRef.current.setColorAt(
        i,
        i % 5 === 0 ? cCyan : i % 2 === 0 ? cSilver : cGraphite
      );
    }
    if (skillsInstRef.current.instanceColor) {
      skillsInstRef.current.instanceColor.needsUpdate = true;
    }
    skillsInstRef.current.computeBoundingSphere();
  }, [skillCount]);

  // Act 7: Converging Chrome Particles -> JK.
  const particleCount = isMobile ? 240 : 480;
  const { pPositions, pBase, pColors, pTargets } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const base = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const tgt = generateJKTargets(particleCount);
    const cSilver = new THREE.Color('#e2e8f0');
    const cSteel = new THREE.Color('#94a3b8');
    const cCyan = new THREE.Color('#00D9FF');

    for (let i = 0; i < particleCount; i++) {
      const x = (((i * 0.731) % 1) - 0.5) * 30;
      const y = (((i * 0.419) % 1) - 0.5) * 18;
      const z = -(((i * 0.917) % 1) * 134) + 8;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;
      const c = i % 6 === 0 ? cCyan : i % 2 === 0 ? cSilver : cSteel;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { pPositions: pos, pBase: base, pColors: col, pTargets: tgt };
  }, [particleCount]);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const elapsed = state.clock.getElapsedTime();
    const scrollP = scrollProgressRef.current;
    const preset = lightingPresetRef.current;
    const camMode = cameraModeRef.current;

    liquidTimeRef.current.value = elapsed;

    // Smoothly transition Rim Light & Volumetric Beam color temperature
    _rimColorTarget.set(RIM_COLORS[preset]);
    if (rimLightRef.current) {
      rimLightRef.current.color.lerp(_rimColorTarget, 1 - Math.exp(-5 * delta));
    }
    volumetricShader.uniforms.uColor.value.lerp(_rimColorTarget, 1 - Math.exp(-5 * delta));

    const p = pointerRef.current;
    const ptrAlpha = 1 - Math.exp(-4.5 * delta);
    p.x = THREE.MathUtils.lerp(p.x, p.tx, ptrAlpha);
    p.y = THREE.MathUtils.lerp(p.y, p.ty, ptrAlpha);

    introZoomRef.current = THREE.MathUtils.damp(introZoomRef.current, 1, 2.2, delta);
    const introOffsetZ = (1 - introZoomRef.current) * -4.5;

    const baseCamZ = 8 + introOffsetZ - scrollP * 124;
    let targetCamX = p.x * 0.8 + Math.sin(scrollP * Math.PI * 3.2) * 1.15;
    let targetCamY = 0.6 + p.y * 0.5 + Math.cos(scrollP * Math.PI * 2.4) * 0.35;
    let targetCamZ = baseCamZ;

    if (camMode === 'orbit') {
      targetCamX = Math.sin(elapsed * 0.45) * 3.8 + p.x * 0.6;
      targetCamY = 0.85 + Math.sin(elapsed * 0.3) * 0.45 + p.y * 0.4;
      targetCamZ = baseCamZ + Math.cos(elapsed * 0.45) * 1.8 - 1.2;
    } else if (camMode === 'hero') {
      targetCamX = p.x * 1.35;
      targetCamY = 0.45 + p.y * 0.85;
      targetCamZ = baseCamZ - 1.65;
    }

    const camAlpha = 1 - Math.exp(-5.0 * delta);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, camAlpha);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, camAlpha);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, camAlpha);

    _lookAtTarget.set(
      camMode === 'orbit' ? Math.sin(scrollP * Math.PI * 2) * 0.2 : Math.sin(scrollP * Math.PI * 2) * 0.35,
      0.22,
      baseCamZ - 13.5
    );
    camera.lookAt(_lookAtTarget);

    const targetFov = (camMode === 'hero' ? 40 : 46) + Math.sin(scrollP * Math.PI * 6) * 1.4;
    const perspCam = camera as THREE.PerspectiveCamera;
    const nextFov = THREE.MathUtils.damp(perspCam.fov, targetFov, 4, delta);
    if (Math.abs(nextFov - lastFovRef.current) > 0.05) {
      perspCam.fov = nextFov;
      perspCam.updateProjectionMatrix();
      lastFovRef.current = nextFov;
    }

    // Act 1: Liquid Chrome Sculpture (pedestal remains grounded, sculpture orbits)
    if (heroSculptureRef.current) {
      heroSculptureRef.current.rotation.y = elapsed * 0.18 + scrollP * 5.5 + p.x * 0.24;
      heroSculptureRef.current.rotation.x = Math.sin(elapsed * 0.3) * 0.1 + p.y * 0.14;
    }

    // Act 2: About Floating Metallic Architecture
    if (aboutGroupRef.current) {
      aboutGroupRef.current.rotation.y = -elapsed * 0.2 + scrollP * 6.5;
      aboutGroupRef.current.rotation.z = Math.sin(scrollP * Math.PI * 4) * 0.25;
    }

    // Act 3A: Alumni Management System
    if (projAlumniRef.current) {
      projAlumniRef.current.rotation.y = elapsed * 0.18 + scrollP * 2.8 + p.x * 0.2;
      projAlumniRef.current.rotation.x = 0.18 + p.y * 0.14;
    }

    // Act 3B: Student Module — 42-Table Relational Hex Core
    if (projStudentRef.current) {
      projStudentRef.current.rotation.y = -elapsed * 0.16 + scrollP * 2.5 + p.x * 0.18;
      projStudentRef.current.rotation.z = Math.sin(elapsed * 0.4) * 0.08;
    }

    // Act 3C: AetherRoutine — Study Timeline Towers & AI Core
    if (projRoutineRef.current) {
      projRoutineRef.current.rotation.y = elapsed * 0.2 + scrollP * 2.6 + p.x * 0.18;
      projRoutineRef.current.children.forEach((child, idx) => {
        if (idx >= 2 && idx <= 6) {
          child.position.y = Math.sin(elapsed * 1.4 + idx * 0.75) * 0.28 + (idx - 4) * 0.24;
        }
      });
    }

    // Act 3D: Predictive Traffic Engineering — SR Curved Tube Conduit & Packets
    if (projTrafficTeRef.current) {
      projTrafficTeRef.current.rotation.y = -0.22 + Math.sin(elapsed * 0.35) * 0.22 + p.x * 0.22;
      projTrafficTeRef.current.rotation.x = p.y * 0.14;
    }
    srPacketRefs.current.forEach((packet, idx) => {
      if (!packet) return;
      const t = (elapsed * 0.32 + idx * 0.33) % 1;
      srConduit.curve.getPointAt(t, _packetPos);
      packet.position.copy(_packetPos);
    });

    // Act 4: Experience Connected Metallic Truss
    if (expGroupRef.current) {
      expGroupRef.current.children.forEach((node, idx) => {
        node.rotation.z = idx * 0.14 + scrollP * 3.8 + p.x * 0.12;
      });
    }

    // Act 5: Skills Metallic Matrix
    if (skillsInstRef.current) {
      for (let i = 0; i < skillCount; i++) {
        const s = skillSeeds[i];
        dummy.position.set(
          s.x + Math.sin(elapsed * 0.6 + s.phase) * 0.16,
          s.y + Math.cos(elapsed * 0.7 + s.phase) * 0.18,
          s.z
        );
        dummy.rotation.set(
          elapsed * 0.32 + s.phase + p.y * 0.35,
          elapsed * 0.42 + scrollP * 5.2 + p.x * 0.35,
          0
        );
        dummy.scale.setScalar(s.scale);
        dummy.updateMatrix();
        skillsInstRef.current.setMatrixAt(i, dummy.matrix);
      }
      skillsInstRef.current.instanceMatrix.needsUpdate = true;
    }

    // Act 6: Achievements Chrome Steles
    if (achGroupRef.current) {
      achGroupRef.current.rotation.y = Math.sin(elapsed * 0.3) * 0.16 + p.x * 0.16;
    }

    // Act 7: Chrome Particles Converge into JK. Identity at z = -128
    if (particleGeoRef.current) {
      const posAttr = particleGeoRef.current.attributes.position as THREE.BufferAttribute;
      const converge = THREE.MathUtils.smoothstep(scrollP, 0.85, 0.99);
      for (let i = 0; i < particleCount; i++) {
        const bx = pBase[i * 3];
        const by = pBase[i * 3 + 1] + Math.sin(elapsed * 0.7 + i) * 0.12;
        const bz = pBase[i * 3 + 2];

        const tx = pTargets[i * 3];
        const ty = pTargets[i * 3 + 1] + 0.5;
        const tz = pTargets[i * 3 + 2] - 128;

        posAttr.setXYZ(
          i,
          THREE.MathUtils.lerp(bx, tx, converge),
          THREE.MathUtils.lerp(by, ty, converge),
          THREE.MathUtils.lerp(bz, tz, converge)
        );
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <>
      <color attach="background" args={['#080A0E']} />
      <fogExp2 attach="fog" args={['#080A0E', 0.024]} />

      {/* Balanced Warm/Cool Studio Rig (Key Light + Hemisphere Fill + Rim Light) */}
      <hemisphereLight args={[0xcbd5e1, 0x080a0e, 0.72]} />
      <directionalLight
        position={[8, 12, 10]}
        intensity={2.35}
        color="#FFF3E0"
        castShadow={!isSoftwareGl}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0005}
        shadow-normalBias={0.02}
      />
      <directionalLight ref={rimLightRef} position={[-10, 4, 2]} intensity={1.9} color="#00D9FF" />

      {/* Subtle Overhead Volumetric Light Beam */}
      <mesh position={[1.2, 4.5, -5]} rotation={[0, 0, 0.28]}>
        <coneGeometry args={[4.4, 18, 24, 1, true]} />
        <shaderMaterial
          args={[volumetricShader]}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ACT 1: LIQUID CHROME HERO COMPOSITE GROUP (z = -4, Lathe pedestal + Radial Contact Shadow) */}
      <group ref={heroGroupRef} position={[0.45, -2.5, -4]}>
        {/* Grounded Lathe Pedestal (y = 0 bottom pivot) */}
        <mesh geometry={pedestalGeo} receiveShadow={!isSoftwareGl} castShadow={!isSoftwareGl}>
          <meshStandardMaterial
            color="#11151d"
            metalness={0.55}
            roughness={0.48}
            bumpMap={brushedBumpMap}
            bumpScale={0.01}
          />
        </mesh>

        {/* Radial Soft Contact Shadow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <planeGeometry args={[6.2, 6.2]} />
          <meshBasicMaterial
            map={contactShadowMap}
            transparent
            opacity={0.48}
            depthWrite={false}
          />
        </mesh>

        {/* Floating Composite Sculpture: Liquid TorusKnot + Beveled Trim Ring + Orbital Tube Arc */}
        <group ref={heroSculptureRef} position={[0, 2.75, 0]}>
          <Float speed={1.5} floatIntensity={0.25}>
            <mesh material={liquidChromeMat} castShadow={!isSoftwareGl}>
              <torusKnotGeometry args={[1.4, 0.34, 160, 28, 2, 3]} />
            </mesh>
            <mesh geometry={orbitalArcGeo}>
              <meshStandardMaterial
                color="#00D9FF"
                emissive="#00D9FF"
                emissiveIntensity={0.45}
                metalness={0.78}
                roughness={0.18}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.55, 0]}>
              <torusGeometry args={[1.62, 0.055, 16, 64]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.92} roughness={0.14} />
            </mesh>
          </Float>
        </group>
      </group>

      {/* ACT 2: ABOUT COMPOSITE FLOATING METALLIC ELEMENTS (z = -18) */}
      <group ref={aboutGroupRef} position={[-2.5, 0.3, -18]}>
        <mesh position={[-1.2, 0.8, 0]}>
          <torusGeometry args={[1.5, 0.09, 20, 72]} />
          <meshPhysicalMaterial
            color="#e2e8f0"
            metalness={0.96}
            roughness={0.08}
            clearcoat={0.9}
            bumpMap={brushedBumpMap}
            bumpScale={0.008}
          />
        </mesh>
        <mesh geometry={bladeGeo} position={[1.5, -0.4, 0.8]} rotation={[0.4, 0.6, 0]}>
          <meshStandardMaterial color="#11151d" metalness={0.65} roughness={0.42} />
        </mesh>
        <mesh position={[0.3, 1.4, -0.5]}>
          <sphereGeometry args={[0.52, 28, 28]} />
          <meshStandardMaterial color="#00D9FF" metalness={0.75} roughness={0.14} />
        </mesh>
        <mesh geometry={orbitalArcGeo} scale={0.72} rotation={[0.6, 0.4, 0]}>
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.18} />
        </mesh>
      </group>

      {/* ACT 3A: PROJECT 01 — ALUMNI MANAGEMENT SYSTEM (DB Drums + Tube Conduit + Beveled Plates, z = -28) */}
      <group ref={projAlumniRef} position={[3.0, 0.1, -28]}>
        {[-0.85, 0, 0.85].map((y, idx) => (
          <group key={idx} position={[0, y, 0]}>
            <mesh>
              <cylinderGeometry args={[1.2, 1.2, 0.3, 36]} />
              <meshStandardMaterial
                color={idx === 1 ? '#00D9FF' : '#cbd5e1'}
                metalness={idx === 1 ? 0.82 : 0.95}
                roughness={idx === 1 ? 0.16 : 0.1}
                bumpMap={brushedBumpMap}
                bumpScale={0.006}
              />
            </mesh>
            <mesh position={[0, 0.17, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.18, 0.03, 12, 48]} />
              <meshStandardMaterial color="#181e29" metalness={0.55} roughness={0.44} />
            </mesh>
          </group>
        ))}
        <mesh geometry={bladeGeo} scale={[0.64, 0.64, 0.64]} position={[-1.7, 0.4, 0.9]} rotation={[0.2, 0.5, 0]}>
          <meshStandardMaterial color="#141822" metalness={0.62} roughness={0.42} />
        </mesh>
        <mesh geometry={bladeGeo} scale={[0.64, 0.64, 0.64]} position={[1.7, -0.35, -0.7]} rotation={[-0.2, -0.4, 0]}>
          <meshStandardMaterial color="#e2e8f0" metalness={0.96} roughness={0.08} />
        </mesh>
      </group>

      {/* ACT 3B: PROJECT 02 — STUDENT MODULE (Beveled Hex Core + Relational Halo + Satellite Nodes, z = -39) */}
      <group ref={projStudentRef} position={[-3.0, 0.2, -39]}>
        <mesh>
          <torusGeometry args={[1.72, 0.075, 16, 64]} />
          <meshStandardMaterial color="#00D9FF" metalness={0.82} roughness={0.14} />
        </mesh>
        <mesh geometry={hexCoreGeo}>
          <meshPhysicalMaterial
            color="#cbd5e1"
            metalness={0.96}
            roughness={0.09}
            clearcoat={0.8}
            bumpMap={brushedBumpMap}
            bumpScale={0.008}
          />
        </mesh>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <group key={i} position={[Math.cos(angle) * 2.05, Math.sin(angle) * 2.05, (i % 2) * 0.45]}>
              <mesh>
                <boxGeometry args={[0.62, 0.48, 0.36]} />
                <meshStandardMaterial
                  color={i % 2 === 0 ? '#181e29' : '#94a3b8'}
                  metalness={i % 2 === 0 ? 0.55 : 0.92}
                  roughness={i % 2 === 0 ? 0.45 : 0.14}
                />
              </mesh>
              <mesh position={[0, 0, 0.2]}>
                <boxGeometry args={[0.42, 0.08, 0.04]} />
                <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={0.6} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* ACT 3C: PROJECT 03 — AETHERROUTINE (Octahedral AI Core + Beveled Timeline Towers, z = -50) */}
      <group ref={projRoutineRef} position={[2.9, 0.1, -50]}>
        <mesh position={[0, 1.55, 0]}>
          <octahedronGeometry args={[0.72, 0]} />
          <meshPhysicalMaterial color="#00D9FF" metalness={0.78} roughness={0.1} clearcoat={1.0} />
        </mesh>
        <mesh position={[0, 1.55, 0]} rotation={[0.5, 0.3, 0]}>
          <torusGeometry args={[1.05, 0.035, 14, 48]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.94} roughness={0.12} />
        </mesh>
        {[-1.5, -0.75, 0, 0.75, 1.5].map((x, idx) => (
          <mesh
            key={idx}
            geometry={routineBarGeo}
            position={[x, (idx - 2) * 0.26, (idx % 2) * 0.48]}
          >
            <meshStandardMaterial
              color={idx === 2 ? '#00D9FF' : idx % 2 === 0 ? '#e2e8f0' : '#181d27'}
              metalness={idx % 2 === 0 ? 0.94 : 0.55}
              roughness={idx % 2 === 0 ? 0.12 : 0.46}
            />
          </mesh>
        ))}
      </group>

      {/* ACT 3D: PROJECT 04 — PREDICTIVE TRAFFIC ENGINEERING (Composite FRR Routers + TubeGeometry Conduits, z = -61) */}
      <group ref={projTrafficTeRef} position={[-2.4, 0.2, -61]}>
        {teNodes.map((pos, idx) => (
          <group key={idx} position={pos}>
            {/* Matte Graphite Router Chassis */}
            <mesh>
              <cylinderGeometry args={[0.38, 0.42, 0.22, 24]} />
              <meshStandardMaterial color="#181e29" metalness={0.58} roughness={0.46} />
            </mesh>
            {/* Polished Chrome Top Plate */}
            <mesh position={[0, 0.13, 0]}>
              <cylinderGeometry args={[0.32, 0.34, 0.05, 24]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.96} roughness={0.08} />
            </mesh>
            {/* Cyan SR Collar */}
            <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.41, 0.025, 10, 32]} />
              <meshStandardMaterial
                color={idx === 0 || idx === 3 || idx === 4 || idx === 5 ? '#00D9FF' : '#64748b'}
                emissive={idx === 0 || idx === 5 ? '#00D9FF' : '#000000'}
                emissiveIntensity={0.55}
                metalness={0.8}
                roughness={0.18}
              />
            </mesh>
          </group>
        ))}

        {/* Primary Segment Routing Curved TubeGeometry Path */}
        <mesh geometry={srConduit.geometry}>
          <meshStandardMaterial
            color="#00D9FF"
            emissive="#00D9FF"
            emissiveIntensity={0.6}
            metalness={0.85}
            roughness={0.16}
          />
        </mesh>

        {/* Backup / Secondary Topology Conduits */}
        {backupConduits.map((conduit, idx) => (
          <mesh key={idx} geometry={conduit.geometry}>
            <meshStandardMaterial color="#475569" metalness={0.65} roughness={0.42} />
          </mesh>
        ))}

        {/* Animated Segment Routing Packets */}
        {[0, 1, 2].map((pIdx) => (
          <mesh
            key={pIdx}
            ref={(el) => {
              srPacketRefs.current[pIdx] = el;
            }}
          >
            <sphereGeometry args={[0.13, 14, 14]} />
            <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={1.2} />
          </mesh>
        ))}
      </group>

      {/* ACT 4: EXPERIENCE CONNECTED METALLIC STRUCTURES (z = -70 to -85) */}
      <group ref={expGroupRef}>
        {Array.from({ length: 8 }, (_, idx) => (
          <group
            key={idx}
            position={[Math.sin(idx * 0.7) * 3.1, (idx - 3.5) * 0.42, -70 - idx * 2.1]}
          >
            <mesh>
              <boxGeometry args={[3.5, 0.14, 0.35]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#cbd5e1' : '#181c26'}
                metalness={idx % 2 === 0 ? 0.94 : 0.56}
                roughness={idx % 2 === 0 ? 0.14 : 0.44}
              />
            </mesh>
            <mesh position={[1.75, 0, 0]}>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={0.85} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ACT 5: SKILLS METALLIC UNIVERSE (z = -92 to -102) */}
      <instancedMesh
        ref={skillsInstRef}
        args={[undefined, undefined, skillCount]}
        frustumCulled={false}
      >
        <octahedronGeometry args={[0.62, 0]} />
        <meshStandardMaterial metalness={0.92} roughness={0.14} />
      </instancedMesh>

      {/* ACT 6: ACHIEVEMENTS MONUMENTAL CHROME STELES (z = -108) */}
      <group ref={achGroupRef} position={[-2.6, -0.5, -108]}>
        <mesh position={[-1.4, 0.4, 0]}>
          <boxGeometry args={[0.95, 2.9, 0.95]} />
          <meshStandardMaterial
            color="#cbd5e1"
            metalness={0.96}
            roughness={0.08}
            bumpMap={brushedBumpMap}
            bumpScale={0.008}
          />
        </mesh>
        <mesh position={[0.1, -0.1, 0.5]}>
          <boxGeometry args={[0.95, 2.0, 0.95]} />
          <meshStandardMaterial color="#00D9FF" metalness={0.78} roughness={0.16} />
        </mesh>
        <mesh position={[1.6, 0.8, -0.3]}>
          <boxGeometry args={[0.95, 3.6, 0.95]} />
          <meshStandardMaterial color="#141822" metalness={0.58} roughness={0.44} />
        </mesh>
      </group>

      {/* ACT 7: CHROME PARTICLES CONVERGING INTO JK. AT CONTACT FINALE */}
      <points>
        <bufferGeometry ref={particleGeoRef}>
          <bufferAttribute attach="attributes-position" args={[pPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[pColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>
    </>
  );
}

export function ChromeScene3D({
  scrollProgressRef,
  lightingPreset = 'cyan',
  cameraMode = 'scroll',
}: ChromeScene3DProps) {
  const [isSoftwareGl] = useState(() => detectSoftwareWebGL());
  const [isMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [reducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  // Store lightingPreset and cameraMode in refs so UI changes never remount Canvas
  const lightingPresetRef = useRef<LightingPreset>(lightingPreset);
  const cameraModeRef = useRef<CameraMode>(cameraMode);
  useEffect(() => {
    lightingPresetRef.current = lightingPreset;
  }, [lightingPreset]);
  useEffect(() => {
    cameraModeRef.current = cameraMode;
  }, [cameraMode]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none opacity-40 sm:opacity-55 lg:opacity-100 transition-opacity duration-300"
    >
      <WebGLErrorBoundary
        fallback={<div aria-hidden="true" className="w-full h-full bg-[#080A0E]" />}
      >
        <Canvas
          shadows={!isSoftwareGl}
          dpr={isSoftwareGl ? 1 : [1, isMobile ? 1.25 : 1.5]}
          camera={{ fov: 46, near: 0.1, far: 165, position: [0, 0.6, 8] }}
          gl={{
            antialias: !isSoftwareGl,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.08,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          frameloop={reducedMotion ? 'demand' : 'always'}
          onCreated={({ gl, scene, camera }) => {
            gl.shadowMap.enabled = !isSoftwareGl;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
            gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault());
            if (!isSoftwareGl) {
              gl.compile(scene, camera);
            }
          }}
        >
          <ObsidianChromeRig
            scrollProgressRef={scrollProgressRef}
            isMobile={isMobile}
            isSoftwareGl={isSoftwareGl}
            lightingPresetRef={lightingPresetRef}
            cameraModeRef={cameraModeRef}
          />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
