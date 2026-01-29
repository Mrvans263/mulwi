// src/components/CTA.jsx
import React, { useEffect, useRef } from 'react';

const CTA = () => {
  const ctaRef = useRef(null);
  const waveRef = useRef(null);

  useEffect(() => {
    // Intersection observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger wave animation
            if (waveRef.current) {
              waveRef.current.style.animationPlayState = 'running';
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  const handleButtonClick = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const handlePhoneClick = () => {
    // In a real app, this would trigger phone call
    window.open('tel:27765149500', '_self');
  };

  const handleEmailClick = () => {
    // In a real app, this would open email client
    window.open('mailto:info@mulwiprojects.co.za', '_self');
  };

  return (
    <section className="cta-section" ref={ctaRef} id="cta">
      <div className="wave-container" ref={waveRef}>
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>
      
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Construction Project?</h2>
          
          <p className="cta-description">
            Contact us today for a <strong>free consultation</strong> and quote. Our team is ready to bring 
            your vision to life with precision and expertise. We serve Mossel Bay and surrounding areas.
          </p>

          <div className="cta-stats">
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
          </div>

          <div className="cta-buttons">
            <button 
              className="btn btn-primary cta-main-button"
              onClick={handleButtonClick}
            >
              <i className="fas fa-calendar-check"></i>
              Get Free Quote
            </button>
            
            <div className="cta-contact-options">
              <button 
                className="contact-option"
                onClick={handlePhoneClick}
              >
                <div className="contact-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="contact-info">
                  <div className="contact-label">Call Us Now</div>
                  <div className="contact-value">+27 76 514 9500</div>
                </div>
              </button>
              
              <button 
                className="contact-option"
                onClick={handleEmailClick}
              >
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-info">
                  <div className="contact-label">Email Us</div>
                  <div className="contact-value">info@mulwiprojects.co.za</div>
                </div>
              </button>
            </div>
          </div>

          <div className="cta-note">
            <i className="fas fa-clock"></i>
            <span>We respond within 24 hours • Free consultations • No obligation quotes</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cta-section {
          background: linear-gradient(135deg, var(--primary) 0%, #2c5282 100%);
          color: white;
          padding: 5rem 0;
          text-align: center;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .cta-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Wave Animation */
        .wave-container {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 150px;
          overflow: hidden;
          opacity: 0.1;
        }

        .wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 88.7'%3E%3Cpath d='M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z' fill='%23FFFFFF'/%3E%3C/svg%3E");
          background-repeat: repeat-x;
          animation: wave 20s linear infinite;
          animation-play-state: paused;
        }

        .wave-1 {
          opacity: 0.7;
          animation-duration: 25s;
          animation-delay: 0s;
        }

        .wave-2 {
          opacity: 0.5;
          animation-duration: 20s;
          animation-delay: -2s;
        }

        .wave-3 {
          opacity: 0.3;
          animation-duration: 15s;
          animation-delay: -5s;
        }

        @keyframes wave {
          0% { transform: translateX(0) translateZ(0) scaleY(1); }
          50% { transform: translateX(-25%) translateZ(0) scaleY(0.8); }
          100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
        }

        /* CTA Content */
        .cta-content {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .cta-title {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          position: relative;
          display: inline-block;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          animation: pulseText 2s infinite;
        }

        .cta-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background-color: var(--secondary);
          border-radius: 2px;
        }

        .cta-description {
          font-size: 1.2rem;
          line-height: 1.8;
          margin-bottom: 2.5rem;
          opacity: 0.9;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-description strong {
          color: var(--secondary);
          font-weight: 600;
        }

        /* Stats */
        .cta-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin: 3rem 0;
          flex-wrap: wrap;
        }

        .stat-item {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 1.5rem 2rem;
          min-width: 150px;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat-item:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--secondary);
          margin-bottom: 0.5rem;
          font-family: 'Montserrat', sans-serif;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* CTA Buttons */
        .cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          align-items: center;
          margin: 3rem 0;
        }

        .cta-main-button {
          font-size: 1.2rem;
          padding: 1.2rem 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          background: linear-gradient(135deg, var(--secondary), #c19b2a);
          border: none;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
        }

        .cta-main-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.7s ease;
        }

        .cta-main-button:hover::before {
          left: 100%;
        }

        .cta-main-button:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 15px 40px rgba(212, 175, 55, 0.4);
        }

        .cta-main-button i {
          font-size: 1.4rem;
        }

        /* Contact Options */
        .cta-contact-options {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .contact-option {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 250px;
          text-align: left;
          color: white;
        }

        .contact-option:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--secondary);
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .contact-icon {
          background: var(--secondary);
          color: var(--primary);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          transition: all 0.3s ease;
        }

        .contact-option:hover .contact-icon {
          transform: rotate(360deg) scale(1.1);
        }

        .contact-info {
          flex: 1;
        }

        .contact-label {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 0.3rem;
        }

        .contact-value {
          font-size: 1.1rem;
          font-weight: 600;
          font-family: 'Montserrat', sans-serif;
        }

        /* CTA Note */
        .cta-note {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 1.2rem;
          margin-top: 2rem;
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: fadeInUp 1s ease 0.5s both;
        }

        .cta-note i {
          color: var(--secondary);
          font-size: 1.2rem;
        }

        .cta-note span {
          font-size: 0.95rem;
          opacity: 0.9;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .cta-section {
            padding: 4rem 0;
          }

          .cta-title {
            font-size: 2rem;
          }

          .cta-description {
            font-size: 1.1rem;
            padding: 0 1rem;
          }

          .cta-stats {
            gap: 1.5rem;
          }

          .stat-item {
            padding: 1.2rem 1.5rem;
            min-width: 120px;
          }

          .stat-number {
            font-size: 2rem;
          }

          .cta-main-button {
            font-size: 1.1rem;
            padding: 1rem 2rem;
            width: 90%;
            max-width: 350px;
          }

          .cta-contact-options {
            flex-direction: column;
            width: 90%;
            max-width: 350px;
          }

          .contact-option {
            min-width: auto;
            width: 100%;
          }

          .wave-container {
            height: 100px;
          }
        }

        @media (max-width: 480px) {
          .cta-section {
            padding: 3rem 0;
          }

          .cta-title {
            font-size: 1.8rem;
          }

          .cta-description {
            font-size: 1rem;
          }

          .stat-item {
            padding: 1rem;
            min-width: 100px;
          }

          .stat-number {
            font-size: 1.8rem;
          }

          .stat-label {
            font-size: 0.8rem;
          }

          .cta-note {
            flex-direction: column;
            text-align: center;
            padding: 1rem;
            margin: 1rem;
            width: calc(100% - 2rem);
          }
        }
      `}</style>
    </section>
  );
};

export default CTA;