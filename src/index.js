import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

// axios.defaults.headers.common['x-api-key'] =
//   'live_xE7rQU3rH5L8SUEzkUg8K2GIuGcTzdTI74Vx5vXMQD1mQ8MQxDMzWtoQhVoXEv2d';
// const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
// const BROWSE_IMG = 'https://api.thecatapi.com/v1/images/search';
// const BROWSE_IDENTITY = 'breed_ids';

const refs = {
  selectOpt: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInf: document.querySelector('.cat-info'),
};

refs.loader.classList.replace('loader', 'is-hidden');
refs.error.classList.add('is-hidden');
refs.catInf.classList.add('is-hidden');

let emptyMas = [];
fetchBreeds()
  .then(data => {
    data.forEach(element => {
      emptyMas.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: refs.selectOpt,
      data: emptyMas,
    });
  })
  .catch(error => {
    refs.selectOpt.classList.remove('is-hidden');
    refs.loader.classList.replace('loader', 'is-hidden');

    Notiflix.Notify.failure(error.message);
  });

refs.selectOpt.addEventListener('change', selectImg);

function selectImg(e) {
  refs.loader.classList.replace('is-hidden', 'loader');
  refs.selectOpt.classList.add('is-hidden');
  refs.catInf.classList.add('is-hidden');

  const breedId = e.target.value;
  fetchCatByBreed(breedId).then(arr => {
    refs.loader.classList.replace('loader', 'is-hidden');
    refs.selectOpt.classList.remove('is-hidden');
    const cards = arr
      .map(
        el => `
          <li>
            <img src="${el.url}" />
            <h1>${el.breeds[0].name}</h1>
            <p>${el.breeds[0].description}</p>
            <h2>Temperament: ${el.breeds[0].temperament}</h2>
          </li>
        `
      )
      .join('');
    refs.catInf.insertAdjacentHTML('beforeend', cards);
    refs.catInf.classList.remove('is-hidden');
  }).catch(error => {
    refs.selectOpt.classList.remove('is-hidden');
    refs.loader.classList.replace('loader', 'is-hidden');

    Notiflix.Notify.failure(error.message);
  });
}

// function createOpt(breeds) {
//   const options = breeds
//     .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
//     .join('');
//   refs.selectOpt.insertAdjacentHTML('beforeend', options);
// }

// document.addEventListener('DOMContentLoaded', () => {
//   fetchBreeds().then(data => {
//     createOpt(data);
//     new SlimSelect({
//       select: '.breed-select',
//     });
//   });
// });




