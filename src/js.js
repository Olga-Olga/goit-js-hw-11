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
loadMoreEl.disabled = true
const galleryLe = document.querySelector(".gallery")
let searchParam = document.querySelector("input[name=searchQuery]")
loadMoreEl.classList.add("is-hidden")



console.log(ApiSearching);
const findMe = new ApiSearching ()

formEl.addEventListener("submit", sumitSearchHandler)
async function sumitSearchHandler(event) {
  event.preventDefault();
  findMe.searchWrod = searchParam.value;
  const res = await findMe.ferchCat()
  console.log(res.data.total);
  if (res.data.total === 0) {
    galleryLe.innerHTML = ""
    console.log("Нічого не знайдено");
    Notify.failure("Нічого не знайдено");
    return
  }
  
  console.log(res.data.hits);
  galleryLe.innerHTML = ""
  galleryLe.insertAdjacentHTML("beforeEnd", templateFunction(res.data.hits))
  new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
    doubleTapZoom: 2,
    scrollZoom: false
  })
  
  loadMoreEl.classList.remove("is-hidden")
  Notify.success(`Знайдено ${res.data.total} результатів`);
  
  if (res.data.total > 0 && res.data.total < 50) {
    console.log("це всі результати, що можно відобразити. Кінець списку.");
    Notify.info("це всі результати, що можно відобразити. Кінець списку");
    loadMoreEl.classList.add("is-hidden")
  }

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
    console.log(res);
      galleryLe.insertAdjacentHTML("beforeEnd", templateFunction(res.data.hits))
        new SimpleLightbox(".gallery a", {
            captionsData: "alt",
            captionDelay: 250,
            doubleTapZoom: 2,
          scrollZoom: false
        })

    console.log(res.data.hits.length)
      if (Number(res.data.hits.length) < 50) {
        console.log("це всі результати, що можно відобразити. The end of the list.");
        Notify.info("це всі результати, що можно відобразити. Кінець списку");
        loadMoreEl.disabled = true
    }
    
    loadMoreEl.classList.remove("is-hidden")
   }
  catch (err) {
    console.log(err);
    Notiflix.Notify.failure(err.message);
   }
}
)