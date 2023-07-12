import { ferchCat } from "./api";
import { ApiSearching } from "./api.js";

import axios from 'axios';
import templateFunction from './markup.hbs';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm"
// const res = await ferchCat(param)
// const el = document.getElementsByClassName("search-form")
const formEl = document.querySelector(".search-form")
const inputEl = document.querySelector("input")
const buttonEl = document.querySelector('[name=search]')
const loadMoreEl = document.querySelector('.loadMore')
// console.log(loadMoreEl);
// loadMoreEl.disabled = true
const galleryLe = document.querySelector(".gallery")

let searchParam = document.querySelector("input[name=searchQuery]")

console.log(ApiSearching);
const findMe = new ApiSearching ()

formEl.addEventListener("submit", sumitSearchHandler)
async function sumitSearchHandler(event) {
  event.preventDefault();
  findMe.searchWrod = searchParam.value
  
  const res = await findMe.ferchCat()
  console.log(res.data.hits);
  galleryLe.innerHTML = ""
  galleryLe.insertAdjacentHTML("beforeEnd", templateFunction(res.data.hits))
        new SimpleLightbox(".gallery a", {
            captionsData: "alt",
            captionDelay: 250,
            doubleTapZoom: 2,
            scrollZoom: false
        })
 }

loadMoreEl.addEventListener('click', 
async function loadMore() {
  try {
    findMe.page += 1
    console.log(findMe.page);
    const res = await findMe.ferchCat()
    console.log(res.data.hits);
    galleryLe.insertAdjacentHTML("beforeEnd", templateFunction(res.data.hits))
        new SimpleLightbox(".gallery a", {
            captionsData: "alt",
            captionDelay: 250,
            doubleTapZoom: 2,
            scrollZoom: false
        })

   }
  catch (err) {
console.log(err);
   }
}
)