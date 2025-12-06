import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// IMPORTANTE: Reemplazar estos valores con los de tu proyecto Firebase
// Los obtienes de: Firebase Console > Project Settings > General > Your apps > SDK setup and configuration

const firebaseConfig = {
  apiKey: "AIzaSyAtVb7xgoJ4sE3YABs_IrVfJsJ345eUf7I",
  authDomain: "retailinventory.firebaseapp.com",
  projectId: "retailinventory",
  storageBucket: "retailinventory.firebasestorage.app",
  messagingSenderId: "252173037254",
  appId: "1:252173037254:web:cb2cba99c4125b514871c7"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar instancia de Firestore
export const db = getFirestore(app);
