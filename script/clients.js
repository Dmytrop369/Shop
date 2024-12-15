import { verifyUser } from "../service/verify.js"
import { getDate, deleteDate } from "../service/service.js"
import logout from "./logout.js"

logout()

let clientslist = document.querySelector(".clients__list tbody")

getDate("c", "clients").then(clientsArray => renderModeratos(clientsArray))

function renderModeratos(clientsArray) {
	clientslist.innerHTML = ""

	clientsArray.forEach(element => {
		console.log(element)
		clientslist.innerHTML += `
					<tr>
						<td>${element.name + " " + element.lastname}</td>
						<td>${element.phone}</td>
						<td>${element.email}</td>
						<td>${element.login}</td>
						<td>${element.password}</td>
						<td>${element.address}</td>
						<td>${element.createAt}</td>
                        	<td>
							<button class="delete-btn" data-id=${element.id}>delete</button>
						</td>
					</tr>`
	})
}

clientslist.addEventListener("click", (event) => {

	if (event.target.closest(".delete-btn")) {

		let wantToDelete = confirm("This product was be deleted")

		if (wantToDelete) {
			deleteDate("c", `clients/${event.target.dataset.id}`)
				.then(data => {
					if (data) {
						location.reload()
					}
				})
		}
	}
})

verifyUser()