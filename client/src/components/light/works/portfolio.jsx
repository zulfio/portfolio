import React from 'react';
import data from '../../../ldata/home/works.json';
function Portfolio() {
  return (
    <div className="sec-box portfolio main-bg section-padding radius-15">
      <div className="sec-head mb-30 text-center">
        <h6 className="sub-title opacity-7 mb-15">Our Portfolio</h6>
        <h3>
          Look at my <span className="main-color">Portfolio</span>
        </h3>
      </div>
      <div className="gallery">
        <div className="row">
          {data.map((item, index) => (
            <div key={index} className="col-lg-6 items">
              <div className="item mt-50">
                <div className="img">
                  <a href={item.link}>
                    <img src={item.photo} alt="" />
                  </a>
                </div>
                <div className="cont mt-30 d-flex align-items-center">
                  <div>
                    <span className="tag">Branding</span>
                    <h6 className="line-height-1">
                      <a href={item.photo}>{item.title}</a>
                    </h6>
                  </div>
                  <div className="ml-auto">
                    <div className="arrow">
                      <a href={item.photo}>
                        <svg
                          className="arrow-right"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 34.2 32.3"
                          xmlSpace="preserve"
                          style={{ strokeWidth: 2 }}
                        >
                          <line x1="0" y1="16" x2="33" y2="16"></line>
                          <line x1="17.3" y1="0.7" x2="33.2" y2="16.5"></line>
                          <line x1="17.3" y1="31.6" x2="33.5" y2="15.4"></line>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
