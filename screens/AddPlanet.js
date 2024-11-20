import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';


export const AddPlanet = () => {
  const [newPlanet, setNewPlanet] = useState({
    name: '',
    description: '',
    moons: [],
  });

  const handleAdd = async () => {
    try {
      await fetch('http://192.168.248.179:8000/planets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlanet),
      });
      setNewPlanet({ name: '', description: '', moons: [] });
    } catch (error) {
      console.error('Error adding planet:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Planet Name"
        value={newPlanet.name}
        onChangeText={(text) => setNewPlanet({...newPlanet, name: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={newPlanet.description}
        onChangeText={(text) => setNewPlanet({...newPlanet, description: text})}
        multiline
      />
      <Button title="Add Planet" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      width: Dimensions.get('window').width * 0.85,
      alignSelf: 'center',
    },
    planetItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    planetName: {
      fontSize: 18,
    },
    deleteButton: {
      backgroundColor: 'red',
      padding: 8,
      borderRadius: 5,
    },
    deleteButtonText: {
      color: 'white',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      marginBottom: 10,
    },
    moons: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
    },
    moon: {
      fontSize: 14,
      marginLeft: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
  });