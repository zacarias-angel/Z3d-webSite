<?php
require_once '../config/headers.php';
require_once '../config/database.php';
require_once '../config/session.php';

// Iniciar sesión de forma segura
startSecureSession();

// Verificar si el usuario está logueado usando la estructura correcta
$session_duration = 1800; // 30 minutos

if (empty($_SESSION['Activo']) || 
    (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > $session_duration)) {
    
    echo json_encode([
        'success' => false,
        'error' => 'No autorizado - Sesión no activa'
    ]);
    exit;
}

// Actualizar última actividad
$_SESSION['last_activity'] = time();

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['id'])) {
        echo json_encode(['success' => false, 'error' => 'ID requerido']);
        exit;
    }
    
    $pdo = getConnection();
    
    // Obtener el tipo de datos a eliminar
    $type = $input['type'] ?? 'products';
    
    if ($type === 'offers') {
        $stmt = $pdo->prepare("DELETE FROM oferta WHERE id = ?");
        $stmt->execute([$input['id']]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Oferta eliminada exitosamente']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Oferta no encontrada']);
        }
    } else {
        $stmt = $pdo->prepare("DELETE FROM productos WHERE id = ?");
        $stmt->execute([$input['id']]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Producto eliminado exitosamente']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Producto no encontrado']);
        }
    }
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Error al eliminar: ' . $e->getMessage()
    ]);
}
?>
