
import { Button, StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';

function FrontpageView(props) {
    function onChangeTextACB(number) {
        props.onChangedTest(number);
    }
    return (
        <View style={styles.container}>
            <Text>Hello world!</Text>
            <Text>{props.test}</Text>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTextACB}
                    placeholder="write something"
                />
            </SafeAreaView>
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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default FrontpageView;