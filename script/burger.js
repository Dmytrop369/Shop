function burgerNav () {    
    let burger = document.querySelector(".header__burger")
    let nav = document.querySelector(".header__navigation")
    let body = document.body

    burger.addEventListener("click", () => {
        burger.classList.toggle("active")
        nav.classList.toggle("active")
        body.classList.add("fixed")

        if (body.classList.contains("fixed")){
            body.classList.remove("fixed")
        } else {
            body.classList.add("fixed")
        }
    })

}

export { burgerNav }