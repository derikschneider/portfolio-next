"use client";

import { useCallback, useEffect, useRef } from "react";
import { hexToRgb, hsbToHex, type HSB } from "@/lib/color";

const SIZE = 140;
const RADIUS = SIZE / 2;

/** Canvas hue/saturation wheel. Brightness is fixed input, not editable here
 * — pair with HSBFields for the brightness slider and numeric entry. */
export function ColorWheel({
  value,
  onChange,
}: {
  value: HSB;
  onChange: (partial: Pick<HSB, "h" | "s">) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draggingRef = useRef(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const image = ctx.createImageData(SIZE, SIZE);
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        const dx = x - RADIUS;
        const dy = y - RADIUS;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const idx = (y * SIZE + x) * 4;
        if (dist <= RADIUS) {
          const angle = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;
          const sat = Math.min(1, dist / RADIUS) * 100;
          const [r, g, b] = hexToRgb(hsbToHex({ h: angle, s: sat, b: value.b }));
          image.data[idx] = r;
          image.data[idx + 1] = g;
          image.data[idx + 2] = b;
          image.data[idx + 3] = 255;
        }
      }
    }
    ctx.putImageData(image, 0, 0);
  }, [value.b]);

  useEffect(() => {
    draw();
  }, [draw]);

  const pickAt = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left - RADIUS;
      const y = clientY - rect.top - RADIUS;
      const dist = Math.min(RADIUS, Math.sqrt(x * x + y * y));
      const angle = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
      onChange({ h: angle, s: (dist / RADIUS) * 100 });
    },
    [onChange]
  );

  const markerX = RADIUS + (value.s / 100) * RADIUS * Math.cos((value.h * Math.PI) / 180);
  const markerY = RADIUS + (value.s / 100) * RADIUS * Math.sin((value.h * Math.PI) / 180);

  return (
    <div className="relative" style={{ width: SIZE, height: SIZE }}>
      <canvas
        ref={canvasRef}
        width={SIZE}
        height={SIZE}
        className="cursor-crosshair rounded-full"
        onPointerDown={(e) => {
          draggingRef.current = true;
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          pickAt(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (draggingRef.current) pickAt(e.clientX, e.clientY);
        }}
        onPointerUp={() => {
          draggingRef.current = false;
        }}
      />
      <div
        className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
        style={{ left: markerX, top: markerY }}
      />
    </div>
  );
}
