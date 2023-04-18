import React from "react";
import FrontpageView from "../Views/frontpageView";

export default
    function FrontPage(props) {

    const [test, setTest] = React.useState(props.model.dataArray);
    React.useEffect(wasCreatedACB, []);

    function observerACB() {
        console.log(props.model.dataArray);
        setTest(props.model.dataArray);
    }

    function wasCreatedACB() {
        props.model.addObserver(observerACB);
        function isTakenDownACB() {
            props.model.removeObserver(observerACB);
        }
        return isTakenDownACB;
    }

    function changeTest(number) {
        props.model.addData(number); 
        //console.log("Presnter test")
    }

    return (
            <FrontpageView
            test={props.model.dataArray}
            onChangedTest={changeTest}
            >
            </FrontpageView>
    )
}
