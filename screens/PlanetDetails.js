import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

export const PlanetDetails = ({ route }) => {
  const { planetId } = route.params;
  const [planet, setPlanet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlanet, setEditedPlanet] = useState(null);

  useEffect(() => {
    fetchPlanetDetails();
  }, [planetId]);

  const fetchPlanetDetails = async () => {
    try {
      const response = await fetch(`http://192.168.248.179:8000/planets/${planetId}`);
      const data = await response.json();
      setPlanet(data);
      setEditedPlanet(data);
    } catch (error) {
      console.error('Error fetching planet details:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await fetch(`http://192.168.248.179:8000/planets/${planetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedPlanet),
      });
      fetchPlanetDetails();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating planet:', error);
    }
  };

  if (!planet) return <Text>Loading...</Text>;

  return (
    <View style={styles.centrado}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {!isEditing ? (
            <>
            <Text style={styles.title}>{planet.name}</Text>

            <Image
                source={{
                uri: `${planet.image}`
                }}
                style={styles.image}
                />

            <Text style={styles.description}>{planet.description}</Text>
            <Text style={styles.moons}>Moons: {planet.moon_names.length}</Text>
            <Text>Moon names:</Text>
            {planet.moon_names?.map((moon, index) => (
                <Text key={index} style={styles.moonstyle}>{moon}</Text>
            ))}
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
                value={editedPlanet.name}
                onChangeText={(text) => setEditedPlanet({...editedPlanet, name: text})}
            />
            <TextInput
                style={styles.input}
                value={editedPlanet.description}
                onChangeText={(text) => setEditedPlanet({...editedPlanet, description: text})}
                multiline
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