import { verifyUser } from "../service/verify.js"
import { getDate, deleteDate } from "../service/service.js"

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
							<button class="delete-btn" data-id=${element.id} data-clientid=${element.clientId}>delete</button>
						</td>
					</tr>`
    })
}

orderslist.addEventListener("click", (event) => {

	if (event.target.closest(".delete-btn")) {

		let wantToDelete = confirm("This product was be deleted")

		if (wantToDelete) {
			deleteDate("c", `clients/${event.target.dataset.clientid}/orders/${event.target.dataset.id}`)
				.then(data => {
					if (data) {
						location.reload()
					}
				})
		}
	}
})

verifyUser()