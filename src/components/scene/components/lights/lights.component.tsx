import {useControls} from 'leva';
import React from 'react';

export function LightsComponent() {
  const config = useControls({
    lightOn: true,
    lightIntensity: {value: 10, min: 0, max: 100, step: 1},
  });

  return (
    <React.Fragment>
      {config.lightOn &&
        <ambientLight color={'#404040'} intensity={config.lightIntensity} />}
    </React.Fragment>
  );
}
