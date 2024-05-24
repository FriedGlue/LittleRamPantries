import { Link } from 'react-router-dom';
import LRPLogo from '../../assets/ram-pantry.png';
import { SchoolConfig } from '../../types/types';
import { useState } from 'react';

function NavbarScroll({ schoolConfig }: { schoolConfig: SchoolConfig }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <div style={{ backgroundColor: schoolConfig.footer_color }}>
      <nav className={`sticky top-0 z-50 w-full ${isOpen ? 'bg-white' : ''}`}>
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link to="/" className="flex items-center" onClick={closeNavbar}>
            <img
              alt="LRP logo"
              src={LRPLogo}
              width="30"
              height="30"
              className="mr-2"
            />
            <span className="text-lg font-semibold text-black pr-4">Little Ram Pantries</span>
          </Link>
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleNavbar}
              className={`text-lg focus:outline-none ${isOpen ? 'hidden' : 'block'}`}
            >
              &#9660;
            </button>
            <button
              onClick={closeNavbar}
              className={`text-lg focus:outline-none ${isOpen ? 'block' : 'hidden'}`}
            >
              &#10005;
            </button>
          </div>
          <div className={`lg:flex lg:items-center lg:static absolute top-full left-0 w-full lg:w-auto ${isOpen ? 'bg-white block' : 'hidden'}`}>
            <div className="flex flex-col lg:flex-row lg:ml-auto">
              <Link to="/" className="py-2 px-4 hover:bg-gray-200 text-gray-500" onClick={closeNavbar}>Home</Link>
              <a href="https://news.vcu.edu/article/2021/10/little-ram-pantries-will-provide-emergency-food-assistance-to-vcu-students" className="py-2 px-4 hover:bg-gray-200 text-gray-500" onClick={closeNavbar}>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarScroll;
