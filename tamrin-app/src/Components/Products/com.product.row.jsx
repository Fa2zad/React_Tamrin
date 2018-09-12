import React from "react";

export default class Row extends React.Component {
    render() {
        return (
            <tr>
               <td>
                    {(this.props.countPerPage)*(this.props.page-1)+this.props.place+1}
               </td>
               <td>
                   {this.props.product.Name}
               </td>
               <td>
                   {this.props.product.Price}
               </td>
               <td>
                   {this.props.product.Description.substring(0, 30) + "..."}
               </td>
               <td>
                   <button className="btn btn-info" data-id={this.props.product.ID}>حذف</button>
               </td>
            </tr>
        );
    }
}

