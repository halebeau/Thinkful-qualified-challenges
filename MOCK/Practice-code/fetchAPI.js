const axios = require("axios");
const BASE_URL = 'https://api.github.com';

/////////////////////FETCH
function getAllCountries() {
   const url = "https://restcountries.eu/rest/v2/all"
   return fetch(url)
   .then(res => res.json())
   .then(data => {
      return data.map(({name, region, currencies}) => {
         return {name, region, currencies}
      })
      // console.log(result);
   })
}
const countries = getAllCountries();
countries
.then(data => console.log(data));



/////////////////////ASYNC
async function getAllCountries() {
   const url = 'https://restcountries.eu/rest/v2/all'
   const res = await fetch(url)
   const data = await res.json()
   let result = data.map(({name, region, repositories}) => {
      return {name, repositories}
   })
   console.log(result);
}
getAllCountries();


///////////////////AXIOS
async function getAllCountries() {
   const url = 'https://restcountries.eu/rest/v2/all'
   const { data } = await axios.get(url)
   return data.map(({name, region, repositories}) => {
      return {name, region, repositories}
   })
}
getAllCountries()
.then(data => console.log(data))


/////////////////GET RATES function
// https://api.frankfurter.app/latest?from=USD

function getRates(currency) {
   const url = `https://api.frankfurter.app/latest?from=${currency}`
   fetch(url) 
      .then(res => res.json()) 
      .then(rates => console.log(rates))
}
getRates('USD')