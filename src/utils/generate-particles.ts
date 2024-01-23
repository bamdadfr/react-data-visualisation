import {Color} from 'three';

export interface Particles {
  positions: number[];
  colors: number[];
}

export function generateParticles(particles: number): Particles {
  const n = 1000;
  const n2 = n / 2;
  const color = new Color();

  const positions = [];
  const colors = [];

  for (let i = 0; i < particles; i += 1) {
    const x = Math.random() * n - n2;
    const y = Math.random() * n - n2;
    const z = Math.random() * n - n2;

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
