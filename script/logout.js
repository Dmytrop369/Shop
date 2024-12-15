
function logout() {
	let logoutBtn = document.querySelector(".logout-btn")

	logoutBtn.addEventListener("click", () => {
		localStorage.clear()
		window.location.reload()
	})
}

export default logout

