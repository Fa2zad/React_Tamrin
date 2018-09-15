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

                    <form>

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

    componentDidMount() {
        this.ShowProduct();
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