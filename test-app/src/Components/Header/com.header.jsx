import React from "react";
import "./style.header.css";

class Header extends React.Component {

    render() {
        return (
            <header className="App-header">
                <h1 className="App-title">{this.props.title}</h1>
            </header>
        )
    }
}

export default Header