import FrontPage from "./Presenter/frontPagePresenter";
import { StyleSheet, Text, View } from 'react-native';

export default function Main(props) {
    return (
      <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
        <FrontPage model={props.model}></FrontPage>
      </View>
    );
  }