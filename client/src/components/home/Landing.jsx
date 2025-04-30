import React from 'react';

function Landing() {
  return (
    <section className="preview section-padding">
      <div className="container">
        <div className="sec-head mb-80">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="text-center">
                <h1 className="fz-70 mb-15">GAVI</h1>
                <h4>
                  Creative Personal
                  <span className="main-color ml-5">Portfolio</span> Template
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row md-marg">
          <div className="col-lg-6">
            <div className="item mt-40">
              <div className="img">
                <div className="screen">
                  <a href="/dark" target="_blank">
                    <img src="demos/1.png" alt="" />
                  </a>
                </div>
                <div className="botm"></div>
              </div>
              <div className="text-center">
                <h3>Home Dark</h3>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="item mt-40">
              <div className="img">
                <div className="screen">
                  <a href="/light-m" target="_blank">
                    <img src="demos/2.png" alt="" />
                  </a>
                </div>
                <div className="botm"></div>
              </div>
              <div className="text-center">
                <h3>Home Light</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
