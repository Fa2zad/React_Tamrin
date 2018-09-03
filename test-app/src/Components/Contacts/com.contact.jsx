import React from "react";
import "./style.contacts.css";

import Header from "../Header/com.header.jsx"

class Contact extends React.Component {

    handleSubmit = event => {
        event.preventDefault();

        const contact = {
            name: document.getElementById("txtName").value,
            email: document.getElementById("txtEmail").value,
            subject: document.getElementById("txtSubject").value,
            text: document.getElementById("txtText").value
        };

        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:58731/Contact.ashx', true);

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
            "action=add&name=" + contact.name 
            + "&email=" + contact.email 
            + "&subject=" + contact.subject 
            + "&text=" + contact.text
        ); 

    }
    

    render() {
        return (
            <div>
                <Header title="تماس با ما"/>

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input onChange={this.handleChange} id="txtName" type="text" placeholder="نام و نام خانوادگی" />
                    </div>
                    <br />
                    <div>
                        <input id="txtEmail" type="text" placeholder="آدرس ایمیل" />
                    </div>
                    <br />
                    <div>
                        <input id="txtSubject" type="text" placeholder="موضوع" />
                    </div>
                    <br />
                    <div>
                        <textarea id="txtText" placeholder="متن پیام" />
                    </div>
                    <div>
                        <button type="submit">ارسال</button>
                    </div>
                    <div id="divStatus">

                    </div>
                </form>
            </div>
        );
    }
}

export default Contact