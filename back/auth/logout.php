<?php
require_once '../config/headers.php';

// Configurar duración de sesión en 30 minutos
ini_set('session.cookie_lifetime', 1800);
session_start();

try {
    // Destruir la sesión usando la estructura funcional
    session_unset(); // Elimina todas las variables de sesión
    session_destroy(); // Destruye la sesión
    
    echo json_encode([
        'success' => true,
        'message' => 'Sesión cerrada exitosamente'
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Error al cerrar sesión'
    ]);
}
?>
