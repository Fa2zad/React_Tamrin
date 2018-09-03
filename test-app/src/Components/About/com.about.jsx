import React from "react";
import "./style.about.css";

class NotFound extends React.Component {
    componentWillMount() {
        document.title = "About";
    }
    
    render() {
        return (
            <p>About About About About About About About About About About </p>
        )
    }
}

export default NotFound