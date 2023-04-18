import React from "react";
import FrontpageView from "Views/frontpageView";

export default
    function FrontPage(props) {

    const [test, setTest] = React.useState(props.model.dataArray);
    React.useEffect(wasCreatedACB, []);

    function observerACB() {
        setTest(props.model.dataArray)
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
    }

    return (
            <FrontpageView
            test={test}
            onChangedTest={changeTest}
            >
            </FrontpageView>
    )
}
