import { verifyUser } from "../service/verify.js"
import { getDate } from "../service/service.js"

let clientslist = document.querySelector(".clients__list tbody")

getDate("c", "clients").then(clientsArray => renderModeratos(clientsArray))

function renderModeratos(clientsArray) {
    clientslist.innerHTML = "" 

    clientsArray.forEach(element => {
        console.log(element)
        clientslist.innerHTML +=`
					<tr>
						<td>${element.name+" "+element.lastname}</td>
						<td>${element.phone}</td>
						<td>${element.email}</td>
						<td>${element.login}</td>
						<td>${element.password}</td>
						<td>${element.address}</td>
						<td>${element.createAt}</td>
                        	<td>
							<button>delete</button>
						</td>
					</tr>`
    })
}

verifyUser()