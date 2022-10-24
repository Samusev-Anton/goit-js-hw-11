import markup from '../js/templates/markup.hbs';
import { apiPixabay } from '../js/apiPixabay';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
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
conteiner.addEventListener('click', onClickImage);
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function onClickImage(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
}

// lightbox.refresh();

function onButtonClick(evt) {
  evt.preventDefault();
  page = 1;
  inputData = evt.target.elements.searchQuery.value.trim().toLowerCase();
  if (inputData.length < 1) {
    Notiflix.Notify.failure('The field must not be empty');
    return;
  }

  apiPixabay(page).then(data => {
    if (data.hits.length === 0) {
      conteiner.innerHTML = '';
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    conteiner.innerHTML = markup(data.hits);
    lightbox.refresh();
    Notiflix.Notify.success(
      `Hooray! We found ${data.totalHits} totalHits images.`
    );

    observer.observe(guard);
  });
}

function onLoad(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      apiPixabay(page).then(data => {
        conteiner.insertAdjacentHTML('beforeend', markup(data.hits));
        lightbox.refresh();
        if (page === Math.ceil(data.totalHits / 40)) {
          Notiflix.Notify.info(
            'We are sorry, but you reached the end of search results.'
          );
          observer.unobserve(guard);
          return;
        }
      });
    }
  });
}

export { inputData };

// function removeAllChildNodes(conteiner) {
//   while (conteiner.firstChild) {
//     conteiner.removeChild(conteiner.firstChild);
//   }
// }
