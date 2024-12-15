import { verifyUser } from "../service/verify.js"
import { getDate, deleteDate, changeDate } from "../service/service.js"

let orderslist = document.querySelector(".orders__list tbody")

getDate("c", "orders").then(ordersArray => renderModeratos(ordersArray))

function renderModeratos(ordersArray) {
	orderslist.innerHTML = ""

	ordersArray.forEach(element => {

		let currClass = ""

		if (element.status === "Очікує") currClass = "waiting"
		if (element.status === "Відправлено") currClass = "send"
		if (element.status === "Отримано") currClass = "accept"
		if (element.status === "Скасовано") currClass = "failed"

		orderslist.innerHTML += `
					<tr class="${currClass}">
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
							<select data-id="${element.id}" data-clientid="${element.clientId}">
							<option value = "Очікує" ${element.status === "Очікує" ? "selected" : ""}>Очікує</option>
							<option value = "Відправлено" ${element.status === "Відправлено" ? "selected" : ""}>Відправлено</option>
							<option value = "Отримано" ${element.status === "Отримано" ? "selected" : ""}>Отримано</option>
							<option value = "Скасовано" ${element.status === "Скасовано" ? "selected" : ""}>Скасовано</option>
							</select>
							<button class="delete-btn" data-id=${element.id} data-clientid=${element.clientId}>delete</button>
						</td>
					</tr>`
	})

	let allSelest = orderslist.querySelectorAll("select")

	allSelest.forEach(select => {
		select.addEventListener("change", () => {
			let clientId = select.dataset.clientid
			let ordersId = select.dataset.id
			console.log(clientId, ordersId)
			changeDate("c", `clients/${clientId}/orders/${ordersId}`, { status: select.value }).then(data => {
				if (data) {
					window.location.reload()
				}
			})
		})
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