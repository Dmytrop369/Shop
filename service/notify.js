let body = document.body
let notifyDiv = document.createElement("div")

notifyDiv.classList.add("notify")
body.append(notifyDiv)

function showNotify (message) {
    notifyDiv.innerHTML = message
    notifyDiv.classList.add("show")
    setTimeout(() => {
        notifyDiv.classList.remove("show")
    }, 3000)
}

export default showNotify