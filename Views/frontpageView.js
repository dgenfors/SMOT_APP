
import { Button, StyleSheet, Text, View } from 'react-native';


function FrontpageView(props) {
    return (
      <View style={styles.container}>
        <Text>Hello world!</Text>
        <Text>Funkar för mig nu i think :!</Text>
        <Button title='Super cool test button'></Button>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#9dc183',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default FrontpageView;