import FrontPage from "./Presenter/frontPagePresenter";

export default function Main() {
    return (
      <View>
        <FrontPage model={props.model}></FrontPage>
      </View>
    );
  }