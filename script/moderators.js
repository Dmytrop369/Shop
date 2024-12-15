import { verifyUser } from "../service/verify.js"
import { getDate, deleteDate, addNewData, changeDate } from "../service/service.js"
import initModal from "./modal.js"
import logout from "./logout.js"

logout()

let newModerBtn = document.querySelector(".new__moder")
let moderatorslist = document.querySelector(".moderators__list tbody")
let modalContentBox = document.querySelector(".modal__content-box")

getDate("m", "moderators").then(moderatorsArray => renderModeratos(moderatorsArray))

function renderModeratos(moderatorsArray) {
	moderatorslist.innerHTML = ""

	moderatorsArray.forEach(element => {
		console.log(element)
		moderatorslist.innerHTML += `
					<tr>
						<td>${element.name + " " + element.lastname}</td>
						<td>${element.role}</td>
						<td>${element.phone}</td>
						<td>${element.email}</td>
						<td>${element.login}</td>
						<td>${element.password}</td>
						<td>${element.createAt}</td>
						<td>
							<button class="edit-btn" id="open-modal" data-id="${element.id}">Edit</button>
							${element.role !== "owner" ? `<button class="delete-btn" data-id=${element.id}>delete</button>` : ""}
						</td>
					</tr>`
	})
	initModal()
}

function renderModal(moderator) {
	modalContentBox.innerHTML = ""
	console.log(moderator)
	let fieldsHtml = `<form>
						<div class="form__wrapper">
							<div class="custom-field">
								<label for="inp-name">Name</label>
								<input type="text" id="inp-name" value="${moderator ? moderator.name : ""}">
							</div>

							<div class="custom-field">
								<label for="inp-lastname">Lastname</label>
								<input type="text" id="inp-lastname" value="${moderator ? moderator.lastname : ""}">
							</div>

							<div class="custom-field">
								<label for="inp-role">Role</label>
								<input type="text" id="inp-role" value="${moderator ? moderator.role : ""}">
							</div>

							<div class="custom-field">
								<label for="inp-phone">Phone</label>
								<input type="text" id="inp-phone" value="${moderator ? moderator.phone : ""}">
							</div>

							<div class="custom-field">
								<label for="inp-email">Email</label>
								<input type="text" id="inp-email" value="${moderator ? moderator.email : ""}">
							</div>

							<div class="custom-field">
								<label for="inp-login">Login</label>
								<input type="text" id="inp-login" value="${moderator ? moderator.login : ""}">
							</div>

							<div class="custom-field">
								<label for="inp-password">Password</label>
								<input type="text" id="inp-password" value="${moderator ? moderator.password : ""}">
							</div>

						</div>

						<button data-id=${moderator ? moderator.id : "null"} id="send-form" class="btn">Save admin</button>
					</form>`
	modalContentBox.innerHTML = fieldsHtml
}

newModerBtn.addEventListener("click", () => renderModal())

modalContentBox.addEventListener("click", (e) => {
	e.preventDefault()

	if (e.target.closest("#send-form")) {
		let moderId = e.target.dataset.id

		let inpName = document.querySelector("#inp-name")
		let inpLastname = document.querySelector("#inp-lastname")
		let inpRole = document.querySelector("#inp-role")
		let inpPhone = document.querySelector("#inp-phone")
		let inpEmail = document.querySelector("#inp-email")
		let inpLogin = document.querySelector("#inp-login")
		let inpPassword = document.querySelector("#inp-password")

		if (!inpName.value || !inpLastname.value || !inpRole.value || !inpPhone.value || !inpEmail.value || !inpLogin.value || !inpPassword.value) {
			return alert("Error")
		}

		let newData = {
			name: inpName.value,
			lastname: inpLastname.value,
			role: inpRole.value,
			phone: inpPhone.value,
			email: inpEmail.value,
			login: inpLogin.value,
			password: inpPassword.value,
		}

		console.log(newData)

		if (!moderId || moderId === "null") {
			addNewData("m", "moderators", newData).then(data => {
				if (data) {
					window.location.reload()
				}
			})
		} else {
			changeDate("m", `moderators/${moderId}`, newData).then(date => {
				if (date) {
					window.location.reload()
				}
			})
		}
	}
})

moderatorslist.addEventListener("click", (event) => {

	if (event.target.closest(".edit-btn")) {
		console.log(event.target.dataset.id)
		getDate("m", `moderators/${event.target.dataset.id}`).then(data => renderModal(data))
	}
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

let user = JSON.parse(localStorage.getItem("user"))

if (user && user.role !== "owner") {
	location.pathname = "/pages/dashboard.html"
}