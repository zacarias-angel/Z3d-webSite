import React, { useState, useEffect } from 'react';
import { logout, getCurrentUser } from '../utils/auth';
import ImageUpload from './ImageUpload';

interface Product {
  id: number;
  nombre: string;
  precio: number;
  img: string;
  descripcion: string;
}

interface SpecialOffer {
  id: number;
  titulo: string;
  precio: number;
  descripcion: string;
  img?: string;
}

interface AdminPanelProps {
  onClose?: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    img: '',
    descripcion: ''
  });
  const [selectedImage, setSelectedImage] = useState<{ filename: string; url: string } | null>(null);
  const [productUploadFn, setProductUploadFn] = useState<(() => Promise<{ filename: string; url: string } | null>) | null>(null);

  // Estados para ofertas especiales
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>([]);
  const [offerUploadFn, setOfferUploadFn] = useState<(() => Promise<{ filename: string; url: string } | null>) | null>(null);
  const [editingOffer, setEditingOffer] = useState<SpecialOffer | null>(null);
  const [isAddingOffer, setIsAddingOffer] = useState(false);
  const [offerFormData, setOfferFormData] = useState({
    titulo: '',
    precio: '',
    descripcion: '',
    img: ''
  });
  const [selectedOfferImage, setSelectedOfferImage] = useState<{ filename: string; url: string } | null>(null);

  const [activeTab, setActiveTab] = useState('products');

  // URL base para los endpoints PHP en el servidor
  const API_BASE_URL = 'https://z3d.pro/back';

  // Cargar información del usuario actual
  useEffect(() => {
    const loadCurrentUser = async () => {
      const user = await getCurrentUser();
      
      setCurrentUser(user);
    };
    loadCurrentUser();
  }, []);

  // Cargar productos por defecto al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

    // Función para obtener todos los productos
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products/getProducts.php`);
      const data = await response.json();
      
      if (data.success && data.products) {
        setProducts(data.products);
      } else {
        setProducts([]); // Inicializar como array vacío
        setError(data.error || 'Error al cargar productos');
      }
    } catch (err) {
      setProducts([]); // Inicializar como array vacío en caso de error
      setError('Error de conexión al servidor');
    } finally {
      setLoading(false);
    }
  };

  // Función para agregar un producto
  const addProduct = async (productData: Omit<Product, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products/addProduct.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(productData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Recargar la lista de productos
        await fetchProducts();
        setIsAddingProduct(false);
        setFormData({
          nombre: '',
          precio: '',
          img: '',
          descripcion: ''
        });
        setSelectedImage(null);
      } else {
        setError(data.error || 'Error al agregar producto');
      }
         } catch (err) {
       setError('Error de conexión al servidor');
     } finally {
      setLoading(false);
    }
  };

  // Función para actualizar un producto
  const updateProduct = async (id: number, productData: Omit<Product, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products/updateProduct.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id, ...productData }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Recargar la lista de productos
        await fetchProducts();
        setEditingProduct(null);
        setFormData({
          nombre: '',
          precio: '',
          img: '',
          descripcion: ''
        });
        setSelectedImage(null);
      } else {
        setError(data.error || 'Error al actualizar producto');
      }
         } catch (err) {
       setError('Error de conexión al servidor');
     } finally {
      setLoading(false);
    }
  };

  // Función para eliminar un producto
  const deleteProduct = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products/deleteProduct.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Recargar la lista de productos
        await fetchProducts();
      } else {
        setError(data.error || 'Error al eliminar producto');
      }
         } catch (err) {
       setError('Error de conexión al servidor');
     } finally {
      setLoading(false);
    }
  };

  // Función para obtener todas las ofertas especiales
  const fetchOffers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products/getProducts.php?type=offers`);
      const data = await response.json();
      
      if (data.success && data.offers) {
        setSpecialOffers(data.offers);
      } else {
        setSpecialOffers([]); // Inicializar como array vacío
        setError(data.error || 'Error al cargar ofertas');
      }
    } catch (err) {
      setSpecialOffers([]); // Inicializar como array vacío en caso de error
      setError('Error de conexión al servidor');
    } finally {
      setLoading(false);
    }
  };

    // Función para agregar una oferta especial
  const addOffer = async (offerData: Omit<SpecialOffer, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products/addProduct.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ...offerData, type: 'offers' }),
      });
      
      const data = await response.json();
      
              if (data.success) {
          await fetchOffers();
          setIsAddingOffer(false);
          setOfferFormData({
            titulo: '',
            precio: '',
            descripcion: '',
            img: ''
          });
          setSelectedOfferImage(null);
        } else {
         setError(data.error || 'Error al agregar oferta');
       }
     } catch (err) {
       setError('Error de conexión al servidor');
     } finally {
      setLoading(false);
    }
  };

  // Función para actualizar una oferta especial
  const updateOffer = async (id: number, offerData: Omit<SpecialOffer, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products/updateProduct.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id, ...offerData, type: 'offers' }),
      });
      
      const data = await response.json();
      
             if (data.success) {
         await fetchOffers();
         setEditingOffer(null);
         setOfferFormData({
           titulo: '',
           precio: '',
           descripcion: '',
           img: ''
         });
         setSelectedOfferImage(null);
       } else {
        setError(data.error || 'Error al actualizar oferta');
      }
    } catch (err) {
      setError('Error de conexión al servidor');
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar una oferta especial
  const deleteOffer = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta oferta?')) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products/deleteProduct.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id, type: 'offers' }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        await fetchOffers();
      } else {
        setError(data.error || 'Error al eliminar oferta');
      }
    } catch (err) {
      setError('Error de conexión al servidor');
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos según la pestaña activa
  useEffect(() => {
    setError(null); // Limpiar errores al cambiar de pestaña
    if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'offers') {
      fetchOffers();
    }
  }, [activeTab]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOfferInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOfferFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUploaded = (imageData: { filename: string; url: string }) => {
    setSelectedImage(imageData);
    setFormData(prev => ({
      ...prev,
      img: imageData.url
    }));
  };

  // Función para manejar cuando se selecciona una imagen (antes de subir)
  const handleImageSelected = (imageData: { filename: string; url: string }) => {
    setSelectedImage(imageData);
  };

  const handleProductUploadReady = (uploadFn: () => Promise<{ filename: string; url: string } | null>) => {
    setProductUploadFn(() => uploadFn);
  };

  const handleOfferImageUploaded = (imageData: { filename: string; url: string }) => {
    setSelectedOfferImage(imageData);
    setOfferFormData(prev => ({
      ...prev,
      img: imageData.url
    }));
  };

  // Función para manejar cuando se selecciona una imagen de oferta (antes de subir)
  const handleOfferImageSelected = (imageData: { filename: string; url: string }) => {
    setSelectedOfferImage(imageData);
  };

  const handleOfferUploadReady = (uploadFn: () => Promise<{ filename: string; url: string } | null>) => {
    setOfferUploadFn(() => uploadFn);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Subir imagen si hay una seleccionada
    let imageUrl = formData.img;
    if (productUploadFn && selectedImage) {
      const uploadResult = await productUploadFn();
      if (uploadResult) {
        imageUrl = uploadResult.url;
      }
    }
    
    const productData = {
      nombre: formData.nombre,
      precio: parseFloat(formData.precio),
      img: imageUrl,
      descripcion: formData.descripcion
    };
    
    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
    } else {
      await addProduct(productData);
    }
  };

  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Subir imagen si hay una seleccionada
    let imageUrl = offerFormData.img;
    if (offerUploadFn && selectedOfferImage) {
      const uploadResult = await offerUploadFn();
      if (uploadResult) {
        imageUrl = uploadResult.url;
      }
    }
    
    const offerData = {
      titulo: offerFormData.titulo,
      precio: parseFloat(offerFormData.precio),
      descripcion: offerFormData.descripcion,
      img: imageUrl
    };
    

    
    if (editingOffer) {
      await updateOffer(editingOffer.id, offerData);
    } else {
      await addOffer(offerData);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      nombre: product.nombre,
      precio: product.precio.toString(),
      img: product.img,
      descripcion: product.descripcion
    });
    setSelectedImage({ filename: '', url: product.img });
  };

  const handleDelete = (id: number) => {
    deleteProduct(id);
  };

     const handleOfferEdit = (offer: SpecialOffer) => {
     setEditingOffer(offer);
     setOfferFormData({
       titulo: offer.titulo,
       precio: offer.precio.toString(),
       descripcion: offer.descripcion,
       img: offer.img || ''
     });
     setSelectedOfferImage(null);
   };

  const handleOfferDelete = (id: number) => {
    deleteOffer(id);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setIsAddingProduct(false);
    setFormData({
      nombre: '',
      precio: '',
      img: '',
      descripcion: ''
    });
    setSelectedImage(null);
  };

     const cancelOfferEdit = () => {
     setEditingOffer(null);
     setIsAddingOffer(false);
     setOfferFormData({
       titulo: '',
       precio: '',
       descripcion: '',
       img: ''
     });
     setSelectedOfferImage(null);
   };

  const handleLogout = async () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      await logout();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-2 sm:p-4">
        <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-800 w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-cardinal-red-500/20 to-cardinal-blue-500/20 p-4 sm:p-6 border-b border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                  Panel de Administración
                </h2>
                {currentUser && (
                  <span className="text-xs sm:text-sm text-gray-300">
                    Usuario: {currentUser.admin}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                  onClick={handleLogout}
                  className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 text-xs sm:text-sm"
                >
                  Cerrar Sesión
                </button>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap border-b border-gray-800">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3 sm:px-6 py-3 font-medium transition-colors duration-300 text-sm sm:text-base ${
                activeTab === 'products' 
                  ? 'text-cardinal-green-400 border-b-2 border-cardinal-green-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Productos
            </button>
            <button
              onClick={() => setActiveTab('offers')}
              className={`px-3 sm:px-6 py-3 font-medium transition-colors duration-300 text-sm sm:text-base ${
                activeTab === 'offers' 
                  ? 'text-cardinal-red-400 border-b-2 border-cardinal-red-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Ofertas
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 sm:px-6 py-3 font-medium transition-colors duration-300 text-sm sm:text-base ${
                activeTab === 'analytics' 
                  ? 'text-cardinal-red-400 border-b-2 border-cardinal-red-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Analytics
            </button>
          </div>

                     {/* Error Message - Solo mostrar si hay error y no estamos cargando */}
           {error && !loading && (
             <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 m-4 rounded-lg">
               {error}
             </div>
           )}

          {/* Content */}
          <div className="p-3 sm:p-6 overflow-y-auto max-h-[calc(95vh-200px)] sm:max-h-[calc(90vh-200px)]">
            {activeTab === 'products' && (
              <div className="space-y-6">
                {/* Add Product Button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                  <h3 className="text-lg sm:text-xl font-display font-semibold text-white">
                    Gestión de Productos
                  </h3>
                  <button
                    onClick={() => setIsAddingProduct(true)}
                    className="btn-success text-sm sm:text-base"
                    disabled={loading}
                  >
                    {loading ? 'Cargando...' : '+ Agregar Producto'}
                  </button>
                </div>

                {/* Add/Edit Product Form */}
                {(isAddingProduct || editingProduct) && (
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-4">
                      {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                    </h4>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Nombre del Producto
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cardinal-green-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Descripción
                        </label>
                        <textarea
                          name="descripcion"
                          value={formData.descripcion}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cardinal-green-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Precio ($)
                          </label>
                          <input
                            type="number"
                            name="precio"
                            value={formData.precio}
                            onChange={handleInputChange}
                            required
                            step="0.01"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cardinal-green-500"
                          />
                        </div>
                      </div>

                                                                   {/* Componente de subida de imágenes */}
                                             <ImageUpload
                         onImageUploaded={handleImageUploaded}
                         onImageSelected={handleImageSelected}
                         onUploadReady={handleProductUploadReady}
                         currentImage={editingProduct?.img}
                         type="products"
                       />

                      <div className="flex space-x-4">
                        <button 
                          type="submit" 
                          className="btn-success"
                          disabled={loading}
                        >
                          {loading ? 'Guardando...' : (editingProduct ? 'Actualizar' : 'Agregar') + ' Producto'}
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
                          disabled={loading}
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Products Table */}
                <div className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700">
                  {loading && !isAddingProduct && !editingProduct ? (
                    <div className="p-4 sm:p-8 text-center">
                      <div className="text-gray-400">Cargando productos...</div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-700/50">
                          <tr>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Producto
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Precio
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                                                     {products && products.length === 0 ? (
                            <tr>
                              <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                                No hay productos disponibles
                              </td>
                            </tr>
                          ) : (
                                                         products && products.map((product) => (
                              <tr key={product.id} className="hover:bg-gray-700/30 transition-colors duration-300">
                                <td className="px-3 sm:px-6 py-4">
                                  <div className="flex items-center">
                                    {product.img && (
                                      <img
                                        src={product.img}
                                        alt={product.nombre}
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover mr-2 sm:mr-3"
                                        onError={(e) => {
                                          e.currentTarget.style.display = 'none';
                                        }}
                                      />
                                    )}
                                    <div className="min-w-0 flex-1">
                                      <div className="text-xs sm:text-sm font-medium text-white truncate">{product.nombre}</div>
                                      <div className="text-xs sm:text-sm text-gray-400 truncate">{product.descripcion.substring(0, 30)}...</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm text-white">
                                  ${product.precio.toFixed(2)}
                                </td>
                                <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm font-medium">
                                  <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                                    <button
                                      onClick={() => handleEdit(product)}
                                      className="text-cardinal-blue-400 hover:text-cardinal-blue-300 transition-colors duration-300"
                                      disabled={loading}
                                    >
                                      Editar
                                    </button>
                                    <button
                                      onClick={() => handleDelete(product.id)}
                                      className="text-cardinal-red-400 hover:text-cardinal-red-300 transition-colors duration-300"
                                      disabled={loading}
                                    >
                                      Eliminar
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'offers' && (
              <div className="space-y-6">
                {/* Add Offer Button */}
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-display font-semibold text-white">
                    Gestión de Ofertas Especiales
                  </h3>
                  <button
                    onClick={() => setIsAddingOffer(true)}
                    className="btn-success"
                    disabled={loading}
                  >
                    {loading ? 'Cargando...' : '+ Agregar Oferta'}
                  </button>
                </div>

                {/* Add/Edit Offer Form */}
                {(isAddingOffer || editingOffer) && (
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-4">
                      {editingOffer ? 'Editar Oferta' : 'Agregar Nueva Oferta'}
                    </h4>
                    
                    <form onSubmit={handleOfferSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Título de la Oferta
                        </label>
                        <input
                          type="text"
                          name="titulo"
                          value={offerFormData.titulo}
                          onChange={handleOfferInputChange}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cardinal-red-500 focus:border-transparent"
                          placeholder="Ej: Prototipado Rápido - 30% OFF"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Precio
                        </label>
                        <input
                          type="number"
                          name="precio"
                          value={offerFormData.precio}
                          onChange={handleOfferInputChange}
                          step="0.01"
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cardinal-red-500 focus:border-transparent"
                          placeholder="0.00"
                          required
                        />
                      </div>

                                             <div>
                         <label className="block text-sm font-medium text-gray-300 mb-2">
                           Descripción
                         </label>
                         <textarea
                           name="descripcion"
                           value={offerFormData.descripcion}
                           onChange={handleOfferInputChange}
                           rows={3}
                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cardinal-red-500 focus:border-transparent"
                           placeholder="Describe los detalles de la oferta..."
                           required
                         />
                       </div>

                      {/* Componente de subida de imágenes para ofertas */}
                                             <ImageUpload
                         onImageUploaded={handleOfferImageUploaded}
                         onImageSelected={handleOfferImageSelected}
                         onUploadReady={handleOfferUploadReady}
                         currentImage={editingOffer?.img}
                         type="offers"
                       />

                      <div className="flex space-x-3">
                        <button
                          type="submit"
                          className="btn-success"
                          disabled={loading}
                        >
                          {loading ? 'Guardando...' : (editingOffer ? 'Actualizar Oferta' : 'Agregar Oferta')}
                        </button>
                        <button
                          type="button"
                          onClick={cancelOfferEdit}
                          className="btn-secondary"
                          disabled={loading}
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Offers List */}
                {!isAddingOffer && !editingOffer && (
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-700">
                      <h4 className="text-lg font-semibold text-white">
                                                 Ofertas Especiales ({specialOffers ? specialOffers.length : 0})
                      </h4>
                    </div>
                    
                    {loading ? (
                      <div className="p-6 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cardinal-red-500 mx-auto"></div>
                        <p className="text-gray-400 mt-2">Cargando ofertas...</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                          <thead className="bg-gray-700/50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Oferta
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Precio
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Acciones
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {!specialOffers || specialOffers.length === 0 ? (
                              <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                                  No hay ofertas especiales disponibles
                                </td>
                              </tr>
                            ) : (
                              specialOffers.map((offer) => (
                                <tr key={offer.id} className="hover:bg-gray-700/30 transition-colors duration-300">
                                                                     <td className="px-6 py-4 whitespace-nowrap">
                                     <div className="flex items-center">
                                       {offer.img && (
                                         <img
                                           src={offer.img}
                                           alt={offer.titulo}
                                           className="w-10 h-10 rounded-lg object-cover mr-3"
                                           onError={(e) => {
                                             e.currentTarget.style.display = 'none';
                                           }}
                                         />
                                       )}
                                       <div>
                                         <div className="text-sm font-medium text-white">{offer.titulo}</div>
                                         <div className="text-sm text-gray-400">{offer.descripcion.substring(0, 50)}...</div>
                                       </div>
                                     </div>
                                   </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                    ${offer.precio.toFixed(2)}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                      <button
                                        onClick={() => handleOfferEdit(offer)}
                                        className="text-cardinal-blue-400 hover:text-cardinal-blue-300 transition-colors duration-300"
                                        disabled={loading}
                                      >
                                        Editar
                                      </button>
                                      <button
                                        onClick={() => handleOfferDelete(offer.id)}
                                        className="text-cardinal-red-400 hover:text-cardinal-red-300 transition-colors duration-300"
                                        disabled={loading}
                                      >
                                        Eliminar
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}



            {activeTab === 'analytics' && (
              <div className="text-center py-12">
                <h3 className="text-xl font-display font-semibold text-white mb-4">
                  Analytics y Reportes
                </h3>
                <p className="text-gray-400">
                  Funcionalidad de analytics en desarrollo...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
