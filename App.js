import React, { useState, Alert } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Image } from 'react-native';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);

  const getRepositories = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then(response => response.json())
      .then(data => setRepositories(data.meals))
      .catch(error => {
        Alert.alert('Error', error);
      });
  }

  return (
    <View style={styles.container}>
      
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View style={styles.listItem}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.strMeal}</Text>
            <Image source={{ uri: item.strMealThumb }} style={{ width: 100, height: 100, marginTop: 10 }} />
          </View>}
        data={repositories} />

<View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='keyword'
          value={keyword}
          onChangeText={text => setKeyword(text)}
        />
        <Button title="Find" onPress={getRepositories} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 5,
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 5,
  },
  input: {
    fontSize: 18,
    width: 200,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  listItem: {
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 10,
  },
});
