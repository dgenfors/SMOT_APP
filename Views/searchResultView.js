import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, TouchableOpacity, Image , FlatList} from 'react-native';
import React, { useState } from 'react';

export default function SearchResultView(props){
    
    function renderItem(data){
       return( <View style={styles.container}>
        <Image source={{ uri: data.item.default_image.original_url }} style={styles.image} />
      <Text style={styles.name}>{data.item.common_name}</Text>
    </View>
         );
    }
    return(
        <FlatList
          data={props.searchResults.data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      );
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });