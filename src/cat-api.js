import axios from 'axios';

const BROWSE_IMG = 'https://api.thecatapi.com/v1/images/search';
const BROWSE_IDENTITY = 'breed_ids';

function fetchCatByBreed(breedId) {
  return axios.get(`${BROWSE_IMG}?${BROWSE_IDENTITY}=${breedId}`)
    .then(resp => {
      if (resp.status !== 200) {
        throw new Error(resp.statusText);
      }
      
      return resp.data;
    })
    .catch(err => {
      Notiflix.Notify.failure(err);
    });
}

export { fetchCatByBreed };