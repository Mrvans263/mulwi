// src/components/Hero.jsx
import React, { useEffect, useState } from 'react';
import Particles from './Particles';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "Building Excellence in Mossel Bay";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  const handleButtonClick = (section) => {
    const targetElement = document.querySelector(`#${section}`);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="hero" id="home">
      <Particles />
      <div className="container">
        <div className="hero-content">
          <h2>{typedText}</h2>
          <p className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            Specializing in premium paving, retaining blocks, kerbs and general  construction projects. 
            With years of experience and commitment to quality, we transform visions into lasting structures.
          </p>
          <div className="hero-buttons fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => handleButtonClick('contact')}
            >
              Start Your Project
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => handleButtonClick('services')}
            >
              Our Services
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          height: 100vh;
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                      url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          color: white;
          display: flex;
          align-items: center;
          text-align: center;
          padding-top: 80px;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(42, 157, 143, 0.1) 0%, transparent 50%);
          animation: pulse 8s ease-in-out infinite alternate;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          position: relative;
          z-index: 2;
        }

        .hero h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          animation: float 6s ease-in-out infinite;
          text-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          min-height: 60px;
        }

        .hero p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          animation: fadeInUp 1s ease-out 0.2s both;
        }

        .hero-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease-out 0.4s both;
        }

        @media (max-width: 768px) {
          .hero h2 {
            font-size: 2rem;
            min-height: 50px;
          }

          .hero p {
            font-size: 1rem;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .hero h2 {
            font-size: 1.8rem;
            min-height: 45px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;