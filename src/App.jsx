// Update your App.jsx to include ProjectsGallery
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ProjectsGallery from './components/ProjectsGallery'; // Add this import
import CTA from './components/CTA';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const nav = document.querySelector('.nav');
      const toggle = document.querySelector('.nav-toggle');
      
      if (window.innerWidth <= 768 && 
          isMenuOpen && 
          nav && 
          toggle && 
          !nav.contains(e.target) && 
          !toggle.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isMenuOpen && window.innerWidth <= 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="App">
      <ScrollProgress />
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} />
      <main>
        <Hero />
        <Services />
        <ProjectsGallery /> {/* Add this line */}
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;