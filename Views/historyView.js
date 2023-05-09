import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, TouchableOpacity, Dimensions} from 'react-native';
import React from "react";

import { LineChart } from 'react-native-chart-kit';

function HistoryView (props) {

    return (
    <View style={styles.container}>
        <Text>Moisture history</Text>
        <LineChart
          data={props.data}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisSuffix="%"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
        />
    </View>)
}

const chartConfig = {
    backgroundColor: "#3AA",
    backgroundGradientFrom: "#3CC",
    backgroundGradientTo: "#3AAFFF",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
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
    
});


export default HistoryView;