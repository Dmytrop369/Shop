import { generateStarsHTML } from "../service/generateStars.js"
import { burgerNav } from "./burger.js"
import { addClickBtnBuy } from "../service/cartBtnService.js"
import { getDate } from "../service/service.js"
import { productsMockApi } from "../service/key.js"

let allProductsWrapper = document.querySelector(".all-products__list")

let titlePage = document.querySelector(".all-products h2")

titlePage.innerHTML = localStorage.getItem("search_text") ? "Search by: " + localStorage.getItem("search_text") : "Нічого не знайдено"

let searchProdList = JSON.parse(localStorage.getItem("search-result"))

if (Array.isArray(searchProdList)) {
    getDate("p", "comments").then((allComments) => {
        let productsWithComments = searchProdList.map(product => {
            return {
                ...product,
                comments: allComments.filter(comment => comment.productId == product.id)
            }
        })
        let sortByDiscount = productsWithComments.sort((a, b) => b.discount - a.discount)
        renderAllProducts(sortByDiscount)
    })
}

function renderAllProducts(allProducts) {
    allProductsWrapper.innerHTML = ""
    console.log(allProducts)
    allProducts.forEach(product => {

        let summRate = 0
		let totalRate = 0
		let stars = 0
		let starsHTML

        if (product.comments.length > 0) {
			product.comments.forEach(comment => {
				summRate += comment.rate
			})

			totalRate = summRate / product.comments.length

			if (totalRate >= 0 && totalRate <= 6) {
				stars = 0
			}

			if (totalRate >= 7 && totalRate <= 12) {
				stars = 0.5
			}

			if (totalRate >= 13 && totalRate <= 26) {
				stars = 1
			}

			if (totalRate >= 27 && totalRate <= 36) {
				stars = 1.5
			}

			if (totalRate >= 37 && totalRate <= 46) {
				stars = 2
			}

			if (totalRate >= 47 && totalRate <= 56) {
				stars = 2.5
			}

			if (totalRate >= 57 && totalRate <= 66) {
				stars = 3
			}

			if (totalRate >= 67 && totalRate <= 76) {
				stars = 3.5
			}

			if (totalRate >= 77 && totalRate <= 86) {
				stars = 4
			}

			if (totalRate >= 87 && totalRate <= 96) {
				stars = 4.5
			}

			if (totalRate >= 97 && totalRate <= 100) {
				stars = 5
			}

			starsHTML = generateStarsHTML(stars)
		}

        allProductsWrapper.innerHTML += `
                                <div class="product-card">
                                    <a href="/pages/product.html?id=${product.id}" class="product-card__image">
                                        <img src="../imgs/p/${product.imgs[0]}" alt="1">
                                    </a>
                                    <div class="product-card__content">
                                        <h3><a href="/pages/product.html?id=${product.id}">${product.name}</a></h3>
                                        <a class="product-card__reviews">
                                        ${
                                            product.comments.length > 0 ?
                                            `<div class="product-card__stars">
                                            ${starsHTML}
                                            </div>
                                            <div class="product-card__comments">
                                                <img src="../imgs/SVG/comment.svg" alt="c">
                                                <span>${product.comments.length}</span>
                                            </div>`
                                            : ""
                                            }
                                        </a>
                                        <div class="product-card__nav">
                                            <div class="product-card__price">
                                                ${product.discount ? `<span class="product-card__discount">${product.price + (product.price * product.discount / 100)} z</span>` : ""}
                                                <span class="product-card__summa">${product.price} z</span>
                                            </div>
                                            <button class="product-card__buy" data-id=${product.id}>
                                                Купити
                                            </button>
                                        </div>
                                    </div>
                                 ${product.discount ? `<div class="product-card__label"> - ${product.discount}% </div>` : ""}
                                </div>
        `
    })
    addClickBtnBuy(allProductsWrapper, allProducts)
}

burgerNav()