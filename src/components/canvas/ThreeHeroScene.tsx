import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeHeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all 3D objects for coordinated rotation
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Outer Geometric Wireframe Icosahedron (Neural Cluster Cage)
    const icoGeometry = new THREE.IcosahedronGeometry(2, 1);
    const icoWireframe = new THREE.WireframeGeometry(icoGeometry);
    const icoMaterial = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
    });
    const icoLines = new THREE.LineSegments(icoWireframe, icoMaterial);
    masterGroup.add(icoLines);

    // 2. Inner Glowing Core (Polyhedron)
    const coreGeometry = new THREE.IcosahedronGeometry(1.2, 0);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x111625,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    masterGroup.add(coreMesh);

    // 3. Floating Neural Particle Cloud
    const particleCount = 220;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      particleScales[i] = Math.random() * 0.04 + 0.02;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    // Create small glowing particle points
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.05,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, pointsMaterial);
    masterGroup.add(particles);

    // 4. Orbital Ring (Orbital Momentum Axis)
    const ringGeometry = new THREE.TorusGeometry(2.6, 0.015, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.45,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 3;
    masterGroup.add(ring);

    const ringGeometry2 = new THREE.TorusGeometry(3.1, 0.01, 16, 100);
    const ringMaterial2 = new THREE.MeshBasicMaterial({
      color: 0x00dfd8,
      transparent: true,
      opacity: 0.25,
    });
    const ring2 = new THREE.Mesh(ringGeometry2, ringMaterial2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    masterGroup.add(ring2);

    // Mouse tracking with smooth lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.5;
      targetY = y * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Coordinate rotations
      masterGroup.rotation.y = elapsedTime * 0.15 + mouseX;
      masterGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.15 + mouseY;

      icoLines.rotation.y = -elapsedTime * 0.08;
      icoLines.rotation.z = Math.cos(elapsedTime * 0.05) * 0.1;

      ring.rotation.z = elapsedTime * 0.2;
      ring2.rotation.z = -elapsedTime * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      // Clean disposal
      icoGeometry.dispose();
      icoMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particleGeometry.dispose();
      pointsMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ringGeometry2.dispose();
      ringMaterial2.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="three-hero-container"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    />
  );
}
