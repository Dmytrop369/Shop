let openCartBtn = document.querySelector("#open-cart")
let closeCartBtn = document.querySelector("#close-cart")
let cartWindow = document.querySelector(".cart")
let headerNavigetion = document.querySelector(".header__navigation")
let body = document.querySelector("body")
let cartBottomTotal = document.querySelector(".cart__bottom span")

let cartBottomButton = document.querySelector(".cart__bottom button")

cartBottomButton.addEventListener("click", () => {
    location.pathname = "/pages/complete.html"
})

let burger = document.querySelector(".header__burger")
let nav = document.querySelector(".header__navigation")

let cartList = document.querySelector(".cart__list")

openCartBtn.addEventListener("click", () => {
    cartWindow.classList.add("open-cart")
    headerNavigetion.classList.remove("active")
    body.classList.add("fixed")
    burger.classList.remove("active")
    nav.classList.remove("active")

    let cartFromLS = JSON.parse(localStorage.getItem("cart")) // пробуємо отримати наявну корзину
    let cart = cartFromLS ? cartFromLS : [] // якщо корзина є то записуємо її в cart якщо нема то пустий масив

    if (cart && cart.length > 0) {
        renderCart(cartList, cart)

        cartList.addEventListener("click", (event) => {
            let prodId = event.target.dataset.id

            if (event.target.closest(".cart-item-remove")) {
                cart = cart.filter(prod => prod.id !== prodId)
                localStorage.setItem("cart", JSON.stringify(cart))
                renderCart(cartList, cart)
            }

            if (event.target.closest(".cart-item-minus")) {
                let index = cart.findIndex(prod => prod.id === prodId)

                if (cart[index].counts === 1) {
                    cart = cart.filter(prod => prod.id !== prodId)
                } else {
                    cart[index].counts = cart[index].counts - 1
                }

                localStorage.setItem("cart", JSON.stringify(cart))
                renderCart(cartList, cart)
            }

            if (event.target.closest(".cart-item-plus")) {
                let index = cart.findIndex(prod => prod.id === prodId)

                if (cart[index].counts >= 10) return

                cart[index].counts = cart[index].counts + 1
                localStorage.setItem("cart", JSON.stringify(cart))
                renderCart(cartList, cart)
            }
        })
    }
})

function renderCart(cartList, cart) {
    cartList.innerHTML = ""

    cart.forEach(prod => {
        cartList.innerHTML += `
        <div class="cart-item">
                    <img src="/imgs/p/${prod.imgs[0]}" alt="">
    
                <div class="cart-item-wrapper">
                    <h3>${prod.name}</h3>
                    <div class="cart-item-buttom">
                        <div class="cart-item-counts">
                            <buttom data-id=${prod.id} class="cart-item-minus">-</buttom>
                            <figure></figure>
                            <span>${prod.counts}</span>
                            <figure></figure>
                            <buttom data-id=${prod.id} class="cart-item-plus">+</buttom>
                        </div>
                            <div class="cart-item-cost">
                                <span>${prod.price ? `<span>${prod.price * prod.counts} $</span>` : ""}</span>
                                <span>${prod.discount ? `<span>${(prod.price + (prod.price * prod.discount / 100)) * prod.counts} $</span>` : ""}</span>
                                </div>
                        </div>				
                            <buttom data-id=${prod.id} class="cart-item-remove">✕</buttom>
                    </div>
        </div>
        `
    })

    cartBottomTotal.innerHTML = cart.reduce((acc, prod) => {
        return acc += prod.counts * prod.price
    }, 0) + " $"
}

closeCartBtn.addEventListener("click", () => {
    body.classList.remove("fixed")
    cartWindow.classList.remove("open-cart")
})