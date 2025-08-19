# Configuración del Proyecto Z3D

## 🚀 Ejecutar sin npm (Alternativa)

Si tienes problemas con npm debido a políticas de PowerShell, puedes usar estas alternativas:

### Opción 1: Usar Yarn
```bash
# Instalar Yarn globalmente
npm install -g yarn

# Instalar dependencias
yarn install

# Ejecutar el proyecto
yarn start
```

### Opción 2: Usar npx directamente
```bash
# Instalar dependencias
npx install-peerdeps

# Ejecutar el proyecto
npx react-scripts start
```

### Opción 3: Habilitar PowerShell Scripts
```powershell
# Ejecutar como administrador
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Luego ejecutar
npm install
npm start
```

### Opción 4: Usar Git Bash
```bash
# Abrir Git Bash y navegar al proyecto
cd /c/Users/Pasto/Desktop/experencias/Z3D/z3d-website

# Instalar dependencias
npm install

# Ejecutar el proyecto
npm start
```

## 📦 Dependencias Requeridas

El proyecto necesita estas dependencias principales:

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-scripts": "5.0.1",
  "typescript": "^4.9.0",
  "tailwindcss": "^3.3.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0"
}
```

## 🔧 Configuración Manual

Si no puedes instalar las dependencias, puedes:

1. **Descargar React desde CDN**:
   ```html
   <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
   <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
   ```

2. **Usar Tailwind CSS desde CDN**:
   ```html
   <script src="https://cdn.tailwindcss.com"></script>
   ```

3. **Configurar Tailwind manualmente**:
   ```html
   <script>
     tailwind.config = {
       theme: {
         extend: {
           colors: {
             cardinal: {
               black: '#000000',
               red: '#FF0000',
               green: '#00FF00',
               blue: '#0000FF'
             }
           }
         }
       }
     }
   </script>
   ```

## 🌐 Servidor de Desarrollo

Una vez que las dependencias estén instaladas:

1. **Ejecutar el servidor**:
   ```bash
   npm start
   ```

2. **Abrir en el navegador**:
   ```
   http://localhost:3000
   ```

3. **Habilitar panel de administración**:
   - Abrir DevTools (F12)
   - En la consola ejecutar:
   ```javascript
   localStorage.setItem('admin_key', 'z3d_admin_2024');
   ```
   - Presionar `Ctrl + Alt + A`

## 📱 Verificar Funcionamiento

El sitio debe mostrar:

- ✅ Hero section con video de fondo
- ✅ Navegación responsive
- ✅ Secciones de productos, noticias, sobre nosotros, contacto
- ✅ Paleta de colores cardinales (negro, rojo, verde, azul)
- ✅ Animaciones y transiciones suaves
- ✅ Panel de administración (con acceso habilitado)

## 🐛 Solución de Problemas

### Error: "react-scripts not found"
```bash
npm install react-scripts
```

### Error: "tailwindcss not found"
```bash
npm install tailwindcss autoprefixer postcss
```

### Error: "TypeScript not found"
```bash
npm install typescript @types/react @types/react-dom
```

### Error de políticas de PowerShell
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 📞 Soporte

Si continúas teniendo problemas:

1. Verifica que Node.js esté instalado: `node --version`
2. Verifica que npm esté instalado: `npm --version`
3. Limpia la caché: `npm cache clean --force`
4. Elimina node_modules y reinstala: `rm -rf node_modules && npm install`
