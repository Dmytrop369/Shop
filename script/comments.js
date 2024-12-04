import { verifyUser } from "../service/verify.js"
import { getDate, deleteDate } from "../service/service.js"

let commentslist = document.querySelector(".comments__list tbody")

getDate("p", "comments").then(commentsArray => renderModeratos(commentsArray))

function renderModeratos(commentsArray) {
    commentslist.innerHTML = "" 

    commentsArray.forEach(element => {
        console.log(element)
        commentslist.innerHTML +=`
					<tr>
                        <td>${element.productId}</td>
                        <td>${element.author}</td>
						<td>${element.text}</td>
						<td>${element.rate}</td>
						<td>${element.createAt}</td>
                        	<td>
							<button class="delete-btn" data-id=${element.id} data-prodid=${element.productId}>delete</button>
						</td>
					</tr>`
    })
}

commentslist.addEventListener("click", (event) => {

	if (event.target.closest(".delete-btn")) {

		let wantToDelete = confirm("This product was be deleted")

		if (wantToDelete) {
			deleteDate("p", `products/${event.target.dataset.prodid}/comments/${event.target.dataset.id}`)
				.then(data => {
					if (data) {
					location.reload()
					}
				})
		}
	}
})

verifyUser()