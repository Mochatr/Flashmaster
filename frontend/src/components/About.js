import React from 'react';
import '../styling/About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-heading">About Flashmaster</h1>
        <div className="about-content">
          <section>
            <h2>Our Mission</h2>
            <p>
              Flashmaster is an innovative flashcard application designed to revolutionize your learning experience. 
              Our mission is to provide an efficient and engaging way for students, professionals, and lifelong 
              learners to master new concepts and retain information effectively.
            </p>
          </section>

          <section>
            <h2>Key Features</h2>
            <ul>
              <li>Create and customize flashcard decks tailored to your learning needs</li>
              <li>Utilize smart repetition algorithms for optimal learning and retention</li>
              <li>Track your progress with detailed performance analytics</li>
              <li>Engage in collaborative learning with peers and study groups</li>
              <li>Access your flashcards anytime, anywhere with our mobile-friendly design</li>
            </ul>
          </section>

          <section>
            <h2>Who Can Benefit?</h2>
            <ul>
              <li>Students preparing for exams or mastering course material</li>
              <li>Language learners expanding their vocabulary and grammar skills</li>
              <li>Professionals staying up-to-date with industry knowledge</li>
            </ul>
          </section>

          <section>
            <h2>Our Approach</h2>
            <p>
              At Flashmaster, we believe in the power of active recall and spaced repetition. Our platform 
              combines these proven learning techniques with cutting-edge technology to create a powerful 
              study tool. Our user-friendly interface and adaptive features make studying more effective, 
              efficient, and enjoyable.
            </p>
          </section>

          <section>
            <h2>Join Our Community</h2>
            <p>
              Become part of the Flashmaster community today and unlock your full learning potential! 
              Whether you're a student, professional, or curious mind, Flashmaster is here to support 
              your journey towards knowledge and success.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
