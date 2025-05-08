import React from 'react';
import data from '../../../data/works.json';

function Portfolio() {
  return (
    <div className="sec-box portfolio section-padding" id="portfolio">
      <div className="sec-head mb-30">
        <div className="row">
          <div className="col-lg-6">
            <h6 className="sub-title opacity-7 mb-15">My Portfolio</h6>
            <h3>
              Look at my {' '}
              <span className="main-color">Work</span>
            </h3>
          </div>
        </div>
      </div>
      <div className="gallery">
        <div className="row">
          {data?.slice(0, 4).map((item, index) => (
            <div key={index} className="col-lg-6 items">
              <div className="item mt-50 wow fadeInUp" data-wow-delay=".2s">
                <div className="img">
                  <a href={item.link}>
                    <img src={item.photo} alt="" />
                  </a>
                </div>
                <div className="cont mt-30 d-flex align-items-center">
                  <div>
                    <span className="tag">Branding</span>
                    <h6 className="line-height-1">
                      <a href="single-project">{item.title}</a>
                    </h6>
                  </div>
                  <div className="ml-auto">
                    <div className="arrow">
                      <a href="single-project">
                        <svg
                          className="arrow-right"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 34.2 32.3"
                          xmlSpace="preserve"
                          style={{ strokeWidth: 2 }}
                        />
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
