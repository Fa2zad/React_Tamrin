import React from "react";
import "./style.about.css";

class About extends React.Component {
    constructor(props) {
        super(props);
        document.title = "About";
        // window.headTitle = "About";

    }

    render() {
        return (
            <p>About About About About About About About About About About </p>
        )
    }
}

export default About