import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, TouchableOpacity, Image , FlatList} from 'react-native';
import React, { useState } from 'react';
import {Picker} from '@react-native-picker/picker';

export default function SearchResultView(props){
  const [selectedValue, setSelectedValue] = useState("1");

  function mapDevices(device){
    return <Picker.Item label={"Device name:"+device.name+", DeviceID:"+device.id} value={device.id} key={device.id}/>
  }
  function selectedValueACB(itemValue, index){
    setSelectedValue(itemValue)
  }

    function renderItem(data){
      function navToPlantDetails(){
        props.addPlant(data.item, selectedValue);
      }
      
      
       return( <View style={styles.container}>
        <Pressable onPress={navToPlantDetails}>
        <Image source={{ uri: data.item.default_image.original_url }} style={styles.image} />
        <Text style={styles.name}>{data.item.common_name}</Text>
        </Pressable>
    </View>
         );
    }
    return(
        <View>
          <View style={styles.test}>
            <Text>Select a device,then press a Plant to pair them</Text>
            <View style={styles.borders}><Picker
                  selectedValue={selectedValue}
                  style={styles.dropDown}
                  onValueChange={selectedValueACB}>
                  {props.devices.map(mapDevices)}
            </Picker></View>
          </View>
        <View style={{height:400, paddingBottom:40, flexDirection: 'column',}}>
        <FlatList
          data={props.searchResults.data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        /></View>
        </View>
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
      fontFamily: 'comic-sans bold',

    },
    dropDown:{
      height: 50, 
      width: 250,
      backgroundColor: "transparent",
    },
    test:{
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginHorizontal: 20,
      marginVertical: 10,
      flexDirection: 'column',
      alignItems: 'center',
    },
    borders:{
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
    }
    
  });