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
                    <Row product={item} key={i} place={i} />
                );
            })


        // this.state.WasteTypes.map((type, i) => {
        //     return (
        //         <option key={i} value={type.ID}>{type.Title}</option>
        //     );
        // })

        // return <Row />
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

        // let rows = "";
        // for (let i = 0; i < productsList.length; i++) {
        //     rows += "<tr>";
        //     rows += "<td>" + (size * (page - 1) + i + 1) + "</td>";
        //     rows += "<td>" + productsList[i].Name + "</td>";
        //     rows += "<td>" + productsList[i].Price + "</td>";
        //     rows += "<td>" + productsList[i].Description.substring(0, 30) + "...</td>";
        //     rows += "<td><a class=\"btn btn-info btnShownDeleteModal\" data-id=\"" + productsList[i].ID + "\">حذف</a></td>";
        //     rows += "</tr>"
        // }
        // let pagesCount = Math.ceil(productsCount / size);
        // rows += "<tr><td colspan=\"5\"><ul class=\"pages\">";
        // for (let i = 1; i <= pagesCount; i++) {
        //     rows += "<li>";
        //     if (i == page) {
        //         rows += "<a class=\"active\">";
        //     } else {
        //         rows += "<a href=\"#Products/" + i + "\">";
        //     }
        //     rows += i;
        //     rows += "</a>";
        //     rows += "</li>";
        // }
        // rows += "</ul></td></tr>"
        // return (rows);

    }

    ShowProducts = (page = 1, size = 2) => {
        if ($.isNumeric(this.props.match.params.message)) {
            page = this.props.match.params.message;
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
            // $.getJSON('http://localhost:58731/Product.ashx',{action: "list", page: page, size: size} )
            .done((data) => {
                var respondedData = $.parseJSON(data);
                // var respondedData = data;
                $.ajax({
                    url: 'http://localhost:58731/Product.ashx',
                    type: "GET",
                    cache: false,
                    data: { action: "count" }
                }).done((countData) => {
                    // $("tbody").html(this.CreateTableRow(respondedData, countData, page, size));
                    // this.CreateTableRow(respondedData, countData, page, size);

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

    // OpenDeleteModal = () => {
    //     // $(".btnShownDeleteModal").on("click", () => {
    //         alert("aaa");

    //         // $("#productDeleteModal").modal("show");
    //     // });
    //         // $("#hfUserIDDelete").val($(this).data("id"));

    // }

    componentDidMount() {
        this.ShowProducts();
        document.title = "محصولات";
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