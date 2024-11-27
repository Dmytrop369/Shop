import { verifyUser } from "../service/verify.js"
import { getDate } from "../service/service.js"

let orderslist = document.querySelector(".orders__list tbody")

getDate("c", "orders").then(ordersArray => renderModeratos(ordersArray))

function renderModeratos(ordersArray) {
    orderslist.innerHTML = "" 

    ordersArray.forEach(element => {
        console.log(element)
        orderslist.innerHTML +=`
					<tr>
                        <td>${element.clientId}</td>
                        <td>${element.products}</td>
						<td>${element.totalPrice}</td>
						<td>${element.address}</td>
						<td>${element.phone}</td>
                        <td>${element.status}</td>
                        <td>${element.receiverName}</td>
                        <td>${element.receiverLastname}</td>
                        <td>${element.createAt}</td>
                        	<td>
							<button>delete</button>
						</td>
					</tr>`
    })
}

verifyUser()