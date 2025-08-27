import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  img: string;
}

const Products: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const productsPerPage = 6;

  const API_BASE_URL = 'https://z3d.pro/back';

  // Cargar productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/products/getProducts.php`);
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.products);
        } else {
          setError(data.error || 'Error al cargar productos');
        }
             } catch (err) {
         setError('Error de conexión al servidor');
       } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
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
            <div className="flex justify-center mt-8">
              <div className="text-gray-400">Cargando productos...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="section-full bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="section-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="glow-green">Productos</span>{" "}
              <span className="glow-blue">Destacados</span>
            </h2>
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-8 max-w-md mx-auto">
              {error}
            </div>
          </div>
        </div>
      </section>
    );
  }

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

                 {products.length === 0 ? (
           <div className="text-center py-12">
             <p className="text-gray-400 text-lg">No hay productos disponibles en este momento.</p>
           </div>
         ) : (
           <>
             {/* Products Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
               {currentProducts.map((product) => (
                 <div
                   key={product.id}
                   className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-cardinal-red-500 transition-all duration-300 transform hover:scale-105"
                 >
                   {/* Product Image */}
                   <div className="relative h-48 overflow-hidden">
                     {product.img ? (
                       <img
                         src={product.img}
                         alt={product.nombre}
                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                         onError={(e) => {
                           const target = e.currentTarget as HTMLElement;
                           target.style.display = 'none';
                           const sibling = target.nextElementSibling as HTMLElement;
                           if (sibling) {
                             sibling.style.display = 'flex';
                           }
                         }}
                       />
                     ) : null}
                     <div 
                       className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-800"
                       style={{ display: product.img ? 'none' : 'flex' }}
                     >
                       <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                       </svg>
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                   </div>

                   {/* Product Info */}
                   <div className="p-6">
                     <h3 className="text-xl font-display font-semibold mb-2 text-white group-hover:text-cardinal-green-400 transition-colors duration-300">
                       {product.nombre}
                     </h3>
                     <p className="text-gray-400 mb-4 text-sm">
                       {product.descripcion}
                     </p>
                     
                     {/* Price */}
                     <div className="flex items-center justify-between mb-4">
                       <span className="text-2xl font-display font-bold text-cardinal-blue-400">
                         ${product.precio.toFixed(2)}
                       </span>
                       <span className="text-sm text-gray-500">por unidad</span>
                     </div>

                     {/* Action Buttons */}
                     <div className="flex space-x-3">
                       <button 
                         className="flex-1 bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 text-sm"
                       >
                         Ver Más
                       </button>
                       <button 
                         className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 text-sm"
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

                         {/* Pagination - Solo mostrar si hay más de 6 productos */}
             {products.length > productsPerPage && (
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
             {products.length > productsPerPage && (
               <div className="text-center mt-6">
                 <p className="text-gray-400">
                   Mostrando {startIndex + 1}-{Math.min(endIndex, products.length)} de {products.length} productos
                 </p>
               </div>
             )}
          </>
        )}
      </div>
    </section>
  );
};

export default Products;
