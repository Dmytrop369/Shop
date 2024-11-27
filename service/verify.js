import { getDate } from "./service.js"


function verifyUser() {
    let bigloader = document.querySelector(".big__loader")

    if (bigloader) bigloader.style.display = "flex"
    
    try {
        let user = JSON.parse(localStorage.getItem("user"))
    if (!user && location.pathname != "/") location.pathname = "/"
    if (!user) return bigloader.style.display = "none"
    if (user && location.pathname === "/") location.pathname = "/pages/dashboard.html"
    
    getDate("m", "moderators").then(date =>{
        let userByLogin = date.find(el => el.login === user.login)

        if (!userByLogin || userByLogin.password !== user.password) {
            localStorage.clear()
            location.pathname = "/"
        } else {
            localStorage.setItem("user", JSON.stringify(user))
            if (bigloader) bigloader.style.display = "none"
        }
    })
} catch (error) {
    localStorage.clear()
    location.pathname ="/"
}
}

export { verifyUser }