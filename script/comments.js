import { verifyUser } from "../service/verify.js"
import { getDate } from "../service/service.js"

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
							<button>delete</button>
						</td>
					</tr>`
    })
}

verifyUser()