# Backend Z3D - Estructura Organizada

## 📁 Estructura de Carpetas

```
back/
├── config/
│   ├── database.php      # Configuración centralizada de la base de datos
│   └── headers.php       # Headers comunes para todos los endpoints
├── auth/
│   └── login.php         # Endpoint de login de administrador
├── products/
│   ├── getProducts.php   # Obtener todos los productos
│   ├── addProduct.php    # Agregar nuevo producto
│   ├── updateProduct.php # Actualizar producto existente
│   └── deleteProduct.php # Eliminar producto
└── README.md
```

<!-- ## 🔧 Configuración

### Base de Datos
- **Host**: localhost
- **Base de datos**: z3d
- **Usuario**: root (configurable en `config/database.php`)
- **Contraseña**: (configurable en `config/database.php`)

### Tablas Requeridas

#### z3d_useradmin
```sql
CREATE TABLE z3d_useradmin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Admin VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

#### productos
```sql
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    img TEXT,
    descripcion TEXT
);
```

## 🌐 Endpoints Disponibles

### Autenticación
- `POST /auth/login.php` - Login de administrador

### Productos
- `GET /products/getProducts.php` - Obtener todos los productos
- `POST /products/addProduct.php` - Agregar producto
- `POST /products/updateProduct.php` - Actualizar producto
- `POST /products/deleteProduct.php` - Eliminar producto

## 📝 Uso

Todos los endpoints devuelven respuestas en formato JSON con la siguiente estructura:

```json
{
    "success": true/false,
    "data": {...}, // o "error": "mensaje de error"
    "message": "mensaje opcional"
}
```

## 🔒 Seguridad

- Todos los endpoints incluyen headers CORS para desarrollo
- Las consultas usan PDO con prepared statements para prevenir SQL injection
- Manejo centralizado de errores de base de datos -->
