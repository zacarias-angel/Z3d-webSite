// Utilidades para manejo de autenticación con sesiones PHP

const API_BASE_URL = 'https://z3d.pro/back';

export const isLoggedIn = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/check-session.php`, {
      method: 'GET',
      credentials: 'include', // Incluir cookies de sesión
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.warn('Error HTTP:', response.status);
      return false;
    }
    
    const data = await response.json();
    console.log('Debug session data:', data);
    
    return data.success && data.logged_in;
  } catch (error) {
    console.warn('Error de conexión al verificar sesión');
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/check-session.php`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    if (data.success && data.logged_in && data.user) {
      return data.user;
    }
    return null;
  } catch (error) {
    console.warn('Error al obtener usuario actual');
    return null;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await fetch(`${API_BASE_URL}/auth/logout.php`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.warn('Error durante logout');
  } finally {
    // Limpiar localStorage por si acaso
    localStorage.removeItem('z3d_admin_logged');
    localStorage.removeItem('z3d_admin_user');
    localStorage.removeItem('z3d_admin_last_activity');
    window.location.href = '/admin';
  }
};

// Función para probar la conexión con el servidor (solo en desarrollo)
export const testServerConnection = async () => {
  if (process.env.NODE_ENV !== 'development') return null;
  
  try {
    const response = await fetch(`${API_BASE_URL}/test-session.php`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    const data = await response.json();
    console.log('Test de conexión:', { success: data.success, session_active: data.session_active });
    return data;
  } catch (error) {
    console.warn('Error en test de conexión');
    return null;
  }
};

// Función para mantener compatibilidad con el sistema anterior
export const updateLastActivity = (): void => {
  // Esta función ya no es necesaria con sesiones PHP
  // pero la mantenemos por compatibilidad
};
