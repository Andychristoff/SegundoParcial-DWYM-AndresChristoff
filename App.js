
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetallesDestino } from "./screens/DetallesDestino"
import { AddPlanet, AgregarDestino } from './screens/AgregarDestino';
import { ListaDestinos } from './screens/ListaDestinos';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Destinos" component={ListaDestinos} />
      <Stack.Screen name="Detalles de destino" component={DetallesDestino} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={HomeStack} 
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Agregar Destino" component={AgregarDestino} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}