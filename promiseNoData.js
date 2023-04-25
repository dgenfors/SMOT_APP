import { StyleSheet, Text, View, Image } from 'react-native';

function promiseNoData(param) {
    if (!param.promise) {
        return <Text>no data</Text>
    }
    else if (param.promise && !param.data && !param.error) {
        return <Image style={styles.tinyLogo} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png', }} />
    } else if (param.promise && !param.data && param.error) {
        return <View>{param.error.toString()}</View>
    } else if (param.promise && param.data && !param.error) {
        return "";
    }



}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 50,
        height: 50,
    }
});

export default promiseNoData;