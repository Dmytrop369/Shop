import { getDate, creatComment } from "../service/service.js";
import { renderHitsSlider } from "../service/hits-slider.js";
import { burgerNav } from "./burger.js";
import { addClickBtnBuy } from "../service/cartBtnService.js"

let swiperSlider = document.querySelector(".info-prod__swiper .swiper-wrapper")
let prodContent = document.querySelector(".info-prod__content")
let commentsList = document.querySelector(".all-comments__list")

let addCommentBtn = document.querySelector(".all-comments__header button")
let allCommentsForm = document.querySelector(".all-comments__form")
let allCommentsFormSlider = document.querySelector(".all-comments__form #slider")
let allCommentsInpName = document.querySelector(".all-comments__form #inp-name")
let allCommentsTextArea = document.querySelector(".all-comments__form textarea")
let allCommentsFormValueDisplay = document.querySelector(".all-comments__form #value")

let productId = location.search.split("=")[1]

Promise.all([
    getDate("p", `products/${productId}`),
    getDate("p", "comments")
]).then(([product, comments]) => {
    
        if (product === "Not found" || !product) {
            location.pathname = "/"
        }
        
        let currComments = comments.filter(comm => comm.productId == product.id)

        commentsList.innerHTML = ""

        if(currComments.length === 0) {
            commentsList.innerHTML = "Comment not found"
        } else {
            currComments.reverse().forEach(comm => {
                commentsList.innerHTML +=`
                <div class="all-comments__item">
                    <h3>${comm.author}</h3>
                    <p>${comm.text}</p>
                    <span>Rate: ${comm.rate}</span>
                </div>
                `
            })
        }


    product.imgs.forEach(img => {
        swiperSlider.innerHTML += `<div class="swiper-slide"><img src="/imgs/p/${img}">
        ${product.discount ? `<p class="discount">${product.discount}%</p>` : ""}
        </div>`
    })

    prodContent.innerHTML = `
            <h1>${product.name} </h1>
            <p class="info">${product.info} </p>
            <p class="info">Producer: ${product.producer}</p>
            <div class="info-prod__bottom">
                <p class="price">${product.price} $</p>
                <button class="product-card__buy" data-id=${product.id}>Buy</button>
            </div>
            <a href="#prod-comments">Comments: ${currComments.length}</a>
    `
    addClickBtnBuy(prodContent, false, product)
    
    var swiper = new Swiper(".info-prod__swiper", {
        navigation: {
            nextEl: ".swiper-butto-next",
            prevEl: ".swier-button-prev",
        },
    });
        // =======================================

    let exUser = JSON.parse(localStorage.getItem("exClient"))

    if (!exUser) {
      addCommentBtn.style.display = "none"
    } else {
      getDate("c", "clients").then(allClients => {
        let exClient = allClients.find(client => client.login == exUser.login && client.password == exUser.password)
  
        if (!exClient) {
          addCommentBtn.style.display = "none"
          localStorage.clear()
        } else {
          localStorage.setItem("exClient", JSON.stringify(exClient))
        }
      }).catch(() => {
        addCommentBtn.style.display = "none"
        localStorage.clear()
      })
    }
    // =======================================

    addCommentBtn.addEventListener("click", () => {
        allCommentsForm.classList.add("active")
    })

    slider.addEventListener('input', function () {
        allCommentsFormValueDisplay.textContent = allCommentsFormSlider.value;
    })

    allCommentsForm.addEventListener("submit", (event) => {
        event.preventDefault()

        let newComment = {
            rate: +allCommentsFormSlider.value,
            text: allCommentsTextArea.value,
            author: exUser.lastname + "" + exUser.name,
            createAt: Date.now(),
            productId: productId
        }

        creatComment(newComment).then(() =>{
            location.reload()
        })
    })

}).catch(() => location.pathname = "/")


//========================================================================================

let sliderWrapper = document.querySelectorAll(".hits .swiper-wrapper") //  2 слайдер html (вони пусті)
let productsHits = [] //   хіт продаж (вони пусті)


Promise.all([
    getDate("p", "products"), // получаємо просто всі товари які є    
    getDate("p", "comments")  // получаємо просто всі коментарі які є  
]).then(([allProducts, allComments]) => {
    // Обєднуємо коментарі і товари які получили в один масив -- productsWithComments
    let productsWithComments = allProducts.map(product => {
        return {
            ...product,
            comments: allComments.filter(comment => comment.productId == product.id)
        }
    })
    // =================================================================================================


    // Фільтруємо productsWithComments дістаючи тільки ті продукти рейтинг яких більше 4 зірки
    productsHits = productsWithComments.filter(prod => {
        let summRate = 0  // для кожного продукта кажемо що сума його балів 0
        let totalRate = 0 // середнє кожного  продукта арифметичне (рейтинг) також буде 0

        if (prod.comments.length > 0) {  // Перевіряємо чи є рейтинг (коментарі)

            prod.comments.forEach(comment => {
                summRate += comment.rate //Якщо коментарі є то сумуємо його рейтинг (бали)
            })
            totalRate = Math.round(summRate / prod.comments.length) // шукаємо середній бал

            if (totalRate >= 77) {
                return prod // Якщо середній бал більше або рівне 77 то товармдодаємо в productsHits
            } else {
                return false // Якщо середній бал менше 77 то не додаємо продукт в productsHits
            }
        } else {
            return false // Якщо немає коментарів то не додаємо продукт в масив -- productsHits
        }
    })
    // ================================================================================================================

    renderHitsSlider(productsHits, sliderWrapper[0])      // малює карточки зі слайдами на сторінку 

    // Запускаємо конфігурацію слайдера
    var swiper = new Swiper(".hits-swiper", {
        slidesPerView: 2,
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
        breakpoints: {
            520: {
                slidesPerView: 2,
            },
            860: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
            1260: {
                slidesPerView: 5,
            }
        }
    });
})

burgerNav()

