import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import fetchCountries from './fetchCountries';
import Markup from './creationMarkup';

import './css/styles.css';
const DEBOUNCE_DELAY = 300;
let nameCountry = '';

const inputEl = document.querySelector('#search-box');

inputEl.addEventListener('input', debounce(onNameCountryInput, DEBOUNCE_DELAY));

function onNameCountryInput(evt) {
  nameCountry = evt.target.value.trim();
  if (nameCountry)
    fetchCountries(nameCountry)
      .then(data => {
        verificationReceivedData(data);
      })
      .catch(error => {
        Markup.clearMarkup();
        Notify.failure('Oops, there is no country with that name');
      });
  else Markup.clearMarkup();
}

function verificationReceivedData(dataCountries) {
  let quantityCountries = dataCountries.length;
  if (quantityCountries === 1)
    Markup.creationMarkupOneCountry(dataCountries[0]);
  else if (quantityCountries >= 2 && quantityCountries <= 10) {
    Markup.creationMarkupCountries(dataCountries);
  } else
    Notify.info('Too many matches found. Please enter a more specific name.');
}
