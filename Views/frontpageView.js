
import { Button, StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';

function FrontpageView(props) {
    //function onChangeTextACB(number) {
    //    props.onChangedTest(number);
    //}

    function  handleInputSubmit(event){
        props.onChangedTest(event.nativeEvent.text);
        //console.log('Input submitted:', event.nativeEvent.text);
        // do something with the input value here
    }
    //onChangeText={onChangeTextACB}
    return (
        <View style={styles.container}>
            <Text>Hello world!</Text>
            <Text>{props.test}</Text>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onSubmitEditing={handleInputSubmit}
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
        paddingVertical: 50,
        padding: 24,
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