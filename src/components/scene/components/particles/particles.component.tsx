import {ThreeEvent, useFrame, useThree} from '@react-three/fiber';
import {useControls} from 'leva';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Points} from 'three';

import {generateParticles} from '../utils/generate-particles.ts';

const defaultMillion = 1;

const {
  positions: initPositions,
  colors: initColors,
} = generateParticles(defaultMillion);

const vertexShader = (size: number) => `
  varying vec3 vColor;
  
  void main() {
    vColor = color;
    gl_PointSize = ${size.toFixed(1)};
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  
  void main() {
     gl_FragColor = vec4(vColor, 1.0);
  }
`;

export function ParticlesComponent() {
  const pointsRef = useRef<Points | null>(null);
  const [positions, setPositions] = useState<number[]>(initPositions);
  const [colors, setColors] = useState<number[]>(initColors);

  const config = useControls({
    millions: {value: defaultMillion, min: 0, max: 3, step: 0.25},
    size: {value: 1, min: 1, max: 10, step: 1},
    is2d: false,
    rotate: false,
    opacity: {value: 1, min: 0, max: 1, step: 0.1},
    shader: {
      options: {
        default: 'default',
        custom: 'custom',
        toon: 'toon',
      },
    },
  });

  useEffect(() => {
    const {
      positions: newPositions,
      colors: newColors,
    } = generateParticles(config.millions, config.is2d);

    setPositions(newPositions);
    setColors(newColors);
  }, [config.millions, config.is2d]);

  const {raycaster} = useThree();

  useEffect(() => {
    raycaster.params.Points.threshold = 0.4;
  }, [raycaster]);

  useFrame(() => {
    if (!config.rotate) {
      return;
    }

    const points = pointsRef.current!;
    points.rotation.x += 0.001;
    points.rotation.y += 0.002;
  });

  const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();

    const i = e.index! * 3;

    setColors(s => {
      const copy = [...s];
      copy[i] = 1;
      copy[i + 1] = 0;
      copy[i + 2] = 0;
      return copy;
    });
  }, []);

  console.log('ParticlesComponent render');

  return (
    <points
      ref={pointsRef}
      onClick={handleClick}
    >
      <bufferGeometry>
        <float32BufferAttribute
          attach={'attributes-position'}
          args={[positions, 3]}
        />
        <float32BufferAttribute
          attach={'attributes-color'}
          args={[colors, 3]}
        />
      </bufferGeometry>

      {config.shader === 'default' &&
        <pointsMaterial
          size={config.size}
          vertexColors
          transparent
          opacity={config.opacity}
        />
      }

      {config.shader === 'custom' &&
        <shaderMaterial
          vertexColors
          vertexShader={vertexShader(config.size)}
          fragmentShader={fragmentShader}
        />
      }

      {config.shader === 'toon' &&
        <meshToonMaterial transparent opacity={config.opacity} vertexColors />
      }
    </points>
  );
}
