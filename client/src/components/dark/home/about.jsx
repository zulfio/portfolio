import React, { useState } from 'react';
import data from '../../../data/experience.json';

function About() {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleExpand = (index) => {
    if (expandedItem === index) {
      setExpandedItem(null);
    } else {
      setExpandedItem(index);
    }
  };

  return (
    <div
      className="sec-box services section-padding bord-thin-bottom"
      id="services"
    >
      <div className="sec-head mb-80 wow fadeInUp">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h3 className="mb-15">About Me</h3>
            <div className="about-me">
              <p>Hey, I'm <strong>Talal Agha</strong>. I'm a passionate Full Stack Developer with six years of experience in JavaScript and PHP, specializing in building fast, scalable, and user-friendly web applications.</p>
              <p>I thrive on solving complex problems, learning new technologies, and experimenting with innovative solutions. When I'm not coding, you'll likely find me exploring the latest JavaScript frameworks or diving into new tech trends.</p>
            </div>
          </div>
        </div>
      </div>
      <div id="experience" className="mb-40">
        <h3 className="mb-15">Experience</h3>
      </div>
      <div className="row">
        {data.map((item, index) => (
          <div key={index} className="col-md-12">
            <div className={`item mb-40 wow fadeIn experience-item ${expandedItem === index ? 'expanded' : ''}`} data-wow-delay=".2s">
              <div className="experience-header" onClick={() => toggleExpand(index)}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-5">{item.position}</h5>
                    <p className="company-info">{item.company} {item.location && `• ${item.location}`} • {item.dates}</p>
                  </div>
                  <span className="expand-icon">{expandedItem === index ? '−' : '+'}</span>
                </div>
                <div className="bord-color"></div>
              </div>
              
              {expandedItem === index && (
                <div className="experience-details mt-20">
                  <div className="responsibilities">
                    <h6 className="text-u ls1 mb-10">Responsibilities</h6>
                    <ul className="custom-list">
                      {item.responsibilities.map((responsibility, respIndex) => (
                        <li key={respIndex}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="technologies mt-20">
                    <h6 className="text-u ls1 mb-10">Technologies</h6>
                    <div className="tech-tags">
                      {(item.environment || item.technologies)?.split(',').map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;