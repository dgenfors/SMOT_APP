
import { Button, StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';

function FrontpageView(props) {
    //function onChangeTextACB(number) {
    //    props.onChangedTest(number);
    //}

    function handleInputSubmit(event) {
        props.onChangedTest(event.nativeEvent.text);
        //console.log('Input submitted:', event.nativeEvent.text);
        // do something with the input value here
    }
    //onChangeText={onChangeTextACB}

    function handleLogoutButtonPress(event) {
        props.onPressLogout();
    }

    //something wrong with style={styles.container} that was in outer view removing for now.
    return (
        <View >
            <View style={styles.container2}>
                <Text>Login or Register!</Text>
                <SafeAreaView>
                    <Text>Test number: {props.test}</Text>
                    <TextInput
                        style={styles.input}
                        onSubmitEditing={handleInputSubmit}
                        placeholder="Input a value"
                    />
                </SafeAreaView>
                <Button
                    onPress={handleLogoutButtonPress}
                    title="Logout"
                />
            </View>
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
    container2: {
        flex: 0,
        backgroundColor: '#9ed984',
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