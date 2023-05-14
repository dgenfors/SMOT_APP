import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, TouchableOpacity, Image , FlatList, Platform, Modal} from 'react-native';
import React, { useState } from 'react';
import {Picker} from '@react-native-picker/picker';

export default function SearchResultView(props){
  const [selectedValue, setSelectedValue] = useState("1");
  const [modalVisible, setModalVisible] = useState(false);
  const [dataItem, setDataItem] = useState();

  function mapDevices(device){
    return <Picker.Item label={"Device name:"+device.name+", DeviceID:"+device.id} value={device.id} key={device.id}/>
  }
  function selectedValueACB(itemValue, index){
    setSelectedValue(itemValue)
  }
  function navToPlantDetails(){
    props.addPlant(dataItem, selectedValue);
    setModalVisible(false)
  }

    function renderItem(data){
      
      
      
       return( <View style={styles.container}>
        <Pressable onPress={() => {setDataItem(data.item); setModalVisible(true); }}>
        <Image source={{ uri: data.item.default_image.original_url }} style={styles.image} />
        <Text style={styles.name}>{data.item.common_name}</Text>
        </Pressable>
        
    </View>
         );
    }
    return(
        <View>
           <Modal
            visible={modalVisible}
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {!dataItem ? <Text>Add plant to device?</Text> : <Text>{"Do you want to add plant:"+dataItem.common_name+"?"}</Text>}
                <View style={styles.modalButtons}>
                <Button title="No" onPress={() => setModalVisible(false)} />
                </View>
                <View style={styles.modalButtons}>
                <Button title="Yes" onPress={navToPlantDetails} />
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.test}>
            <Text>Select a device,then press a Plant to pair them</Text>
            <View style={styles.borders}><Picker
                  selectedValue={selectedValue}
                  style={styles.dropDown}
                  onValueChange={selectedValueACB}>
                  {props.devices.map(mapDevices)}
            </Picker></View>
          </View>
        <View style={styles.list}>
        <FlatList
          data={props.searchResults.data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={true}
        /></View>
        </View>
      );
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#c4d4af',
      borderRadius: 16,
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
      borderColor: '#2e8f2e',
      borderRadius: 5,
    },
    list:{
      ...Platform.select({
        ios:{
          height:400
        },
        android:{
          height:400, 
        },
        default:{
          height:650,
        }
      }
      ),
      paddingBottom:40, 
      flexDirection: 'column',
    },
    modalContainer: {
      top: "50%",
      //transform: [{ translateX: -50 }, { translateY: -20}],
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      opacity: 0.9,
      zIndex: 10,
      flexDirection: 'column',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
    },
    modalButtons:{
      padding: 20,
    }
    
    
    
  });