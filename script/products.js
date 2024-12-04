import { verifyUser } from "../service/verify.js"
import { changeDate, deleteDate, getDate, addNewData } from "../service/service.js"
import initModal from "./modal.js"

let productlist = document.querySelector(".product__list")
let modalContentBox = document.querySelector(".modal__content-box")
let NewProduct = document.querySelector(".new__product")


getDate("p", "products").then(productArray => renderProducts(productArray))

function renderProducts(productArray) {
	productlist.innerHTML = ""

	productArray.reverse().forEach(element => {
		productlist.innerHTML += `		
            <div class="product__item">
					<div class="swiper mySwiper">
						<div class="swiper-wrapper">

						${element.imgs.map(img => (`<div class="swiper-slide"> <img src="/img/${img}" alt=""> </div>`)).join("")}

						</div>
						<div class="swiper-pagination"></div>
					</div>

					<div class="product__item-info">
						<h3>${element.name}</h3>
						<table>
							<tr>
								<td>price</td>
								<td>${element.price}</td>
							</tr>
							<tr>
								<td>discount</td>
								<td>${element.discount}</td>
							</tr>
							<tr>
								<td>info</td>
								<td>${element.info}</td>
							</tr>
							<tr>
								<td>category</td>
								<td>${element.category}</td>
							</tr>
							<tr>
								<td>producer</td>
								<td>${element.producer}</td>
							</tr>
							<tr>
								<td>createAt</td>
								<td>${element.createAt}</td>
							</tr>
						</table>

						<div class="products__item-btns">
							<button id="open-modal" class="edit-btn" data-id="${element.id}">Edit</button>
							<button class="delete-btn" data-id="${element.id}">Delete</button>
						</div>
					</div>
				</div>`
	})

	initModal()

	var swiper = new Swiper(".mySwiper", {
		pagination: {
			el: ".swiper-pagination",
		},
	});

}
productlist.addEventListener("click", (event) => {
	if (event.target.closest(".edit-btn")) {

		getDate("p", `products/${event.target.dataset.id}`)
			.then(data => renderModal(data))
	}
	if (event.target.closest(".delete-btn")) {

		let wantToDelete = confirm("This product was be deleted")

		if (wantToDelete) {
			deleteDate("p", `products/${event.target.dataset.id}`)
				.then(data => {
					if (data) {
						location.reload()
					}
				})
		}
	}
})

function renderModal(producer) {
	modalContentBox.innerHTML = ""

	let allImgs = producer ? producer.imgs.map(img => `<img src="/img/${img}" alt="img">`).join("") : null

	let tempImgs = ""

	for (let i = 0; i < 4; i++) {
		if (producer && producer.imgs[i]) {
			tempImgs += `<div class="custom-field">
				<label for="inp-image-${i + 1}">Image${i + 1}</label>
				<input type="text" id="inp-image-${i + 1}" value="${producer.imgs[i]}">
			</div>`
		} else {
			tempImgs += `<div class="custom-field">
						<label for="inp-image-${i + 1}">Image${i + 1}</label>
						<input type="text" id="inp-image-${i + 1}" value="">
					  </div>`
		}
	}

	let photosHtml = `<div class="modal__image-preview">
						${allImgs ? allImgs : "<p style='color: white;'>Фото поки відсутні</p>"}
						</div>`

	let fieldsHtml = `<form>
			<div class="form__wrapper">
				 <div class="custom-field">
					<label for="inp-title">Title</label>	 
					 <input required type="text" id="inp-title" value="${producer ? producer.name : ""}">
				</div>
			

					<div class="custom-field">
							<label for="inp-price">price</label>
							<input required type="text" id="inp-price" value="${producer ? producer.price : ""}">
						</div>

						<div class="custom-field">
							<label for="inp-discount">discount</label>
							<input required type="text" id="inp-discount" value="${producer ? producer.discount : ""}">
						</div>

						<div class="custom-field">
							<label for="inp-info">info</label>
							<input required type="text" id="inp-info" value="${producer ? producer.info : ""}">
						</div>

						<div class="custom-field">
							<label for="inp-category">category</label>
							<input required type="text" id="inp-category" value="${producer ? producer.category : ""}">
						</div>

						<div class="custom-field">
							<label for="inp-producer">producer</label>
							<input required type="text" id="inp-producer" value="${producer ? producer.producer : ""}">
						</div>

						<div class="custom-field">
							<label for="inp-createAt">createAt</label>
							<input required type="text" id="inp-createAt" value="${producer ? producer.createAt : ""}">
						</div>                  

						${tempImgs}

					</div>
				</div>
				<button class="btn" id="send-form" data-id=${producer ? producer.id : null}>Save product</button>
			</form>`

	modalContentBox.innerHTML += fieldsHtml + photosHtml

}

modalContentBox.addEventListener("click", (e) => {
	e.preventDefault()

	if (e.target.closest("#send-form")) {
		let prodId = e.target.dataset.id

		let inpTitle = document.querySelector("#inp-title")
		let inpPrice = document.querySelector("#inp-price")
		let inpDisc = document.querySelector("#inp-discount")
		let inpInfo = document.querySelector("#inp-info")
		let inpCategory = document.querySelector("#inp-category")
		let inpProducer = document.querySelector("#inp-producer")
		let inpCreateAt = document.querySelector("#inp-createAt")

		let inpImage1 = document.querySelector("#inp-image-1")
		let inpImage2 = document.querySelector("#inp-image-2")
		let inpImage3 = document.querySelector("#inp-image-3")
		let inpImage4 = document.querySelector("#inp-image-4")

		if (!inpTitle.value || !inpPrice.value || !inpDisc.value || !inpInfo.value || !inpCategory.value || !inpProducer.value || !inpCreateAt.value || !inpImage1.value) {
			return alert("Error")
		}

		let newImages = []
		let inpImages = [inpImage1?.value, inpImage2?.value, inpImage3?.value, inpImage4?.value]

		inpImages.forEach(img => {
			if (img) {
				newImages.push(img)
			}
		})

		let newData = {
			imgs: newImages,
			name: inpTitle.value,
			price: +inpPrice.value,
			discount: +inpDisc.value,
			info: inpInfo.value,
			category: inpCategory.value,
			producer: inpProducer.value,
			createAt: inpCreateAt.value
		}
		if (!prodId || prodId === "null") {
			addNewData("p", "products", newData).then(data => {
				if (data) {
					window.location.reload()
				}
			})
		} else {
			changeDate("p", `products/${prodId}`, newData).then(date => {
				if (date) {
					window.location.reload()
				}
			})
		}
	}
})

NewProduct.addEventListener("click", () => {
	renderModal()
})

verifyUser()