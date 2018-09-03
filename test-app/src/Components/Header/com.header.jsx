import React from "react";
import { Link } from "react-router-dom";
import "./style.header.css";

class Header extends React.Component {

    render() {
        return (
            <header className="App-header">
                <h1 className="App-title">{window.headTitle}</h1>
                <div>
                    <Link to="/" >Home</Link>&nbsp;
                    <Link to="/Contact" >Contact</Link>&nbsp;
                    <Link to="/About" >About</Link>
                </div>
            </header>
        )
    }
}

export default Header