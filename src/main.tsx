import './index.css';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from 'src/App.tsx';
import PitchMonitor from 'routes/PitchMonitor/PitchMonitor';
import Recordings from 'routes/Recordings/Recordings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <PitchMonitor />,
      },
      {
        path: 'pitch',
        element: <PitchMonitor />,
      },
      {
        path: 'recordings',
        element: <Recordings />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
