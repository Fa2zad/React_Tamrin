import React from "react";
import "./style.products.css";

class Products extends React.Component {

    ShowMessage = () => {
        return (
            <div class='alert alert-success'>محصول جدید با موفقیت اضافه شد</div>
        )
    }

    constructor(props) {
        super(props);
        
        document.title = "محصولات";
        var message;
        let queryStringMessage  = this.props.match.params.message;

        if (queryStringMessage != null) {
            // if (queryStringMessage == "success") {
                message = this.ShowMessage();
            // }
            // else (message == "failed") {
            //     message = this.ShowMessage();
            // }
        }
        // console.log(this.props.match.params.message);
    }

    render() {
        return (
            <div>
                {this.message}
                محصولات <br />
                محصولات <br />
                محصولات <br />
                محصولات <br />
            </div>
        );
    }
}

export default Products