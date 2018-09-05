import React from "react";
import "./style.products.css";


class Products extends React.Component {
    
    constructor(props) {
        super(props);
        document.title = "محصولات";
    }

    render() {
        return (
            <div>
               محصولات <br />
               محصولات <br />
               محصولات <br />
               محصولات <br />
            </div>
        );
    }
}

export default Products