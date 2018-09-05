import React from "react";
import "./style.products.css";


class Details extends React.Component {
    
    constructor(props) {
        super(props);
        document.title = "جزئیات محصول";
    }

    render() {
        return (
            <div>
               جزئیات محصول
            </div>
        );
    }
}

export default Details