// src/components/Services.jsx
import React, { useEffect, useRef } from 'react';

const Services = () => {
  const serviceCardsRef = useRef([]);
  const services = [
    {
      id: 1,
      icon: 'fas fa-road',
      title: 'Pavement Construction',
      description: 'Expert design and installation of driveways, walkways, and commercial paving solutions using premium materials and techniques.',
      link: '#pavements'
    },
    {
      id: 2,
      icon: 'fas fa-cubes',
      title: 'Concrete Blocks & Retaining Walls',
      description: 'Custom concrete block construction for residential and commercial properties, including durable retaining walls.',
      link: '#blocks'
    },
    {
      id: 3,
      icon: 'fas fa-building',
      title: 'Building Construction',
      description: 'Full-service construction from planning to completion for residential and commercial projects in Mossel Bay.',
      link: '#building'
    }
  ];

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    serviceCardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      serviceCardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  // Handle service card hover effect for 3D tilt
  const handleMouseMove = (e, index) => {
    const card = serviceCardsRef.current[index];
    if (!card) return;

    const cardRect = card.getBoundingClientRect();
    const x = e.clientX - cardRect.left;
    const y = e.clientY - cardRect.top;

    const centerX = cardRect.width / 2;
    const centerY = cardRect.height / 2;

    const rotateY = (x - centerX) / 25;
    const rotateX = (centerY - y) / 25;

    card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = (index) => {
    const card = serviceCardsRef.current[index];
    if (card) {
      card.style.transform = 'translateY(-15px) rotateX(0deg) rotateY(0deg) scale(1.03)';
    }
  };

  const handleServiceClick = (link) => {
    // This would navigate to a detailed service page
    console.log(`Navigating to: ${link}`);
    // For now, we'll just scroll to the contact section
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-title">
          <h2>Our Specialized Services</h2>
          <p>We provide comprehensive construction solutions with a focus on quality and durability.</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => serviceCardsRef.current[index] = el}
              className="service-card"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => handleServiceClick(service.link)}
            >
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-link">
                  <span>Learn More</span>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .services {
          padding: 5rem 0;
          background-color: var(--light);
          position: relative;
          overflow: hidden;
        }

        .services::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, var(--secondary), var(--accent), var(--primary));
          animation: progress 3s ease-in-out infinite alternate;
        }

        .section-title {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-title h2 {
          font-size: 2.2rem;
          color: var(--primary);
          margin-bottom: 1rem;
          position: relative;
          display: inline-block;
        }

        .section-title h2::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background-color: var(--secondary);
          animation: lineWidth 2s ease-in-out infinite alternate;
        }

        .section-title p {
          color: var(--gray);
          max-width: 700px;
          margin: 0 auto;
          font-size: 1.1rem;
          line-height: 1.8;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .service-card {
          background-color: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          cursor: pointer;
          opacity: 0;
          transform: translateY(30px) rotateX(10deg);
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .service-card.visible {
          opacity: 1;
          transform: translateY(0) rotateX(0deg);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .service-card:nth-child(1).visible { transition-delay: 0.1s; }
        .service-card:nth-child(2).visible { transition-delay: 0.2s; }
        .service-card:nth-child(3).visible { transition-delay: 0.3s; }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, transparent 30%, rgba(212, 175, 55, 0.05) 100%);
          z-index: 1;
          pointer-events: none;
          transition: all 0.3s ease;
        }

        .service-card:hover::before {
          background: linear-gradient(45deg, transparent 30%, rgba(212, 175, 55, 0.1) 100%);
        }

        .service-card:hover {
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          z-index: 2;
        }

        .service-icon {
          background: linear-gradient(135deg, var(--primary), #2c5282);
          color: var(--secondary);
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .service-card:hover .service-icon {
          background: linear-gradient(135deg, var(--primary), #1a365d);
          transform: scale(1.05);
        }

        .service-icon::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%);
          transform: rotate(45deg);
          animation: shine 3s infinite linear;
        }

        .service-content {
          padding: 2rem;
          position: relative;
          z-index: 2;
        }

        .service-content h3 {
          color: var(--primary);
          margin-bottom: 1rem;
          font-size: 1.5rem;
          transition: color 0.3s ease;
        }

        .service-card:hover .service-content h3 {
          color: var(--secondary);
        }

        .service-content p {
          color: var(--gray);
          margin-bottom: 1.5rem;
          line-height: 1.7;
          font-size: 1rem;
        }

        .service-link {
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 0.5rem 0;
          transition: all 0.3s ease;
        }

        .service-link span {
          position: relative;
          z-index: 2;
        }

        .service-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--accent);
          transform: translateX(-100%);
          transition: transform 0.4s ease;
        }

        .service-card:hover .service-link::after {
          transform: translateX(0);
        }

        .service-link i {
          margin-left: 10px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          z-index: 2;
        }

        .service-card:hover .service-link i {
          transform: translateX(8px) rotate(90deg);
          color: var(--secondary);
        }

        .service-link:hover {
          color: var(--secondary);
        }

        /* Hover effect for the entire card */
        .service-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(26, 54, 93, 0.1), rgba(212, 175, 55, 0.05));
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .service-card:hover::after {
          opacity: 1;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .services {
            padding: 4rem 0;
          }

          .section-title h2 {
            font-size: 1.8rem;
          }

          .section-title p {
            font-size: 1rem;
            padding: 0 1rem;
          }

          .services-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin: 3rem auto 0;
          }

          .service-card {
            transform: translateY(20px);
          }

          .service-content {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .services {
            padding: 3rem 0;
          }

          .section-title h2 {
            font-size: 1.6rem;
          }

          .service-icon {
            height: 100px;
            font-size: 2.5rem;
          }

          .service-content h3 {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;