import React from 'react';
import { Link } from 'react-scroll';
function Navbar() {
  return (
    <nav className="navbar">
      <div className="row justify-content-end rest">
        <div className="col-lg-8 rest">
          <ul className="navbar-nav main-bg d-flex justify-content-end">
            <li className="nav-item cursor-pointer">
              <Link to="services" spy={true} smooth={false}>
                <span>About</span>
              </Link>
            </li>
            <li className="nav-item cursor-pointer">
              <Link to="experience" spy={true} smooth={false}>
                <span>Experience</span>
              </Link>
            </li>
            <li className="nav-item cursor-pointer">
              <Link to="tech-stack" spy={true} smooth={false}>
                <span>Tech Stack</span>
              </Link>
            </li>
            <li className="nav-item cursor-pointer">
              <Link to="portfolio" spy={true} smooth={false}>
                <span>Portfolio</span>
              </Link>
            </li>
            <li className="nav-item cursor-pointer">
              <Link to="contact" spy={true} smooth={false}>
                <span>Contact</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
