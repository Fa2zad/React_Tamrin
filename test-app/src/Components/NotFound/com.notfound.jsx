import React from "react";
import "./style.notfound.css";

class NotFound extends React.Component {
    componentWillMount() {
        document.title = "Page not Found!";
    }
    render() {
        return (
            <p>صفحه مورد نظر یافت نشد!</p>
        )
    }
}

export default NotFound