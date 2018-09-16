import React from "react";
import "./style.products.css";
import Row from "./com.product.row";

class Products extends React.Component {

    // State
    state = {
        IsLoaded: false,
        products: [],
        page: [],
        countPerPage: [],
        countTotal: []
    }

    // Show result message of add prouduct component
    ShowMessage = () => {
        let queryStringMessage = this.props.match.params.message;

        if (queryStringMessage != null) {
            switch (queryStringMessage) {
                case "success":
                    return (
                        <div className='alert alert-success'>محصول جدید با موفقیت اضافه شد</div>
                    );
                case "failed":
                    return (
                        <div className='alert alert-danger'>محصول جدید اضافه نشد! لطفا دوباره تلاش کنید</div>
                    );
                case "editsuccess":
                    return (
                        <div className='alert alert-success'>محصول با موفقیت ویرایش شد</div>
                    );
                case "editfailed":
                    return (
                        <div className='alert alert-danger'>محصول ویرایش نشد! لطفا دوباره تلاش کنید</div>
                    );
                default:
                    break;
            }
        }
    }

    //#region CREATE_GRIDVIEW
    // Show list - mapping row component
    ShowList = () => {
        return this.state.products.map((item, i) => {
            return (
                <Row product={item} key={i} place={i} page={this.state.page} countPerPage={this.state.countPerPage} />
            );
        })
    }

    // Show pagination
    ShowPagination = () => {
        let pagesCount = Math.ceil(this.state.countTotal / this.state.countPerPage);
        var pagesArray = [];
        for (var i = 1; i <= pagesCount; i++) {
            pagesArray.push(<li key={i}>
                {i == this.state.page ? (
                    <a className="active">{i}</a>
                ) : (
                        <a href={"./#Products/" + i}>{i}</a>
                    )}
            </li>
            );
        }

        return (
            <tr>
                <th colSpan="5">
                    <ul className="pages">
                        {pagesArray}
                    </ul>
                </th>
            </tr>
        );
    }

    // show products - Ajax request
    ShowProducts = (page = 1, size = 3) => {
        if (isNaN(page)) {
            page = 1;
        }
        $.ajax({
            url: 'http://localhost:58731/Product.ashx',
            type: "GET",
            cache: false,
            data: {
                action: "list",
                page: page,
                size: size

            }
            // beforeSend: function () {
            // },
        })
            .done((data) => {
                var respondedData = $.parseJSON(data);
                $.ajax({
                    url: 'http://localhost:58731/Product.ashx',
                    type: "GET",
                    cache: false,
                    data: { action: "count" }
                }).done((countData) => {

                    this.setState({
                        IsLoaded: true,
                        products: respondedData,
                        page: page,
                        countPerPage: size,
                        countTotal: countData
                    });
                })
            })
            .fail(function (jqXHR, textStatus) {
                console.log(textStatus + ':' + jqXHR.status + ' : ' + jqXHR.statusText);
            });
        // .always(function (result) {
        //     console.log('Request done !!');
        // });

    }

    //#endregion

    //#region DELETE_PROCESS

    // Open delete modal
    OpenDeleteModal = () => {
        return (
            $(".btnShownDeleteModal").on("click", (event) => {
                $("#btnProductDelete").removeClass("disabled");
                $("#DeleteModalWaitingImage").hide();
                $("#productDeleteModal").modal("show");
                $("#hfProductIDDelete").val($(event.target).attr("data-id"));
            })
        );
    }

    // Delete product - Ajax request
    DeleteProduct = () => {

        $.ajax({
            url: 'http://localhost:58731/Product.ashx',
            type: "GET",
            cache: false,
            data: {
                action: "delete",
                ID: $("#hfProductIDDelete").val()
            },
            beforeSend: function () {
                $("#btnProductDelete").addClass("disabled");
                $("#DeleteModalWaitingImage").show("slow");
            },
        })
            .done((data) => {
                if (data) {
                    this.ShowProducts();
                    $('#productDeleteModal').modal('toggle');
                    location.hash = "/Products/1";
                } else {
                    console.log(data);
                    $("#btnProductDelete").removeClass("disabled");
                    $("#DeleteModalWaitingImage").hide("slow");
                    alert("حذف محصول با موفقیت انجام نشد، لطفا محددا تلاش کنید!");
                }
            })
            .fail(function (jqXHR, textStatus) {
                console.log(textStatus + ':' + jqXHR.status + ' : ' + jqXHR.statusText);
                $("#btnProductDelete").removeClass("disabled");
                $("#DeleteModalWaitingImage").hide("slow");
                alert("حذف محصول با موفقیت انجام نشد، لطفا محددا تلاش کنید!");
            });
        // .always(function (result) {
        //     console.log('Request done !!');
        // });
    }

    //#endregion

    //#region LIFE_CYCLE_METHODS

    componentDidMount() {
        this.ShowProducts(this.props.match.params.message);
        document.title = "محصولات";
    }

    componentWillReceiveProps(w) {
        this.ShowProducts(w.match.params.message);
    }

    componentDidUpdate() {
        this.OpenDeleteModal();
    }

    render() {
        let content;

        content = this.state.IsLoaded &&
            <div className="products__container">
                {this.ShowMessage()}
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>ردیف</th>
                            <th>نام محصول</th>
                            <th>قیمت</th>
                            <th>توضیحات</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.ShowList()}
                    </tbody>
                    <tfoot>
                        {this.ShowPagination()}
                    </tfoot>
                </table>

                {/* delete modal */}
                <div id="productDeleteModal" className="modal fade" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h3 id="deleteModalLabel">حذف محصول</h3>
                            </div>
                            <div className="modal-body">
                                آیا مطمئن به حذف محصول هستید؟
                            <input id="hfProductIDDelete" type="hidden" />
                            </div>
                            <div className="modal-footer">
                                <img id="DeleteModalWaitingImage" src="./assets/images/loading.gif" />
                                <button id="btnProductDelete" className="btn btn-danger" onClick={this.DeleteProduct}>حذف</button>
                                <button className="btn btn-info" data-dismiss="modal" aria-hidden="true">انصراف</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        return (
            <div>
                {content}
            </div >
        );
    }

    //#endregion

}

export default Products