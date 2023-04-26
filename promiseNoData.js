import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';

function promiseNoData(param) {
    if (!param.promise) {
        return <Text>no data</Text>
    }
    else if (param.promise && !param.data && !param.error) {
        return <ActivityIndicator size="large" />
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