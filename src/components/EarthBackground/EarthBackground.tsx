import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./EarthBackground.css";

interface EarthBackgroundProps {
  /** Y 軸 1 周にかかる秒数 (デフォルト 50 秒) */
  rotationPeriodSec?: number;
}

const EARTH_AXIAL_TILT_DEG = 23.5;
const EARTH_AXIAL_TILT_RAD = (EARTH_AXIAL_TILT_DEG * Math.PI) / 180;

const EarthBackground: React.FC<EarthBackgroundProps> = ({
  rotationPeriodSec = 50,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(35, width / Math.max(height, 1), 0.1, 100);
    camera.position.set(0, 0, 3.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(`${import.meta.env.BASE_URL}textures/earth-daymap.jpg`);
    earthTexture.colorSpace = THREE.SRGBColorSpace;
    earthTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.85,
      metalness: 0.05,
    });
    const earth = new THREE.Mesh(geometry, material);
    earth.rotation.z = EARTH_AXIAL_TILT_RAD;
    scene.add(earth);

    const ambient = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(5, 2, 4);
    scene.add(sun);

    const rim = new THREE.DirectionalLight(0x88aaff, 0.4);
    rim.position.set(-3, -1, -2);
    scene.add(rim);

    let rafId = 0;
    let lastTs = performance.now();
    const angularVelocity = reducedMotion ? 0 : (Math.PI * 2) / (rotationPeriodSec * 1000);

    const tick = (ts: number) => {
      rafId = requestAnimationFrame(tick);
      const delta = ts - lastTs;
      lastTs = ts;
      earth.rotation.y += angularVelocity * delta;
      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(tick);

    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      earthTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [rotationPeriodSec]);

  return <div ref={containerRef} className="earth-background" aria-hidden="true" />;
};

export default EarthBackground;
