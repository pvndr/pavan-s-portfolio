import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface InteractivePortraitProps {
  imageSrc?: string;
  name?: string;
  role?: string;
  status?: string;
}

export function InteractivePortrait({
  imageSrc = '/hero.png',
  name = 'Pavan D R',
  role = 'AI Software Engineer',
  status = 'SYSTEM.ONLINE',
}: InteractivePortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    let mesh: THREE.Mesh | null = null;
    let material: THREE.ShaderMaterial | null = null;

    // Uniforms
    const uniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0.0 },
      uTime: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uImageResolution: { value: new THREE.Vector2(1, 1) },
    };

    // Shaders
    const vertexShader = `
      varying vec2 vUv;
      uniform vec2 uMouse;
      uniform float uHover;
      uniform float uTime;

      void main() {
        vUv = uv;
        vec3 pos = position;
        
        // Dynamic ripple vertex displacement based on mouse hover
        float dist = distance(uv, uMouse);
        float wave = sin(dist * 18.0 - uTime * 3.0) * exp(-dist * 3.5);
        pos.z += wave * 0.12 * uHover;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform vec2 uMouse;
      uniform float uHover;
      uniform float uTime;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        float dist = distance(uv, uMouse);

        // Chromatic aberration offset
        vec2 dir = normalize(uv - uMouse);
        float strength = sin(dist * 12.0 - uTime * 2.5) * 0.02 * uHover;
        
        float r = texture2D(uTexture, uv + dir * strength * 1.5).r;
        float g = texture2D(uTexture, uv).g;
        float b = texture2D(uTexture, uv - dir * strength * 1.5).b;
        vec4 color = vec4(r, g, b, 1.0);

        // Desaturated / subtle cyberpunk tint when resting
        float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        vec3 monochrome = vec3(luminance);
        
        // Subtle cyber tint (cyan shadows, neutral highlights)
        vec3 tinted = mix(monochrome * vec3(0.85, 0.95, 1.05), color.rgb, 0.35);

        // Smooth transition to full vivid color on hover
        vec3 finalColor = mix(tinted, color.rgb, clamp(uHover * 1.2, 0.0, 1.0));

        // Subtle edge vignette
        float vignette = smoothstep(0.75, 0.45, distance(uv, vec2(0.5)));
        finalColor = mix(finalColor * 0.85, finalColor, vignette);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    textureLoader.load(
      imageSrc,
      (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        uniforms.uTexture.value = texture;
        uniforms.uImageResolution.value.set(
          texture.image.width,
          texture.image.height
        );

        // Create Plane
        // Compute plane aspect ratio to fit inside viewport
        const aspect = width / height;
        const planeGeo = new THREE.PlaneGeometry(2.1 * aspect, 2.1, 48, 48);

        material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms,
          transparent: true,
        });

        mesh = new THREE.Mesh(planeGeo, material);
        scene.add(mesh);
        setIsLoaded(true);
      },
      undefined,
      () => {
        setLoadError(true);
      }
    );

    // Mouse and Hover Interactions
    let currentHover = 0;
    let targetHover = 0;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let currentMouseX = 0.5;
    let currentMouseY = 0.5;
    let targetRotX = 0;
    let targetRotY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height; // WebGL UV is inverted on Y

      targetMouseX = x;
      targetMouseY = y;

      // 3D Tilt calculation
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = normX * 0.35;
      targetRotX = -normY * 0.35;
    };

    const handleMouseEnter = () => {
      targetHover = 1.0;
    };

    const handleMouseLeave = () => {
      targetHover = 0.0;
      targetRotX = 0;
      targetRotY = 0;
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Lerp hover and mouse
      currentHover += (targetHover - currentHover) * 0.08;
      currentMouseX += (targetMouseX - currentMouseX) * 0.1;
      currentMouseY += (targetMouseY - currentMouseY) * 0.1;

      uniforms.uHover.value = currentHover;
      uniforms.uMouse.value.set(currentMouseX, currentMouseY);
      uniforms.uTime.value = elapsedTime;

      if (mesh) {
        mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.08;
        mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      if (mesh) {
        mesh.geometry.dispose();
      }
      if (material) {
        material.dispose();
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [imageSrc]);

  return (
    <div className="portrait-wrapper">
      <div className="portrait-frame">
        {/* HUD Top Meta Bar */}
        <div className="portrait-hud-header">
          <span className="hud-badge">
            <span className="hud-dot" /> {status}
          </span>
          <span className="hud-coords">12.9716° N, 77.5946° E</span>
        </div>

        {/* Three.js WebGL Container */}
        <div
          ref={containerRef}
          className="portrait-canvas-box"
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '4 / 5',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: 'rgba(10, 14, 23, 0.8)',
            cursor: 'crosshair',
          }}
        >
          {/* Fallback image if WebGL fails or loading */}
          {(!isLoaded || loadError) && (
            <img
              src={imageSrc}
              alt={name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '16px',
                display: 'block',
              }}
            />
          )}

          {/* Holographic grid lines & corner crosshairs overlay */}
          <div className="portrait-overlay-grid" />
          <div className="portrait-corner top-left" />
          <div className="portrait-corner top-right" />
          <div className="portrait-corner bottom-left" />
          <div className="portrait-corner bottom-right" />
        </div>

        {/* HUD Bottom Info Bar */}
        <div className="portrait-hud-footer">
          <div>
            <div className="portrait-name">{name}</div>
            <div className="portrait-role">{role}</div>
          </div>
          <div className="portrait-interactive-hint">
            <span>[GLSL SHADER ACTIVE]</span>
            <small>HOVER TO DISTORT</small>
          </div>
        </div>
      </div>
    </div>
  );
}
