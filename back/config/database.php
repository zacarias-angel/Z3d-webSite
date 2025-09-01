<?php


$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

// Función para obtener la conexión PDO
function getConnection() {
    global $dsn, $user, $pass, $options;
    
    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
        return $pdo;
    } catch (\PDOException $e) {
        throw new Exception('Error de conexión a la base de datos');
    }
}

// Función para manejar errores de base de datos
function handleDatabaseError($e) {
    return [
        'success' => false, 
        'error' => 'Error de base de datos'
    ];
}
?>
