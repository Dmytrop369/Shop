import { verifyUser } from "../service/verify.js"
import { getDate } from "../service/service.js"

let inpLogin = document.querySelector(".inp-login")
let inpPassword = document.querySelector(".inp-password")
let form = document.querySelector(".auth form")
let formMessege = document.querySelector(".auth p")

verifyUser()

form.addEventListener("submit", (event) => {
    event.preventDefault()

    getDate("m", "moderators").then(data => {
        let userByLogin = data.find(el => el.login === inpLogin.value)

        if (userByLogin && userByLogin.password === inpPassword.value) {
            localStorage.setItem("user", JSON.stringify(userByLogin))
            location.pathname = "/pages/dashboard.html"
        } else {
            formMessege.classList.add("active")
            inpLogin.value = ""
            inpPassword.value = ""
            setTimeout(() => {formMessege.classList.remove("active")}, 3000)
        }
    })
})