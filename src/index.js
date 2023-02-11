import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
const DEBOUNCE_DELAY = 300;
let nameCountry = '';

//   console.log(data[0]);
//   console.log(name.official);
//   console.log(flags.svg);
//   console.log(capital[0]);
//   console.log(population);
//   console.log(Object.values(languages).join(', '));
const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onNameCountryInput, DEBOUNCE_DELAY));

function onNameCountryInput(evt) {
  nameCountry = evt.target.value.trim();
  console.log(nameCountry);
  fetchCountries(nameCountry)
    .then(data => {
      verificationData(data);
    })
    .catch(error => {
      console.log(error);
      Notify.failure('Oops, there is no country with that name');
    });
}

function verificationData(dataCountries) {
  let quantityCountries = dataCountries.length;
  console.log(quantityCountries);
  if (quantityCountries === 1) creationMarkupOneCountry(dataCountries[0]);
  else if (quantityCountries >= 2 && quantityCountries <= 10) {
    creationMarkupCountries(dataCountries);
  } else
    Notify.info('Too many matches found. Please enter a more specific name.');
}

function creationMarkupOneCountry({
  name,
  flags,
  capital,
  population,
  languages,
}) {
  let languagesArray = [];
  languages.forEach(element => {
    languagesArray.push(element.name);
    countryInfoEl.innerHTML = `    
      <div class="country-header">
      <img src="${flags.svg}" alt="flag" class="flag" />
      <h2 class="country-title">${name}</h2>
    </div>
    <div class="info-list">
      <li>
        <p><span class="country-characteristic">Capital: </span>${capital}</p>
      </li>
      <li>
        <p><span class="country-characteristic">Population: </span>${population}</p>
      </li>
      <li>
        <p><span class="country-characteristic">Languages: </span>${languagesArray.join(
          ', '
        )}</p>
      </li>
    </div>`;
    countryListEl.innerHTML = ``;
  });
}

function creationMarkupCountries(dataСountries) {
  let contries = [];
  dataСountries.map(contry => {
    contries += `
    <div class="country-header">
    <img src="${contry.flags.svg}" alt="flag" class="flag" />
    <p class="country-title">${contry.name}</p>
    </div>
  `;
    countryListEl.innerHTML = contries;
    countryInfoEl.innerHTML = ``;
  });
}
