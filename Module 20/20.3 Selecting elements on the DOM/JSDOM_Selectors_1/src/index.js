import "./index.css";

const ratings = document.querySelectorAll(".rating .value");

const halfStars = document.querySelectorAll(".star.half");

const gatewayArch = document.querySelector("#ganp");

const established = document.querySelector("#ganp .established .value");

/**
Write a statement that will find the element containing the established date for the Gateway Arch park
*/


/////////////////////////////////
// DO NOT EDIT BELOW THIS LINE //
/////////////////////////////////
const body = document.querySelector("body");

if (ratings) {
  if (ratings instanceof NodeList) {
    ratings.forEach((node) => node.classList.add("r1"));
  } else {
    body.classList.add("e1");
  }
}

if (halfStars) {
  if (halfStars instanceof NodeList) {
    halfStars.forEach((node) => node.classList.add("h1"));
  } else {
    body.classList.add("e2");
  }
}

if (gatewayArch) {
  if (gatewayArch instanceof Node) {
    gatewayArch.classList.add("g1");
  } else {
    body.classList.add("e3");
  }
}

if (established) {
  if (established instanceof Node) {
    established.classList.add("es1");
  } else {
    body.classList.add("e4");
  }
}
