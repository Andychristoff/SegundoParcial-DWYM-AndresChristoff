
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlanetsList } from './screens/PlanetsList';
import { PlanetDetails } from './screens/PlanetDetails';
import { AddPlanet } from './screens/AddPlanet';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Planets" component={PlanetsList} />
      <Stack.Screen name="PlanetDetails" component={PlanetDetails} />
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
        <Tab.Screen name="Add Planet" component={AddPlanet} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}