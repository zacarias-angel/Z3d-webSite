export const config = {
  app: {
    title: 'Z3D - Impresión 3D Profesional',
    description: 'Transformamos ideas en realidad con tecnología de vanguardia',
    version: '1.0.0'
  },
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
    timeout: 10000
  },
  admin: {
    key: 'z3d_admin_2024',
    shortcut: 'Ctrl+Alt+A'
  },
  colors: {
    cardinal: {
      black: '#000000',    // Norte
      red: '#FF0000',      // Sur
      green: '#00FF00',    // Este
      blue: '#0000FF'      // Oeste
    }
  },
  contact: {
    email: 'consultas@z3d.com',
    phone: '+54 9 1164165517',
    address: 'Quilmes, Buenos Aires, Argentina',
    hours: 'Lun-Vie: 9:00 - 18:00'
  }
};
