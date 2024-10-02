import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native-web';
import Page from './src/useAbortableFetch';
import "react-native-web";

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export default function App() {
  const [phrase, setPhrase] = useState('Margarita');
  const [cocktails, setCocktails] = useState([]);
  const urlRef = useRef(URL + phrase);

  const searchCocktails = (text) => {
    setPhrase(text);
    const address = URL + text;
    urlRef.current = address;
  };

  const { json, loading, error } = Page(urlRef.current);

  useEffect(() => {
    if (json && json.drinks) {
      setCocktails(json.drinks);
    }
  }, [json]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Cocktails</Text>
      <TextInput
        placeholder="Search for a cocktail"
        value={phrase}
        onChangeText={text => {
          setPhrase(text);
          searchCocktails(text);
        }}
        style={styles.input}
      />
      <ScrollView>
        {
          cocktails.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text>{item.strDrink}</Text>
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 20,
    marginTop : 120,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
