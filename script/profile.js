import { getDate } from "../service/service.js";

let profileUser = document.querySelector(".profile__user")
let logoutBtn =document.querySelector(".logout-btn")

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

        profileUser.innerHTML = `
                <h2 class="profile__login">${exClient.name + " " + exClient.lastname}</h2>
                        <p>Email: ${exClient.email}</p>
                        <p>Login: ${exClient.login}</p>
                        <p>Phone: ${exClient.phone}</p>
                        <p>Address: ${exClient.address}</p>
        `

        // =================================================================
    })
        .catch(() => {
            location.pathname = "/pages/login.html"
            localStorage.clear()
        })
}