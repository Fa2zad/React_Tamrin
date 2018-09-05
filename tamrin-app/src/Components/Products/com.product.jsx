import React from "react";
import "./style.products.css";


class Product extends React.Component {

    handleSubmit = event => {
        event.preventDefault();

        const product = {
            name: document.getElementById("txtName").value,
            price: document.getElementById("txtPrice").value,
            description: document.getElementById("txtDescription").value,
        };

        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:58731/Product.ashx', true);

        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                // Request finished. Do processing here.
                document.getElementById("divStatus").innerHTML =
                 "<p class=\"alert alert-success\" >" + this.response + "</p>";
            }
        }
        xhr.send(
            "action=add&name=" + product.name 
            + "&price=" + product.price 
            + "&description=" + product.description
        ); 
        
    }

    

    constructor(props) {
        super(props);
        document.title = "افزدون محصول جدید";
    }


    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmit}>
                   
                    <div className="form-group">
                        <input className="form-control" id="txtName" type="text" placeholder="نام محصول" />
                    </div>
                    <div className="form-group">
                        <input className="form-control" id="txtPrice" type="text" placeholder="قیمت" />
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" id="txtDescription" placeholder="توضیحات" />
                    </div>
                   
                    <div>
                        <button className="btn btn-info" type="submit">افزدون محصول جدید</button>
                    </div>
                    <div id="divStatus">

                    </div>
                </form>
            </div>
        );
    }
}

export default Product