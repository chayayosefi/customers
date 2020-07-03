"use strict";
exports.__esModule = true;
var Ajax_js_1 = require("./Ajax.js");
window.addEventListener('load', function () {
    var _a, _b;
    (_a = document.querySelector('#customerOrders')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', getDetailsOrders);
    (_b = document.querySelector('#customerList')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', getOrdersByCustomerId);
    Ajax_js_1["default"]("https://northwind.now.sh/api/customers", firstLoad);
});
function getOrdersByCustomerId(event) {
    //const link = event.target as HTMLElement;
    event.preventDefault();
    var link = event.target;
    if (link.nodeName !== "A") {
        return;
    }
    // https://northwind.now.sh/api/orders?customerId=ALFKI
    var id = link.id;
    var url = "https://northwind.now.sh/api/orders?customerId=" + id;
    Ajax_js_1["default"](url, fillOrders);
}
function fillOrders() {
    var orders = JSON.parse(this.responseText);
    var header = "<tr><th>ID</th><th>Order Date</th><th>Ship Name</th></tr>";
    var html = orders.map(function (order) {
        return "<tr>\n        <td><a href=\"#\" id=\"" + order.id + "\">" + order.id + "</a></td>\n        <td>" + order.orderDate + "</td>\n        <td>" + order.shipName + "</td>\n        </tr>";
    }).join('');
    var ordersList = document.querySelector('#customerOrders');
    if (ordersList) {
        var content = html === "" ? "<tr><td>No Orders</td></tr>" : html;
        ordersList.innerHTML =
            "<table border='1'>" + header + content + "</table>";
    }
}
function getDetailsOrders(event) {
    //const link = event.target as HTMLElement;
    event.preventDefault();
    var link = event.target;
    if (link.nodeName !== "A") {
        return;
    }
    var id = link.id;
    var url = "https://northwind.now.sh/api/orders";
    Ajax_js_1["default"](url, fillDetails);
}
function fillDetails() {
    var orders = JSON.parse(this.responseText);
    var header = "<tr><th>productId</th><th>unitPrice</th><th>quantity</th><th>discount</th></tr>";
    var html = orders.map(function (order) {
        return "<tr>\n        <td>" + order.details.productId + "</td>\n        <td>" + order.details.unitPrice + "</td>\n        <td>" + order.details.quantity + "</td>\n        <td>" + order.details.discount + "</td>\n        </tr>";
    }).join('');
    var ordersList = document.querySelector('#ordersDetails');
    if (ordersList) {
        var content = html === "" ? "<tr><td>No details</td></tr>" : html;
        ordersList.innerHTML =
            "<table border='2'>" + header + content + "</table>";
    }
}
function firstLoad() {
    var customers = JSON.parse(this.responseText);
    // console.log(customers)
    var buttons = customers.map(function (customer) { return "<a href=\"#\" id=\"" + customer.id + "\">" + customer.companyName + "</a><br>"; });
    var list = document.querySelector('#customerList');
    if (list) {
        list.innerHTML = buttons.join('');
    }
}
