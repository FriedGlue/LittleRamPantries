import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css';

import App from './routes/App';
import Index from './routes/Index';
import NavbarScroll from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ErrorPage from './routes/ErrorPage';

// Higher-Order Component for wrapping pages with the layout
const withLayout = (Component: React.ComponentType) => (
  <React.Fragment>
    <NavbarScroll />
    <main><Component /></main>
    <Footer />
  </React.Fragment>
);

// Define yroutes, using the HOC directly as JSX
const router = createBrowserRouter([
  {
    path: "/",
    element: withLayout(Index), // Directly use the HOC as JSX
    errorElement: <ErrorPage />,
  },
  {
    path: "/pantries",
    element: withLayout(App), // Directly use the HOC as JSX
    errorElement: <ErrorPage />,
  },
]);

// Render the RouterProvider with the router configuration
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
