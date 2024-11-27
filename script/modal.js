function initModal() {
    let modal = document.querySelector(".modal")
    let modalOpenBtns = document.querySelectorAll("#open-modal")
    let modalCloseBtn = document.querySelector(".btn-modal-close")
    let body = document.querySelector("body") 

    modalOpenBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            modal.classList.add("active")
            body.style.overflow = "hidden"
            body.style.paddingRight = "12px"
        })
    })

    modalCloseBtn.addEventListener("click", () => {
        modal.classList.remove("active")
        body.style.overflow = "auto"
        body.style.paddingRight = "0"
    })
}

export default initModal 