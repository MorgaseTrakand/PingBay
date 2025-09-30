//import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';

//pages
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Auth/Login/Login';
import SignupPage from './pages/Auth/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';

import { authLoader } from './utils/authLoader';

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { 
    path: "/dashboard", 
    element: <Dashboard />,
    loader: authLoader,
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  
]);

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <CookiesProvider>
      <RouterProvider router={router} />
  </CookiesProvider>
  //</StrictMode>,
)