import React, { useState, useEffect} from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, ScrollView, Dimensions, Text, Image, PanResponder, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
//import firestore from '@react-native-firebase/firestore';

const Scores = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>High Scores</Text>
      <View style={styles.scoresContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.scoreText}>Kayra - 5138</Text>
        <Text style={styles.scoreText}>Mirkan - 3394</Text>
          <Text style={styles.scoreText}>Asrın - 1702</Text>
          <Text style={styles.scoreText}>Dante - 1590</Text>
          <Text style={styles.scoreText}>Edward - 1448</Text>
          <Text style={styles.scoreText}>Giorno - 1278</Text>
          <Text style={styles.scoreText}>Hornsent - 1008</Text>
          <Text style={styles.scoreText}>Leda - 854</Text>
          <Text style={styles.scoreText}>Ansbach - 796</Text>
          <Text style={styles.scoreText}>Igon - 772</Text>
          <Text style={styles.scoreText}>Freyja - 658</Text>
          <Text style={styles.scoreText}>Igon - 512</Text>
          <Text style={styles.scoreText}>Moore - 462</Text>
          <Text style={styles.scoreText}>Shabriri - 340</Text>
          <Text style={styles.scoreText}>Hyeta - 338</Text>
          <Text style={styles.scoreText}>Ranni - 236</Text>
          <Text style={styles.scoreText}>Melina - 102</Text>
          <Text style={styles.scoreText}>Radahn - 84</Text>
          <Text style={styles.scoreText}>Frieren - 74</Text>
          <Text style={styles.scoreText}>Roy - 62</Text>
          <Text style={styles.scoreText}>Alecto - 56</Text>
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Icon name="home" size={24} color="white" />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444',
    paddingHorizontal: '5%',
    paddingTop: '10%',
    paddingBottom: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoresContainer: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: '#222',
    backgroundColor: '#666',
    borderRadius: 2,
    marginBottom: 20,
    alignItems: 'center',
  },
  scrollViewContent: {
    padding: 10,
  },
  scoreText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'normal',
    alignSelf: 'center',
    padding: 2,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    padding: 10,
    borderRadius: 2,
  },
});

export default Scores;
