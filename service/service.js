import { productsMockApi, clientsMockapi, moderatorsMockApi } from "./key.js";

async function getDate(mockApi, route) {
    let url = generateUrl(mockApi)
    let res = await fetch(url + route)
    let date = await res.json()
    return date
}

async function changeDate(mockApi, route, newData) {
    let url = generateUrl(mockApi)
    let res = await fetch(url + route, {
        method: 'PUT',
        headers: {'content-type': 'application/json' },
        body: JSON.stringify(newData)
    })
    let date = await res.json()
    return date
}

function generateUrl(mockApi) { 
    let url
    if (mockApi === "p") {
        url = productsMockApi
    }
    if (mockApi === "c") {
        url = clientsMockapi
    }
    if (mockApi === "m") {
        url = moderatorsMockApi
    }
    return url
}
export { getDate, changeDate }