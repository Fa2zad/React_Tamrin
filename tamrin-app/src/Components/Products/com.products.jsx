import React from "react";
import "./style.products.css";

class Products extends React.Component {

    ShowMessage = () => {

        let queryStringMessage  = this.props.match.params.message;

        if (queryStringMessage != null) {

            if (queryStringMessage == "success") {
                return (
                    <div className='alert alert-success'>محصول جدید با موفقیت اضافه شد</div>
                )
            }
            else if (queryStringMessage == "failed") {
                return (
                    <div className='alert alert-danger'>محصول جدید اضافه نشد! لطفا مجددا تلاش کنید</div>
                )
            }
        }


        
    }

    constructor(props) {
        super(props);
        document.title = "محصولات";
    }

    render() {
        return (
            <div>
                {this.ShowMessage()}
                محصولات <br />
                محصولات <br />
                محصولات <br />
                محصولات <br />
            </div>
        );
    }
}

export default Products