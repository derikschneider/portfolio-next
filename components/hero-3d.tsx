"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/components/reveal/reveal-engine";

const SIZE = 420;

// Reads the browser-resolved value of a CSS color token (handles hwb(),
// var() chains, color-mix, etc. — anything getComputedStyle can settle on a
// real `color` property) so the scene never hardcodes a color the design
// tokens already own. `color` (not a custom property) is what actually gets
// resolved to rgb() by the engine; reading the custom property directly
// would return the raw unresolved token text.
function readCssColor(varName: string): string {
  const probe = document.createElement("span");
  probe.style.color = `var(${varName})`;
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  document.body.removeChild(probe);
  return resolved;
}

/**
 * 420px hero mount for a WebGL wireframe object (nested icosahedron +
 * octahedron cages, counter-rotating, gold on the page background).
 *
 * Never blocks first paint: `three` is dynamically imported only once this
 * effect confirms the `lg` breakpoint. Below `lg`, or with
 * `prefers-reduced-motion: reduce`, nothing loads at all — the column
 * collapses (matching the "no Spline on mobile" rule this replaces).
 */
export function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    if (prefersReducedMotion()) return;

    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let frameId = 0;
    let disposeScene: (() => void) | undefined;

    import("three").then((THREE) => {
      if (disposed) return;

      const gold = new THREE.Color(readCssColor("--primary"));

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      renderer.setSize(SIZE, SIZE);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.set(0, 0, 5);

      const outerGeometry = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.6, 1));
      const outerMaterial = new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0.9 });
      const outer = new THREE.LineSegments(outerGeometry, outerMaterial);

      const innerGeometry = new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.85, 0));
      const innerMaterial = new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0.45 });
      const inner = new THREE.LineSegments(innerGeometry, innerMaterial);

      const nodesGeometry = new THREE.IcosahedronGeometry(1.6, 0);
      const nodesMaterial = new THREE.PointsMaterial({ color: gold, size: 0.05, transparent: true, opacity: 0.8 });
      const nodes = new THREE.Points(nodesGeometry, nodesMaterial);

      const group = new THREE.Group();
      group.add(outer, inner, nodes);
      group.rotation.set(0.5, 0.6, 0);
      inner.rotation.set(0.3, 0, 0.4);
      scene.add(group);

      const pointer = { x: 0, y: 0 };
      const target = { x: 0, y: 0 };
      const onPointerMove = (e: PointerEvent) => {
        const rect = mount.getBoundingClientRect();
        target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };
      window.addEventListener("pointermove", onPointerMove);

      const clock = new THREE.Clock();
      const animate = () => {
        const dt = clock.getDelta();
        pointer.x += (target.x - pointer.x) * 0.04;
        pointer.y += (target.y - pointer.y) * 0.04;

        group.rotation.y += dt * 0.18;
        group.rotation.x = 0.5 + pointer.y * 0.18;
        group.rotation.z = pointer.x * 0.08;
        inner.rotation.y -= dt * 0.32;
        inner.rotation.x += dt * 0.1;

        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      frameId = requestAnimationFrame(animate);

      const cleanup = () => {
        window.removeEventListener("pointermove", onPointerMove);
        cancelAnimationFrame(frameId);
        mount.removeChild(renderer.domElement);
        outerGeometry.dispose();
        outerMaterial.dispose();
        innerGeometry.dispose();
        innerMaterial.dispose();
        nodesGeometry.dispose();
        nodesMaterial.dispose();
        renderer.dispose();
      };

      disposeScene = cleanup;
    });

    return () => {
      disposed = true;
      disposeScene?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="hidden lg:block"
      style={{ width: SIZE, height: SIZE }}
    />
  );
}
