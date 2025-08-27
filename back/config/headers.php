<?php
header('Content-Type: application/json');

// Obtener el origen de la petición
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Lista de orígenes permitidos
$allowed_origins = [
    'http://localhost:3000',
    'https://z3d.pro',
    'https://www.z3d.pro'
];

// Verificar si el origen está permitido
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // Fallback para desarrollo
    header('Access-Control-Allow-Origin: http://localhost:3000');
}

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
