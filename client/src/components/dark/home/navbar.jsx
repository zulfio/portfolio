import React from 'react';
import { Link } from 'react-scroll';
function Navbar() {
  return (
    <nav className="navbar">
      <div className="row justify-content-end rest">
        <div className="col-lg-8 rest">
          <ul className="navbar-nav main-bg d-flex justify-content-end">
            <li className="nav-item">
              <a href="/dark">
                <span>Home</span>
              </a>
            </li>
            <li className="nav-item">
              <Link to="services" spy={true} smooth={true}>
                <span>Services</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="home" spy={true} smooth={true}>
                <span>About</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="portfolio" spy={true} smooth={true}>
                <span>Portfolio</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="price" spy={true} smooth={true}>
                <span>Price</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="contact" spy={true} smooth={true}>
                <span>Contact</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="blog" spy={true} smooth={true}>
                <span>Blog</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
