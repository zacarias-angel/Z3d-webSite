import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  const scrollToNext = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/imagenes/videoIntro.mp4" type="video/mp4" />
          {/* Fallback video or placeholder */}
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-slide-down">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6">
            <span className="glow-red">Z</span>
            <span className="glow-green">3</span>
            <span className="glow-blue">D</span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-300 font-light">
            Impresión 3D Profesional
          </p>
          
          <p className="text-lg md:text-xl mb-12 text-gray-400 max-w-2xl mx-auto">
            Transformamos ideas en realidad con tecnología de vanguardia. 
            Productos personalizados, prototipado rápido y soluciones innovadoras.
          </p>

          {/* Cardinal Directions Visual */}
          <div className="flex justify-center items-center mb-12">
            <div className="relative w-32 h-32">
              {/* North - Black */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-16 border-transparent border-b-cardinal-black"></div>
              
              {/* South - Red */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-16 border-transparent border-t-cardinal-red"></div>
              
              {/* East - Green */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-16 border-transparent border-l-cardinal-green"></div>
              
              {/* West - Blue */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-16 border-transparent border-r-cardinal-blue"></div>
              
              {/* Center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          <button
            onClick={scrollToNext}
            className="btn-primary text-lg px-8 py-4 animate-bounce"
          >
            Ver Más
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
