import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, TouchableOpacity} from 'react-native';
import React from "react";

import { LineChart } from 'react-native-charts-wrapper';

function HistoryView (props) {

    return (
        <View style={styles.container}>
            <LineChart style={{flex: 1}}
            data={{dataSets:[{label: "test", values: [{y: 1}, {y: 2}, {y: 1}]}]}}
          />
        </View>
    );
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