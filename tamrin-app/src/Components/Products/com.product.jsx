import React from "react";
import "./style.products.css";

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
                        name: Product.name,
                        price: Product.price,
                        description: Product.description
                    },

                    beforeSend: function () {
                        // console.log('Started request !');
                        $('.product-waiting').css("display", "block")
                    },

                })
                    .done(function (data) {
                        // alert('Response data : ' + data.response);
                        location.hash = "/Products/success";

                    })
                    .fail(function (jqXHR, textStatus) {
                        console.log(textStatus + ':' + jqXHR.status + ' : ' + jqXHR.statusText);
                        location.hash = "/Products/failed";

                    });
                // .always(function (result) {
                //     console.log('Request done !!');
                // });
            }
        });

    }


    componentDidMount() {
        this.handleSubmit();
    }

    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="product-add__container">

                    <form id="addForm">

                        <div className="form-group">
                            <input className="form-control" id="txtName" type="text" placeholder="نام محصول"
                                data-validetta="required" />
                        </div>

                        <div className="form-group">
                            <input className="form-control" id="txtPrice" type="number" placeholder="قیمت"
                                data-validetta="required,number" />
                        </div>

                        <div className="form-group">
                            <textarea className="form-control" id="txtDescription" placeholder="توضیحات"
                                data-validetta="required" />
                        </div>

                        <div>
                            <button className="btn btn-success" type="submit">افزدون محصول جدید</button>
                        </div>
                    </form>
                    <div className="product-waiting">
                        در حال ارسال اطلاعات ...<br />
                        <img src="/assets/images/loading.gif" alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

export default (Product)