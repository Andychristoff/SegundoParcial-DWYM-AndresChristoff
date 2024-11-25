import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';


export const AgregarDestino = () => {
  const [nuevoDestino, setNuevoDestino] = useState({
    name: '',
    description: '',
    difficulty: null,
  });

  const handleAdd = async () => {
    try {
      await fetch('http://161.35.143.238:8000/achristoff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoDestino),
      });
      setNuevoDestino({ name: '', description: '', difficulty: null});
    } catch (error) {
      console.error('Error adding destino:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre destino"
        value={nuevoDestino.name}
        onChangeText={(text) => setNuevoDestino({...nuevoDestino, name: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripcion"
        value={nuevoDestino.description}
        onChangeText={(text) => setNuevoDestino({...nuevoDestino, description: text})}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Dificultad de destino"
        value={nuevoDestino.difficulty}
        onChangeText={(text) => setNuevoDestino({...nuevoDestino, difficulty: text})}
      />
      <Button title="Agregar Destino" onPress={handleAdd} />
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