import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SpecialOffer {
  id: number;
  titulo: string;
  precio: number;
  descripcion: string;
  img?: string;
}

const News: React.FC = () => {
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOffers, setTotalOffers] = useState(0);
  const [offersPerPage] = useState(6);
  const navigate = useNavigate();

  const API_BASE_URL = 'https://z3d.pro/back';

  // Cargar ofertas especiales desde la API
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/products/getProducts.php?type=offers&page=${currentPage}&limit=${offersPerPage}`);
        const data = await response.json();
        
        if (data.success) {
          setSpecialOffers(data.offers || []);
          setTotalPages(data.totalPages || 1);
          setTotalOffers(data.totalOffers || 0);
        } else {
          setError(data.error || 'Error al cargar ofertas');
        }
      } catch (err) {
        setError('Error de conexión al servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [currentPage, offersPerPage]);

  const handleConsultaProducto = (offer: SpecialOffer) => {
    // Crear mensaje predeterminado con información de la oferta
    const mensajePredeterminado = `Hola, estoy interesado en la siguiente oferta especial:

🔥 OFERTA: ${offer.titulo}
💰 PRECIO: $${offer.precio}
📝 DESCRIPCIÓN: ${offer.descripcion}

Me gustaría obtener más información sobre:
• Disponibilidad de la oferta
• Tiempos de entrega
• Opciones de personalización
• Condiciones de pago
• Garantías
• Proceso de reserva

Por favor, contactenme para discutir los detalles y confirmar mi interés en esta oferta especial.

¡Gracias!`;

    // Navegar al formulario de contacto con los datos pre-rellenados
    navigate('/#contact', { 
      state: { 
        prefillData: {
          service: offer.titulo,
          message: mensajePredeterminado
        }
      }
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
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
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cardinal-red-500"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
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
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        </div>
      </section>
    );
  }

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
        

        {/* Special Offers Grid */}
        {specialOffers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specialOffers.map((offer) => (
              <article
                key={offer.id}
                className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-cardinal-red-500 transition-all duration-300 transform hover:scale-105"
              >
                                 {/* Article Image */}
                 <div className="relative aspect-[4/3] overflow-hidden">
                   <img
                     src={offer.img || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"}
                     alt={offer.titulo}
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                     onError={(e) => {
                       const target = e.target as HTMLImageElement;
                       target.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop";
                     }}
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 </div>

                {/* Article Content */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold mb-3 text-white group-hover:text-cardinal-red-400 transition-colors duration-300">
                    {offer.titulo}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {offer.descripcion}
                  </p>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-display font-bold text-cardinal-green-400">
                        ${offer.precio.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">por unidad</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 text-sm">
                      Ver Detalles
                    </button>
                    <button 
                      onClick={() => handleConsultaProducto(offer)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 text-sm"
                    >
                      Consulta este producto
                    </button>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cardinal-red-500/5 to-cardinal-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-display font-semibold mb-2 text-white">
                No hay ofertas especiales disponibles
              </h3>
              <p className="text-gray-400 text-lg">
                En este momento no tenemos ofertas especiales activas. 
                ¡Vuelve pronto para aprovechar nuestras mejores promociones!
              </p>
            </div>
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                Anterior
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                    currentPage === page
                      ? 'bg-cardinal-red-500 text-white'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* Información de paginación */}
        {totalOffers > 0 && (
          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm">
              Mostrando {((currentPage - 1) * offersPerPage) + 1} - {Math.min(currentPage * offersPerPage, totalOffers)} de {totalOffers} ofertas
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
