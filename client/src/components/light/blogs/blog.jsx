import React from 'react';

function Blog() {
  return (
    <section className="sec-box blog-main section-padding">
      <div className="sec-head text-center mb-80">
        <h6 className="sub-title opacity-7 mb-15">Our Blogs</h6>
        <h3>
          <span className="main-color">Articles</span> & Resources
        </h3>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="item">
            <div className="img">
              <img src="/assets/imgs/blog/m1.jpg" alt="" />
            </div>
            <div className="box">
              <div className="cont text-center">
                <span className="date">
                  <i className="fas fa-calendar-alt mr-10 main-color"></i> 6 ,
                  Aug 2022
                </span>
                <h4>
                  <a href="single-blog">
                    12 unique examples of portfolio websites.
                  </a>
                </h4>
                <div className="row justify-content-center mt-15">
                  <div className="col-lg-8">
                    <p>
                      Dynamically fabricate excellent go forward technology.
                      Intrinsicly impact empowered scenarios after cost
                      effective outsourcing.
                    </p>
                  </div>
                </div>
              </div>
              <div className="info d-flex align-items-center">
                <div>
                  <span>
                    <i className="fas fa-comments fz-12 mr-5"></i> 2 Comments
                  </span>
                </div>
                <div className="ml-auto">
                  <a href="single-blog">
                    Read More{' '}
                    <svg
                      className="ml-5"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.2031 10.3281L11.5781 15.9531C11.535 15.9961 11.4839 16.0303 11.4276 16.0536C11.3713 16.077 11.3109 16.089 11.25 16.089C11.1891 16.089 11.1287 16.077 11.0724 16.0536C11.0161 16.0303 10.965 15.9961 10.9219 15.9531C10.8788 15.91 10.8446 15.8588 10.8213 15.8025C10.798 15.7462 10.786 15.6859 10.786 15.6249C10.786 15.564 10.798 15.5036 10.8213 15.4473C10.8446 15.391 10.8788 15.3399 10.9219 15.2968L15.7422 10.4687H3.125C3.00068 10.4687 2.88145 10.4193 2.79354 10.3314C2.70564 10.2435 2.65625 10.1242 2.65625 9.99993C2.65625 9.87561 2.70564 9.75638 2.79354 9.66847C2.88145 9.58056 3.00068 9.53118 3.125 9.53118H15.7422L10.9219 4.70305C10.8349 4.61603 10.786 4.498 10.786 4.37493C10.786 4.25186 10.8349 4.13383 10.9219 4.0468C11.0089 3.95978 11.1269 3.91089 11.25 3.91089C11.3731 3.91089 11.4911 3.95978 11.5781 4.0468L17.2031 9.6718C17.2476 9.71412 17.2829 9.76503 17.3071 9.82143C17.3313 9.87784 17.3438 9.93856 17.3438 9.99993C17.3438 10.0613 17.3313 10.122 17.3071 10.1784C17.2829 10.2348 17.2476 10.2857 17.2031 10.3281Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blog;
