<?php
require_once '../config/headers.php';
require_once '../config/database.php';
require_once '../config/session.php';

// Configuración de sesión más permisiva para desarrollo
ini_set('session.cookie_lifetime', 1800);
ini_set('session.gc_maxlifetime', 1800);
ini_set('session.cookie_httponly', 0); // Cambiar a 0 para debug
ini_set('session.cookie_secure', 0);
ini_set('session.cookie_samesite', 'None'); // Cambiar a None para cross-origin
ini_set('session.cookie_domain', ''); // Dominio vacío para permitir cross-origin

// Iniciar sesión de forma segura
startSecureSession();

// Verificar si el usuario está logueado usando la estructura que prefieres
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
    // Recibe datos JSON
    $data = json_decode(file_get_contents('php://input'), true);

    $id = $data['id'] ?? null;
    $nombre = $data['nombre'] ?? '';
    $precio = $data['precio'] ?? 0;
    $img = $data['img'] ?? '';
    $descripcion = $data['descripcion'] ?? '';

    if (!$id) {
        echo json_encode(['success' => false, 'error' => 'ID de producto requerido']);
        exit;
    }

    // Obtener conexión
    $pdo = getConnection();

    $stmt = $pdo->prepare("UPDATE productos SET nombre = ?, precio = ?, img = ?, descripcion = ? WHERE id = ?");
    $success = $stmt->execute([$nombre, $precio, $img, $descripcion, $id]);
    
    if ($success) {
        echo json_encode(['success' => true, 'message' => 'Producto actualizado correctamente']);
            } else {
            echo json_encode(['success' => false, 'error' => 'Error al actualizar el producto']);
        }

} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Error al actualizar el producto']);
}
?>
