import { StatusBar } from 'expo-status-bar';
import Model from "./Model/Model";
import { StyleSheet, Text, View } from 'react-native';
import Main from './Main';
export default function App() {
  console.log("In app");
  return (
    <View style={styles.container}><Main model={new Model(5)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


