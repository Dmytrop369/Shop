import { productsMockApi, clientsMockapi, moderatorsMockApi } from "./key.js";

async function getDate(mockApi, route) {
    let url = generateUrl(mockApi)
    let res = await fetch(url + route)
    let date = await res.json()
    return date
}

async function getDateBySearch(mockApi, route, labelToSearch) {
    const url = new URL(generateUrl(mockApi)+route);
    url.searchParams.append('name', labelToSearch);

    let res = await fetch(url)
    let date = await res.json()
    return date
}

async function createOrder(order) {
    let res = await fetch(clientsMockapi + "orders", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    })
    let date = await res.json()
    return date
}

async function creatComment(comment) {
    let res = await fetch(productsMockApi + "comments", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })
    let date = await res.json()
    return date
}

async function creatUser(user) {
    let res = await fetch(clientsMockapi + "clients", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
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
export { getDate, getDateBySearch, createOrder, creatComment, creatUser }