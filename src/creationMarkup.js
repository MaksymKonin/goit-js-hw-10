const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

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
function clearMarkup() {
  countryInfoEl.innerHTML = ``;
  countryListEl.innerHTML = ``;
}

export default {
  creationMarkupOneCountry,
  creationMarkupCountries,
  clearMarkup,
};
