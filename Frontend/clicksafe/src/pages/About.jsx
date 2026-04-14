import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About ClickSafe</h1>
        <p>Our mission is to make the internet a safer place for everyone.</p>
      </header>

      <section className="about-content">
        <div className="about-card">
          <h2>The Problem</h2>
          <p>Phishing attacks are becoming increasingly sophisticated, tricking thousands of users into handing over sensitive information every single day. Traditional blocklists struggle to keep up with the rapid deployment of new malicious domains.</p>
        </div>

        <div className="about-card">
          <h2>Our Solution</h2>
          <p>ClickSafe uses advanced Machine Learning and Artificial Intelligence models to analyze URLs in real-time. By examining lexical features, domains, and semantic structures, we predict the likelihood of phishing with high confidence—even for newly created malicious websites.</p>
        </div>

        <div className="about-card">
          <h2>Technology Stack</h2>
          <ul className="tech-list">
            <li><strong>Frontend:</strong> React, Vite, Custom CSS</li>
            <li><strong>Backend:</strong> Django, Python</li>
            <li><strong>Machine Learning:</strong> Hugging Face, Scikit-learn</li>
            <li><strong>Database:</strong> Relational Database (SQLite/PostgreSQL)</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;
