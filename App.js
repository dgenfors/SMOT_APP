import { StatusBar } from 'expo-status-bar';
import Model from "./Model/Model";
import { StyleSheet, Text, View } from 'react-native';
import Main from './Main';
export default function App() {
  return (
    <View style ={styles.container}><Main model={new Model()}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
