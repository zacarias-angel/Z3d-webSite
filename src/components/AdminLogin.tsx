import React, { useState } from 'react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Simulate login delay
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        localStorage.setItem('z3d_admin_logged', 'true');
        onLoginSuccess();
      } else {
        setError('Usuario o contraseña incorrectos');
      }
      setLoading(false);
    }, 1000);
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
