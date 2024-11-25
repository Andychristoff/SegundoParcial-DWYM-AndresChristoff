import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

export const DetallesDestino = ({ route }) => {
  const { destinoID } = route.params;
  const [destino, setDestino] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [destinoEditado, setdestinoEditado] = useState(null);

  useEffect(() => {
    fetchDetallesDestino();
    console.log(destinoID)
  }, [destinoID]);

  const fetchDetallesDestino = async () => {
    try {
      const response = await fetch(`http://161.35.143.238:8000/achristoff/${destinoID}`);
      const data = await response.json();
      setDestino(data);
      setdestinoEditado(data);
    } catch (error) {
      console.error('Error fetching destino details:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await fetch(`http://161.35.143.238:8000/achristoff/${destinoID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(destinoEditado),
      });
      fetchDetallesDestino();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating destino:', error);
    }
  };

  if (!destino) return <Text>Loading...</Text>;

  return (
    <View style={styles.centrado}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {!isEditing ? (
            <>
            <Text style={styles.title}>{destino.name}</Text>
            <Text style={styles.description}>{destino.description}</Text>
            <Text style={{backgroundColor: destino.difficulty === 'easy' ? 'green' : destino.difficulty === 'medium' ? 'yellow' : 'red', margin:5}}>Dificultad de destino: {destino.difficulty}</Text>
            <View style={styles.buttonEdit}>
            <Button 
                title="Edit" 
                onPress={() => setIsEditing(true)} 
                />
            </View>
        
            </>
        ) : (
            <>
            <TextInput
                style={styles.input}
                value={destinoEditado.name}
                onChangeText={(text) => setdestinoEditado({...destinoEditado, name: text})}
            />
            <TextInput
                style={styles.input}
                value={destinoEditado.description}
                onChangeText={(text) => setdestinoEditado({...destinoEditado, description: text})}
                multiline
            />
            <TextInput
                style={styles.input}
                value={destinoEditado.difficulty}
                onChangeText={(text) => setdestinoEditado({...destinoEditado, difficulty: text})}
            />
            <Button title="Save" onPress={handleUpdate} />
            <Button title="Cancel" onPress={() => setIsEditing(false)} />
            </>
        )}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      width: Dimensions.get('window').width * 0.85,
      alignSelf: 'center',
      marginBottom: 10,
      
    },
    image: {
        height: 200,
        width: 200,
        marginBottom: 10,
        borderRadius: 10
    },
    planetplanet: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignplanets: 'center',
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
    moonstyle: {
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
    buttonEdit: {
        width: '100%',
        height: 40,
        marginTop: 10,
        marginBottom: 20
    }
  });