import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
export default function SearchbarView(props){

    const [searchQuery, setSearchQuery] = useState('');
    function handleSearch(){
        props.searchPlant(searchQuery);
    }
    return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Search plants"
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      );
}
const styles = StyleSheet.create({
    container: {
      maxWidth: '60%',
      backgroundColor: '#c4d4af',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginHorizontal: 20,
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
    },
    input: {
      flex: 1,
      color: '#333',
      fontSize: 16,
      fontFamily: 'comic-sans',
    },
    button: {
      backgroundColor: '#8a9a5b',
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginLeft: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'comic-sans bold',
    },
  });