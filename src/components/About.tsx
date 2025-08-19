import React from 'react';

const About: React.FC = () => {
  const stats = [
    { number: "500+", label: "Proyectos Completados", color: "cardinal-red" },
    { number: "50+", label: "Clientes Satisfechos", color: "cardinal-green" },
    { number: "24/7", label: "Soporte Técnico", color: "cardinal-blue" },
    { number: "5+", label: "Años de Experiencia", color: "cardinal-black" }
  ];

  const values = [
    {
      title: "Innovación",
      description: "Siempre a la vanguardia de las últimas tecnologías de impresión 3D",
      icon: "🚀",
      color: "cardinal-red"
    },
    {
      title: "Calidad",
      description: "Comprometidos con la excelencia en cada proyecto que realizamos",
      icon: "⭐",
      color: "cardinal-green"
    },
    {
      title: "Sostenibilidad",
      description: "Utilizamos materiales eco-friendly y procesos responsables",
      icon: "🌱",
      color: "cardinal-blue"
    },
    {
      title: "Confianza",
      description: "Construimos relaciones duraderas basadas en la transparencia",
      icon: "🤝",
      color: "cardinal-black"
    }
  ];

  return (
    <section id="about" className="section-full bg-gradient-to-tr from-black via-gray-900 to-black">
      <div className="section-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                <span className="glow-red">Sobre</span>{" "}
                <span className="glow-green">Nosotros</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Somos una empresa líder en impresión 3D profesional, especializada en transformar ideas innovadoras en realidad tangible.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-display font-semibold mb-3 text-cardinal-red-400">
                  🎯 Nuestra Misión
                </h3>
                <p className="text-gray-300">
                  Democratizar el acceso a la tecnología de impresión 3D, proporcionando soluciones accesibles y de alta calidad para empresas y particulares.
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-display font-semibold mb-3 text-cardinal-green-400">
                  👁️ Nuestra Visión
                </h3>
                <p className="text-gray-300">
                  Ser la referencia en innovación y calidad en el sector de la impresión 3D, contribuyendo al desarrollo sostenible de la industria manufacturera.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl font-display font-bold mb-2 text-${stat.color}-400`}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="space-y-8">
            {/* Cardinal Directions Compass */}
            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-gray-800"></div>
                
                {/* Cardinal Directions */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="text-center">
                    <div className="w-6 h-6 bg-cardinal-black rounded-full mx-auto mb-2"></div>
                    <span className="text-sm text-gray-400">Norte</span>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
                  <div className="text-center">
                    <div className="w-6 h-6 bg-cardinal-red rounded-full mx-auto mb-2"></div>
                    <span className="text-sm text-gray-400">Sur</span>
                  </div>
                </div>
                
                <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2">
                  <div className="text-center">
                    <div className="w-6 h-6 bg-cardinal-green rounded-full mx-auto mb-2"></div>
                    <span className="text-sm text-gray-400">Este</span>
                  </div>
                </div>
                
                <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2">
                  <div className="text-center">
                    <div className="w-6 h-6 bg-cardinal-blue rounded-full mx-auto mb-2"></div>
                    <span className="text-sm text-gray-400">Oeste</span>
                  </div>
                </div>

                {/* Center */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-20 h-20 bg-gradient-to-br from-cardinal-red-500 to-cardinal-blue-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-2xl font-display font-bold text-white">Z3D</span>
                  </div>
                </div>

                {/* Connecting Lines */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60">
                  <div className="w-full h-full border border-gray-700 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800 text-center">
                  <div className="text-2xl mb-2">{value.icon}</div>
                  <h4 className="font-display font-semibold mb-2 text-white">{value.title}</h4>
                  <p className="text-xs text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-display font-bold mb-8 text-white">
            Nuestro <span className="glow-blue">Equipo</span>
          </h3>
          <p className="text-gray-400 mb-12 max-w-3xl mx-auto">
            Contamos con un equipo de expertos apasionados por la tecnología 3D, 
            comprometidos con brindar el mejor servicio y asesoramiento a nuestros clientes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <div className="w-24 h-24 bg-gradient-to-br from-cardinal-red-500 to-cardinal-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👨‍💻</span>
              </div>
              <h4 className="font-display font-semibold mb-2 text-white">Ingenieros 3D</h4>
              <p className="text-sm text-gray-400">Especialistas en modelado y optimización</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <div className="w-24 h-24 bg-gradient-to-br from-cardinal-green-500 to-cardinal-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🔧</span>
              </div>
              <h4 className="font-display font-semibold mb-2 text-white">Técnicos</h4>
              <p className="text-sm text-gray-400">Expertos en mantenimiento y calibración</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <div className="w-24 h-24 bg-gradient-to-br from-cardinal-blue-500 to-cardinal-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="font-display font-semibold mb-2 text-white">Diseñadores</h4>
              <p className="text-sm text-gray-400">Creativos especializados en 3D</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
