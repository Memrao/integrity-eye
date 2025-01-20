import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthProvider from './context/auth-context';

// Define the router with future flags
const router = createBrowserRouter(
  [
    {
      path: '/*',
      element: (
        <AuthProvider>
          <App />
        </AuthProvider>
      ),
    },
  ],
  {
    future: {
      v7_startTransition: true, // Enables React.startTransition for v7
      v7_relativeSplatRoutes: true, // Updates splat route resolution for v7
    },
  }
);

// Render the app with RouterProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
