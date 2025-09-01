import React, { useState, useRef, useCallback } from 'react';

interface ImageUploadProps {
  onImageUploaded: (imageData: { filename: string; url: string }) => void;
  onImageSelected?: (imageData: { filename: string; url: string }) => void;
  currentImage?: string;
  type?: 'products' | 'offers';
  onUploadReady?: (uploadFn: () => Promise<{ filename: string; url: string } | null>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUploaded, onImageSelected, currentImage, type = 'products', onUploadReady }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_BASE_URL = 'https://z3d.pro/back';

  // Exponer la función de upload al componente padre
  React.useEffect(() => {
    if (onUploadReady) {
      onUploadReady(uploadImage);
    }
  }, [selectedFile, type]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Tipo de archivo no permitido. Solo se permiten: JPG, PNG, GIF, WebP');
      return;
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('El archivo es demasiado grande. Máximo 5MB');
      return;
    }

    // Limpiar errores previos
    setError('');
    setDebugInfo(null);

    // Crear preview inmediatamente
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Guardar el archivo para subirlo más tarde
    setSelectedFile(file);
    
    // Notificar al componente padre que se seleccionó una imagen
    if (onImageSelected) {
      onImageSelected({
        filename: file.name,
        url: URL.createObjectURL(file)
      });
    }
  };

  // Función para subir la imagen cuando se envía el formulario
  const uploadImage = async (): Promise<{ filename: string; url: string } | null> => {
    if (!selectedFile) {
      return null;
    }

    setIsUploading(true);
    setError('');
    setDebugInfo(null);
    setUploadProgress(0);

    try {
      // Crear FormData
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('type', type);

      // Simular progreso
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Subir archivo
      const response = await fetch(`${API_BASE_URL}/upload/upload-image.php`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        onImageUploaded({
          filename: data.data.filename,
          url: data.data.url
        });
        
        setError('');
        setDebugInfo(null);
        setSelectedFile(null); // Limpiar archivo seleccionado
        return { filename: data.data.filename, url: data.data.url };
      } else {
        setError(data.error || 'Error al subir la imagen');
        setDebugInfo(data.debug || null);
        setPreview(null);
        return null;
      }
    } catch (err) {
      setError('Error de conexión al subir la imagen');
      setDebugInfo({ error: err instanceof Error ? err.message : 'Error desconocido' });
      setPreview(null);
      return null;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setPreview(null);
    setSelectedFile(null);
    onImageUploaded({ filename: '', url: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Imagen del Producto
      </label>
      
      {/* Área de drag & drop */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 cursor-pointer ${
          isDragOver
            ? 'border-cardinal-green-400 bg-cardinal-green-400/10'
            : 'border-gray-600 hover:border-gray-500'
        } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {preview ? (
          <div className="space-y-4">
            <img
              src={preview}
              alt="Preview"
              className="mx-auto max-h-48 rounded-lg object-cover"
            />
            <div className="flex justify-center space-x-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                className="px-3 py-1 bg-cardinal-blue-600 text-white rounded text-sm hover:bg-cardinal-blue-700 transition-colors"
              >
                Cambiar Imagen
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-gray-400">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-lg font-medium">
                {isDragOver ? 'Suelta la imagen aquí' : 'Arrastra una imagen aquí o haz clic'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                JPG, PNG, GIF, WebP hasta 5MB
              </p>
            </div>
          </div>
        )}

        {/* Barra de progreso */}
        {isUploading && (
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-white text-sm mb-2">Subiendo imagen...</div>
              <div className="w-48 bg-gray-700 rounded-full h-2">
                <div
                  className="bg-cardinal-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className="text-white text-xs mt-1">{uploadProgress}%</div>
            </div>
          </div>
        )}
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <div className="font-medium mb-2">{error}</div>
          {debugInfo && (
            <details className="mt-2">
              <summary className="cursor-pointer text-xs text-gray-400 hover:text-gray-300">
                Ver información de debug
              </summary>
              <pre className="text-xs mt-2 p-2 bg-gray-800 rounded overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </details>
          )}
        </div>
      )}

      {/* Información adicional */}
      <div className="text-xs text-gray-500">
        <p>• La imagen se convertirá automáticamente a WebP para optimizar el tamaño</p>
        <p>• Se redimensionará a un máximo de 800px de ancho</p>
        <p>• Se validará que no exista otra imagen con el mismo nombre</p>
        <p>• Las imágenes se guardarán en la carpeta public del frontend</p>
      </div>
    </div>
  );
};

export default ImageUpload;
