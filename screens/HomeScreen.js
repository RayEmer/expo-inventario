import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { getProducts, deleteProduct } from '../services/firestoreService';
import ProductCard from '../components/ProductCard';

/**
 * Pantalla principal que muestra la lista de productos
 * Implementa operaciones READ y DELETE
 */
export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Suscribirse a cambios en tiempo real de Firestore
    const unsubscribe = getProducts((productsList) => {
      setProducts(productsList);
      setLoading(false);
    });

    // Cleanup: cancelar suscripción cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  /**
   * Maneja la eliminación de un producto sin confirmación
   */
  const handleDelete = async (id, name) => {
    console.log('Eliminando producto:', id, name);

    try {
      await deleteProduct(id);
      console.log('✅ Producto eliminado exitosamente de Firebase');
    } catch (error) {
      console.error('❌ Error al eliminar:', error);
      Alert.alert('Error', 'No se pudo eliminar el producto. Verifica tu conexión a internet.');
    }
  };

  /**
   * Navega a la pantalla de edición con los datos del producto
   */
  const handleEdit = (product) => {
    navigation.navigate('AddEdit', { product });
  };

  /**
   * Navega a la pantalla de agregar nuevo producto
   */
  const handleAdd = () => {
    navigation.navigate('AddEdit');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id, item.name)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>📦</Text>
            <Text style={styles.emptyTitle}>No hay productos</Text>
            <Text style={styles.emptySubtitle}>
              Presiona el botón + para agregar tu primer producto
            </Text>
          </View>
        }
        contentContainerStyle={products.length === 0 && styles.emptyListContent}
      />

      {/* Botón flotante para agregar producto */}
      <TouchableOpacity style={styles.fab} onPress={handleAdd}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    color: '#757575',
    fontSize: 16,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
});
