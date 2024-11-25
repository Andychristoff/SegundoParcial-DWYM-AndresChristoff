import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native';

export const ListaDestinos = ({ navigation }) => {
  const [destinos, setDestinos] = useState([]);

  useEffect(() => {
    fetchDestinos();
  }, []);

  navigation.addListener('focus', () => {
    fetchDestinos();
  });

  const fetchDestinos = async () => {
    try {
      const response = await fetch('http://161.35.143.238:8000/achristoff');
      const data = await response.json();
      const orderedDataAlfabet = [...data].sort((a, b) => a.name.localeCompare(b.name));
      const orderedDataFavourites = [...orderedDataAlfabet].sort((a, b) =>  b.favourite - a.favourite)
      setDestinos(orderedDataFavourites);
    } catch (error) {
      console.error('Error fetching destinos:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://161.35.143.238:8000/achristoff/${id}`, {
        method: 'DELETE',
      });
      fetchDestinos();
    } catch (error) {
      console.error('Error deleting destino:', error);
    }
  };

  const handleNOTFavourite = async (id) => {
    try {
      await fetch(`http://161.35.143.238:8000/achristoff/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          favourite: false
        })
      });
      fetchDestinos();
    } catch (error) {
      console.error('Error favouriting destino:', error);
    }
  }

  const handleYESFavourite = async (id) => {
    try {
      await fetch(`http://161.35.143.238:8000/achristoff/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          favourite: true
        })
      });
      fetchDestinos();
    } catch (error) {
      console.error('Error favouriting destino:', error);
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.destinoItem}
      onPress={() => navigation.navigate('Detalles de destino', { destinoID: item.id })}
    >
      <Text>Tap destino to edit</Text>
      <Text style={styles.nombreDestino}>{item.name}</Text>
      <Text style={{backgroundColor: item.difficulty.toLowerCase() === 'easy' ? 'green' : item.difficulty.toLowerCase() === 'medium' ? 'yellow' : 'red', margin:5}}>
        Dificultad de destino: {item.difficulty}
      </Text>
      <TouchableOpacity
        onPress={() => handleDelete(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
      {item.favourite && <TouchableOpacity
        onPress={() => handleNOTFavourite(item.id)}
        style={{margin:10,padding:5,backgroundColor: "gold"}}
      >
        <Text style={{color : "black"}}>Favourite</Text>
      </TouchableOpacity>}
      {!item.favourite && <TouchableOpacity
        onPress={() => handleYESFavourite(item.id)}
        style={{margin:10, padding:5, backgroundColor: "white"}}
      >
        <Text style={{color : "black"}}>Favourite</Text>
      </TouchableOpacity>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* usar directo <DropDownPicker> porque este componente no lo pude hacer funcionar*/}
      <FlatList
        data={destinos}
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
  destinoItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  nombreDestino: {
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
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