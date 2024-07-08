import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home.tsx';
import Admin from './pages/admin/Admin.tsx';
import { Toaster } from 'sonner';

export const base_url = import.meta.env.VITE_BASE_URL


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position="top-right" closeButton richColors />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
