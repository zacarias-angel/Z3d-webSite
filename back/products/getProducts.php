<?php
// Headers de CORS más permisivos
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400'); // 24 horas
header('Content-Type: application/json; charset=utf-8');

// Manejar preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}



require_once '../config/database.php';

try {
    // Obtener conexión
    $pdo = getConnection();

    // Consulta para obtener todos los productos
    $stmt = $pdo->query("SELECT * FROM productos ORDER BY id DESC");
    $products = $stmt->fetchAll();
    
    echo json_encode([
        'success' => true, 
        'products' => $products,
        'count' => count($products)
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false, 
        'error' => 'Error al obtener productos'
    ]);
}
?>
