import {Color} from 'three';

export interface Particles {
  positions: Float32Array;
  colors: Float32Array;
}

export function generateParticles(
  millions: number,
  is2d: boolean = false,
): Particles {
  const n = 1000;
  const n2 = n / 2;
  const color = new Color();
  const count = millions * 1000000;

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const x = Math.random() * n - n2;
    const y = Math.random() * n - n2;
    const z = is2d ? 0 : Math.random() * n - n2;

    const k = i * 3;
    positions[k] = x;
    positions[k + 1] = y;
    positions[k + 2] = z;

    const vx = x / n + 0.5;
    const vy = y / n + 0.5;
    const vz = z / n + 0.5;

    color.setRGB(vx, vy, vz);
    colors[k] = color.r;
    colors[k + 1] = color.g;
    colors[k + 2] = color.b;
  }

  return {
    positions,
    colors,
  };
}
