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

  // Función para obtener todos los productos
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
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

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      nombre: formData.nombre,
      precio: parseFloat(formData.precio),
      img: formData.img,
      descripcion: formData.descripcion
    };
    
    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
    } else {
      await addProduct(productData);
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

  const handleLogout = async () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      await logout();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-800 w-full max-w-6xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-cardinal-red-500/20 to-cardinal-blue-500/20 p-6 border-b border-gray-800">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-display font-bold text-white">
                  Panel de Administración
                </h2>
                {currentUser && (
                  <span className="text-sm text-gray-300">
                    Usuario: {currentUser.admin}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 text-sm"
                >
                  Cerrar Sesión
                </button>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 font-medium transition-colors duration-300 ${
                activeTab === 'products' 
                  ? 'text-cardinal-green-400 border-b-2 border-cardinal-green-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Productos
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 font-medium transition-colors duration-300 ${
                activeTab === 'orders' 
                  ? 'text-cardinal-blue-400 border-b-2 border-cardinal-blue-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Pedidos
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-3 font-medium transition-colors duration-300 ${
                activeTab === 'analytics' 
                  ? 'text-cardinal-red-400 border-b-2 border-cardinal-red-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Analytics
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 m-4 rounded-lg">
              {error}
            </div>
          )}

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {activeTab === 'products' && (
              <div className="space-y-6">
                {/* Add Product Button */}
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-display font-semibold text-white">
                    Gestión de Productos
                  </h3>
                  <button
                    onClick={() => setIsAddingProduct(true)}
                    className="btn-success"
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
                        currentImage={editingProduct?.img}
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
                    <div className="p-8 text-center">
                      <div className="text-gray-400">Cargando productos...</div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-700/50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Producto
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
                          {products.length === 0 ? (
                            <tr>
                              <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                                No hay productos disponibles
                              </td>
                            </tr>
                          ) : (
                            products.map((product) => (
                              <tr key={product.id} className="hover:bg-gray-700/30 transition-colors duration-300">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    {product.img && (
                                      <img
                                        src={product.img}
                                        alt={product.nombre}
                                        className="w-10 h-10 rounded-lg object-cover mr-3"
                                        onError={(e) => {
                                          e.currentTarget.style.display = 'none';
                                        }}
                                      />
                                    )}
                                    <div>
                                      <div className="text-sm font-medium text-white">{product.nombre}</div>
                                      <div className="text-sm text-gray-400">{product.descripcion.substring(0, 50)}...</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                  ${product.precio.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <div className="flex space-x-2">
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

            {activeTab === 'orders' && (
              <div className="text-center py-12">
                <h3 className="text-xl font-display font-semibold text-white mb-4">
                  Gestión de Pedidos
                </h3>
                <p className="text-gray-400">
                  Funcionalidad de gestión de pedidos en desarrollo...
                </p>
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
