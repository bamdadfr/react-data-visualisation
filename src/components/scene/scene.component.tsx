import {CameraControls} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';

import {
  ParticlesComponent,
} from './components/particles/particles.component.tsx';
import styles from './scene.module.scss';

export function SceneComponent() {
  return <div className={styles.container}>
    <Canvas
      camera={{
        position: [0, 0, -2750],
        isPerspectiveCamera: true,
        fov: 27,
        aspect: 2,
        near: 5,
        far: 35000,
      }}
      gl={{antialias: false}}
    >
      <color attach={'background'} args={['#050505']} />
      <ParticlesComponent />
      <CameraControls />
    </Canvas>
  </div>;
}
