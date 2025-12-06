# Aplicación de Gestión de Inventario

Aplicación móvil desarrollada con React Native + Expo para gestión de inventarios con funcionalidad CRUD completa.

## Características

- **CRUD Completo**: Create, Read, Update, Delete
- **Firebase Firestore**: Base de datos en tiempo real
- **Login Estático**: Validación simple para acceso (usuario: "admin" - contraseña: "admin123" )

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- Cuenta de Firebase (en este caso como es para validar el proyecto integrador lo dejé directo en el archivo firebaseConfig.js mis datos de mi firebase)
- Cuenta de Expo (gratuita)
- Dispositivo Android o iOS con la app Expo Go

## 🔧 Configuración de Firebase

### Paso 1: Crear Proyecto Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Clic en "Agregar proyecto"
3. Nombre del proyecto: `RetailInventory` (o el que prefieras)
4. Deshabilita Google Analytics (opcional)
5. Clic "Crear proyecto"

### Paso 2: Habilitar Firestore Database

1. En el menú lateral, selecciona **Firestore Database**
2. Clic en "Crear base de datos"
3. Selecciona "Iniciar en modo de prueba"
4. Elige una ubicación cercana (ej: `us-central`)
5. Clic "Habilitar"

### Paso 3: Configurar Reglas de Seguridad

1. En Firestore Database, ve a la pestaña **"Reglas"**
2. Reemplaza las reglas con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Clic "Publicar"

**⚠️ IMPORTANTE**: Estas reglas son para desarrollo/pruebas únicamente. Para producción, implementa reglas de seguridad adecuadas.

### Paso 4: Obtener Configuración Firebase

1. Ve a **Configuración del proyecto** (ícono de engranaje)
2. Desplázate hasta "Tus apps"
3. Selecciona la opción **Web** (ícono `</>`)
4. Registra tu app con un apodo (ej: "Retail Inventory Web")
5. Copia el objeto `firebaseConfig`

### Paso 5: Configurar firebaseConfig.js

1. Abre el archivo `firebaseConfig.js` en la raíz del proyecto
2. Reemplaza los valores de ejemplo con los tuyos:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## 📱 Instalación y Ejecución

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar el servidor de desarrollo

```bash
npx expo start
```

### 3. Probar la aplicación

**Opción A: Con Expo Go (Recomendado para pruebas)**

1. Descarga **Expo Go** desde:
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android)
   - [App Store](https://apps.apple.com/app/expo-go/id982107779) (iOS)

2. Escanea el código QR que aparece en la terminal
3. La app se abrirá automáticamente en Expo Go

**Opción B: Generar APK (Para distribución)**

Ver sección "Generación de APK" más abajo.

## 🔐 Credenciales de Acceso

- **Usuario**: `admin`
- **Contraseña**: `admin123`

## 📚 Estructura del Proyecto

```
retail-inventory-app/
├── App.js                      # Punto de entrada y navegación
├── firebaseConfig.js           # Configuración de Firebase
├── screens/
│   ├── LoginScreen.js          # Pantalla de login
│   ├── HomeScreen.js           # Lista de productos (READ/DELETE)
│   └── AddEditScreen.js        # Formulario (CREATE/UPDATE)
├── components/
│   └── ProductCard.js          # Componente reutilizable
└── services/
    └── firestoreService.js     # Operaciones CRUD
```

## 🎯 Funcionalidades CRUD

### CREATE (Crear)
- Botón flotante "+" en la pantalla principal
- Formulario con validaciones
- Campos: nombre, código, stock, precio

### READ (Leer)
- Lista de productos en tiempo real
- Actualización automática al cambiar datos en Firebase

### UPDATE (Actualizar)
- Tocar cualquier producto en la lista
- Editar campos y guardar

### DELETE (Eliminar)
- Botón de eliminar (🗑️) en cada producto
- Confirmación antes de eliminar

## 🏗️ Generar APK para Android

### Requisitos
- Cuenta de Expo creada
- EAS CLI instalado

### Pasos

1. **Instalar EAS CLI**
```bash
npm install -g eas-cli
```

2. **Iniciar sesión en Expo**
```bash
eas login
```

3. **Configurar el proyecto para build**
```bash
eas build:configure
```
Selecciona: `Android`

4. **Generar APK**
```bash
eas build -p android --profile preview
```

5. **Descargar APK**
- Espera 10-20 minutos a que compile
- Recibirás un enlace en la terminal
- También disponible en: https://expo.dev/accounts/[tu-usuario]/projects/retail-inventory-app/builds

**Nota**: El plan gratuito de Expo permite 30 builds por mes.

## 🧪 Pruebas

### Checklist de Pruebas CRUD

- [ ] **Login**
  - [ ] Credenciales correctas permiten acceso
  - [ ] Credenciales incorrectas muestran error

- [ ] **CREATE**
  - [ ] Agregar producto nuevo
  - [ ] Validación de campos vacíos
  - [ ] Validación de números negativos

- [ ] **READ**
  - [ ] Productos se muestran en lista
  - [ ] Actualización en tiempo real funciona

- [ ] **UPDATE**
  - [ ] Editar producto existente
  - [ ] Cambios se reflejan inmediatamente

- [ ] **DELETE**
  - [ ] Eliminar producto con confirmación
  - [ ] Producto desaparece de la lista

## 🐛 Solución de Problemas

### "Firebase: Error (auth/invalid-api-key)"
- Verifica que `firebaseConfig.js` tenga los valores correctos
- Asegúrate de no haber dejado comillas extras

### "Unable to resolve module"
- Ejecuta: `npm install`
- Limpia caché: `npx expo start -c`

### "Network request failed"
- Verifica tu conexión a internet
- Revisa las reglas de Firestore (deben permitir read/write)

### Datos no aparecen en la lista
- Agrega productos manualmente en Firebase Console para probar
- Verifica que la colección se llame `products`

## 📦 Modelo de Datos

### Estructura de Producto en Firestore

```javascript
{
  name: "Laptop HP",        // string
  barcode: "123456789",     // string
  stock: 25,                // number
  price: 12500.50           // number (float)
}
```

## 🎨 Paleta de Colores

- **Primario**: `#1976D2` (Azul)
- **Fondo**: `#FFFFFF` (Blanco)
- **Texto**: `#212121` (Gris oscuro)
- **Texto secundario**: `#757575` (Gris)

## 📄 Licencia

Este proyecto fue desarrollado como parte de un proyecto integrador universitario.

## 👥 Contacto

Desarrollado por: [Tu Nombre]

---

**Nota**: Recuerda configurar `firebaseConfig.js` antes de ejecutar la aplicación.
