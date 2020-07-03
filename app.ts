import getNorthwind from './Ajax.js'
import { Customer } from './customer.model.js'
window.addEventListener('load', () => {

    document.querySelector('#customerOrders')?.addEventListener('click',getDetailsOrders )
    
    document.querySelector('#customerList')?.addEventListener('click', getOrdersByCustomerId)
    getNorthwind("https://northwind.now.sh/api/customers", firstLoad)
})

function getOrdersByCustomerId(event: Event) {
    //const link = event.target as HTMLElement;
    event.preventDefault();
    const link = <HTMLElement>event.target;

    if (link.nodeName !== "A") {
        return
    }

    // https://northwind.now.sh/api/orders?customerId=ALFKI
    const id = link.id;
    const url = "https://northwind.now.sh/api/orders?customerId=" + id
    getNorthwind(url, fillOrders)
}

function fillOrders() {
    const orders = JSON.parse(this.responseText)

    const header = `<tr><th>ID</th><th>Order Date</th><th>Ship Name</th></tr>`

    const html = orders.map(order =>
        `<tr>
        <td><a href="#" id="${order.id}">${order.id}</a></td>
        <td>${order.orderDate}</td>
        <td>${order.shipName}</td>
        </tr>`).join('');
    let ordersList: Element | null = document.querySelector('#customerOrders')
    if (ordersList) {
        const content: string = html === "" ? "<tr><td>No Orders</td></tr>" : html
        ordersList.innerHTML =
            "<table border='1'>" + header + content + "</table>"
    }
}

function getDetailsOrders(event: Event) {
    //const link = event.target as HTMLElement;
    event.preventDefault();
    const link = <HTMLElement>event.target;

    if (link.nodeName !== "A") {
        return
    }
    const id = link.id;
    const url = "https://northwind.now.sh/api/orders"
    getNorthwind(url, fillDetails)
}

function fillDetails(){
    const orders = JSON.parse(this.responseText)

    const header = `<tr><th>productId</th><th>unitPrice</th><th>quantity</th><th>discount</th></tr>`

    const html = orders.map(order =>
        `<tr>
        <td>${order.details.productId}</td>
        <td>${order.details.unitPrice}</td>
        <td>${order.details.quantity}</td>
        <td>${order.details.discount}</td>
        </tr>`).join('');
    let ordersList: Element | null = document.querySelector('#ordersDetails')
    if (ordersList) {
        const content: string = html === "" ? "<tr><td>No details</td></tr>" : html
        ordersList.innerHTML =
            "<table border='2'>" + header + content + "</table>"
    }
}

function firstLoad(): void {
    let customers: Customer[] = JSON.parse(this.responseText)
    // console.log(customers)
    let buttons = customers.map(
        customer => `<a href="#" id="${customer.id}">${customer.companyName}</a><br>`)
    let list: Element | null = document.querySelector('#customerList')
    if (list) {
        list.innerHTML = buttons.join('')
    }
}

