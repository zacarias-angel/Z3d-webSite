import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-md border-b border-cardinal-red-500' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-display font-bold glow-red">
              Z3D
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-white hover:text-cardinal-red-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className="text-white hover:text-cardinal-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                Productos
              </button>
              <button
                onClick={() => scrollToSection('news')}
                className="text-white hover:text-cardinal-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                Ofertas
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-cardinal-red-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                Nosotros
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-cardinal-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                Contacto
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-cardinal-red-400 focus:outline-none focus:text-cardinal-red-400"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-cardinal-red-500">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-white hover:text-cardinal-red-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="text-white hover:text-cardinal-green-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
            >
              Productos
            </button>
            <button
              onClick={() => scrollToSection('news')}
              className="text-white hover:text-cardinal-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
            >
              Ofertas
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-cardinal-red-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-cardinal-green-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
            >
              Contacto
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
