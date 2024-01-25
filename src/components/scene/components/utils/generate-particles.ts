import {Color} from 'three';

export interface Particles {
  positions: number[];
  colors: number[];
}

export function generateParticles(
  millions: number,
  is2d: boolean = false,
): Particles {
  const n = 1000;
  const n2 = n / 2;
  const color = new Color();

  const positions = [];
  const colors = [];

  for (let i = 0; i < millions * 1000000; i += 1) {
    const x = Math.random() * n - n2;
    const y = Math.random() * n - n2;

    let z: number;
    if (is2d) {
      z = 0;
    } else {
      z = Math.random() * n - n2;
    }

    positions.push(x, y, z);

    const vx = x / n + 0.5;
    const vy = y / n + 0.5;
    const vz = z / n + 0.5;

    color.setRGB(vx, vy, vz);
    colors.push(color.r, color.g, color.b);
  }

  return {
    positions,
    colors,
  };
}
