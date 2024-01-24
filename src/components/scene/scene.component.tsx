import {CameraControls} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';
import {Perf} from 'r3f-perf';

import {LightsComponent} from './components/lights/lights.component.tsx';
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
        far: 5000,
      }}
      gl={{antialias: false}}
    >
      <Perf position={'top-left'} />
      <color attach={'background'} args={['#050505']} />
      <LightsComponent />
      <ParticlesComponent />
      <CameraControls />
    </Canvas>
  </div>;
}
