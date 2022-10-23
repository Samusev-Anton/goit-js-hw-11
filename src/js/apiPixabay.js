import { inputData } from '../js/index';

// const URL = 'https://pixabay.com/api/';
const KEY = '30760440-578eb64e9c4ff1eb66a65bfe8';

export async function apiPixabay(page) {
  try {
    const responce = await fetch(
      `https://pixabay.com/api/?key=${KEY}&q=${inputData}&per_page=40&page=${page}&image_type=photo&orientation=horizontal&safesearch=true `
    );
    const data = await responce.json();
    return data;
  } catch (Error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  //   then(responce => {
  //     if (!responce.ok) {
  //       throw new Error();
  //     }
  //     return responce.json();
  //   });
}
