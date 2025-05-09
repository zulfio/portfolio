import React from 'react';
import { Link } from 'react-scroll';

function Profile() {
  return (
    <section id="home" className="intro-profile md-mb50">
      <div className="row rest">
        <div className="col-lg-12 content main-bg text-center">
          <div className='flex flex-column justify-content-center align-items-center'>
            <h1 className='text-center'>
              Hello, I’m <span className="main-color">Talal Agha</span>
            </h1>
            <h1 className='text-center'>
              <span className="bord">Fullstack Developer</span>
            </h1>
          </div>
          <div className="stauts mt-80">
            <div className="d-flex align-items-center justify-content-center gap-4">
              <div className="butn-presv">
                <Link to="contact" spy={true} smooth={false} className='full-width mb-3 cursor-pointer'>
                  <div className="butn butn-md butn-bord radius-5 text-u bg-white text-dark">
                    <span>Contact Me</span>
                  </div>
                </Link>
              </div>
              <div className="butn-presv">
                <a href="/CV-Talal-Agha.pdf" className="butn butn-md butn-bord radius-5 text-u full-width mb-3" target='_blank'>
                  <span>Download C.V</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
