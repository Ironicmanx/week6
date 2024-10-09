
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, ImageBackground } from 'react-native-web';
import Page from './src/useAbortableFetch';
import "react-native-web";

const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export default function App() {
  const [phrase, setPhrase] = useState('Pork');
  const [meals, setMeals] = useState([]);  
  const urlRef = useRef(URL + phrase);

  const searchMeals = (text) => {
    setPhrase(text);
    if (!text) {
      setMeals([]); 
      return;
    }
    const address = URL + text;
    urlRef.current = address;
  };

  const { json, loading, error } = Page(urlRef.current);

  useEffect(() => {
    if (json && json.meals) {  
      setMeals(json.meals);
    }
  }, [json]);

  return (
    <ImageBackground
      source={{ uri: 'https://c.ndtvimg.com/2021-04/umk8i7ko_pasta_625x300_01_April_21.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=886' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.header}>Meals</Text>
        <TextInput
          placeholder="Search for a meal"
          value={phrase}
          onChangeText={text => {
            setPhrase(text);
            searchMeals(text);  
          }}
          style={styles.input}
        />
        <ScrollView>
          {
            meals.map((item, index) => (  
              <View key={index} style={styles.item}>
                <Text style={styles.mealName}>{item.strMeal}</Text>  
              </View>
            ))
          }
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',  
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 120,
    justifyContent: 'center',
    padding: 20,  
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'blue',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '80%',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  mealName: {
    fontSize: 18,
    color: '#333',
  },
});
