import markup from '../js/templates/markup.hbs';
import { apiPixabay } from '../js/apiPixabay';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const button = document.querySelector('button');
const conteiner = document.querySelector('.gallery');
const guard = document.querySelector('.guard');

let page = 1;
let options = {
  root: null,
  rootMargin: '50px',
  threshold: 1.0,
};
const observer = new IntersectionObserver(onLoad, options);

let inputData = '';
form.addEventListener('submit', onButtonClick);

function onButtonClick(evt) {
  evt.preventDefault();
  inputData = evt.target.elements.searchQuery.value;
  // if (inputData === '') {
  //   removeAllChildNodes(conteiner);
  //   return;
  // }

  apiPixabay(page).then(data => {
    conteiner.insertAdjacentHTML('beforeend', markup(data.hits));
    observer.observe(guard);
  });
}

// .catch(Error);

function removeAllChildNodes(conteiner) {
  while (conteiner.firstChild) {
    conteiner.removeChild(conteiner.firstChild);
  }
}

function onLoad(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      apiPixabay(page).then(data => {
        conteiner.insertAdjacentHTML('beforeend', markup(data.hits));
        if (data.page === data.total / 40) {
          observer.unobserve();
        }
      });
    }
  });
}
// const imageConteiner = document.querySelector('.gallery__item');
// imageConteiner.addEventListener('click', onClickImage);
// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// function onClickImage(evt) {
//   evt.preventDefault();
//   if (evt.target.nodeName !== 'IMG') {
//     return;
//   }
// }

export { inputData };
