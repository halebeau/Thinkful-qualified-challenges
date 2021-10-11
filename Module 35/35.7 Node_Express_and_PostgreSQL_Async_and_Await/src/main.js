const {
  generateMessage,
  goodbye,
  generateSlogan,
} = require("../utils/slogan-generator");

async function getSlogan(request) {
  const slogan = await generateSlogan(request);
  console.log(`Your request was: ${request}`);
  console.log(`Your slogan is: ${slogan}`);
}

async function fullSession(request) {
  const message = await generateMessage();
  console.log(message);
  await getSlogan(request);
  const bye = await goodbye();
  console.log(bye);
}

module.exports = { getSlogan, fullSession };