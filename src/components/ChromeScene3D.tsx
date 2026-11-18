import { Environment, Float, Lightformer } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { detectSoftwareWebGL } from '../utils/webgl';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';

interface ChromeScene3DProps {
  scrollProgressRef: React.MutableRefObject<number>;
}

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
}: ChromeScene3DProps & { isMobile: boolean }) {
  const { camera } = useThree();
  const pointerRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const introZoomRef = useRef(0);
  const lastFovRef = useRef(46);

  // Act 1: Liquid Chrome Hero Sculpture
  const heroChromeRef = useRef<THREE.Group>(null);
  const liquidTimeRef = useRef({ value: 0 });

  // Act 2: About Floating Metallic Blades
  const aboutGroupRef = useRef<THREE.Group>(null);

  // Act 3: 4 Distinct Project Environments
  const projAlumniRef = useRef<THREE.Group>(null);
  const projStudentRef = useRef<THREE.Group>(null);
  const projRoutineRef = useRef<THREE.Group>(null);
  const projTrafficTeRef = useRef<THREE.Group>(null);
  const srPacketRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Act 4: Experience Connected Metallic Truss
  const expGroupRef = useRef<THREE.Group>(null);

  // Act 5: Skills Metallic Universe
  const skillsInstRef = useRef<THREE.InstancedMesh>(null);

  // Act 6: Achievements Chrome Steles
  const achGroupRef = useRef<THREE.Group>(null);

  // Act 7: Converging Chrome Particles -> JK.
  const particleGeoRef = useRef<THREE.BufferGeometry>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerRef.current.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerRef.current.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  // Liquid Chrome PBR Material with subtle organic vertex ripple via onBeforeCompile
  const liquidChromeMat = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#e2e8f0'),
      metalness: 0.98,
      roughness: 0.06,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.7,
    });
    const uTime = liquidTimeRef.current;
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uTime;
      shader.vertexShader = `uniform float uTime;\n` + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
          #include <begin_vertex>
          float ripple = sin(position.x * 2.2 + uTime * 1.4) * cos(position.y * 2.0 - uTime * 1.1) * 0.08;
          transformed += normal * ripple;
        `
      );
    };
    return mat;
  }, []);

  // Volumetric Cyan Overhead Spotlight Cone
  const volumetricShader = useMemo(
    () => ({
      uniforms: {
        uColor: { value: new THREE.Color('#00D9FF') },
        uOpacity: { value: 0.1 },
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

  // Act 3D: Segment Routing Multi-Router Topology Nodes & Moving Packet Paths
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

  const tePathCurves = useMemo(() => {
    const a = teNodes[0];
    const b = teNodes[3];
    const c = teNodes[4];
    const d = teNodes[5];
    return [
      [new THREE.Vector3(...a), new THREE.Vector3(...b)],
      [new THREE.Vector3(...b), new THREE.Vector3(...c)],
      [new THREE.Vector3(...c), new THREE.Vector3(...d)],
    ];
  }, [teNodes]);

  // Act 5 Skills Polyhedra Matrix
  const skillCount = isMobile ? 16 : 28;
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

    liquidTimeRef.current.value = elapsed;

    const p = pointerRef.current;
    p.x = THREE.MathUtils.damp(p.x, p.tx, 4.5, delta);
    p.y = THREE.MathUtils.damp(p.y, p.ty, 4.5, delta);

    // Dramatic initial camera sweep from close-up to hero composition
    introZoomRef.current = THREE.MathUtils.damp(introZoomRef.current, 1, 2.2, delta);
    const introOffsetZ = (1 - introZoomRef.current) * -4.5;

    const targetCamZ = 8 + introOffsetZ - scrollP * 124;
    const targetCamX = p.x * 0.8 + Math.sin(scrollP * Math.PI * 3.2) * 1.15;
    const targetCamY = 0.6 + p.y * 0.5 + Math.cos(scrollP * Math.PI * 2.4) * 0.35;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 4.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 4.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 5.0, delta);
    camera.lookAt(Math.sin(scrollP * Math.PI * 2) * 0.35, 0.25, targetCamZ - 14);

    const targetFov = 46 + Math.sin(scrollP * Math.PI * 6) * 1.5;
    const perspCam = camera as THREE.PerspectiveCamera;
    const nextFov = THREE.MathUtils.damp(perspCam.fov, targetFov, 4, delta);
    if (Math.abs(nextFov - lastFovRef.current) > 0.05) {
      perspCam.fov = nextFov;
      perspCam.updateProjectionMatrix();
      lastFovRef.current = nextFov;
    }

    // Act 1: Liquid Chrome Sculpture
    if (heroChromeRef.current) {
      heroChromeRef.current.rotation.y = elapsed * 0.18 + scrollP * 5.5 + p.x * 0.22;
      heroChromeRef.current.rotation.x = Math.sin(elapsed * 0.3) * 0.12 + p.y * 0.14;
    }

    // Act 2: About Floating Metallic Architecture
    if (aboutGroupRef.current) {
      aboutGroupRef.current.rotation.y = -elapsed * 0.2 + scrollP * 6.5;
      aboutGroupRef.current.rotation.z = Math.sin(scrollP * Math.PI * 4) * 0.25;
    }

    // Act 3A: Alumni Management System — Floating DB Drums & Connected Profile Plates
    if (projAlumniRef.current) {
      projAlumniRef.current.rotation.y = elapsed * 0.18 + scrollP * 2.8 + p.x * 0.2;
      projAlumniRef.current.rotation.x = 0.18 + p.y * 0.14;
    }

    // Act 3B: Student Module — 42-Table Relational Database Lattice
    if (projStudentRef.current) {
      projStudentRef.current.rotation.y = -elapsed * 0.16 + scrollP * 2.5 + p.x * 0.18;
      projStudentRef.current.rotation.z = Math.sin(elapsed * 0.4) * 0.08;
    }

    // Act 3C: AetherRoutine — Study Timeline Blocks & Gemini AI Spatial Core
    if (projRoutineRef.current) {
      projRoutineRef.current.rotation.y = elapsed * 0.2 + scrollP * 2.6 + p.x * 0.18;
      projRoutineRef.current.children.forEach((child, idx) => {
        if (idx > 0 && idx <= 5) {
          child.position.y = Math.sin(elapsed * 1.4 + idx * 0.75) * 0.35 + (idx - 3) * 0.36;
        }
      });
    }

    // Act 3D: Predictive Traffic Engineering — Segment Routing Network Topology & Packets
    if (projTrafficTeRef.current) {
      projTrafficTeRef.current.rotation.y = -0.25 + Math.sin(elapsed * 0.35) * 0.22 + p.x * 0.22;
      projTrafficTeRef.current.rotation.x = p.y * 0.15;
    }
    srPacketRefs.current.forEach((packet, idx) => {
      if (!packet) return;
      const segIdx = idx % tePathCurves.length;
      const [start, end] = tePathCurves[segIdx];
      const t = (elapsed * 0.55 + idx * 0.33) % 1;
      packet.position.lerpVectors(start, end, t);
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
      achGroupRef.current.rotation.y = Math.sin(elapsed * 0.3) * 0.18 + p.x * 0.18;
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

      {/* High-Contrast Chrome Studio Reflections */}
      <Environment resolution={64}>
        <Lightformer form="rect" intensity={3.2} color="#FFFFFF" position={[6, 8, 6]} scale={[12, 4, 1]} />
        <Lightformer form="rect" intensity={2.6} color="#00D9FF" position={[-7, 3, 4]} scale={[8, 3, 1]} />
        <Lightformer form="ring" intensity={1.8} color="#94A3B8" position={[0, -5, 2]} scale={8} />
      </Environment>

      <hemisphereLight args={[0xcbd5e1, 0x080a0e, 0.7]} />
      <directionalLight position={[8, 12, 10]} intensity={2.4} color="#ffffff" />
      <directionalLight position={[-10, 4, 2]} intensity={1.8} color="#00D9FF" />

      {/* Subtle Overhead Cyan Volumetric Light Beam */}
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

      {/* ACT 1: LIQUID CHROME HERO SCULPTURE (z = -4) */}
      <group ref={heroChromeRef} position={[0.45, 0.25, -4]}>
        <Float speed={1.5} floatIntensity={0.28}>
          <mesh material={liquidChromeMat}>
            <torusKnotGeometry args={[1.45, 0.36, 160, 28, 2, 3]} />
          </mesh>
        </Float>
        <mesh position={[0, -2.5, 0]}>
          <cylinderGeometry args={[2.1, 2.35, 0.24, 48]} />
          <meshStandardMaterial color="#11151d" metalness={0.82} roughness={0.28} />
        </mesh>
      </group>

      {/* ACT 2: ABOUT FLOATING METALLIC ELEMENTS (z = -18) */}
      <group ref={aboutGroupRef} position={[-2.5, 0.3, -18]}>
        <mesh position={[-1.2, 0.8, 0]}>
          <torusGeometry args={[1.5, 0.09, 20, 72]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.96} roughness={0.08} />
        </mesh>
        <mesh position={[1.5, -0.4, 0.8]} rotation={[0.4, 0.6, 0]}>
          <boxGeometry args={[1.8, 2.4, 0.14]} />
          <meshStandardMaterial color="#11151d" metalness={0.85} roughness={0.22} />
        </mesh>
        <mesh position={[0.3, 1.4, -0.5]}>
          <sphereGeometry args={[0.52, 28, 28]} />
          <meshStandardMaterial color="#00D9FF" metalness={0.75} roughness={0.14} />
        </mesh>
      </group>

      {/* ACT 3A: PROJECT 01 — ALUMNI MANAGEMENT SYSTEM (Floating DB Drums & Profile Plates, z = -28) */}
      <group ref={projAlumniRef} position={[3.0, 0.1, -28]}>
        {[-0.85, 0, 0.85].map((y, idx) => (
          <mesh key={idx} position={[0, y, 0]}>
            <cylinderGeometry args={[1.2, 1.2, 0.34, 36]} />
            <meshStandardMaterial
              color={idx === 1 ? '#00D9FF' : '#cbd5e1'}
              metalness={0.94}
              roughness={0.12}
            />
          </mesh>
        ))}
        <mesh position={[-1.7, 0.4, 0.9]} rotation={[0.2, 0.5, 0]}>
          <boxGeometry args={[1.1, 1.5, 0.08]} />
          <meshStandardMaterial color="#141822" metalness={0.85} roughness={0.22} />
        </mesh>
        <mesh position={[1.7, -0.35, -0.7]} rotation={[-0.2, -0.4, 0]}>
          <boxGeometry args={[1.1, 1.5, 0.08]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.96} roughness={0.08} />
        </mesh>
      </group>

      {/* ACT 3B: PROJECT 02 — STUDENT MODULE (Interconnected Relational Database Cluster, z = -39) */}
      <group ref={projStudentRef} position={[-3.0, 0.2, -39]}>
        <mesh>
          <torusGeometry args={[1.65, 0.08, 16, 64]} />
          <meshStandardMaterial color="#00D9FF" metalness={0.82} roughness={0.14} />
        </mesh>
        <mesh>
          <boxGeometry args={[1.1, 1.1, 1.1]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
        </mesh>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * 2.0, Math.sin(angle) * 2.0, (i % 2) * 0.45]}>
              <boxGeometry args={[0.62, 0.48, 0.38]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? '#181e29' : '#94a3b8'}
                metalness={0.88}
                roughness={0.18}
              />
            </mesh>
          );
        })}
      </group>

      {/* ACT 3C: PROJECT 03 — AETHERROUTINE (Study Timeline Bars & AI Gemini Core, z = -50) */}
      <group ref={projRoutineRef} position={[2.9, 0.1, -50]}>
        <mesh position={[0, 1.45, 0]}>
          <octahedronGeometry args={[0.72, 0]} />
          <meshStandardMaterial color="#00D9FF" metalness={0.78} roughness={0.12} />
        </mesh>
        {[-1.5, -0.75, 0, 0.75, 1.5].map((x, idx) => (
          <mesh key={idx} position={[x, (idx - 2) * 0.3, (idx % 2) * 0.5]}>
            <boxGeometry args={[0.45, 1.5, 0.26]} />
            <meshStandardMaterial
              color={idx === 2 ? '#00D9FF' : idx % 2 === 0 ? '#e2e8f0' : '#181d27'}
              metalness={0.92}
              roughness={0.14}
            />
          </mesh>
        ))}
      </group>

      {/* ACT 3D: PROJECT 04 — PREDICTIVE TRAFFIC ENGINEERING (3D Multi-Router SR Topology & Packets, z = -61) */}
      <group ref={projTrafficTeRef} position={[-2.4, 0.2, -61]}>
        {teNodes.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <cylinderGeometry args={[0.36, 0.36, 0.26, 24]} />
            <meshStandardMaterial
              color={idx === 1 || idx === 2 ? '#181e29' : '#cbd5e1'}
              metalness={0.94}
              roughness={0.12}
            />
          </mesh>
        ))}
        {teLinks.map(([aIdx, bIdx], idx) => {
          const a = new THREE.Vector3(...teNodes[aIdx]);
          const b = new THREE.Vector3(...teNodes[bIdx]);
          const mid = a.clone().add(b).multiplyScalar(0.5);
          const dist = a.distanceTo(b);
          const dir = b.clone().sub(a).normalize();
          const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
          const isSrPath =
            (aIdx === 0 && bIdx === 3) || (aIdx === 3 && bIdx === 4) || (aIdx === 4 && bIdx === 5);
          return (
            <mesh key={idx} position={mid} quaternion={quat}>
              <cylinderGeometry args={[isSrPath ? 0.045 : 0.025, isSrPath ? 0.045 : 0.025, dist, 8]} />
              <meshStandardMaterial
                color={isSrPath ? '#00D9FF' : '#475569'}
                emissive={isSrPath ? '#00D9FF' : '#000000'}
                emissiveIntensity={isSrPath ? 0.65 : 0}
                metalness={0.85}
                roughness={0.2}
              />
            </mesh>
          );
        })}
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
                metalness={0.92}
                roughness={0.16}
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
          <meshStandardMaterial color="#cbd5e1" metalness={0.96} roughness={0.08} />
        </mesh>
        <mesh position={[0.1, -0.1, 0.5]}>
          <boxGeometry args={[0.95, 2.0, 0.95]} />
          <meshStandardMaterial color="#00D9FF" metalness={0.78} roughness={0.16} />
        </mesh>
        <mesh position={[1.6, 0.8, -0.3]}>
          <boxGeometry args={[0.95, 3.6, 0.95]} />
          <meshStandardMaterial color="#141822" metalness={0.86} roughness={0.22} />
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

export function ChromeScene3D({ scrollProgressRef }: ChromeScene3DProps) {
  const [isSoftwareGl] = useState(() => detectSoftwareWebGL());
  const [isMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [reducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none">
      <WebGLErrorBoundary
        fallback={<div aria-hidden="true" className="w-full h-full bg-[#080A0E]" />}
      >
        <Canvas
          dpr={isSoftwareGl ? 1 : [1, isMobile ? 1.25 : 1.5]}
          camera={{ fov: 46, near: 0.1, far: 165, position: [0, 0.6, 8] }}
          gl={{
            antialias: !isSoftwareGl,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.08,
          }}
          frameloop={reducedMotion ? 'demand' : 'always'}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault());
          }}
        >
          <ObsidianChromeRig scrollProgressRef={scrollProgressRef} isMobile={isMobile} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
