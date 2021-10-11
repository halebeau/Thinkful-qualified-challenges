const responses = require("./responses.json");

function selectRandomSlogan() {
  const num = Math.random() * responses.length;
  const index = Math.floor(num);
  return responses[index];
}

function generateMessage() {
  const message = "Ask me for a random slogan...";
  return Promise.resolve(message);
}

function goodbye() {
  const message = "Best of luck on your startup...";
  return Promise.resolve(message);
}

function generateSlogan(request) {
  if (!request) {
    const message = "A request is required...";
    return Promise.reject(message);
  }

  const slogan = selectRandomSlogan();
  return Promise.resolve(slogan);
}

module.exports = { generateMessage, goodbye, generateSlogan };
