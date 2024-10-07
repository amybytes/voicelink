import './App.css'
import MicStatus from 'components/MicStatus/MicStatus';
import Sidebar from 'components/sidebar/Sidebar/Sidebar';
import MicStatusContextProvider from 'contexts/MicStatusContext';
import { HelmetProvider } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <HelmetProvider>
      <MicStatusContextProvider>
        <MicStatus />
        <Sidebar />
        <Outlet />
      </MicStatusContextProvider>
    </HelmetProvider>
  );
};
