<?php
require_once '../config/headers.php';
require_once '../config/database.php';

// Configuración de sesión más permisiva para desarrollo
ini_set('session.cookie_lifetime', 1800);
ini_set('session.gc_maxlifetime', 1800);
ini_set('session.cookie_httponly', 0); // Cambiar a 0 para debug
ini_set('session.cookie_secure', 0);
ini_set('session.cookie_samesite', 'None'); // Cambiar a None para cross-origin
ini_set('session.cookie_domain', ''); // Dominio vacío para permitir cross-origin
session_start();

try {
    $data = json_decode(file_get_contents('php://input'), true);
    $admin = $data['admin'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($admin) || empty($password)) {
        echo json_encode(['success' => false, 'error' => 'Usuario y contraseña son requeridos']);
        exit;
    }

    $pdo = getConnection();
    $stmt = $pdo->prepare("SELECT * FROM z3d_useradmin WHERE Admin = ? AND password = ?");
    $stmt->execute([$admin, $password]);
    $user = $stmt->fetch();

    if ($user) {
        // Limpiar cualquier sesión anterior
        session_unset();
        
        // Crear sesión PHP usando la estructura que prefieres
        $_SESSION['Activo'] = true;
        $_SESSION['admin_id'] = $user['id'];
        $_SESSION['admin_name'] = $user['Admin'];
        $_SESSION['last_activity'] = time();
        
        // Forzar la escritura de la sesión
        session_write_close();
        session_start();
        
        echo json_encode([
            'success' => true, 
            'user' => [
                'id' => $user['id'],
                'admin' => $user['Admin']
            ],
            'message' => 'Login exitoso',
            'session_id' => session_id()
        ]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Credenciales incorrectas']);
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false, 
        'error' => 'Error en el servidor'
    ]);
}
?>
