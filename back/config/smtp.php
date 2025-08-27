<?php
/**
 * Configuración SMTP para Hostinger
 * Este archivo contiene la configuración para enviar emails usando SMTP de Hostinger con PHPMailer
 */

// credenciales de coreo de z3d

// Emails de destino donde llegarán las consultas (múltiples destinatarios)
define('DESTINATION_EMAILS', [
    // 'consultas@z3d.pro',
    'angelzacarias966@gmail.com',
    'elianaisa97@gmail.com'
]);

// Configuración de seguridad
define('SMTP_SECURE', 'ssl'); // Usar SSL para puerto 465
define('SMTP_AUTH', true); // Habilitar autenticación

// Configuración adicional
define('SMTP_TIMEOUT', 30); // Timeout en segundos
define('SMTP_DEBUG', false); // Cambiar a true para debug en desarrollo

// Configuración de PHPMailer
define('SMTP_CHARSET', 'UTF-8'); // Charset para los emails
define('SMTP_ENCODING', '8bit'); // Encoding para los emails
?>
