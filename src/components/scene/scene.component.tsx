import {CameraControls} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';
import {Perf} from 'r3f-perf';

import {ParticlesComponent} from './components/particles/particles.component.tsx';
import styles from './scene.module.scss';

export function SceneComponent() {
  return (
    <div className={styles.container}>
      <Canvas
        camera={{
          position: [0, 0, -2750],
          isPerspectiveCamera: true,
          fov: 27,
          aspect: 2,
          near: 1,
          far: 8000,
        }}
        gl={{antialias: false}}
      >
        <Perf position={'top-left'} />
        <CameraControls />

        <color
          attach={'background'}
          args={['#050505']}
        />
        <ParticlesComponent />
      </Canvas>
    </div>
  );
}
