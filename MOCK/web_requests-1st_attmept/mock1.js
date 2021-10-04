const axios = require('axios');

/////////////////fetch
function getAllCountries() {
   const url = 'https://restcountries.eu/rest/v2/all'
   return fetch(url)
   .then(res => res.json())
   .then(data => {
      return data.map(({name, region, currencies}) => {
         return {name, region, currencies}
      })
      // console.log(result);
   }


////////////////fetch
function getRates(currency) {
   const url = `https://api.frankfurter.app/latest?from=${currency}`
   fetch(url) 
      .then(res => res.json()) 
      .then(rates => console.log(rates))
}
getRates('USD')


/////Async/Await
async function getAllCountries() {
   const url = 'https://restcountries.eu/rest/v2/all'
   const res = await fetch(url)
   const data = await res.json()
   let result = data.map(({name, region, currencies}) => {
      return {name, region, currencies}
   })
   console.log(result);
}
getAllCountries()


//////Axios Answer
const axios = require("axios");

async function getRates(rates) {
   const url = `https://api.frankfurter.app/latest?from=${rates}`;
   const response = await axios.get(url);
   return await response.data.rates;
}

//Do not modify code below this line
module.exports = {getRates};

///////Archer Example
const url = `something something ${currency}`;
try {
return axios
      .get(url)
      .then((response) => { 
               return response.data.rates});
} catch (error) { 
   return error.message;
   }
}
}