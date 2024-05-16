import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css';

import App from './routes/App';
import Index from './routes/Index';
import Admin from './routes/Admin';
import NavbarScroll from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ErrorPage from './routes/ErrorPage';
import { SchoolConfig } from './types/types.tsx';

import vcu_landing_banner from './assets/LandingPage(2).png'
import vcu_dashboard_banner from './assets/HeroBanner.png'

//import tufts_landing_banner from './assets/Tufts.jpeg'
//import tufts_dashboard_banner from './assets/Tufts.jpeg'

const sites : SchoolConfig[] = [
  {

    long_name: "Virginia Commonwealth University",
    short_name: "vcu",
    path: "/",

    contact: {
      address: "930 W Grace St, Richmond, VA 23220",
      email: "rampantry@vcu.edu",
      phone: "+1 (804)-828-4514"
    },

    banners: {
      landing_banner: vcu_landing_banner,
      dashboard_banner: vcu_dashboard_banner
    },

    body_color: "white",
    footer_color: "#f8f8f8",

    blurb_1: "With 14 accessible locations across both VCU campuses, free food is never far away.",
    blurb_2: "We pride ourselves on keeping our pantries restocked weekly, ensuring you have fresh options whenever you need them."
  
  }
];

// For each school...
const routes = [];
for(let i = 0; i < sites.length; i++) {

  // Add index page
  routes.push({
    path: sites[i].path,
    element: (
      <React.Fragment>
        <NavbarScroll schoolConfig={sites[i]}/>
        <main><Index schoolConfig={sites[i]}/></main>
        <Footer schoolConfig={sites[i]}/>
      </React.Fragment>
      ),
    errorElement: <ErrorPage/>
  });

  // Add main app
  routes.push({
    path: sites[i].path + "/pantries",
    element: (
      <div style={{ backgroundColor: sites[i].body_color }}>
      <React.Fragment>
        <NavbarScroll schoolConfig={sites[i]}/>
        <main><App schoolConfig={sites[i]}/></main>
        <Footer schoolConfig={sites[i]}/>
      </React.Fragment>
      </div>
      ),
      errorElement: <ErrorPage/>
  });

  // Add main app
  routes.push({
    path: sites[i].path + "/admin",
    element: (
      <div style={{ backgroundColor: sites[i].body_color }}>
      <React.Fragment>
        <NavbarScroll schoolConfig={sites[i]}/>
        <main><Admin schoolConfig={sites[i]}/></main>
        <Footer schoolConfig={sites[i]}/>
      </React.Fragment>
      </div>
      ),
      errorElement: <ErrorPage/>
  });
}

// Define yroutes, using the HOC directly as JSX
const router = createBrowserRouter(routes);

// Render the RouterProvider with the router configuration
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
