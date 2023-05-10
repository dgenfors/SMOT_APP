import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, TouchableOpacity, Dimensions, Platform} from 'react-native';
import React from "react";

import { LineChart } from 'react-native-chart-kit';

function HistoryView (props) {

    return (
    <View style={styles.container}>
        <Text style={{fontFamily: 'comic-sans bold', fontSize: 30, margin: 12}}>Moisture history</Text>
        <Text>Here you can view the moisture history of your plant</Text>
        <View style={styles.chartContainer}>
        
        <LineChart
          data={props.data}
          width={350} // from react-native Dimensions.get("window").width-15
          height={220}
          yAxisSuffix="%"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
          style={{borderRadius: 16}}
          withShadow={false}
          withDots={false}
          fromZero={true}
          bezier
        />
        </View>
    </View>)
}

const chartConfig = {
    backgroundColor: "#F00",
    backgroundGradientFrom: "#c4d4af", //#c4d4af
    backgroundGradientTo: "#BFB",
    decimalPlaces: 2, // optional, defaults to 2dp
    
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
        r: "3",
      }
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
    }
    
});


export default HistoryView;