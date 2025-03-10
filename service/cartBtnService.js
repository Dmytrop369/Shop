function addClickBtnBuy(selector, allProducts, oneProduct = false) {
    selector.addEventListener("click", (event) => {
        if (event.target.closest(".product-card__buy")) {
            let cartFromLS = JSON.parse(localStorage.getItem("cart")) // пробуємо отримати наявну корзину
            let cart = cartFromLS ? cartFromLS : [] // якщо корзина є то записуємо її в cart, якщо нема то пустий масив  

            let prodId = event.target.dataset.id //шукаємо продукт id на який нажали кнопку купити 

            let currProduct 

            if (oneProduct) {
                currProduct = oneProduct
            } else {
                 currProduct = allProducts.find(prod => prod.id == prodId) // шукаємо сам продукт по id
            }

            let prodInBasket = cart.find(prod => prod.id == prodId) // шукаємо цей продукт в корзині

            if (prodInBasket) {                                     // якщо продукт в корзині є 
                cart = cart.map(prod => {
                    if (prod.id == prodId) {
                        return { ...prod, counts: prod.counts + 1 } // то додаємо до продукта кількість + 1
                    } else {
                        return prod                                 // або пропускаємо далі
                    }
                })
            } else {
                cart.push({ ...currProduct, counts: 1})             // якщо нема в корзині то додаємо новий продукт кількість 1
            }

            localStorage.setItem("cart", JSON.stringify(cart))      // зберігаємо в локальне сховище продукт

        }
    })
}



export { addClickBtnBuy }
