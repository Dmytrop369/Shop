import { getDateBySearch } from "./service.js";

let headerForm = document.querySelector(".header__form")
let headerInput = document.querySelector(".header__form input")


headerForm.addEventListener("submit", (event) => {
    event.preventDefault()

    getDateBySearch("p", "products", headerInput.value)
        .then(result => {
            localStorage.setItem("search-result", JSON.stringify(result))
            localStorage.setItem("search_text", headerInput.value)
            location.pathname = "/pages/search.html"
        })
})