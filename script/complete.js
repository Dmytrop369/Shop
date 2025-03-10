import {createOrder} from "../service/service.js"

let cart = JSON.parse(localStorage.getItem("cart")) // пробуємо отримати наявну корзину

if (!cart || cart.length === 0) location.pathname = "/"

let checkoutList = document.querySelector(".checkout__list")
let checkoutPartTotal = document.querySelector(".checkout__part-total span")

let totalPrice = cart.reduce((acc, prod) => {
    return acc += prod.counts * prod.price
}, 0)
checkoutPartTotal.innerHTML = totalPrice + "$"

cart.forEach(prod => {
    checkoutList.innerHTML += `
            <div class="checkout__list-item">
                    <img src="/imgs/p/${prod.imgs[0]}" alt="imgs">
    
                <div class="checkout__list-item-wrapper">
                    <h3>${prod.name}</h3>
                    <div class="checkout__list-item-buttom">
                            <span>${prod.counts}x</span>
                            <div class="checkout__list-item-cost">
                                <span>${prod.price}$</span>                   
                            </div>
                        </div>				
                    </div>
                </div>`
})

let form = document.querySelector(".checkout__part form")
let allInps = document.querySelectorAll(".checkout__part input")

form.addEventListener("submit", (event) => {
    event.preventDefault()

    let newOrdes = {
        products: cart,
        totalPrice: totalPrice,
        status: "Очікує",
        createAt: Date.now(),
        receiverName: allInps[0].value,
        receiverLastname: allInps[1].value,
        phone: allInps[2].value,
        address: allInps[3].value,
        clientId: "1"
    }

    createOrder(newOrdes).then(() => {
        localStorage.removeItem("cart")
        location.pathname = "/pages/thx.html"
    })
})