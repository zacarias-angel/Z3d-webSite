<?php
require_once '../config/headers.php';
require_once '../config/database.php';
require_once '../config/session.php';

// Iniciar sesión de forma segura
startSecureSession();

try {
    // Debug: Verificar si hay cookie de sesión
    $has_session_cookie = isset($_COOKIE[session_name()]);
    
    // Debug: Log de información de sesión
    error_log("Check-session debug - Session ID: " . session_id());
    error_log("Check-session debug - Has cookie: " . ($has_session_cookie ? 'yes' : 'no'));
    error_log("Check-session debug - Session empty: " . (empty($_SESSION) ? 'yes' : 'no'));
    error_log("Check-session debug - Activo exists: " . (isset($_SESSION['Activo']) ? 'yes' : 'no'));
    error_log("Check-session debug - Activo value: " . ($_SESSION['Activo'] ?? 'no existe'));
    error_log("Check-session debug - admin_id: " . ($_SESSION['admin_id'] ?? 'no existe'));
    
    // Verificar si la sesión está activa usando la estructura que prefieres
    $session_duration = 1800; // 30 minutos
    
    if (empty($_SESSION['Activo']) || 
        (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > $session_duration)) {
        
        // Limpiar sesión si no está activa
        session_unset();
        session_destroy();
        
        echo json_encode([
            'success' => false,
            'logged_in' => false,
            'error' => 'Sesión inactiva o expirada',
            'debug' => [
                'has_cookie' => $has_session_cookie,
                'session_id' => session_id(),
                'session_empty' => empty($_SESSION),
                'activo_exists' => isset($_SESSION['Activo']),
                'last_activity' => $_SESSION['last_activity'] ?? 'No existe'
            ]
        ]);
        exit;
    }
    
    // Actualizar última actividad
    $_SESSION['last_activity'] = time();

    // Si llegamos aquí, la sesión es válida
    $admin_id = $_SESSION['admin_id'] ?? null;
    $admin_name = $_SESSION['admin_name'] ?? null;

    echo json_encode([
        'success' => true,
        'logged_in' => true,
        'user' => [
            'id' => $admin_id,
            'admin' => $admin_name
        ],
        'session_id' => session_id()
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'logged_in' => false,
        'error' => 'Error en el servidor'
    ]);
}
?>
