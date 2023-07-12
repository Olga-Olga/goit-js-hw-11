import { ferchCat } from "./api";
import { ApiSearching } from "./api.js";
import Notiflix from 'notiflix';
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

console.log(ApiSearching);
const findMe = new ApiSearching ()

formEl.addEventListener("submit", sumitSearchHandler)
async function sumitSearchHandler(event) {
  event.preventDefault();
  findMe.searchWrod = searchParam.value;  
  const res = await findMe.ferchCat()
  console.log(res.data.total);

  
  if (res.data.total === 0) {
      console.log("Нічого не знайдено");
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
  loadMoreEl.disabled = false

   if (res.data.total > 0 && res.data.total<50) {
     console.log("це всі результати, що можно відобразити. Кінесь списку.");
     loadMoreEl.disabled = true
  }
}

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
        loadMoreEl.disabled = true
    }
    
   }
  catch (err) {
    console.log(err);
    Notiflix.Notify.failure('Qui timide rogat docet negare');
   }
}
)