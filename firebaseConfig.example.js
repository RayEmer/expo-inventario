import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ESTE ES UN ARCHIVO DE EJEMPLO
// Copia este archivo como firebaseConfig.js y reemplaza con tus valores reales

// Obtén estos valores desde:
// Firebase Console → Configuración del proyecto → General → Tus apps → Web

const firebaseConfig = {
  apiKey: "AIzaSy...", // Tu API Key de Firebase
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar instancia de Firestore
export const db = getFirestore(app);
