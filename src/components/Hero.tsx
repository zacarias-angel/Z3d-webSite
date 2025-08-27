import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
  
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
          <source src="/videoIntro.mp4" type="video/mp4" />
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

        </div>
      </div>
    </section>
  );
};

export default Hero;
