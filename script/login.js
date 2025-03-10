import { getDate } from "../service/service.js";

let loginForm = document.querySelector(".auth__form form")
let formMessage = document.querySelector(".auth__form-message")
let allInput = document.querySelectorAll(".auth__form input")

/* 
<input type="text" placeholder="Login" required> 
<input type="text" placeholder="Password" required> 
*/

loginForm.addEventListener("submit", (event) => {
    event.preventDefault()

    formMessage.style.display = "none"

    getDate("c", "clients").then(allClients => {
        let exClient = allClients.find(client => client.login == allInput[0].value && client.password == allInput[1].value)

        if (exClient) {
            localStorage.setItem("exClient", JSON.stringify(exClient))
            location.pathname = "/pages/profile.html"
        } else {
            formMessage.style.display = "block"
            formMessage.innerHTML = "Логін або пароль не правельний"
        }
    })
})
