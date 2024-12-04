import { verifyUser } from "../service/verify.js"
import { getDate, deleteDate } from "../service/service.js"

let moderatorslist = document.querySelector(".moderators__list tbody")

getDate("m", "moderators").then(moderatorsArray => renderModeratos(moderatorsArray))

function renderModeratos(moderatorsArray) {
    moderatorslist.innerHTML = "" 

    moderatorsArray.forEach(element => {
        console.log(element)
        moderatorslist.innerHTML +=`
					<tr>
						<td>${element.name+" "+element.lastname}</td>
						<td>${element.role}</td>
						<td>${element.phone}</td>
						<td>${element.email}</td>
						<td>${element.login}</td>
						<td>${element.password}</td>
						<td>${element.createAt}</td>
						<td>
							<button>Edit</button>
							<button class="delete-btn" data-id=${element.id}>delete</button>
						</td>
					</tr>`
    })
}

moderatorslist.addEventListener("click", (event) => {

	if (event.target.closest(".delete-btn")) {

		let wantToDelete = confirm("This product was be deleted")

		if (wantToDelete) {
			deleteDate("m", `moderators/${event.target.dataset.id}`)
				.then(data => {
					if (data) {
						location.reload()
					}
				})
		}
	}
})


verifyUser()