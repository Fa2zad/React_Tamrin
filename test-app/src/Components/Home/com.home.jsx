import React from "react";
import "./style.home.css";

class Home extends React.Component {
    
    constructor(props) {
        super(props);
        window.headTitle = "Home";
        document.title = "Home";

    }
 

    render() {
        return (
            <p>Home Home Home Home Home Home Home Home Home Home </p>
        );
    }
}

export default Home