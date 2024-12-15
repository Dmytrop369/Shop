import { verifyUser } from "../service/verify.js";
import { getDate } from "../service/service.js";
import logout from "./logout.js"

logout()
let title = document.querySelector("h1")
let dashboardProducts = document.querySelector(".dashboard-box__products span")
let dashboardOrders = document.querySelector(".dashboard-box__orders span")
let dashboardClients = document.querySelector(".dashboard-box__clients span")
let dashboardComments = document.querySelector(".dashboard-box__comments span")

let admin = JSON.parse(localStorage.getItem("user"))

if (admin) {
	title.innerHTML = admin.name + " " + admin.lastname
	getDate("p", "products").then(data => {
		dashboardProducts.innerHTML = data.length
	})

	getDate("c", "orders").then(data => {
		dashboardOrders.innerHTML = data.length
	})

	getDate("c", "clients").then(data => {
		dashboardClients.innerHTML = data.length
	})

	getDate("p", "comments").then(data => {
		dashboardComments.innerHTML = data.length
	})
}

verifyUser()


