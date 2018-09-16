import React from "react";
import "./style.products.css";


class Details extends React.Component {
    
    constructor(props) {
        super(props);
        document.title = "ویرایش محصول";
        this.state = {
            ID: this.props.match.params.ID
        }
    }

    ShowEditForm = () => {
        return(
            <div className="col-md-4 col-md-offset-4">
                <div className="product-add__container">

                    <form id="editForm">
                        <input id="hdfID" type="hidden" value={this.state.ID}></input>
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
                            <button className="btn btn-success" type="submit">ویرایش محصول</button>
                        </div>
                    </form>
                    <div className="product-waiting">
                        در حال دریافت اطلاعات ...<br />
                        <img src="/assets/images/loading.gif" alt="" />
                    </div>
                </div>
            </div>
        );
    }

    ShowProduct = () => {
        $.ajax({
            url: 'http://localhost:58731/Product.ashx',
            type: "GET",
            cache: false,
            data: {
                action: "get",
                ID: this.state.ID
            },
            beforeSend: function () {
                $(".product-waiting").show();
            }
        })
            .done((data) => {
                var respondedData = $.parseJSON(data);
                document.getElementById("txtName").value = respondedData.Name;
                document.getElementById("txtPrice").value = respondedData.Price;
                document.getElementById("txtDescription").value = respondedData.Description;
                $(".product-waiting").hide();
                
            })
            .fail(function (jqXHR, textStatus) {
                console.log(textStatus + ':' + jqXHR.status + ' : ' + jqXHR.statusText);
            });
        // .always(function (result) {
        //     console.log('Request done !!');
        // });

        
    }

    handleSubmit = () => {
        $('#editForm').validetta({
            realTime: true,
            display: 'inline',
            errorTemplateClass: 'validetta-inline',
            onValid: function (event) {
                event.preventDefault();
                // this -> form object
                // this.form is form element
                const Product = {
                    id: this.form.hdfID.value,
                    name: this.form.txtName.value,
                    price: this.form.txtPrice.value,
                    description: this.form.txtDescription.value
                };
                $.ajax({
                    url: 'http://localhost:58731/Product.ashx',
                    type: "GET",
                    cache: false,
                    data: {
                        action: "edit",
                        id: Product.id,
                        name: Product.name,
                        price: Product.price,
                        description: Product.description
                    },

                    beforeSend: function () {
                        $('.product-waiting').css("display", "block")
                    },

                })
                    .done(function (data) {
                        // alert('Response data : ' + data.response);
                        location.hash = "/Products/editsuccess";

                    })
                    .fail(function (jqXHR, textStatus) {
                        console.log(textStatus + ':' + jqXHR.status + ' : ' + jqXHR.statusText);
                        location.hash = "/Products/Editfailed";

                    });
                // .always(function (result) {
                //     console.log('Request done !!');
                // });
            }
        });

    }

    componentDidMount() {
        this.ShowProduct();
        this.handleSubmit();
    }
    
    componentDidUpdate() {
        console.log("aaaa");
        
    }
    render() {
        return (
            <div>
                <h4>ویرایش محصول</h4>
                {this.ShowEditForm()}
            </div>
        );
    }
}

export default Details