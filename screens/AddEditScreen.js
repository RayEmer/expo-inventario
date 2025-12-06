import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { addProduct, updateProduct } from '../services/firestoreService';

export default function AddEditScreen({ navigation, route }) {

  const { product } = route.params || {};
  const isEditMode = !!product;

  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setBarcode(product.barcode);
      setStock(String(product.stock));
      setPrice(String(product.price));
    }
  }, [product]);

  const handleSave = async () => {
    if (!name.trim() || !barcode.trim() || !stock.trim() || !price.trim()) {
      Alert.alert('Error de Validación', 'Todos los campos son obligatorios');
      return;
    }

    const stockNum = parseInt(stock);
    const priceNum = parseFloat(price);

    if (isNaN(stockNum) || stockNum < 0) {
      Alert.alert('Error de Validación', 'El stock debe ser un número mayor o igual a 0');
      return;
    }

    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Error de Validación', 'El precio debe ser un número mayor a 0');
      return;
    }

    const productData = {
      name: name.trim(),
      barcode: barcode.trim(),
      stock: stockNum,
      price: priceNum,
    };

    setSaving(true);

    try {
      if (isEditMode) {
        await updateProduct(product.id, productData);
        Alert.alert('Éxito', 'Producto actualizado correctamente');
      } else {
        await addProduct(productData);
        Alert.alert('Éxito', 'Producto agregado correctamente');
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el producto. Intenta nuevamente.');
      console.error('Error al guardar producto:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.label}>Nombre del Producto *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Laptop HP"
          placeholderTextColor="#9E9E9E"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Código de Barras *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 123456789"
          placeholderTextColor="#9E9E9E"
          value={barcode}
          onChangeText={setBarcode}
        />

        <Text style={styles.label}>Stock *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 50"
          placeholderTextColor="#9E9E9E"
          value={stock}
          onChangeText={setStock}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Precio *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 12500.50"
          placeholderTextColor="#9E9E9E"
          value={price}
          onChangeText={setPrice}
          keyboardType="decimal-pad"
        />

        <TouchableOpacity
          style={[styles.button, saving && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.buttonText}>
            {saving ? 'Guardando...' : (isEditMode ? 'Actualizar Producto' : 'Guardar Producto')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
          disabled={saving}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  button: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  buttonDisabled: {
    backgroundColor: '#90CAF9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1976D2',
    marginBottom: 20,
  },
  cancelButtonText: {
    color: '#1976D2',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
