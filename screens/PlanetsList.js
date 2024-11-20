import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native';

export const PlanetsList = ({ navigation }) => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetchPlanets();
    console.log(planets)
  }, []);

  const fetchPlanets = async () => {
    try {
      const response = await fetch('http://192.168.248.179:8000/planets');
      const data = await response.json();
      setPlanets(data);
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://192.168.248.179:8000/planets/${id}`, {
        method: 'DELETE',
      });
      fetchPlanets();
    } catch (error) {
      console.error('Error deleting planet:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.planetItem}
      onPress={() => navigation.navigate('PlanetDetails', { planetId: item.id })}
    >
      <Image
        source={{
          uri: `${item.image}`
        }}
        style={styles.image}
      />
      <Text style={styles.planetName}>{item.name}</Text>
      <TouchableOpacity
        onPress={() => handleDelete(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={planets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
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
  image: {
    height: 40,
    width: 40
  }
});