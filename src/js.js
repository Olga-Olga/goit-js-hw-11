import { ferchCat } from "./api";
import { ApiSearching } from "./api.js";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import templateFunction from './markup.hbs';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const formEl = document.querySelector(".search-form")
const inputEl = document.querySelector("input")
const buttonEl = document.querySelector('[name=search]')
const loadMoreEl = document.querySelector('.loadMore')
const galleryLe = document.querySelector(".gallery")
let searchParam = document.querySelector("input[name=searchQuery]")
loadMoreEl.classList.add("is-hidden")


const openPic = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
    doubleTapZoom: 2,
    scrollZoom: false
  })
  
const findMe = new ApiSearching ()

formEl.addEventListener("submit", sumitSearchHandler)
async function sumitSearchHandler(event) {
  event.preventDefault();
  console.log(searchParam.value)
  findMe.searchWrod = searchParam.value;
  findMe.page = 1
  const res = await findMe.ferchCat()
  console.dir(res.data);
  console.dir(findMe.searchWrod);
    if (res.data.total === 0) {
    galleryLe.innerHTML = ""
    Notify.failure("Нічого не знайдено");
    loadMoreEl.classList.add("is-hidden");
    return
  }
    if (res.data.total > 0 && res.data.total < findMe.quantityOnThePage) {
    Notify.info("це всі результати, що можно відобразити. Кінець списку");
      loadMoreEl.classList.add("is-hidden")
      galleryLe.innerHTML = "";
      galleryLe.insertAdjacentHTML("beforeEnd", templateFunction(res.data.hits))
      openPic.refresh();
      return
  }
  
  loadMoreEl.classList.remove("is-hidden")
  Notify.success(`Знайдено ${res.data.total} результатів в Search`);
  
  galleryLe.innerHTML = ""
  galleryLe.insertAdjacentHTML("beforeEnd", templateFunction(res.data.hits))
  openPic.refresh();
  console.log(openPic);
  openPic.refresh();
  // new SimpleLightbox(".gallery a", {
  //   captionsData: "alt",
  //   captionDelay: 250,
  //   doubleTapZoom: 2,
  //   scrollZoom: false
  // })
 
}
  // }
  // catch (err) {
  //   console.log(err);
  // //   Notiflix.Notify.failure('Qui timide rogat docet negare');
  //  }


loadMoreEl.addEventListener('click', 
async function loadMore() {
  try {
    findMe.page += 1
    const res = await findMe.ferchCat()
    galleryLe.insertAdjacentHTML("beforeEnd", templateFunction(res.data.hits))
    openPic.refresh();
    // new SimpleLightbox(".gallery a", {
    //   captionsData: "alt",
    //   captionDelay: 250,
    //   doubleTapZoom: 2,
    //   scrollZoom: false
    // })
    loadMoreEl.classList.remove("is-hidden")
    
       if (Number(res.data.hits.length) < findMe.quantityOnThePage) {        
         loadMoreEl.classList.add("is-hidden")
         Notify.info("Це всі результати заватнаження. Кінець списку.");
        return
    }

const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});


   }
  catch (err) {
    console.log(err);
    Notiflix.Notify.failure(err.message);
    loadMoreEl.classList.add("is-hidden")
   }
}
)

const btnUp = {
  el: document.querySelector('.btn-up'),
  show() {
    // удалим у кнопки класс btn-up_hide
    this.el.classList.remove('btn-up_hide');
  },
  hide() {
    // добавим к кнопке класс btn-up_hide
    this.el.classList.add('btn-up_hide');
  },
  addEventListener() {
    // при прокрутке содержимого страницы
    window.addEventListener('scroll', () => {
      // определяем величину прокрутки
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
      scrollY > 400 ? this.show() : this.hide();
    });
    // при нажатии на кнопку .btn-up
    document.querySelector('.btn-up').onclick = () => {
      // переместим в начало страницы
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}

btnUp.addEventListener();