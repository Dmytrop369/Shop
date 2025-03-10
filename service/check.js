import { getDate } from "./service.js";



let exUser = JSON.parse(localStorage.getItem("exClient"))
if (exUser) {
    getDate("c", "clients").then(allClients => {
        let exClient = allClients.find(client => client.login == exUser.login && client.password == exUser.password)

        if (exClient) {
            localStorage.setItem("exClient", JSON.stringify(exClient))
            location.pathname = "/pages/profile.html"
        } else {
            localStorage.clear()
        }

    })
        .catch(() => {
            localStorage.clear()
        })
}