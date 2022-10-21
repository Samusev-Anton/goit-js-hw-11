import { inputData } from '../js/index';

// const URL = 'https://pixabay.com/api/';
const KEY = '30760440-578eb64e9c4ff1eb66a65bfe8';

export function apiPixabay(page) {
  return fetch(
    `https://pixabay.com/api/?key=${KEY}&q=${inputData}&per_page=40&page=${page} `
  ).then(responce => {
    if (!responce.ok) {
      throw new Error();
    }
    return responce.json();
  });
}
