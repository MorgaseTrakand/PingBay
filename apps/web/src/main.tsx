//import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import { Toaster } from "sonner";

//pages
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Auth/Login/Login';
import SignupPage from './pages/Auth/Signup/Signup';

import DashboardSwitchBoard from './pages/DashboardPage/DashboardSwitchBoard';
import Dashboard from './pages/DashboardPage/Dashboard/Dashboard';
import Settings from './pages/DashboardPage/Settings/Settings';
import Analytics from './pages/DashboardPage/Analytics/Analytics';

import { authLoader } from './utils/authLoader';

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { 
    path: "/dashboard", 
    element: <DashboardSwitchBoard />,
    loader: authLoader,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'settings', element: <Settings /> },
      { path: 'analytics', element: <Analytics /> },
    ]
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  
]);

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <CookiesProvider>
      <RouterProvider router={router} />
      <Toaster richColors position='top-center'/>
  </CookiesProvider>
  //</StrictMode>,
)