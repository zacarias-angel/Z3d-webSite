<?php
/**
 * Manejador para enviar emails desde el formulario de contacto
 * Este archivo recibe los datos del formulario React y envía un email usando PHPMailer
 */

// Incluir configuración SMTP
require_once '../config/smtp.php';
require_once '../config/headers.php';

// Incluir PHPMailer (vendor está en la raíz del proyecto)
require_once '../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Configurar headers para CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Manejar preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo permitir método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit();
}

// Obtener datos JSON del body
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validar que se recibieron los datos
if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Datos inválidos']);
    exit();
}

// Validar campos requeridos
$required_fields = ['name', 'email', 'message'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => "El campo '$field' es requerido"]);
        exit();
    }
}

// Validar formato de email
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Formato de email inválido']);
    exit();
}

// Sanitizar datos
$name = htmlspecialchars(trim($data['name']));
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$service = htmlspecialchars(trim($data['service'] ?? 'No especificado'));
$message = htmlspecialchars(trim($data['message']));

// Función para enviar email usando PHPMailer
function sendEmail($name, $email, $service, $message) {
    try {
        $mail = new PHPMailer(true);
        
        // Configuración del servidor SMTP
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = SMTP_AUTH;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;
        $mail->SMTPSecure = SMTP_SECURE;
        $mail->Port = SMTP_PORT;
        $mail->Timeout = SMTP_TIMEOUT;
        
        // Configuración de debug (cambiar a SMTP::DEBUG_SERVER para ver logs detallados)
        if (SMTP_DEBUG) {
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        } else {
            $mail->SMTPDebug = SMTP::DEBUG_OFF;
        }
        
        // Configuración del email
        $mail->setFrom(SMTP_FROM_EMAIL, SMTP_FROM_NAME);
        
        // Agregar múltiples destinatarios
        foreach (DESTINATION_EMAILS as $destinationEmail) {
            $mail->addAddress($destinationEmail);
        }
        
        $mail->addReplyTo($email, $name);
        
        // Contenido del email
        $mail->isHTML(true);
        $mail->Subject = "Nueva consulta desde Z3D - " . $name;
        
        // Cuerpo del email en HTML
        $mail->Body = "
        <html>
        <head>
            <title>Nueva Consulta - Z3D</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
                .field { margin-bottom: 15px; }
                .field strong { color: #007bff; }
                .message { background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin: 15px 0; }
                .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>📧 Nueva consulta recibida desde el sitio web Z3D</h2>
                </div>
                
                <div class='field'>
                    <strong>👤 Nombre:</strong> {$name}
                </div>
                
                <div class='field'>
                    <strong>📧 Email:</strong> {$email}
                </div>
                
                <div class='field'>
                    <strong>🔧 Servicio de interés:</strong> {$service}
                </div>
                
                <div class='field'>
                    <strong>💬 Mensaje:</strong>
                </div>
                
                <div class='message'>
                    " . nl2br($message) . "
                </div>
                
                <div class='footer'>
                    <p>Este email fue enviado automáticamente desde el formulario de contacto de <strong>z3d.pro</strong></p>
                    <p>Fecha y hora: " . date('d/m/Y H:i:s') . "</p>
                    <p><strong>Destinatarios:</strong> " . implode(', ', DESTINATION_EMAILS) . "</p>
                </div>
            </div>
        </body>
        </html>
        ";
        
        // Versión en texto plano (para clientes que no soportan HTML)
        $mail->AltBody = "
        Nueva consulta recibida desde el sitio web Z3D
        
        Nombre: {$name}
        Email: {$email}
        Servicio de interés: {$service}
        
        Mensaje:
        {$message}
        
        ---
        Este email fue enviado desde el formulario de contacto de z3d.pro
        Fecha: " . date('d/m/Y H:i:s') . "
        Destinatarios: " . implode(', ', DESTINATION_EMAILS);
        
        // Enviar el email
        $mail->send();
        
        // Log de éxito
        $destinations = implode(', ', DESTINATION_EMAILS);
        error_log("Email enviado exitosamente a: {$destinations} desde {$email}");
        
        return true;
        
    } catch (Exception $e) {
        // Log del error
        error_log("Error enviando email: " . $e->getMessage());
        error_log("Detalles del error: " . $mail->ErrorInfo);
        
        return false;
    }
}

// Intentar enviar el email
$emailSent = sendEmail($name, $email, $service, $message);

if ($emailSent) {
    // Email enviado exitosamente
    echo json_encode([
        'success' => true,
        'message' => 'Email enviado correctamente'
    ]);
} else {
    // Error al enviar email
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error al enviar el email. Por favor, intenta nuevamente.'
    ]);
}
?>
