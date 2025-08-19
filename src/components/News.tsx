import React from 'react';

interface SpecialOffer {
  id: number;
  title: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  image: string;
  category: string;
  validUntil: string;
  stock: number;
}

const News: React.FC = () => {
  const specialOffers: SpecialOffer[] = [
    {
      id: 1,
      title: "Prototipado Rápido - 30% OFF",
      description: "Prototipado rápido en PLA/PETG con acabado profesional. Oferta limitada por tiempo.",
      originalPrice: 35.00,
      discountPrice: 24.50,
      discountPercentage: 30,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
      category: "Prototipado",
      validUntil: "2024-01-31",
      stock: 15
    },
    {
      id: 2,
      title: "Piezas Industriales - Liquidación",
      description: "Piezas resistentes en ABS/PC para uso industrial. Stock limitado disponible.",
      originalPrice: 60.00,
      discountPrice: 42.00,
      discountPercentage: 30,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
      category: "Industrial",
      validUntil: "2024-01-25",
      stock: 8
    },
    {
      id: 3,
      title: "Modelos Arquitectónicos - 25% OFF",
      description: "Maquetas detalladas para presentaciones arquitectónicas. Oferta especial para estudiantes.",
      originalPrice: 45.00,
      discountPrice: 33.75,
      discountPercentage: 25,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
      category: "Arquitectura",
      validUntil: "2024-02-05",
      stock: 12
    },
    {
      id: 4,
      title: "Juguetes Personalizados - 2x1",
      description: "Juguetes únicos y personalizados para niños. Lleva 2 por el precio de 1.",
      originalPrice: 25.00,
      discountPrice: 25.00,
      discountPercentage: 50,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
      category: "Juguetes",
      validUntil: "2024-01-28",
      stock: 20
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (dateString: string) => {
    const today = new Date();
    const endDate = new Date(dateString);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <section id="news" className="section-full bg-gradient-to-bl from-black via-gray-900 to-black">
      <div className="section-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="glow-red">Ofertas</span>{" "}
            <span className="glow-green">de la Semana</span>{" "}
            <span className="glow-blue">&</span>{" "}
            <span className="glow-red">Liquidaciones</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Aprovecha nuestras ofertas especiales y liquidaciones con descuentos increíbles en servicios de impresión 3D
          </p>
        </div>

        {/* Cardinal Directions Timeline */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="w-4 h-4 bg-cardinal-black rounded-full mb-2"></div>
                <span className="text-xs text-gray-400">Ofertas</span>
              </div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-cardinal-black to-cardinal-red"></div>
              <div className="text-center">
                <div className="w-4 h-4 bg-cardinal-red rounded-full mb-2 animate-pulse"></div>
                <span className="text-xs text-gray-400">Liquidaciones</span>
              </div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-cardinal-red to-cardinal-green"></div>
              <div className="text-center">
                <div className="w-4 h-4 bg-cardinal-green rounded-full mb-2"></div>
                <span className="text-xs text-gray-400">Descuentos</span>
              </div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-cardinal-green to-cardinal-blue"></div>
              <div className="text-center">
                <div className="w-4 h-4 bg-cardinal-blue rounded-full mb-2"></div>
                <span className="text-xs text-gray-400">Especiales</span>
              </div>
            </div>
          </div>
        </div>

        {/* Special Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specialOffers.map((offer) => (
            <article
              key={offer.id}
              className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-cardinal-red-500 transition-all duration-300 transform hover:scale-105"
            >
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-cardinal-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{offer.discountPercentage}%
                </div>
              </div>

              {/* Stock Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-cardinal-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Stock: {offer.stock}
                </div>
              </div>

              {/* Article Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cardinal-blue-500 text-white">
                    {offer.category}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">
                    Válido hasta: {formatDate(offer.validUntil)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cardinal-red-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-400">
                      {getDaysRemaining(offer.validUntil)} días restantes
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-display font-semibold mb-3 text-white group-hover:text-cardinal-red-400 transition-colors duration-300">
                  {offer.title}
                </h3>
                
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {offer.description}
                </p>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-display font-bold text-cardinal-green-400">
                      ${offer.discountPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${offer.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">por unidad</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 text-sm">
                    Ver Detalles
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 text-sm">
                    Comprar
                  </button>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cardinal-red-500/5 to-cardinal-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </article>
          ))}
        </div>

      
      </div>
    </section>
  );
};

export default News;
