import React from "react";
import "./style.errors.css";


class NotFound extends React.Component {
    
    constructor(props) {
        super(props);
        document.title = "یافت نشد!";
    }

    render() {
        return (
            <div>
               صفحه مورد نظر شما یافت نشد!
            </div>
        );
    }
}

export default NotFound