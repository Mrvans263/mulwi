// src/components/Header.jsx
import React, { useEffect } from 'react';

const Header = ({ isMenuOpen, toggleMenu, closeMenu }) => {
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 100) {
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
      } else {
        header.style.padding = '1rem 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      closeMenu();
    }
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <i className="fas fa-hard-hat logo-icon"></i>
          <h1>MULWI PROJECTS</h1>
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className="nav-toggle" onClick={toggleMenu}>
          <div className={`nav-toggle-label ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            {['home', 'services', 'projects', 'about', 'contact'].map((item, index) => (
              <li key={item} style={{ animationDelay: `${index * 0.1}s` }}>
                <a href={`#${item}`} onClick={handleNavClick}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
          <button 
            className="cta-button" 
            onClick={() => {
              const contactSection = document.querySelector('#contact');
              if (contactSection) {
                window.scrollTo({
                  top: contactSection.offsetTop - 80,
                  behavior: 'smooth'
                });
                closeMenu();
              }
            }}
          >
            Get a Quote
          </button>
        </nav>
      </div>

      <style jsx>{`
        .header {
          background-color: var(--primary);
          color: white;
          padding: 1rem 0;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: var(--transition);
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          position: relative;
          cursor: pointer;
        }

        .logo h1 {
          font-size: 1.5rem;
          margin-left: 10px;
          position: relative;
          overflow: hidden;
        }

        .logo h1::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--secondary);
          transition: width 0.6s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .logo:hover h1::after {
          width: 100%;
        }

        .logo-icon {
          color: var(--secondary);
          font-size: 1.8rem;
          animation: rotate 20s linear infinite;
          transform-origin: center;
        }

        /* Mobile Menu Toggle */
        .nav-toggle {
          display: none;
          cursor: pointer;
        }

        .nav-toggle-label {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 24px;
          width: 30px;
          cursor: pointer;
          position: relative;
          z-index: 1001;
        }

        .nav-toggle-label span {
          display: block;
          height: 3px;
          width: 100%;
          background-color: white;
          border-radius: 2px;
          transition: var(--transition);
          transform-origin: center;
        }

        .nav-toggle-label.active span:nth-child(1) {
          transform: translateY(10.5px) rotate(45deg);
        }

        .nav-toggle-label.active span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }

        .nav-toggle-label.active span:nth-child(3) {
          transform: translateY(-10.5px) rotate(-45deg);
        }

        /* Navigation */
        .nav {
          display: flex;
          align-items: center;
        }

        .nav-links {
          display: flex;
          list-style: none;
        }

        .nav-links li {
          margin-left: 1.5rem;
          position: relative;
          opacity: 1;
          transform: translateY(0);
        }

        .nav-links a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: var(--transition);
          padding: 0.5rem 0;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .nav-links a::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background-color: var(--secondary);
          transition: left 0.4s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .nav-links a:hover::before {
          left: 0;
        }

        .nav-links a:hover {
          color: var(--secondary);
        }

        .cta-button {
          background-color: var(--secondary);
          color: var(--primary);
          border: none;
          padding: 0.6rem 1.5rem;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          margin-left: 1.5rem;
          position: relative;
          overflow: hidden;
          z-index: 1;
          font-family: 'Montserrat', sans-serif;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.7s ease;
          z-index: -1;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          background-color: #c19b2a;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .nav-toggle {
            display: block;
          }

          .nav {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            height: calc(100vh - 70px);
            background-color: var(--primary);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
            transition: clip-path 0.5s ease;
            z-index: 999;
            overflow-y: auto;
          }

          .nav.active {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }

          .nav-links {
            flex-direction: column;
            align-items: center;
            width: 100%;
            margin-bottom: 2rem;
          }

          .nav-links li {
            margin: 1rem 0;
            margin-left: 0;
            opacity: 0;
            transform: translateY(-10px);
            animation: fadeInUp 0.3s ease forwards;
          }

          .nav.active .nav-links li:nth-child(1) { animation-delay: 0.1s; }
          .nav.active .nav-links li:nth-child(2) { animation-delay: 0.2s; }
          .nav.active .nav-links li:nth-child(3) { animation-delay: 0.3s; }
          .nav.active .nav-links li:nth-child(4) { animation-delay: 0.4s; }
          .nav.active .nav-links li:nth-child(5) { animation-delay: 0.5s; }

          .nav-links a {
            font-size: 1.2rem;
            padding: 0.8rem 0;
          }

          .cta-button {
            margin-left: 0;
            margin-top: 1rem;
            padding: 0.8rem 2rem;
            font-size: 1rem;
          }

          .logo h1 {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .logo h1 {
            font-size: 1rem;
          }

          .logo-icon {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;