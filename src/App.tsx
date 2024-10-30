import './App.css'
import MicStatus from 'components/MicStatus/MicStatus';
import Sidebar from 'components/sidebar/Sidebar/Sidebar';
import MicContextProvider from 'contexts/MicContext';
import { HelmetProvider } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <HelmetProvider>
      <MicContextProvider>
        <MicStatus />
        <Sidebar />
        <Outlet />
      </MicContextProvider>
    </HelmetProvider>
  );
};
