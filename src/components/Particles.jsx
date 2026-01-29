// src/components/Particles.jsx
import React, { useEffect } from 'react';

const Particles = () => {
  useEffect(() => {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size between 2px and 6px
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      
      // Random animation delay and duration
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 10;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      
      particlesContainer.appendChild(particle);
    }

    return () => {
      // Cleanup particles on unmount
      const particles = document.querySelectorAll('.particle');
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <>
      <div className="particles"></div>
      <style jsx>{`
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .particle {
          position: absolute;
          background-color: rgba(212, 175, 55, 0.3);
          border-radius: 50%;
          animation: floatParticle 15s infinite linear;
        }
      `}</style>
    </>
  );
};

export default Particles;