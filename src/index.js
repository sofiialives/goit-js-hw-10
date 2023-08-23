import axios from 'axios';
import { fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';


axios.defaults.headers.common['x-api-key'] =
  'live_xE7rQU3rH5L8SUEzkUg8K2GIuGcTzdTI74Vx5vXMQD1mQ8MQxDMzWtoQhVoXEv2d';
const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
// const BROWSE_IMG = 'https://api.thecatapi.com/v1/images/search';
// const BROWSE_IDENTITY = 'breed_ids';

const refs = {
  selectOpt: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInf: document.querySelector('.cat-info'),
};

document.addEventListener('DOMContentLoaded', () => {
  new SlimSelect({
    select: '.breed-select'
  });
});

refs.selectOpt.addEventListener('change', selectImg)

function selectImg(e){
  const newBreedId = e.target.value
  fetchCatByBreed(newBreedId).then(arr => {
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
  })
}


function fetchBreeds() {
  refs.loader.classList.add('visible');
  refs.loader.classList.remove('hidden');
  refs.error.classList.remove('visible');

  return axios
    .get(BASE_URL)
    .then(resp => {
      refs.loader.classList.remove('visible');
      refs.loader.classList.add('hidden');

      if (resp.status !== 200) {
        throw new Error(resp.statusText);
      }
      refs.error.classList.add('hidden')
      return resp.data;
    })
    .catch(err => {
    refs.error.classList.add('visible')
    Notiflix.Notify.failure(err);
  });
}
fetchBreeds().then(data => {
  console.log(data);
});




