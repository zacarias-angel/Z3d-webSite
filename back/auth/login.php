<?php
require_once '../config/headers.php';
require_once '../config/database.php';
require_once '../config/session.php';

// Iniciar sesión de forma segura
startSecureSession();

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
        
        // Debug: Verificar que la sesión se estableció correctamente
        error_log("Login debug - Session ID: " . session_id());
        error_log("Login debug - Activo: " . ($_SESSION['Activo'] ? 'true' : 'false'));
        error_log("Login debug - admin_id: " . $_SESSION['admin_id']);
        error_log("Login debug - admin_name: " . $_SESSION['admin_name']);
        
        // Forzar la escritura de la sesión
        session_write_close();
        
        echo json_encode([
            'success' => true, 
            'user' => [
                'id' => $user['id'],
                'admin' => $user['Admin']
            ],
            'message' => 'Login exitoso',
            'session_id' => session_id(),
            'debug' => [
                'session_activo' => $_SESSION['Activo'] ?? 'no existe',
                'session_admin_id' => $_SESSION['admin_id'] ?? 'no existe',
                'session_admin_name' => $_SESSION['admin_name'] ?? 'no existe'
            ]
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
