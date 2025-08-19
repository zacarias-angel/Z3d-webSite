import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const Products: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const allProducts: Product[] = [
    {
      id: 1,
      name: "Prototipo Rápido",
      description: "Prototipado rápido en PLA/PETG con acabado profesional",
      price: 25.00,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      category: "Prototipado"
    },
    {
      id: 2,
      name: "Piezas Industriales",
      description: "Piezas resistentes en ABS/PC para uso industrial",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      category: "Industrial"
    },
    {
      id: 3,
      name: "Modelos Arquitectónicos",
      description: "Maquetas detalladas para presentaciones arquitectónicas",
      price: 35.00,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      category: "Arquitectura"
    },
    {
      id: 4,
      name: "Juguetes Personalizados",
      description: "Juguetes únicos y personalizados para niños",
      price: 20.00,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      category: "Juguetes"
    },
    {
      id: 5,
      name: "Piezas de Repuesto",
      description: "Piezas de repuesto personalizadas para cualquier equipo",
      price: 30.00,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      category: "Repuestos"
    },
    {
      id: 6,
      name: "Arte 3D",
      description: "Esculturas y arte personalizado en 3D",
      price: 50.00,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      category: "Arte"
    },
    {
      id: 7,
      name: "Prototipos Médicos",
      description: "Modelos anatómicos y prototipos para aplicaciones médicas",
      price: 40.00,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      category: "Médico"
    },
    {
      id: 8,
      name: "Electrónica Personalizada",
      description: "Carcasas y componentes electrónicos personalizados",
      price: 28.00,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      category: "Electrónica"
    },
    {
      id: 9,
      name: "Herramientas Especializadas",
      description: "Herramientas y accesorios impresos en 3D para uso profesional",
      price: 38.00,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      category: "Herramientas"
    }
  ];

  // Calculate pagination
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVerMas = (productId: number) => {
    // Scroll to offers section when "Ver Más" is clicked
    const offersSection = document.getElementById('news');
    if (offersSection) {
      offersSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleComprar = (productId: number) => {
    // Scroll to contact section when "Comprar" is clicked
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="section-full bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="section-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="glow-green">Productos</span>{" "}
            <span className="glow-blue">Destacados</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Descubre nuestra gama de servicios de impresión 3D profesionales
          </p>
        </div>

        {/* Cardinal Directions Header */}
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-cardinal-black mx-auto mb-2 rounded-full"></div>
              <span className="text-sm text-gray-400">Norte</span>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-cardinal-red mx-auto mb-2 rounded-full"></div>
              <span className="text-sm text-gray-400">Sur</span>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-cardinal-green mx-auto mb-2 rounded-full"></div>
              <span className="text-sm text-gray-400">Este</span>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-cardinal-blue mx-auto mb-2 rounded-full"></div>
              <span className="text-sm text-gray-400">Oeste</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProducts.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-cardinal-red-500 transition-all duration-300 transform hover:scale-105"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cardinal-red-500 text-white">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold mb-2 text-white group-hover:text-cardinal-green-400 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-gray-400 mb-4 text-sm">
                  {product.description}
                </p>
                
                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-display font-bold text-cardinal-blue-400">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">por unidad</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button 
                    className="flex-1 bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 text-sm"
                    onClick={() => handleVerMas(product.id)}
                  >
                    Ver Más
                  </button>
                  <button 
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 text-sm"
                    onClick={() => handleComprar(product.id)}
                  >
                    Comprar
                  </button>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cardinal-red-500/10 to-cardinal-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              Anterior
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
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
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              Siguiente
            </button>
          </div>
        )}

        {/* Page Info */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Mostrando {startIndex + 1}-{Math.min(endIndex, allProducts.length)} de {allProducts.length} productos
          </p>
        </div>

        {/* View All Button */}
        
      </div>
    </section>
  );
};

export default Products;
