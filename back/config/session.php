<?php
// Configuración centralizada para sesiones PHP

// Configurar duración de sesión en 30 minutos
ini_set('session.cookie_lifetime', 1800);
ini_set('session.gc_maxlifetime', 1800);
ini_set('session.cookie_httponly', 0); // Cambiar a 0 para desarrollo
ini_set('session.cookie_secure', 0); // Cambiar a 1 en producción con HTTPS
ini_set('session.cookie_samesite', 'None'); // Cambiar a None para cross-origin
ini_set('session.use_strict_mode', 1);
ini_set('session.use_only_cookies', 1);

// Configurar el directorio de sesiones (opcional)
// ini_set('session.save_handler', 'files');
// ini_set('session.save_path', '/tmp');

// Función para iniciar sesión de forma segura
function startSecureSession() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
}

// Función para verificar si la sesión está activa
function isSessionActive($timeout = 1800) {
    if (!isset($_SESSION['Activo']) || !$_SESSION['Activo']) {
        return false;
    }
    
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > $timeout) {
        return false;
    }
    
    // Actualizar última actividad
    $_SESSION['last_activity'] = time();
    return true;
}

// Función para limpiar sesión
function clearSession() {
    session_unset();
    session_destroy();
}
?>
