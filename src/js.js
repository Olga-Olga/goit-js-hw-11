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
  
const findMe = new ApiSearching()


formEl.addEventListener("submit", sumitSearchHandler)
async function sumitSearchHandler(event) {
  event.preventDefault();
  findMe.searchWrod = searchParam.value;
  findMe.page = 1
  const res = await findMe.ferchCat()
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
  
  optionRadioEl2.checked ? loadMoreEl.classList.remove("is-hidden") : observer.observe(targetSecEl);
  Notify.success(`Знайдено ${res.data.total} результатів в Search`);  
  galleryLe.innerHTML = ""
  galleryLe.insertAdjacentHTML("beforeEnd", templateFunction(res.data.hits))
  openPic.refresh();
  console.log(openPic);
  openPic.refresh();
}

loadMoreEl.addEventListener('click', loadMoreHandler)
async function loadMoreHandler() {
  try {
    findMe.page += 1
    const res = await findMe.ferchCat()
    galleryLe.insertAdjacentHTML("beforeEnd", templateFunction(res.data.hits))
    openPic.refresh();
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


// IntersectionObserver Слідкування за чимось, для прокручування будем використовувати
const cback = async (entries, observer) => {
  console.log(entries, observer);
  if (entries[0].isIntersecting) {
    console.log("kuku");
   try {
    findMe.page += 1
    const res = await findMe.ferchCat()
    galleryLe.insertAdjacentHTML("beforeEnd", templateFunction(res.data.hits))
    openPic.refresh();
       if (Number(res.data.hits.length) < findMe.quantityOnThePage) {        
         Notify.info("Це всі результати заватнаження. Кінець списку.");
        return
    }
   }
  catch (err) {
    console.log(err);
    Notiflix.Notify.failure(err.message);
   }
    }    
}
const option = {
  // root: document.querySelector("body")
  root: null, //to see all view post, not body
  rootMargin: "0px 0px 0px 0px ",
  treshhold: 1.0,
  //яка частина цільового елементу повинна досягнутись, щоб зробилось прокручування, довантаження
}

const observer = new IntersectionObserver(cback, option)
const targetSecEl = document.querySelector(".target")
console.log(targetSecEl);
const optionRadioEl1 = document.querySelector("#optionInfScroll")
const optionRadioEl2 = document.querySelector("#optionLoadMoreButton")
const radioContainer = document.querySelector(".switcher")

radioContainer.addEventListener("change", changeOptionLoadingHandler)

// !RADIO BUTTONS//
function changeOptionLoadingHandler(event) {
  galleryLe.innerHTML = "";
  loadMoreEl.classList.add("is-hidden")
  observer.disconnect();
  // if (optionRadioEl1.checked === true) {
  //   loadingInfinityTrueOrFalse = false;
  //   return
  // }
   
  // if (optionRadioEl2.checked === true) {
  //   loadingInfinityTrueOrFalse = true;
  //   return
  // }

  // optionRadioEl2.checked

}
