
import axios from 'axios';
import "simplelightbox/dist/simple-lightbox.min.css";
const galleryLe = document.querySelector(".gallery")
import Notiflix from 'notiflix';

 export class ApiSearching {
    #API_KEY = "38199190-357b16d82ad5caa1ff3a80ee2";
    #URL = "https://pixabay.com/api/?";
     
    constructor() {
        this.page = 1;
        this.searchWrod = null
     }

     ferchCat = () => {
        const param = {
        key: this.#API_KEY,
        q: this.searchWrod,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: this.page,
        per_page: 50
         }
         try {
             const res = axios.get(this.#URL, { params: param })
            //  Notiflix.Notify.success('Sol lucet omnibus');
             return res
         }
         catch (error) {
             console.error('An error occurred:', error.message)
            //  Notiflix.Notify.failure('Qui timide rogat docet negare');
         }   
    }
    }


// export const ferchCat = async (searchWrod) => {
//     const param = {
//         key: API_KEY,
//         q: searchWrod,
//         image_type: "photo",
//         orientation: "horizontal",
//         safesearch: true,
//         page: 1,
//         per_page: 9
//     }
//     try {
//         console.log(123);
//         const res = await axios.get(URL, { params: param })
//         console.log(searchWrod)
//         console.log(res)
//         galleryLe.innerHTML = ""
//         galleryLe.insertAdjacentHTML("beforeEnd", templateFunction(res.data.hits))
       
//         new SimpleLightbox(".gallery a", {
//             captionsData: "alt",
//             captionDelay: 250,
//             doubleTapZoom: 2,
//             scrollZoom: false
//         }) 
        
//     }
//     catch (error) {
//         console.error('An error occurred:', error.message)
//     }    
// }


// loadMore(usersInput) {
//     try {
        
//     }
//     catch {
        
//     }
// }



// (() => {
//   const refs = {
//     openMenuBtn: document.querySelector('[data-menu-open]'),
//     closeMenuBtn: document.querySelector('[data-menu-close]'),
//     menu: document.querySelector('[data-menu]'),
//   };

//   refs.openMenuBtn.addEventListener('click', toggleMenu);
//   refs.closeMenuBtn.addEventListener('click', toggleMenu);

//   function toggleMenu() {
//     refs.menu.classList.toggle('is-hidden');
//     document.body.classList.toggle('no-scroll');
//   }
// })();
