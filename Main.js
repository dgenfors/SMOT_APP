import FrontPage from "./Presenter/frontPagePresenter";
import { StyleSheet, Text, View } from 'react-native';

export default function Main(props) {
    return (
      <View>
        <FrontPage model={props.model}></FrontPage>
      </View>
    );
  }