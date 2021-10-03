
// function getRates() {
//    const url = "https://"
//    return fetch(url)
//    .then(result => result.json())
//    .then(data => {
//       return data.map(({ rate }) => {
//          return {rate}
//    });
//    console.log(result);
//    }
// }

const { default: axios } = require("axios");


////////fetch ex
function getBrews(state) {
   const url = `https://abc.com=${state}`
   fetch(url)
   .then(res => res.json())
   .then(data => console.log(data))
}
getBrews('california');

//////////async/await ex^
async function getBrews(state) {
   const res = await fetch(url)
   const state = await res.json()
   console.log(state)
}
getBrews('california')

/////////axios ex^
async function getBrews() {
   const url = 'https://abc.com'
   const {data} = await axios.get(url)
   return data.map(({state}) => {
      return {state}
   })
}
getBrews()
.then(data => console.log(data))

/////////Josh ex
async function getBrews() {
   const url = 'https://abc.com';
   const response = await axios.get(url);
   return await response.data.state;
}