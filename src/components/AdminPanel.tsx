import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  deliveryTime: string;
  category: string;
  image: string;
}

interface AdminPanelProps {
  onClose?: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Prototipo Rápido",
      description: "Prototipado rápido en PLA/PETG con acabado profesional",
      price: 25.00,
      stock: 50,
      deliveryTime: "2-3 días",
      category: "Prototipado",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Piezas Industriales",
      description: "Piezas resistentes en ABS/PC para uso industrial",
      price: 45.00,
      stock: 30,
      deliveryTime: "5-7 días",
      category: "Industrial",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
    }
  ]);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    deliveryTime: '',
    category: '',
    image: ''
  });

  const [activeTab, setActiveTab] = useState('products');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(product => 
        product.id === editingProduct.id 
          ? { ...product, ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) }
          : product
      ));
      setEditingProduct(null);
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      };
      setProducts(prev => [...prev, newProduct]);
      setIsAddingProduct(false);
    }
    
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      deliveryTime: '',
      category: '',
      image: ''
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      deliveryTime: product.deliveryTime,
      category: product.category,
      image: product.image
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(prev => prev.filter(product => product.id !== id));
    }
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setIsAddingProduct(false);
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      deliveryTime: '',
      category: '',
      image: ''
    });
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-800 w-full max-w-6xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-cardinal-red-500/20 to-cardinal-blue-500/20 p-6 border-b border-gray-800">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold text-white">
                Panel de Administración
              </h2>
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
                  >
                    + Agregar Producto
                  </button>
                </div>

                {/* Add/Edit Product Form */}
                {(isAddingProduct || editingProduct) && (
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-4">
                      {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                    </h4>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Nombre del Producto
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cardinal-green-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Categoría
                          </label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cardinal-green-500"
                          >
                            <option value="">Seleccionar categoría</option>
                            <option value="Prototipado">Prototipado</option>
                            <option value="Industrial">Industrial</option>
                            <option value="Arquitectura">Arquitectura</option>
                            <option value="Juguetes">Juguetes</option>
                            <option value="Repuestos">Repuestos</option>
                            <option value="Arte">Arte</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Descripción
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cardinal-green-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Precio ($)
                          </label>
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                            step="0.01"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cardinal-green-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Stock
                          </label>
                          <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cardinal-green-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Tiempo de Entrega
                          </label>
                          <input
                            type="text"
                            name="deliveryTime"
                            value={formData.deliveryTime}
                            onChange={handleInputChange}
                            required
                            placeholder="ej: 2-3 días"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cardinal-green-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          URL de Imagen
                        </label>
                        <input
                          type="url"
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cardinal-green-500"
                        />
                      </div>

                      <div className="flex space-x-4">
                        <button type="submit" className="btn-success">
                          {editingProduct ? 'Actualizar' : 'Agregar'} Producto
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Products Table */}
                <div className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-700/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Producto
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Categoría
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Precio
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Stock
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Entrega
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {products.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-700/30 transition-colors duration-300">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-10 h-10 rounded-lg object-cover mr-3"
                                />
                                <div>
                                  <div className="text-sm font-medium text-white">{product.name}</div>
                                  <div className="text-sm text-gray-400">{product.description.substring(0, 50)}...</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-cardinal-red-500/20 text-cardinal-red-400">
                                {product.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                              ${product.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                product.stock > 20 
                                  ? 'bg-cardinal-green-500/20 text-cardinal-green-400'
                                  : product.stock > 5
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'bg-cardinal-red-500/20 text-cardinal-red-400'
                              }`}>
                                {product.stock} unidades
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {product.deliveryTime}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEdit(product)}
                                  className="text-cardinal-blue-400 hover:text-cardinal-blue-300 transition-colors duration-300"
                                >
                                  Editar
                                </button>
                                <button
                                  onClick={() => handleDelete(product.id)}
                                  className="text-cardinal-red-400 hover:text-cardinal-red-300 transition-colors duration-300"
                                >
                                  Eliminar
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
