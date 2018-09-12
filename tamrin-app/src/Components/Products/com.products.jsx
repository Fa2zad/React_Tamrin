import React from "react";
import "./style.products.css";
import Row from "./com.product.row";

class Products extends React.Component {

    state = {
        IsLoaded: false,
        products: [],
        page: [],
        countPerPage: [],
        countTotal: []
    }

    ShowList = () => {

        return this.state.products.map((item, i) => {
            return (
                <Row product={item} key={i} place={i} page={this.state.page} countPerPage={this.state.countPerPage} />
            );
        })
    }

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

    ShowMessage = () => {
        let queryStringMessage = this.props.match.params.message;

        if (queryStringMessage != null) {
            if (queryStringMessage == "success") {
                return (
                    <div className='alert alert-success'>محصول جدید با موفقیت اضافه شد</div>
                )
            }
            else if (queryStringMessage == "failed") {
                return (
                    <div className='alert alert-danger'>محصول جدید اضافه نشد! لطفا دوباره تلاش کنید</div>
                )
            }
        }
    }

    CreateTableRow = (productsList, productsCount, page, size) => {

        return (
            <tr>
                <td>{(size * (page - 1) + 0 + 1)}</td>
                <td>{productsList[0].Name}</td>
                <td>{productsList[0].Price}</td>
                <td>{productsList[0].Description}</td>
                <td><a className="btn btn-info btnShownDeleteModal" data-id={productsList[0].ID} >حذف</a></td>
            </tr>
        )

    }

    ShowProducts = (page = 1, size = 2) => {
        // if ($.isNumeric(this.props.match.params.message)) {
        //     page = this.props.match.params.message;
        // }
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

    OpenDeleteModal = () => {
        $(".btnShownDeleteModal").on("click", () => {
            // alert("aaa");

            $("#productDeleteModal").modal("show");
            // $("#hfProductIDDelete").val($(this.target.data("id")));
            console.log(this.target);
        });
            // $("#hfUserIDDelete").val($(this).data("id"));

    }

    componentDidMount() {
        this.ShowProducts();
        document.title = "محصولات";
    }
    
    componentWillReceiveProps(w) {
        this.ShowProducts(w.match.params.message, 2);
    }
    componentDidUpdate() {
        this.OpenDeleteModal();
    }

    render() {
        let content = <p>ladfhasdfa</p>

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
                            {/* <asp:HiddenField ID="hfCategoryIDDelete" runat="server" ClientIDMode="Static" /> */}
                            <input id="hfProductIDDelete" type="hidden"/>
                            </div>
                            <div className="modal-footer">
                                <button id="btnProductDelete" className="btn btn-danger" >حذف</button>
                                <button className="btn btn-info" data-dismiss="modal" aria-hidden="true">انصراف</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default Products