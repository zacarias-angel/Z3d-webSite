<?php
require_once '../config/headers.php';
require_once '../config/database.php';
require_once '../config/session.php';

// Configuración de sesión más permisiva para desarrollo
ini_set('session.cookie_lifetime', 1800);
ini_set('session.gc_maxlifetime', 1800);
ini_set('session.cookie_httponly', 0); // Cambiar a 0 para debug
ini_set('session.cookie_secure', 0);
ini_set('session.cookie_samesite', 'None'); // Cambiar a None para cross-origin
ini_set('session.cookie_domain', ''); // Dominio vacío para permitir cross-origin

// Iniciar sesión de forma segura
startSecureSession();



// Verificar si el usuario está logueado usando la estructura que prefieres
$session_duration = 1800; // 30 minutos

if (empty($_SESSION['Activo']) || 
    (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > $session_duration)) {
    
    echo json_encode([
        'success' => false,
        'error' => 'No autorizado - Sesión no activa'
    ]);
    exit;
}

// Actualizar última actividad
$_SESSION['last_activity'] = time();

try {
    // Verificar si se recibió un archivo
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode([
            'success' => false,
            'error' => 'No se recibió ninguna imagen válida'
        ]);
        exit;
    }

    $file = $_FILES['image'];
    $fileName = $file['name'];
    $fileTmpName = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileError = $file['error'];



    // Validar tipo de archivo
    $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    $fileType = mime_content_type($fileTmpName);
    
    if (!in_array($fileType, $allowedTypes)) {
        echo json_encode([
            'success' => false,
            'error' => 'Tipo de archivo no permitido. Solo se permiten: JPG, PNG, GIF, WebP'
        ]);
        exit;
    }

    // Validar tamaño (máximo 5MB)
    $maxSize = 5 * 1024 * 1024; // 5MB
    if ($fileSize > $maxSize) {
        echo json_encode([
            'success' => false,
            'error' => 'El archivo es demasiado grande. Máximo 5MB'
        ]);
        exit;
    }

    // Generar nombre único para el archivo
    $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
    $baseName = pathinfo($fileName, PATHINFO_FILENAME);
    $baseName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $baseName); // Limpiar caracteres especiales
    $uniqueName = $baseName . '_' . time() . '_' . uniqid();
    $webpName = $uniqueName . '.webp';

    // Crear directorio en el frontend public (ruta absoluta)
    $uploadDir = '/home/z3d/public_html/public/imagenes/';
    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            echo json_encode([
                'success' => false,
                'error' => 'Error al crear el directorio de imágenes'
            ]);
            exit;
        }
    }

    // Verificar si ya existe un archivo con ese nombre
    $webpPath = $uploadDir . $webpName;
    if (file_exists($webpPath)) {
        echo json_encode([
            'success' => false,
            'error' => 'Ya existe una imagen con ese nombre'
        ]);
        exit;
    }

    // Verificar que GD esté disponible
    if (!extension_loaded('gd')) {
        echo json_encode([
            'success' => false,
            'error' => 'Extensión GD no disponible en el servidor'
        ]);
        exit;
    }

    // Convertir a WebP
    $image = null;
    switch ($fileType) {
        case 'image/jpeg':
        case 'image/jpg':
            $image = imagecreatefromjpeg($fileTmpName);
            break;
        case 'image/png':
            $image = imagecreatefrompng($fileTmpName);
            break;
        case 'image/gif':
            $image = imagecreatefromgif($fileTmpName);
            break;
        case 'image/webp':
            $image = imagecreatefromwebp($fileTmpName);
            break;
    }

    if (!$image) {
        echo json_encode([
            'success' => false,
            'error' => 'Error al procesar la imagen'
        ]);
        exit;
    }

    // Obtener dimensiones originales
    $width = imagesx($image);
    $height = imagesy($image);

    // Calcular nuevas dimensiones (máximo 800px de ancho)
    $maxWidth = 800;
    if ($width > $maxWidth) {
        $newWidth = $maxWidth;
        $newHeight = ($height / $width) * $maxWidth;
    } else {
        $newWidth = $width;
        $newHeight = $height;
    }

    // Crear nueva imagen redimensionada
    $newImage = imagecreatetruecolor($newWidth, $newHeight);
    
    // Preservar transparencia para PNG
    if ($fileType === 'image/png') {
        imagealphablending($newImage, false);
        imagesavealpha($newImage, true);
        $transparent = imagecolorallocatealpha($newImage, 255, 255, 255, 127);
        imagefilledrectangle($newImage, 0, 0, $newWidth, $newHeight, $transparent);
    }

    // Redimensionar
    imagecopyresampled($newImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

    // Guardar como WebP
    $quality = 80; // Calidad WebP (0-100)
    if (!imagewebp($newImage, $webpPath, $quality)) {
        echo json_encode([
            'success' => false,
            'error' => 'Error al guardar la imagen WebP'
        ]);
        exit;
    }

    // Limpiar memoria
    imagedestroy($image);
    imagedestroy($newImage);

    // Obtener información del archivo guardado
    $fileSize = filesize($webpPath);
    $fileSizeKB = round($fileSize / 1024, 2);



         echo json_encode([
         'success' => true,
         'message' => 'Imagen subida exitosamente',
         'data' => [
             'filename' => $webpName,
             'original_name' => $fileName,
             'size_kb' => $fileSizeKB,
             'width' => $newWidth,
             'height' => $newHeight,
             'url' => 'https://z3d.pro/public/imagenes/' . $webpName  // URL completa del servidor
         ]
     ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Error en el servidor'
    ]);
}
?>
