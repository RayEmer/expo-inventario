import { db } from '../firebaseConfig';
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Referencia a la colección de productos en Firestore
const productsRef = collection(db, 'products');

/**
 * CREATE - Agregar un nuevo producto a Firestore
 * @param {Object} product - Objeto con datos del producto {name, barcode, stock, price}
 * @returns {Promise<void>}
 */
export const addProduct = async (product) => {
  try {
    await addDoc(productsRef, product);
    console.log('Producto agregado exitosamente');
  } catch (error) {
    console.error('Error al agregar producto:', error);
    throw error;
  }
};

/**
 * READ - Obtener todos los productos en tiempo real
 * @param {Function} callback - Función que recibe el array de productos actualizado
 * @returns {Function} Función para cancelar la suscripción
 */
export const getProducts = (callback) => {
  try {
    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(products);
    }, (error) => {
      console.error('Error al obtener productos:', error);
      callback([]);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error en getProducts:', error);
    return () => {};
  }
};

/**
 * UPDATE - Actualizar un producto existente
 * @param {string} id - ID del documento en Firestore
 * @param {Object} product - Datos actualizados del producto
 * @returns {Promise<void>}
 */
export const updateProduct = async (id, product) => {
  try {
    const productDoc = doc(db, 'products', id);
    await updateDoc(productDoc, product);
    console.log('Producto actualizado exitosamente');
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

/**
 * DELETE - Eliminar un producto de Firestore
 * @param {string} id - ID del documento a eliminar
 * @returns {Promise<void>}
 */
export const deleteProduct = async (id) => {
  try {
    const productDoc = doc(db, 'products', id);
    await deleteDoc(productDoc);
    console.log('Producto eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};
