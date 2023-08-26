import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import './styles.css';

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
    const createOptions = data
      .map(breed => `<option value = "${breed.id}">${breed.name}</option>`)
      .join('');
    refs.selectOpt.insertAdjacentHTML('beforeend', createOptions);
    new SlimSelect({
      select: refs.selectOpt,
    });
  })
  .catch(error => {
    refs.selectOpt.classList.remove('is-hidden');
    refs.loader.classList.replace('loader', 'is-hidden');

    Notiflix.Notify.failure('Oops! There is a mistake..');
    console.error(error);
  });

refs.selectOpt.addEventListener('change', selectImg);

function selectImg(e) {
  refs.loader.classList.replace('is-hidden', 'loader');
  refs.selectOpt.classList.add('is-hidden');
  refs.catInf.classList.add('is-hidden');

  const breedId = e.target.value;
  fetchCatByBreed(breedId)
    .then(arr => {
      refs.loader.classList.replace('loader', 'is-hidden');
      refs.selectOpt.classList.remove('is-hidden');
      const cards = arr
        .map(
          el => `
          <li class = "li-li"> 
            <img src="${el.url}" />
            <div class = 'div-li'>
            <h1>${el.breeds[0].name}</h1>
            <p>${el.breeds[0].description}</p>
            <p><b>Temperament: </b>${el.breeds[0].temperament}</p>
            </div>
          </li>
        `
        )
        .join('');
      refs.catInf.innerHTML = `<ul>${cards}</ul>`;
      refs.catInf.classList.remove('is-hidden');
    })
    .catch(error => {
      refs.selectOpt.classList.remove('is-hidden');
      refs.loader.classList.replace('loader', 'is-hidden');

      Notiflix.Notify.failure('Oops! There is a mistake..');
      console.error(error);
    });
}
