import React, { useState } from 'react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // URL base para los endpoints PHP en el servidor
  const API_BASE_URL = 'https://z3d.pro/back';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Incluir cookies de sesión
        body: JSON.stringify({
          admin: username,
          password: password
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Ya no necesitamos guardar en localStorage, PHP maneja la sesión
        onLoginSuccess();
      } else {
        setError(data.error || 'Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error de conexión al servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={handleSubmit} className="bg-gray-900/95 p-8 rounded-xl border border-gray-800 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-display font-bold text-white mb-6 text-center">Acceso Administrador</h2>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cardinal-green-500"
            required
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cardinal-green-500"
            required
          />
        </div>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <button
          type="submit"
          className="btn-success w-full text-lg py-3 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
