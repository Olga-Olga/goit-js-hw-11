import { ferchCat } from "./api";
import { ApiSearching } from "./api.js";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';
import axios from 'axios';
import templateFunction from './markup.hbs';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm"
const formEl = document.querySelector(".search-form")
const inputEl = document.querySelector("input")
const buttonEl = document.querySelector('[name=search]')
const loadMoreEl = document.querySelector('.loadMore')
const galleryLe = document.querySelector(".gallery")
let searchParam = document.querySelector("input[name=searchQuery]")
loadMoreEl.classList.add("is-hidden")

const findMe = new ApiSearching ()

formEl.addEventListener("submit", sumitSearchHandler)
async function sumitSearchHandler(event) {
  event.preventDefault();
  console.log(searchParam.value)
  findMe.searchWrod = searchParam.value;
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
  }
  
  loadMoreEl.classList.remove("is-hidden")
  Notify.success(`Знайдено ${res.data.total} результатів в Search`);
  
  galleryLe.innerHTML = ""
  galleryLe.insertAdjacentHTML("beforeEnd", templateFunction(res.data.hits))
  new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
    doubleTapZoom: 2,
    scrollZoom: false
  })
 
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
    new SimpleLightbox(".gallery a", {
      captionsData: "alt",
      captionDelay: 250,
      doubleTapZoom: 2,
      scrollZoom: false
    })
    loadMoreEl.classList.remove("is-hidden")
    
       if (Number(res.data.hits.length) < findMe.quantityOnThePage) {        
         loadMoreEl.classList.add("is-hidden")
         Notify.info("Це всі результати заватнаження. Кінець списку.");
        /  retu/rn
    }
   }
  catch (err) {
    console.log(err);
    Notiflix.Notify.failure(err.message);
    loadMoreEl.classList.add("is-hidden")
   }
}
)