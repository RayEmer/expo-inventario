import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

// Importar pantallas
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AddEditScreen from './screens/AddEditScreen';

const Stack = createNativeStackNavigator();

/**
 * Aplicación principal de Gestión de Inventario
 * Implementa navegación entre Login, Home y AddEdit
 */
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1976D2',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          {/* Pantalla de Login sin header */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />

          {/* Pantalla principal de inventario */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: 'Inventario',
              headerLeft: () => null, // Deshabilitar botón de regresar
              headerRight: () => (
                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={() => {
                    Alert.alert(
                      'Cerrar Sesión',
                      '¿Estás seguro de que deseas cerrar sesión?',
                      [
                        {
                          text: 'Cancelar',
                          style: 'cancel',
                        },
                        {
                          text: 'Salir',
                          style: 'destructive',
                          onPress: () => navigation.replace('Login'),
                        },
                      ]
                    );
                  }}
                >
                  <Text style={styles.logoutText}>Salir</Text>
                </TouchableOpacity>
              ),
            })}
          />

          {/* Pantalla para agregar/editar productos */}
          <Stack.Screen
            name="AddEdit"
            component={AddEditScreen}
            options={({ route }) => ({
              title: route.params?.product ? 'Editar Producto' : 'Nuevo Producto',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
