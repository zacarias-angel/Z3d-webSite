<?php
/**
 * Z3D Backend API Example
 * Este archivo muestra cómo integrar el frontend React con un backend PHP
 */

// Configuración de CORS para desarrollo
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Configuración de la base de datos
$host = 'localhost';
$dbname = 'z3d_database';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error de conexión a la base de datos: ' . $e->getMessage()]);
    exit;
}

// Obtener el método HTTP
$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['REQUEST_URI'];
$path = parse_url($path, PHP_URL_PATH);
$path = trim($path, '/');

// Router simple
switch($method) {
    case 'GET':
        if ($path === 'api/products') {
            getProducts($pdo);
        } elseif (preg_match('/^api\/products\/(\d+)$/', $path, $matches)) {
            getProduct($pdo, $matches[1]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint no encontrado']);
        }
        break;
        
    case 'POST':
        if ($path === 'api/products') {
            createProduct($pdo);
        } elseif ($path === 'api/contact') {
            createContact($pdo);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint no encontrado']);
        }
        break;
        
    case 'PUT':
        if (preg_match('/^api\/products\/(\d+)$/', $path, $matches)) {
            updateProduct($pdo, $matches[1]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint no encontrado']);
        }
        break;
        
    case 'DELETE':
        if (preg_match('/^api\/products\/(\d+)$/', $path, $matches)) {
            deleteProduct($pdo, $matches[1]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint no encontrado']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}

// Funciones para manejar productos
function getProducts($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM products ORDER BY created_at DESC");
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['success' => true, 'data' => $products]);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al obtener productos: ' . $e->getMessage()]);
    }
}

function getProduct($pdo, $id) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->execute([$id]);
        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($product) {
            echo json_encode(['success' => true, 'data' => $product]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Producto no encontrado']);
        }
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al obtener producto: ' . $e->getMessage()]);
    }
}

function createProduct($pdo) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos inválidos']);
        return;
    }
    
    try {
        $stmt = $pdo->prepare("
            INSERT INTO products (name, description, price, stock, delivery_time, category, image_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $data['name'],
            $data['description'],
            $data['price'],
            $data['stock'],
            $data['deliveryTime'],
            $data['category'],
            $data['image'] ?? ''
        ]);
        
        $id = $pdo->lastInsertId();
        echo json_encode(['success' => true, 'id' => $id, 'message' => 'Producto creado exitosamente']);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al crear producto: ' . $e->getMessage()]);
    }
}

function updateProduct($pdo, $id) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos inválidos']);
        return;
    }
    
    try {
        $stmt = $pdo->prepare("
            UPDATE products 
            SET name = ?, description = ?, price = ?, stock = ?, delivery_time = ?, category = ?, image_url = ?
            WHERE id = ?
        ");
        
        $stmt->execute([
            $data['name'],
            $data['description'],
            $data['price'],
            $data['stock'],
            $data['deliveryTime'],
            $data['category'],
            $data['image'] ?? '',
            $id
        ]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Producto actualizado exitosamente']);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Producto no encontrado']);
        }
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al actualizar producto: ' . $e->getMessage()]);
    }
}

function deleteProduct($pdo, $id) {
    try {
        $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Producto eliminado exitosamente']);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Producto no encontrado']);
        }
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al eliminar producto: ' . $e->getMessage()]);
    }
}

// Función para manejar contactos
function createContact($pdo) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos inválidos']);
        return;
    }
    
    try {
        $stmt = $pdo->prepare("
            INSERT INTO contacts (name, email, message, service) 
            VALUES (?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $data['name'],
            $data['email'],
            $data['message'],
            $data['service'] ?? ''
        ]);
        
        $id = $pdo->lastInsertId();
        echo json_encode(['success' => true, 'id' => $id, 'message' => 'Mensaje enviado exitosamente']);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al enviar mensaje: ' . $e->getMessage()]);
    }
}

// Script SQL para crear las tablas
/*
CREATE DATABASE z3d_database;
USE z3d_database;

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    delivery_time VARCHAR(100),
    category VARCHAR(100),
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT,
    service VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar algunos productos de ejemplo
INSERT INTO products (name, description, price, stock, delivery_time, category, image_url) VALUES
('Prototipo Rápido', 'Prototipado rápido en PLA/PETG con acabado profesional', 25.00, 50, '2-3 días', 'Prototipado', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'),
('Piezas Industriales', 'Piezas resistentes en ABS/PC para uso industrial', 45.00, 30, '5-7 días', 'Industrial', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'),
('Modelos Arquitectónicos', 'Maquetas detalladas para presentaciones arquitectónicas', 35.00, 25, '3-5 días', 'Arquitectura', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop');
*/
?>
