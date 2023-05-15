import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, TouchableOpacity, Dimensions, Platform} from 'react-native';
import React from "react";
import {Picker} from '@react-native-picker/picker';

import { LineChart } from 'react-native-chart-kit';

function HistoryView (props) {
    const [selectedValue, setSelectedValue] = React.useState("Last hour");


    function selectedValueACB(itemValue, index){
        setSelectedValue(itemValue)
        props.setTime(itemValue)
      }
    function getLastHour(){
        const now = new Date();
        return new Date(now.getTime() - (1000*60*60))
    }
    function getYesterday(){
        const now = new Date();
        return new Date(now.getTime() - (1000*60*60*24))
    }
    function removeLabels(){
       var list = []
       for(var i = 0; i<props.data.labels.length-1; i++){
        if(i!=0 && props.data.labels.length-2){
            list.push(i);
        }
       }
        
        return list
    }

    return (
    <View style={styles.container}>
        <Text style={{fontFamily: 'comic-sans bold', fontSize: 30, margin: 12}}>Moisture history</Text>
        <Text>Here you can view the moisture history of your plant</Text>
        <View style={styles.borders}>
        <Picker
                  selectedValue={selectedValue}
                  style={styles.dropDown}
                  onValueChange={selectedValueACB}>
                  <Picker.Item label="Last hour" value="Last hour"/>
                  <Picker.Item label="Last 24 hours" value="Last 24 hours" />
                  <Picker.Item label="Last week" value="Last week" />
                  <Picker.Item label="Demo" value="Demo" />
            </Picker></View>
        <View style={styles.chartContainer}>
        
        <LineChart
          data={props.data}
          width={350} // from react-native Dimensions.get("window").width-15
          height={220}
          yAxisSuffix="%"
          yAxisInterval={100} // optional, defaults to 1
          chartConfig={chartConfig}
          style={{borderRadius: 16, }}
          withShadow={false}
          withDots={false}
          fromZero={true}
          bezier
          //hidePointsAtIndex={removeLabels()}
        />
        </View>
    </View>)
}

const chartConfig = {
    backgroundColor: "#F00",
    backgroundGradientFrom: "#c4d4af", //#c4d4af
    backgroundGradientTo: "#BFB",
    decimalPlaces: 1, // optional, defaults to 2dp
    style: {
        padding:20,
    },
    propsForDots: {
        r: "3",
    },
    
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#2e8f2e',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    chartContainer: {
        flex: 1,
        maxWidth: Platform.OS === 'android' ? '100%' : '60%',
        marginVertical: 20,
    },
    borders:{
        borderWidth: 20,
        borderColor: '#2e8f2e',
        borderRadius: 10, 
        backgroundColor: '#B2AC88',

      },
      dropDown:{
        height: 50, 
        width: 250,
        backgroundColor: "transparent",
      },
    
});


export default HistoryView;