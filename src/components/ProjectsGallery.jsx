// src/components/ProjectsGallery.jsx
import React, { useState, useEffect, useRef } from 'react';

const ProjectsGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const galleryRef = useRef(null);

  // Project categories
  const categories = [
    { id: 'all', name: 'All Projects', icon: 'fas fa-th', count: 24 },
    { id: 'pavements', name: 'Pavements', icon: 'fas fa-road', count: 8 },
    { id: 'blocks', name: 'Blocks & Walls', icon: 'fas fa-cubes', count: 6 },
    { id: 'building', name: 'Building', icon: 'fas fa-building', count: 6 },
    { id: 'commercial', name: 'Commercial', icon: 'fas fa-store', count: 4 },
  ];

  // Sample projects data - In a real app, this would come from an API
  const projectsData = [
    // Pavement Projects
    { id: 1, category: 'pavements', title: 'Driveway', location: 'Mossel Bay', year: '2025', image: '/6042103436343446957.jpg', description: 'Premium patterned concrete driveway with decorative borders.' },
    { id: 2, category: 'pavements', title: 'Commercial Parking Lot', location: 'George', year: '2025', image: '/commercialdriveway.jpg.jpg', description: 'Large-scale commercial parking lot with proper drainage systems.' },
    { id: 3, category: 'pavements', title: 'Garden Pathway', location: 'Mossel Bay', year: '2024', image: '/6042103436343446950.jpg', description: 'Decorative stone pathway with integrated landscape lighting.' },
    { id: 4, category: 'pavements', title: 'Residential Street', location: 'Knysna', year: '2024', image: '/residentialpathway.png.jpg', description: 'Complete residential street pavement with curb installation.' },
    
    // Blocks & Walls Projects
    { id: 5, category: 'blocks', title: 'Garden Retaining Wall', location: 'Mossel Bay', year: '2025', image: '/retainingwall.jpg', description: 'Decorative concrete block retaining wall with integrated planters.' },
    { id: 6, category: 'blocks', title: 'Security Wall', location: 'George', year: '2025', image: '/6042103436343446948.jpg', description: 'High-security perimeter wall with modern design elements.' },
    
    
    // Building Projects
    { id: 8, category: 'building', title: 'Modern House Extension', location: 'Mossel Bay', year: '2025', image: '/public/building.jpg', description: 'Two-story house extension with contemporary architectural design.' },
    { id: 9, category: 'building', title: 'Office Complex', location: 'George', year: '2024', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Commercial office building construction from foundation to completion.' },
    { id: 10, category: 'building', title: 'Duplex Development', location: 'Mossel Bay', year: '2024', image: 'https://images.unsplash.com/photo-1567496898669-ee935f003f30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Modern duplex housing development with shared amenities.' },
    
    // Commercial Projects
    { id: 11, category: 'commercial', title: 'Shopping Center', location: 'Knysna', year: '2025', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Large shopping center construction including parking facilities.' },
    { id: 12, category: 'commercial', title: 'Industrial Warehouse', location: 'George', year: '2024', image: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Industrial warehouse construction with specialized loading facilities.' },
  ];

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === selectedCategory);

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    
    // Scroll to gallery after filter change (on mobile)
    if (window.innerWidth <= 768 && galleryRef.current) {
      setTimeout(() => {
        galleryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  // Handle project click
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Animation for gallery items
  useEffect(() => {
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

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => observer.observe(card));

    return () => {
      projectCards.forEach(card => observer.unobserve(card));
    };
  }, [filteredProjects]);

  // Handle modal navigation
  const navigateProject = (direction) => {
    if (!selectedProject) return;
    
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredProjects.length;
    } else {
      newIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    }
    
    setSelectedProject(filteredProjects[newIndex]);
  };

  return (
    <section className="projects-gallery" id="projects" ref={galleryRef}>
      <div className="container">
        {/* Header */}
        <div className="projects-header">
          <div className="section-title">
            <h2>Our Portfolio</h2>
            <p>Explore our completed projects across Mossel Bay and the Garden Route</p>
          </div>
          
          {/* Stats */}
          <div className="projects-stats">
            <div className="stat">
              <div className="stat-number">99+</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat">
              <div className="stat-number">6</div>
              <div className="stat-label">Cities</div>
            </div>
            <div className="stat">
              <div className="stat-number">100%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          <div className="filter-container">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <i className={category.icon}></i>
                <span>{category.name}</span>
                <span className="project-count">{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => handleProjectClick(project)}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-overlay">
                  <div className="overlay-content">
                    <i className="fas fa-search-plus"></i>
                    <span>View Details</span>
                  </div>
                </div>
                <div className="project-badge">
                  <i className={categories.find(c => c.id === project.category)?.icon}></i>
                  <span>{categories.find(c => c.id === project.category)?.name}</span>
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <div className="project-meta">
                  <span className="location">
                    <i className="fas fa-map-marker-alt"></i>
                    {project.location}
                  </span>
                  <span className="year">
                    <i className="fas fa-calendar-alt"></i>
                    {project.year}
                  </span>
                </div>
                <p className="project-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-clipboard-list"></i>
            <h3>No projects found</h3>
            <p>We're currently working on new projects in this category. Check back soon!</p>
          </div>
        )}

        {/* CTA */}
        <div className="projects-cta">
          <h3>Have a Project in Mind?</h3>
          <p>Let's discuss how we can bring your vision to life with our expertise</p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              const contactSection = document.querySelector('#contact');
              if (contactSection) {
                window.scrollTo({
                  top: contactSection.offsetTop - 80,
                  behavior: 'smooth'
                });
              }
            }}
          >
            <i className="fas fa-comments"></i>
            Start a Conversation
          </button>
        </div>
      </div>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div className="project-modal">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>
            
            <button className="modal-nav prev" onClick={() => navigateProject('prev')}>
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <button className="modal-nav next" onClick={() => navigateProject('next')}>
              <i className="fas fa-chevron-right"></i>
            </button>

            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
              
              <div className="modal-info">
                <div className="modal-header">
                  <h2>{selectedProject.title}</h2>
                  <div className="modal-meta">
                    <span className="modal-category">
                      <i className={categories.find(c => c.id === selectedProject.category)?.icon}></i>
                      {categories.find(c => c.id === selectedProject.category)?.name}
                    </span>
                    <span className="modal-location">
                      <i className="fas fa-map-marker-alt"></i>
                      {selectedProject.location}
                    </span>
                    <span className="modal-year">
                      <i className="fas fa-calendar-alt"></i>
                      {selectedProject.year}
                    </span>
                  </div>
                </div>
                
                <div className="modal-description">
                  <p>{selectedProject.description}</p>
                </div>

                <div className="modal-features">
                  <h4>Project Features</h4>
                  <ul>
                    <li><i className="fas fa-check"></i> Premium materials used</li>
                    <li><i className="fas fa-check"></i> Expert craftsmanship</li>
                    <li><i className="fas fa-check"></i> On-time completion</li>
                    <li><i className="fas fa-check"></i> Quality guaranteed</li>
                  </ul>
                </div>

                <div className="modal-actions">
                  <button className="btn btn-primary">
                    <i className="fas fa-comments"></i>
                    Get Similar Quote
                  </button>
                  <button className="btn btn-secondary" onClick={closeModal}>
                    <i className="fas fa-times"></i>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .projects-gallery {
          padding: 5rem 0;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          position: relative;
          overflow: hidden;
        }

        /* Header */
        .projects-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-title h2 {
          font-size: 2.5rem;
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
          width: 80px;
          height: 4px;
          background-color: var(--secondary);
          border-radius: 2px;
        }

        .section-title p {
          color: var(--gray);
          max-width: 700px;
          margin: 2rem auto 0;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        /* Stats */
        .projects-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 3rem;
          flex-wrap: wrap;
        }

        .stat {
          background: white;
          border-radius: 15px;
          padding: 1.5rem 2rem;
          min-width: 120px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .stat:hover {
          transform: translateY(-5px);
          border-color: var(--secondary);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.5rem;
          font-family: 'Montserrat', sans-serif;
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--gray);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Category Filter */
        .category-filter {
          margin-bottom: 3rem;
          position: sticky;
          top: 80px;
          z-index: 100;
          background: white;
          padding: 1rem;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
        }

        .filter-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          justify-content: center;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem 1.5rem;
          border: 2px solid #e9ecef;
          background: white;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          color: var(--gray);
        }

        .filter-btn i {
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .filter-btn .project-count {
          background: #e9ecef;
          color: var(--gray);
          font-size: 0.8rem;
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          min-width: 24px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          border-color: var(--secondary);
          color: var(--primary);
          transform: translateY(-2px);
        }

        .filter-btn:hover i {
          color: var(--secondary);
        }

        .filter-btn.active {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }

        .filter-btn.active i {
          color: var(--secondary);
        }

        .filter-btn.active .project-count {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        /* Projects Grid */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .project-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          opacity: 0;
          transform: translateY(30px) scale(0.95);
        }

        .project-card.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .project-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }

        .project-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .project-card:hover .project-image img {
          transform: scale(1.1);
        }

        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(26, 54, 93, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .overlay-content {
          text-align: center;
          color: white;
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }

        .project-card:hover .overlay-content {
          transform: translateY(0);
        }

        .overlay-content i {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--secondary);
        }

        .overlay-content span {
          font-size: 1.1rem;
          font-weight: 600;
          display: block;
        }

        .project-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(255, 255, 255, 0.95);
          padding: 0.5rem 1rem;
          border-radius: 25px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--primary);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .project-badge i {
          color: var(--secondary);
        }

        .project-info {
          padding: 1.5rem;
        }

        .project-info h3 {
          color: var(--primary);
          margin-bottom: 1rem;
          font-size: 1.3rem;
          transition: color 0.3s ease;
        }

        .project-card:hover .project-info h3 {
          color: var(--secondary);
        }

        .project-meta {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1rem;
          color: var(--gray);
          font-size: 0.9rem;
        }

        .project-meta span {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .project-meta i {
          color: var(--secondary);
        }

        .project-description {
          color: var(--gray);
          line-height: 1.6;
          font-size: 0.95rem;
          margin-bottom: 0;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .empty-state i {
          font-size: 4rem;
          color: #e9ecef;
          margin-bottom: 1.5rem;
        }

        .empty-state h3 {
          color: var(--primary);
          margin-bottom: 1rem;
        }

        .empty-state p {
          color: var(--gray);
          max-width: 500px;
          margin: 0 auto;
        }

        /* Projects CTA */
        .projects-cta {
          text-align: center;
          background: linear-gradient(135deg, var(--primary), #2c5282);
          color: white;
          padding: 3rem;
          border-radius: 20px;
          margin-top: 3rem;
        }

        .projects-cta h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .projects-cta p {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Modal */
        .project-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: modalFadeIn 0.3s ease;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(5px);
        }

        .modal-content {
          position: relative;
          background: white;
          border-radius: 20px;
          max-width: 1000px;
          width: 100%;
          max-height: 90vh;
          overflow: hidden;
          z-index: 2001;
          animation: modalSlideIn 0.4s ease;
        }

        @keyframes modalSlideIn {
          from { transform: translateY(50px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 2002;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: var(--primary);
          transform: rotate(90deg);
        }

        .modal-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 2002;
          transition: all 0.3s ease;
        }

        .modal-nav.prev {
          left: 1.5rem;
        }

        .modal-nav.next {
          right: 1.5rem;
        }

        .modal-nav:hover {
          background: var(--primary);
          transform: translateY(-50%) scale(1.1);
        }

        .modal-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-image {
          height: 100%;
          min-height: 500px;
        }

        .modal-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-info {
          padding: 3rem;
          overflow-y: auto;
        }

        .modal-header {
          margin-bottom: 2rem;
        }

        .modal-header h2 {
          color: var(--primary);
          margin-bottom: 1rem;
          font-size: 2rem;
        }

        .modal-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          color: var(--gray);
        }

        .modal-meta span {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
        }

        .modal-meta i {
          color: var(--secondary);
        }

        .modal-description {
          margin-bottom: 2rem;
        }

        .modal-description p {
          color: var(--gray);
          line-height: 1.8;
          font-size: 1.05rem;
        }

        .modal-features {
          margin-bottom: 2rem;
        }

        .modal-features h4 {
          color: var(--primary);
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .modal-features ul {
          list-style: none;
          padding: 0;
        }

        .modal-features li {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.8rem;
          color: var(--gray);
        }

        .modal-features i {
          color: var(--accent);
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }

          .modal-body {
            grid-template-columns: 1fr;
            max-height: 95vh;
          }

          .modal-image {
            min-height: 300px;
            max-height: 400px;
          }
        }

        @media (max-width: 768px) {
          .projects-gallery {
            padding: 3rem 0;
          }

          .section-title h2 {
            font-size: 2rem;
          }

          .projects-stats {
            gap: 1.5rem;
          }

          .stat {
            padding: 1rem 1.5rem;
            min-width: 100px;
          }

          .stat-number {
            font-size: 2rem;
          }

          .category-filter {
            position: static;
            margin: 0 -20px 2rem;
            border-radius: 0;
            padding: 1rem 0;
            overflow-x: auto;
          }

          .filter-container {
            justify-content: flex-start;
            padding: 0 20px;
            flex-wrap: nowrap;
          }

          .filter-btn {
            white-space: nowrap;
            flex-shrink: 0;
          }

          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .projects-cta {
            padding: 2rem;
            margin: 2rem -20px 0;
            border-radius: 0;
          }

          .projects-cta h3 {
            font-size: 1.8rem;
          }

          .modal-content {
            max-height: 95vh;
          }

          .modal-info {
            padding: 2rem;
          }

          .modal-header h2 {
            font-size: 1.6rem;
          }
        }

        @media (max-width: 480px) {
          .section-title h2 {
            font-size: 1.8rem;
          }

          .stat-number {
            font-size: 1.8rem;
          }

          .project-image {
            height: 200px;
          }

          .modal-actions {
            flex-direction: column;
          }

          .modal-actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsGallery;