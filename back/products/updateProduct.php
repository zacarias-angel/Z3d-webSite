<?php
require_once '../config/headers.php';
require_once '../config/database.php';
require_once '../config/session.php';

// Iniciar sesión
startSecureSession();

// Verificar si el usuario está autenticado
if (!isset($_SESSION['admin_id']) || !$_SESSION['Activo']) {
    echo json_encode(['success' => false, 'error' => 'No autorizado']);
    exit;
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['id'])) {
        echo json_encode(['success' => false, 'error' => 'Datos inválidos']);
        exit;
    }
    
    $pdo = getConnection();
    
    // Obtener el tipo de datos a actualizar
    $type = $input['type'] ?? 'products';
    
    if ($type === 'offers') {
        $stmt = $pdo->prepare("
            UPDATE oferta SET 
                titulo = ?, precio = ?, descripcion = ?, img = ?
            WHERE id = ?
        ");
        
        $stmt->execute([
            $input['titulo'],
            $input['precio'],
            $input['descripcion'],
            $input['img'] ?? '',
            $input['id']
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Oferta actualizada exitosamente']);
    } else {
        $stmt = $pdo->prepare("
            UPDATE productos SET 
                nombre = ?, precio = ?, img = ?, descripcion = ?
            WHERE id = ?
        ");
        
        $stmt->execute([
            $input['nombre'],
            $input['precio'],
            $input['img'],
            $input['descripcion'],
            $input['id']
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Producto actualizado exitosamente']);
    }
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Error al actualizar: ' . $e->getMessage()
    ]);
}
?>
