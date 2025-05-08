import React from 'react';
import data from '../../../data/skills.json';
function Skills() {
  return (
    <div
      className="sec-box skills section-padding bord-thin-bottom"
      id="tech-stack"
    >
      <div className="row">
        <div className="col-12 mb-40">
          <div className="sec-head wow fadeIn text-center">
            <h6 className="sub-title opacity-7 mb-15">My Tech Stack</h6>
            <h3>
              <span className="main-color">Technologies</span> I've been working with currently
            </h3>
          </div>
        </div>
        <div className="col-12">
          <div className="flex flex-row flex-wrap justify-content-center align-items-center gap-4">
            {data.map((item, index) => (
              <div key={index} className='flex flex-column justify-content-center align-items-center gap-2'>
                <img src={item.photo} alt="" className='experience-icon' />
                <span className='text-center'>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;
