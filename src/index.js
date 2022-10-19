const form = document.querySelector('.search-form');
console.log(form);
const button = document.querySelector('button');

form.addEventListener('submit', onButtonClick);

function onButtonClick(evt) {
  evt.preventDefault();
  console.log(evt.currentTarget.elements.searchQuery.value);
  const inputData = evt.currentTarget.elements.searchQuery.value;
}
