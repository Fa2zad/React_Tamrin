import React from "react";
import "./style.products.css";
import { findDOMNode } from "react-dom";
// import $ from "./../../jquery.min.js";
// window.jQuery = $;
// window.$ = $;


class Product extends React.Component {

    handleSubmit = event => {
        event.preventDefault();
        let isValidate = true;
        const product = {
            name: document.getElementById("txtName").value,
            price: document.getElementById("txtPrice").value,
            description: document.getElementById("txtDescription").value,
        };
        // $("div").css("border", "1px solid red");

        // handleToggle = () => {
        //     const el = findDOMNode(this.refs.toggle);
        //     alert($(el).slideToggle());
        //     };

        if (product.name === "") {
            document.getElementById("txtName").style.cssText = "border-color: red";
            isValidate = false;
            document.getElementById("divStatus").innerHTML =
             "<p class=\"alert alert-danger\">لطفا نام محصول را موارد کنید.</p>";
        }

        if (isValidate) {
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
        
        
    }


    handleBlur = () => {
        this.style = ("border: 1px solid red");
    }
    

    constructor(props) {
        super(props);
        document.title = "افزدون محصول جدید";
    }


    render() {
        return (
            <div className="product__container">

                <form onSubmit={this.handleSubmit}>
                   
                    <div className="form-group">
                        <input className="form-control" id="txtName" type="text" placeholder="نام محصول" onBlur={this.handleBlur()} />
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

                    <div id="divStatus" className="divStatus">
                    </div>

                    
                </form>
            </div>
        );
    }
}

export default Product