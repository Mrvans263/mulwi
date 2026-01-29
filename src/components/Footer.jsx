// src/components/Footer.jsx
import React, { useEffect, useRef } from 'react';

const Footer = () => {
  const footerRef = useRef(null);
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    { name: 'Pavement Construction', href: '#pavements' },
    { name: 'Concrete Blocks', href: '#blocks' },
    { name: 'Retaining Walls', href: '#walls' },
    { name: 'Building Construction', href: '#building' },
    { name: 'Consultation & Planning', href: '#consultation' },
  ];

  const contactInfo = [
    { icon: 'fas fa-map-marker-alt', text: '15 Nobuhle Street, Kwanonqaba', detail: 'Mossel Bay, Western Cape, 6506' },
    { icon: 'fas fa-phone-alt', text: '+27 76 514 9500', href: 'tel:+27 76 514 9500' },
    { icon: 'fas fa-envelope', text: 'info@mulwiprojects.co.za', href: 'mailto:info@mulwiprojects.co.za' },
    { icon: 'fas fa-clock', text: 'Mon - Fri: 7:30 AM - 5:00 PM', detail: 'Sat: 8:00 AM - 1:00 PM' },
  ];

  const socialLinks = [
    { icon: 'fab fa-facebook-f', href: 'https://facebook.com/mulwiprojects', name: 'Facebook' },
    { icon: 'fab fa-instagram', href: 'https://instagram.com/mulwiprojects', name: 'Instagram' },
    { icon: 'fab fa-linkedin-in', href: 'https://linkedin.com/company/mulwiprojects', name: 'LinkedIn' },
    { icon: 'fab fa-whatsapp', href: 'https://wa.me/27765149500', name: 'WhatsApp' },
  ];

  useEffect(() => {
    // Intersection observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const handleLinkClick = (href, e) => {
    e.preventDefault();
    
    if (href.startsWith('#')) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    } else {
      window.open(href, '_blank');
    }
  };

  const handleContactClick = (href, e) => {
    if (href) {
      window.open(href, e.currentTarget.getAttribute('target') || '_self');
    }
  };

  return (
    <footer className="footer" ref={footerRef} id="contact">
      {/* Decorative top border */}
      <div className="footer-top-border">
        <div className="footer-wave"></div>
      </div>

      <div className="container">
        <div className="footer-content">
          {/* Company Info Column */}
          <div className="footer-column company-info">
            <div className="footer-logo">
              <i className="fas fa-hard-hat logo-icon"></i>
              <h3>MULWI PROJECTS</h3>
            </div>
            <p className="company-description">
              Specializing in premium pavements, concrete blocks, and building construction 
              in Mossel Bay and surrounding areas. Quality craftsmanship since 2026.
            </p>
            
            <div className="company-details">
              <div className="registration-badge">
                <i className="fas fa-certificate"></i>
                <span>Registration: 2026/065379/07</span>
              </div>
              <div className="vat-badge">
                <i className="fas fa-file-invoice-dollar"></i>
                <span>VAT Registered</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-column">
            <h4 className="footer-column-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleLinkClick(link.href, e)}
                    className="footer-link"
                    style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                  >
                    <i className="fas fa-chevron-right link-icon"></i>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="footer-column">
            <h4 className="footer-column-title">Our Services</h4>
            <ul className="footer-links">
              {services.map((service, index) => (
                <li key={service.name}>
                  <a 
                    href={service.href} 
                    onClick={(e) => handleLinkClick(service.href, e)}
                    className="footer-link"
                    style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                  >
                    <i className="fas fa-check check-icon"></i>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-column contact-info">
            <h4 className="footer-column-title">Contact Us</h4>
            <div className="contact-details">
              {contactInfo.map((contact, index) => (
                <div 
                  key={index} 
                  className={`contact-item ${contact.href ? 'clickable' : ''}`}
                  onClick={contact.href ? (e) => handleContactClick(contact.href, e) : null}
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="contact-icon">
                    <i className={contact.icon}></i>
                  </div>
                  <div className="contact-text">
                    <div className="contact-main">{contact.text}</div>
                    {contact.detail && (
                      <div className="contact-detail">{contact.detail}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="social-media">
              <h5 className="social-title">Follow Us</h5>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                    aria-label={social.name}
                  >
                    <i className={social.icon}></i>
                    <div className="social-tooltip">{social.name}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <i className="fas fa-paper-plane newsletter-icon"></i>
              <div>
                <h4>Stay Updated</h4>
                <p>Subscribe to our newsletter for project updates and tips</p>
              </div>
            </div>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="newsletter-input"
              />
              <button className="newsletter-button">
                <i className="fas fa-paper-plane"></i>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              &copy; {currentYear} Mulwi Projects. All rights reserved.
            </div>
            <div className="footer-bottom-links">
              <a href="#privacy" onClick={(e) => handleLinkClick('#', e)}>Privacy Policy</a>
              <span className="divider">•</span>
              <a href="#terms" onClick={(e) => handleLinkClick('#', e)}>Terms of Service</a>
              <span className="divider">•</span>
              <a href="#sitemap" onClick={(e) => handleLinkClick('#', e)}>Sitemap</a>
            </div>
            <div className="developer-credit">
              <i className="fas fa-code"></i>
              <span>Built with React</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #0a1931 0%, #0f2642 100%);
          color: white;
          position: relative;
          padding-top: 4rem;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .footer.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Top Border Animation */
        .footer-top-border {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 10px;
          overflow: hidden;
        }

        .footer-wave {
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: linear-gradient(90deg, 
            var(--secondary) 0%, 
            var(--accent) 25%, 
            var(--primary) 50%, 
            var(--accent) 75%, 
            var(--secondary) 100%
          );
          animation: footerWave 10s linear infinite;
        }

        @keyframes footerWave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Main Footer Content */
        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-column {
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
        }

        .footer.visible .footer-column {
          animation: fadeInUp 0.6s ease forwards;
        }

        /* Company Info */
        .company-info {
          animation-delay: 0.1s;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .footer-logo .logo-icon {
          color: var(--secondary);
          font-size: 2rem;
          animation: rotate 20s linear infinite;
        }

        .footer-logo h3 {
          font-size: 1.5rem;
          color: white;
          margin: 0;
        }

        .company-description {
          color: #b0b7c3;
          line-height: 1.7;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .company-details {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .registration-badge,
        .vat-badge {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 0.8rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.9rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .registration-badge:hover,
        .vat-badge:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .registration-badge i,
        .vat-badge i {
          color: var(--secondary);
        }

        /* Column Titles */
        .footer-column-title {
          font-size: 1.2rem;
          color: var(--secondary);
          margin-bottom: 1.5rem;
          position: relative;
          padding-bottom: 0.8rem;
        }

        .footer-column-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, var(--secondary), transparent);
          border-radius: 2px;
        }

        /* Links */
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 0.8rem;
        }

        .footer-link {
          color: #b0b7c3;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.5rem 0;
          transition: all 0.3s ease;
          position: relative;
          cursor: pointer;
          opacity: 0;
          transform: translateX(-10px);
          animation: slideInRight 0.4s ease forwards;
        }

        .footer.visible .footer-link {
          animation: slideInRight 0.4s ease forwards;
        }

        @keyframes slideInRight {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .link-icon,
        .check-icon {
          font-size: 0.8rem;
          color: var(--secondary);
          transition: all 0.3s ease;
        }

        .check-icon {
          color: var(--accent);
        }

        .footer-link:hover {
          color: white;
          padding-left: 10px;
        }

        .footer-link:hover .link-icon {
          transform: rotate(90deg);
        }

        .footer-link:hover .check-icon {
          transform: scale(1.2);
        }

        /* Contact Info */
        .contact-info {
          animation-delay: 0.3s;
        }

        .contact-details {
          margin-bottom: 2rem;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.2rem;
          padding: 0.8rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          cursor: default;
          opacity: 0;
          transform: translateY(10px);
          animation: fadeInUp 0.4s ease forwards;
        }

        .footer.visible .contact-item {
          animation: fadeInUp 0.4s ease forwards;
        }

        .contact-item.clickable {
          cursor: pointer;
        }

        .contact-item.clickable:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }

        .contact-icon {
          background: rgba(212, 175, 55, 0.1);
          color: var(--secondary);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .contact-text {
          flex: 1;
        }

        .contact-main {
          color: white;
          font-weight: 500;
          margin-bottom: 0.2rem;
        }

        .contact-detail {
          color: #b0b7c3;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        /* Social Media */
        .social-title {
          font-size: 1rem;
          color: #b0b7c3;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .social-icons {
          display: flex;
          gap: 1rem;
        }

        .social-icon {
          position: relative;
          background: rgba(255, 255, 255, 0.05);
          color: white;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          text-decoration: none;
          opacity: 0;
          transform: scale(0.8);
          animation: popIn 0.4s ease forwards;
        }

        .footer.visible .social-icon {
          animation: popIn 0.4s ease forwards;
        }

        @keyframes popIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .social-icon:hover {
          background: var(--secondary);
          color: var(--primary);
          transform: translateY(-5px) scale(1.1);
        }

        .social-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: var(--primary);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.8rem;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          margin-bottom: 10px;
          pointer-events: none;
          z-index: 100;
        }

        .social-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 6px solid transparent;
          border-top-color: var(--primary);
        }

        .social-icon:hover .social-tooltip {
          opacity: 1;
          visibility: visible;
          bottom: calc(100% + 5px);
        }

        /* Newsletter */
        .newsletter-section {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(42, 157, 143, 0.1));
          border-radius: 15px;
          padding: 2rem;
          margin: 3rem 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .newsletter-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .newsletter-text {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex: 1;
          min-width: 300px;
        }

        .newsletter-icon {
          font-size: 2.5rem;
          color: var(--secondary);
        }

        .newsletter-text h4 {
          color: white;
          margin-bottom: 0.5rem;
          font-size: 1.3rem;
        }

        .newsletter-text p {
          color: #b0b7c3;
          margin: 0;
        }

        .newsletter-form {
          display: flex;
          gap: 1rem;
          flex: 1;
          min-width: 300px;
        }

        .newsletter-input {
          flex: 1;
          padding: 0.9rem 1.5rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          color: white;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .newsletter-input:focus {
          outline: none;
          border-color: var(--secondary);
          background: rgba(255, 255, 255, 0.1);
        }

        .newsletter-input::placeholder {
          color: #b0b7c3;
        }

        .newsletter-button {
          background: var(--secondary);
          color: var(--primary);
          border: none;
          padding: 0.9rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          transition: all 0.3s ease;
          font-family: 'Montserrat', sans-serif;
          white-space: nowrap;
        }

        .newsletter-button:hover {
          background: #c19b2a;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
        }

        /* Footer Bottom */
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 2rem;
          padding-bottom: 2rem;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          color: #b0b7c3;
          font-size: 0.9rem;
        }

        .copyright {
          flex: 1;
          min-width: 250px;
        }

        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .footer-bottom-links a {
          color: #b0b7c3;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: var(--secondary);
        }

        .divider {
          opacity: 0.5;
        }

        .developer-credit {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
          justify-content: flex-end;
          min-width: 250px;
        }

        .developer-credit i {
          color: var(--secondary);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .footer {
            padding-top: 3rem;
          }

          .footer-content {
            gap: 2rem;
          }

          .newsletter-content {
            flex-direction: column;
            text-align: center;
          }

          .newsletter-text {
            flex-direction: column;
            text-align: center;
          }

          .newsletter-form {
            flex-direction: column;
          }

          .newsletter-input,
          .newsletter-button {
            width: 100%;
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .copyright,
          .developer-credit {
            min-width: auto;
            justify-content: center;
          }

          .footer-bottom-links {
            order: 2;
          }
        }

        @media (max-width: 480px) {
          .footer-column {
            text-align: center;
          }

          .footer-column-title::after {
            left: 50%;
            transform: translateX(-50%);
          }

          .footer-links {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .contact-item {
            flex-direction: column;
            text-align: center;
            align-items: center;
          }

          .contact-icon {
            margin-bottom: 0.5rem;
          }

          .social-icons {
            justify-content: center;
          }

          .company-details {
            align-items: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;