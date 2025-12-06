import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * Componente reutilizable para mostrar información de un producto
 * @param {Object} product - Objeto con datos del producto
 * @param {Function} onPress - Callback al tocar la tarjeta (para editar)
 * @param {Function} onDelete - Callback al tocar el botón eliminar
 */
export default function ProductCard({ product, onPress, onDelete }) {
  const handleDelete = () => {
    console.log('🗑️ Botón de eliminar presionado para:', product.name);
    if (onDelete) {
      onDelete();
    } else {
      console.error('⚠️ onDelete no está definido');
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.info} onPress={onPress} activeOpacity={0.7}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.detail}>Código: {product.barcode}</Text>
        <Text style={styles.detail}>
          Stock: {product.stock} | Precio: ${product.price.toFixed(2)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        activeOpacity={0.6}
      >
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#1976D2',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    color: '#757575',
    marginTop: 2,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 10,
    paddingVertical: 10,
    minWidth: 50,
  },
  deleteText: {
    fontSize: 28,
  },
});
