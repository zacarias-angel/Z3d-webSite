<?php
require_once '../config/headers.php';
require_once '../config/database.php';

try {
    // Obtener conexión
    $pdo = getConnection();

    // Obtener parámetros
    $type = $_GET['type'] ?? 'products';
    $page = max(1, intval($_GET['page'] ?? 1));
    $limit = max(1, min(50, intval($_GET['limit'] ?? 12))); // Máximo 50, mínimo 1
    $offset = ($page - 1) * $limit;

    if ($type === 'offers') {
        // Consulta para ofertas con paginación
        $countStmt = $pdo->query("SELECT COUNT(*) as total FROM oferta");
        $totalOffers = $countStmt->fetch()['total'];
        
        $stmt = $pdo->prepare("SELECT * FROM oferta ORDER BY id DESC LIMIT ? OFFSET ?");
        $stmt->execute([$limit, $offset]);
        $offers = $stmt->fetchAll();
        
        $totalPages = ceil($totalOffers / $limit);
        
        echo json_encode([
            'success' => true,
            'offers' => $offers,
            'totalOffers' => $totalOffers,
            'totalPages' => $totalPages,
            'currentPage' => $page,
            'offersPerPage' => $limit
        ]);
    } else {
        // Consulta para productos con paginación
        $countStmt = $pdo->query("SELECT COUNT(*) as total FROM productos");
        $totalProducts = $countStmt->fetch()['total'];
        
        // Usar LIMIT directamente en la consulta (seguro porque $limit y $offset son intval)
        $stmt = $pdo->query("SELECT * FROM productos ORDER BY id DESC LIMIT $limit OFFSET $offset");
        $products = $stmt->fetchAll();
        
        $totalPages = ceil($totalProducts / $limit);
        
        echo json_encode([
            'success' => true,
            'products' => $products,
            'totalProducts' => $totalProducts,
            'totalPages' => $totalPages,
            'currentPage' => $page,
            'productsPerPage' => $limit
        ]);
    }

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Error al obtener datos: ' . $e->getMessage()
    ]);
}
?>
