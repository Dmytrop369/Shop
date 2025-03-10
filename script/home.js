import { getDate } from "../service/service.js"
import { renderHitsSlider } from "../service/hits-slider.js"
import { burgerNav } from "./burger.js"

let sliderWrapper = document.querySelectorAll(".hits .swiper-wrapper") //  2 слайдер html (вони пусті)

let productsHits = [] //   хіт продаж (вони пусті)
let productsDiscount = [] // товари іззнижкою (вони пусті)

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

    // Додаємо в productsDiscount тільки ті товари в яких скидка більше 0
    productsDiscount = productsWithComments.filter(prod => prod.discount > 0)
    //=========================================================================================

    renderHitsSlider(productsHits, sliderWrapper[0])      // малює карточки зі слайдами на сторінку
    renderHitsSlider(productsDiscount, sliderWrapper[1])  // малює карточки зі слайдами на сторінку

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