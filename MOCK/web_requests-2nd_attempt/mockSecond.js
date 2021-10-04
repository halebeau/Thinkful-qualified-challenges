const axios = require("axios");
// //Write your functions here

//for loop example
async function getAllCountries() {
   const url = `https://restcountries.eu/rest/v2/all`
   const result = await axios.get(url)
   const data = result.data
   const countries = []
   for (let i = 0; i < data.length; i++) {
      let country = data[i]
      let newCountry = {
         name: country.name,
         region: country.region,
         currencies: country.currencies
      }
      countries.push(newCountry)
}
return countries
}

// Code ^above With Map()
const getAllCountries = async () => {
const url = `https://restcountries.eu/rest/v2/all`
const result = await axios.get(url)
const data = result.data
const countries = data.map(({name, region, currencies}) => ({
   name: name,
   region: region,
   currencies: currencies
})
)

console.log(countries)
return countries
}

//Do not modify code below this line
module.exports = {getAllCountries};

