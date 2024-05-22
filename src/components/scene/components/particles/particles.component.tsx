import {ThreeEvent, useFrame, useThree} from '@react-three/fiber';
import {useControls} from 'leva';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import * as THREE from 'three';
import {Points} from 'three';

import {
  DEFAULT_MILLIONS,
  DEFAULT_OPACITY,
  DEFAULT_SIZE,
} from '../../../../constants.ts';
import {generateParticles} from '../utils/generate-particles.ts';
import fragmentShader from './fragment.shader.glsl';
import vertexShader from './vertex.shader.glsl';

const {positions: initPositions, colors: initColors} =
  generateParticles(DEFAULT_MILLIONS);

const materialOptions = {
  default: 'default',
  customShader: 'custom shader',
};

export function ParticlesComponent() {
  const pointsRef = useRef<Points | null>(null);
  const [positions, setPositions] = useState<Float32Array>(initPositions);
  const [colors, setColors] = useState<Float32Array>(initColors);

  const config = useControls({
    millions: {value: DEFAULT_MILLIONS, min: 0, max: 3, step: 0.25},
    size: {value: DEFAULT_SIZE, min: 1, max: 10, step: 1},
    is2d: false,
    rotate: false,
    opacity: {value: DEFAULT_OPACITY, min: 0, max: 1, step: 0.05},
    material: {
      options: materialOptions,
    },
  });

  useEffect(() => {
    const {positions: newPositions, colors: newColors} = generateParticles(
      config.millions,
      config.is2d,
    );

    setPositions(newPositions);
    setColors(newColors);
  }, [config.millions, config.is2d]);

  const {raycaster, camera, size} = useThree();

  // https://threejs.org/examples/#webgl_interactive_raycasting_points
  useEffect(() => {
    raycaster.params.Points.threshold = 0.15 * config.size;
  }, [raycaster, config.size, config.material]);

  useFrame(() => {
    if (!config.rotate) {
      return;
    }

    const points = pointsRef.current!;
    points.rotation.x += 0.001;
    points.rotation.y += 0.002;
  });

  const projectToScreen = useCallback(
    (i: number) => {
      const vector = new THREE.Vector3(
        positions[i],
        positions[i + 1],
        positions[i + 2],
      );
      vector.project(camera);
      vector.x = Math.round(((vector.x + 1) * size.width) / 2);
      vector.y = Math.round(((-vector.y + 1) * size.height) / 2);
      vector.z = 0;

      console.log('Projected screen coordinates', vector.x, vector.y);
    },
    [positions, camera, size],
  );

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();

      const i = e.index! * 3;
      projectToScreen(i);

      setColors((oldColors) => {
        const newColors = Float32Array.from(oldColors);
        newColors[i] = 1;
        newColors[i + 1] = 0;
        newColors[i + 2] = 0;
        return newColors;
      });
    },
    [projectToScreen],
  );

  const uniforms = useMemo(() => {
    return {
      uSize: {
        value: config.size,
      },
      uOpacity: {
        value: config.opacity,
      },
      uScale: {
        value: window.innerHeight / 2,
      },
    };
  }, [config.size, config.opacity]);

  // to trigger re-render on uniforms update
  const materialKey = JSON.stringify(uniforms);

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

      {config.material === materialOptions.default && (
        <pointsMaterial
          size={config.size}
          vertexColors
          transparent
          opacity={config.opacity}
        />
      )}

      {config.material === materialOptions.customShader && (
        <shaderMaterial
          key={materialKey}
          vertexColors
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
        />
      )}
    </points>
  );
}
