import {ThreeEvent, useFrame, useThree} from '@react-three/fiber';
import {useControls} from 'leva';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Points} from 'three';

import {generateParticles} from '../../../../utils/generate-particles.ts';

const {
  positions: initPositions,
  colors: initColors,
} = generateParticles(1000000);

export function ParticlesComponent() {
  const pointsRef = useRef<Points | null>(null);
  const [positions, setPositions] = useState<number[]>(initPositions);
  const [colors, setColors] = useState<number[]>(initColors);

  const config = useControls({
    millions: {value: 1, min: 0.1, max: 3, step: 0.1},
    rotate: false,
  });

  useEffect(() => {
    const particles = config.millions * 1000000;

    const {
      positions: newPositions,
      colors: newColors,
    } = generateParticles(
      particles,
    );

    setPositions(newPositions);
    setColors(newColors);
  }, [config.millions]);

  const {raycaster} = useThree();

  useEffect(() => {
    raycaster.params.Points.threshold = 0.5;
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

  console.log('render', colors.length);

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
      <pointsMaterial size={3} vertexColors />
    </points>
  );
}
