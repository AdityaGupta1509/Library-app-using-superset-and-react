import React from 'react';
import "./About.css";
import aboutImg from "../../images/about1-img.jpg";

const About = () => {
  return (
    <section className='about'>
      <div className='container'>
        <div className='section-title'>
          <h2>About</h2>
        </div>

        <div className='about-content grid'>
          <div className='about-img'>
            <img src = {aboutImg} alt = "" />
          </div>
          <div className='about-text'>
            <h2 className='about-title fs-26 ls-1'>About BookZone</h2>
            <p className='fs-17'>This project/website is created by Aditya Gupta. For his internship project</p>
            <p className='fs-17'>To create this website I used sources available in github, documentation and assistance from colleagues. In this project I used Open Library API and Superset.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
