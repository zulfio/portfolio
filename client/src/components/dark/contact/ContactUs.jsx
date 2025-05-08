import React from 'react';
import { Link } from 'react-scroll';

function ContactUs() {
  return (
    <div className="contact-fixed-butn">
      <div className="butn-presv">
        <Link to="contact" spy={true} smooth={false}>
          <a href="#0" className="butn butn-sm bg-white skew" data-scroll-nav="5">
            <span className="text-dark">Contact Me</span>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default ContactUs;
