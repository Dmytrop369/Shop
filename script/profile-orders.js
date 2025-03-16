import { getDate } from "../service/service.js";
import { burgerNav } from "./burger.js";

let profileOrders = document.querySelector(".profile__orders")
let logoutBtn = document.querySelector(".logout-btn")

logoutBtn.addEventListener("click", () => {
	localStorage.removeItem("exClient")
	location.pathname = "/pages/login.html"
})

let exUser = JSON.parse(localStorage.getItem("exClient"))

if (!exUser) {
	location.pathname = "/pages/login.html"
} else {
	getDate("c", "clients").then(allClients => {
		let exClient = allClients.find(client => client.login == exUser.login && client.password == exUser.password)

		if (!exClient) {
			location.pathname = "/pages/login.html"
			localStorage.clear()
		} else {
			localStorage.setItem("exClient", JSON.stringify(exClient))
		}
		// =================================================================

		getDate("c", "orders").then(allOrders => {
			if (allOrders && allOrders.length > 0) {
				let exUserOrders = allOrders.filter(order => order.phone === exUser.phone)
				exUserOrders.reverse().forEach(order => {
					console.log(order);
					profileOrders.innerHTML += `
						<div class="profile__order">
							<div class="profile__order-prods">
								${order.products.map(el => {
						return `
													<div class="profile__order-prod">
														<img src="/imgs/p/${el.imgs[0]}" alt="">
														<h3>${el.name}</h3>
														<p>${el.price}$ x ${el.counts}</p>
													</div>
												`
					}).join("")
						}
							</div>
							<p>Сума: ${order.totalPrice}</p>
							<p>Статус: ${order.status}</p>
							<p>Дата: ${formatDate(order.createAt)}</p>
						</div>
					`
				})
			}
		})

		// =================================================================
	})
		.catch(() => {
			location.pathname = "/pages/login.html"
			localStorage.clear()
		})
}


function formatDate(timestamp) {
	const date = new Date(timestamp);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Місяці починаються з 0
	const year = date.getFullYear();
	return `${day}.${month}.${year}`;
}

burgerNav()