# Z3D - Sitio Web de Impresión 3D

Un sitio web moderno y profesional para servicios de impresión 3D, diseñado con React, TypeScript y Tailwind CSS, siguiendo la paleta de colores de los puntos cardinales (negro, rojo, verde, azul).

## 🎨 Características del Diseño

- **Paleta de Colores Cardinales**: Negro (Norte), Rojo (Sur), Verde (Este), Azul (Oeste)
- **Diseño Responsive**: Adaptable a móvil, tablet y desktop
- **Animaciones Suaves**: Transiciones y efectos parallax
- **Secciones Full-Screen**: Cada sección ocupa 100vh
- **Panel de Administración**: Gestión completa de productos

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Fuentes**: Inter + Orbitron (Google Fonts)
- **Animaciones**: CSS Animations + Tailwind
- **Backend**: Preparado para PHP + PDO + MySQL

## 📁 Estructura del Proyecto

```
z3d-website/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── Products.tsx
│   │   ├── News.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── AdminPanel.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd z3d-website
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm eject` - Expone la configuración de webpack (irreversible)

## 🎯 Funcionalidades

### Secciones Principales

1. **Hero Section**
   - Video fullscreen de fondo
   - Animaciones parallax
   - Botón "Ver más" con scroll suave
   - Visualización de puntos cardinales

2. **Productos Destacados**
   - Cards con información de productos
   - Precios y descripciones
   - Categorías con colores cardinales
   - Botones de acción

3. **Noticias y Novedades**
   - Artículos con imágenes
   - Timeline de puntos cardinales
   - Newsletter signup
   - Categorías de noticias

4. **Sobre Nosotros**
   - Misión y visión
   - Estadísticas de la empresa
   - Compás de puntos cardinales
   - Información del equipo

5. **Contacto**
   - Formulario de contacto
   - Información de ubicación
   - Mapa interactivo
   - Redes sociales

6. **Footer**
   - Enlaces organizados
   - Newsletter signup
   - Información legal
   - Redes sociales

### Panel de Administración

- **Acceso**: Ctrl + Alt + A (cuando está habilitado)
- **Funcionalidades**:
  - Gestión CRUD de productos
  - Control de precios y stock
  - Gestión de plazos de entrega
  - Interfaz intuitiva

#### Habilitar Panel de Administración

Para acceder al panel de administración, ejecuta en la consola del navegador:

```javascript
localStorage.setItem('admin_key', 'z3d_admin_2024');
```

Luego presiona `Ctrl + Alt + A` para abrir el panel.

## 🎨 Personalización

### Colores Cardinales

Los colores están definidos en `tailwind.config.js`:

```javascript
colors: {
  cardinal: {
    black: '#000000',    // Norte
    red: '#FF0000',      // Sur  
    green: '#00FF00',    // Este
    blue: '#0000FF',     // Oeste
  }
}
```

### Fuentes

- **Inter**: Para texto general
- **Orbitron**: Para títulos y elementos destacados

### Animaciones

- `float`: Efecto de flotación
- `glow`: Efecto de brillo
- `slide-up/slide-down`: Animaciones de entrada

## 📱 Responsive Design

El sitio está optimizado para:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔧 Configuración del Backend

El proyecto está preparado para integrarse con un backend PHP. Para configurar:

1. Crear archivos PHP en la carpeta `backend/`
2. Configurar la base de datos MySQL
3. Actualizar las URLs de la API en los componentes
4. Configurar CORS si es necesario

### Estructura de Base de Datos Sugerida

```sql
-- Tabla de productos
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    delivery_time VARCHAR(100),
    category VARCHAR(100),
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de contactos
CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT,
    service VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Despliegue

### Build para Producción

```bash
npm run build
```

### Servidor de Producción

El proyecto puede desplegarse en:

- **Netlify**: Drag & drop de la carpeta `build/`
- **Vercel**: Conecta el repositorio Git
- **Apache/Nginx**: Sirve la carpeta `build/`
- **PHP Server**: Integra con backend PHP

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para soporte técnico o consultas:

- Email: info@z3d.com
- Teléfono: +1 (555) 123-4567
- Horarios: Lun-Vie: 9:00 - 18:00

---

**Z3D** - Transformando ideas en realidad con tecnología 3D de vanguardia.
