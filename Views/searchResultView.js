import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, TouchableOpacity, Image , FlatList, Picker} from 'react-native';
import React, { useState } from 'react';

export default function SearchResultView(props){
  const [selectedValue, setSelectedValue] = useState("java");

    function renderItem(data){
      
      function navToPlantDetails(){
        props.addPlant(data.item);
      }
      function selectedValueACB(itemValue, index){
        console.log(itemValue,index)
        setSelectedValue(itemValue)
      }
       return( <View style={styles.container}><Pressable onPress={navToPlantDetails}>
        <Image source={{ uri: data.item.default_image.original_url }} style={styles.image} />
      <Text style={styles.name}>{data.item.common_name}</Text>
      <Text style={styles.name}>Press to add information to your plant</Text>
      </Pressable>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={selectedValueACB}
      >
        <Picker.Item label="Device1" value="one" />
        <Picker.Item label="Device2" value="two" />
      </Picker>

      
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