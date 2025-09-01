# Guías de Imagen para Z3D Website

## Tamaños Recomendados para Imágenes

### 1. Imágenes de Productos
- **Tamaño:** 400px × 300px
- **Aspect Ratio:** 4:3
- **Formato:** JPG, PNG, WebP
- **Peso máximo:** 200KB
- **Uso:** Cards de productos en la sección "Productos Destacados"

### 2. Imágenes de Ofertas Especiales
- **Tamaño:** 400px × 300px
- **Aspect Ratio:** 4:3
- **Formato:** JPG, PNG, WebP
- **Peso máximo:** 200KB
- **Uso:** Cards de ofertas en la sección "Ofertas de la Semana"

### 3. Imágenes del Panel de Administración
- **Tamaño:** 400px × 300px
- **Aspect Ratio:** 4:3
- **Formato:** JPG, PNG, WebP
- **Peso máximo:** 200KB
- **Uso:** Vista previa en tablas del admin panel

## Especificaciones Técnicas

### Formatos Aceptados
- **JPG:** Para fotografías con buena compresión
- **PNG:** Para imágenes con transparencia
- **WebP:** Formato moderno con mejor compresión (recomendado)

### Optimización
- **Compresión:** Usar compresión del 80-85% para JPG
- **Resolución:** 72 DPI para web
- **Color:** sRGB para consistencia

### Nomenclatura
- **Productos:** `producto-[nombre]-[id].jpg`
- **Ofertas:** `oferta-[titulo]-[id].jpg`
- **Ejemplo:** `producto-impresion-3d-001.jpg`

## Herramientas Recomendadas

### Para Redimensionar Imágenes
1. **Online:**
   - [Squoosh.app](https://squoosh.app/) - Google
   - [TinyPNG](https://tinypng.com/) - Compresión
   - [Canva](https://canva.com/) - Editor online

2. **Software:**
   - **GIMP** (Gratuito)
   - **Photoshop** (Pago)
   - **Affinity Photo** (Pago)

### Para Optimización
- **ImageOptim** (Mac)
- **FileOptimizer** (Windows)
- **TinyPNG** (Online)

## Ejemplos de URLs Optimizadas

### Unsplash (Imagen de placeholder)
```
https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop
```

### Parámetros de URL
- `w=400` - Ancho de 400px
- `h=300` - Alto de 300px
- `fit=crop` - Recortar para mantener proporción
- `q=85` - Calidad del 85%

## Consideraciones de Diseño

### Contenido de la Imagen
- **Centrar** el objeto principal
- **Dejar espacio** alrededor del objeto
- **Evitar** texto pequeño en las imágenes
- **Usar** fondos simples o desenfocados

### Accesibilidad
- **Alt text** descriptivo
- **Contraste** adecuado
- **No depender** solo del color para transmitir información

## Implementación en el Código

### CSS Utilizado
```css
.aspect-[4/3] {
  aspect-ratio: 4/3;
}

.object-cover {
  object-fit: cover;
}
```

### Fallback para Navegadores Antiguos
```css
/* Para navegadores que no soportan aspect-ratio */
.image-container {
  position: relative;
  padding-bottom: 75%; /* 4:3 aspect ratio */
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## Notas Importantes

1. **Siempre** redimensionar las imágenes antes de subirlas
2. **Optimizar** el peso de las imágenes para mejor rendimiento
3. **Probar** en diferentes dispositivos y tamaños de pantalla
4. **Mantener** consistencia en el aspecto ratio 4:3
5. **Usar** nombres descriptivos para las imágenes
