import React from "react";
import "./style.products.css";
import { Redirect } from 'react-router-dom'

class Product extends React.Component {
    constructor(props) {
        super(props);
        document.title = "افزدون محصول جدید";
    }

    handleSubmit = () => {
        // event.preventDefault();


        $('#addForm').validetta({
            realTime: true,
            display: 'inline',
            errorTemplateClass: 'validetta-inline',
            onValid: function (event) {
                event.preventDefault();
                // this -> form object
                // this.form is form element
                const Product = {
                                name: document.getElementById("txtName").value,
                                price: document.getElementById("txtPrice").value,
                                description: document.getElementById("txtDescription").value,
                            };
                $.ajax({
                        url: 'http://localhost:58731/Product.ashx',
                        type: "GET",
                        cache: false,
                        data: { 
                            action: "add",
                            name:  Product.name,
                            price: Product.price,
                            description: Product.description
                        }

                        // beforeSend: function () {
                        //     console.log('Started request !');
                        // },

                    })
                    .done(function (data) {
                        alert('Response data : ' + data.response);
                        this.props.history.push('/#success');
                    })
                    .fail(function (jqXHR, textStatus) {
                        console.log(textStatus + ':' + jqXHR.status + ' : ' + jqXHR.statusText);
                        this.props.history.push('/#failed');
                    })
                    // .always(function (result) {
                    //     console.log('Request done !!');
                    // });
            }
        });




        // $('#addForm').validetta({
        //     realTime: true,
        //     display: 'inline',
        //     errorTemplateClass: 'validetta-inline',
        //     onValid: () => {
        //         // event.preventDefault();
        //         alert('Success');
        //         const Product = {
        //             name: document.getElementById("txtName").value,
        //             price: document.getElementById("txtPrice").value,
        //             description: document.getElementById("txtDescription").value,
        //         };
        //         alert(AddRequest(Product));
        //         if (AddRequest(Product)) {
        //             this.props.history.push('/');
        //         }
        //     }
        // });

        
        // const AddRequest = (product) => {
        //     var xhr = new XMLHttpRequest();
        //     xhr.open("POST", 'http://localhost:58731/Product.ashx', true);

        //     //Send the proper header information along with the request
        //     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        //     xhr.onreadystatechange = function () {//Call a function when the state changes.
        //         if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        //             // Request finished. Do processing here.
        //             document.getElementById("divStatus").innerHTML =
        //                 "<p class=\"alert alert-success\" >" + this.response + "</p>";
        //             return this.status;
        //         }
        //     }
        //     xhr.send(
        //         "action=add&name=" + product.name
        //         + "&price=" + product.price
        //         + "&description=" + product.description
        //     );
        // }


    }


    componentDidMount() {
        this.handleSubmit();
    }

    render() {
        return (
            <div className="product__container">

                <form id="addForm">

                    <div className="form-group">
                        <input className="form-control" id="txtName" type="text" placeholder="نام محصول"
                            data-validetta="required" />
                    </div>

                    <div className="form-group">
                        <input className="form-control" id="txtPrice" type="text" placeholder="قیمت"
                            data-validetta="required" />
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