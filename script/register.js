import { creatUser, getDate } from "../service/service.js";

let registerForm = document.querySelector(".auth__form form")
let formMessage = document.querySelector(".auth__form-message")
let allInput = document.querySelectorAll(".auth__form input")
let correctPassword = false

/* 
<input type="text" placeholder="Name" required> 
<input type="text" placeholder="Lastname" required> 
<input type="text" placeholder="Phone" required> 
<input type="text" placeholder="Login" required> 
<input type="text" placeholder="Email" required> 
<input type="text" placeholder="Password" required> 
<input type="text" placeholder="Repeat Password" required> 
<input type="text" placeholder="Adress" required> 
*/

registerForm.addEventListener("submit", (event) => {
    event.preventDefault()

    if (!correctPassword) {
        console.log("object");
        formMessage.innerHTML = "Пароль не співпадають..."
        formMessage.style.display = "block"
        return
    }

    getDate("c", "clients").then(allClients => {
        let exClient = allClients.find(cliet => cliet.login == allInput[3].values)

        if (exClient) {
            formMessage.style.display = "block"
            formMessage.innerHTML = "This login already exist"
        } else {
            formMessage.style.display = "none"

            let newUser = {
                name: allInput[0].value.trim(),
                lastname: allInput[1].value.trim(),
                phone: allInput[2].value.trim(),
                login: allInput[3].value.trim(),
                email: allInput[4].value.trim(),
                password: allInput[5].value.trim(),
                address: allInput[7].value.trim(),
                createAt: Date.now(),
            }

            creatUser(newUser).then((date) => {
                localStorage.setItem("exClient", JSON.stringify(date))
                location.pathname = "/pages/profile.html"
            })
        }
    })
})

allInput[6].addEventListener("input", () => {
    if (allInput[6].value === allInput[5].value) {
        correctPassword = true
        allInput[6].style.border = "none"
        formMessage.style.display = "none"
    } else {
        correctPassword = false
        allInput[6].style.border = "1px solid red"
    }
})