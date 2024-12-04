import './App.css';
import MicStatus from 'components/MicStatus/MicStatus';
import Sidebar from 'components/sidebar/Sidebar/Sidebar';
import SettingsContextProvider from 'contexts/SettingsContext';
import MicContextProvider from 'contexts/MicContext';
import {HelmetProvider} from 'react-helmet-async';
import {Outlet} from 'react-router-dom';

export default function App() {
  return (
    <HelmetProvider>
      <SettingsContextProvider>
        <MicContextProvider>
          <MicStatus />
          <Sidebar />
          <Outlet />
        </MicContextProvider>
      </SettingsContextProvider>
    </HelmetProvider>
  );
}
