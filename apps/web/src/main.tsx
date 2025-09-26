import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/Signup';

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/dashboard", },
  { path: "/login", element: <LoginPage />},
  { path: "/signup", element: <SignupPage />},
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)