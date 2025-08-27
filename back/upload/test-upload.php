<?php
require_once '../config/headers.php';
require_once '../config/database.php';
require_once '../config/session.php';

// Iniciar sesión de forma segura
startSecureSession();

// Información de debug
$debug_info = [
    'session_id' => session_id(),
    'session_status' => session_status(),
    'session_data' => $_SESSION,
    'cookies' => $_COOKIE,
    'admin_logged_in' => isset($_SESSION['admin_logged_in']) ? $_SESSION['admin_logged_in'] : 'No existe',
    'is_session_active' => isSessionActive(),
    'request_method' => $_SERVER['REQUEST_METHOD'],
    'content_type' => $_SERVER['CONTENT_TYPE'] ?? 'No definido'
];

echo json_encode([
    'success' => true,
    'message' => 'Test de autenticación para upload',
    'debug' => $debug_info,
    'authorized' => isSessionActive()
]);
?>
