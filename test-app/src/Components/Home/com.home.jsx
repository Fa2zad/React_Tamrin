import React from "react";
import "./style.home.css";

class Home extends React.Component {
    componentWillMount() {
        document.title = "Home";
    }
    
    render() {
        return (
            <p>Home Home Home Home Home Home Home Home Home Home </p>
        );
    }
}

export default Home