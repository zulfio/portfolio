import React from 'react';

function Info() {
  return (
    <div className="sec-box contact section-padding bord-thin-top" id="info">
      <div className="row">
        <div className="col-lg-12 align-items-center d-flex justify-content-center text-center">
          <div className="sec-head md-mb80 wow fadeIn">
            <h6 className="sub-title mb-15 opacity-7">Get In Touch</h6>
            <h2 className="fz-50">I'd love to hear from you!</h2>
            <div className="phone fz-30 fw-600 mt-30 underline flex flex-column gap-2">
              <a className="main-color" href="tel:3167894090">
                316-789-4090
              </a>
              <a className="main-color" href="mailto:talal.agha@me.com">
                talal.agha@me.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
