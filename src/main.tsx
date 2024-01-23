import 'sass-reset';

import React from 'react';
import ReactDOM from 'react-dom/client';

import {SceneComponent} from './components/scene/scene.component.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SceneComponent />
  </React.StrictMode>,
);
