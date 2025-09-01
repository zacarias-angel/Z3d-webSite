<?php
require_once '../config/headers.php';
require_once '../config/database.php';
require_once '../config/session.php';

// Iniciar sesión de forma segura
startSecureSession();

// Verificar si el usuario está autenticado
if (!isset($_SESSION['admin_id']) || !$_SESSION['Activo']) {
    echo json_encode(['success' => false, 'error' => 'No autorizado']);
    exit;
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        echo json_encode(['success' => false, 'error' => 'Datos inválidos']);
        exit;
    }
    
    $pdo = getConnection();
    
    // Obtener el tipo de datos a insertar
    $type = $input['type'] ?? 'products';
    
    if ($type === 'offers') {
        $stmt = $pdo->prepare("
            INSERT INTO oferta (titulo, precio, descripcion, img) 
            VALUES (?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $input['titulo'],
            $input['precio'],
            $input['descripcion'],
            $input['img'] ?? ''
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Oferta agregada exitosamente']);
    } else {
        $stmt = $pdo->prepare("
            INSERT INTO productos (nombre, precio, img, descripcion) 
            VALUES (?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $input['nombre'],
            $input['precio'],
            $input['img'],
            $input['descripcion']
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Producto agregado exitosamente']);
    }
    
} catch (Exception $e) {
    echo json_encode(handleDatabaseError($e));
}
?>
