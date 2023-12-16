import React from 'react'
import ReactDOM from 'react-dom/client'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App.tsx'
import './index.css'

import NavbarScroll from './components/Navbar/Navbar.tsx'
import Footer from './components/Footer/Footer.tsx'
import Hero from './components/Hero/Hero.tsx'

ReactDOM.createRoot(document.getElementById('navbar')!).render(
  <React.StrictMode>
    <NavbarScroll />
    <Hero />
  </React.StrictMode>,
)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
ReactDOM.createRoot(document.getElementById('footer')!).render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>,
)
