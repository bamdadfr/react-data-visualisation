import {CameraControls} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';

import {
  ParticlesComponent,
} from './components/particles/particles.component.tsx';
import styles from './scene.module.scss';

const width = 1000;
const height = 500;
const position = 2750;

export function SceneComponent() {
  return <div className={styles.container}>
    <Canvas
      camera={{
        position: [0, 0, position],
        isPerspectiveCamera: true,
        fov: 27,
        aspect: width / height,
        near: 5,
        far: 35000,
      }}
    >
      <color attach={'background'} args={['#050505']} />
      <ParticlesComponent />
      <CameraControls />
    </Canvas>
  </div>;
}
