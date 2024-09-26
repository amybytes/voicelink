import './App.css'
import Sidebar from 'src/components/sidebar/Sidebar/Sidebar';
import { HelmetProvider } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <HelmetProvider>
      <Sidebar />
      <Outlet />
    </HelmetProvider>
  );
};
