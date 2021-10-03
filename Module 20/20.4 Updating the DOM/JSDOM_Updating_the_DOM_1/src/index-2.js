import "./styles.css";

//addHeadings()
function addHeadings() {
const articles = document.querySelectorAll("article");
for (let content of articles.values()) {
   const cont = content.innerText;
   content.innerHTML = `<h2>${cont}</h2>`;
}
}

//styleTutorialsAndArticles()
function styleTutorialsAndArticles() {
const articles = document.querySelectorAll("article");
for (let content of articles.values()) {
   const cont = content.innerText;
   if (cont.toLowerCase().includes("tutorial")) {
   content.classList.add("tutorial");
   } else {
   content.classList.add("article");
   }
}
}

//separateAllTutorials()
function separateAllTutorials() {
const articles = document.querySelectorAll("article");
const container = document.querySelector(".container");
const articleSection = document.querySelector(".articles");
const tutorials = [];
for (let article of articles.values()) {
   const cont = article.innerText;
   if (cont.toLowerCase().includes("tutorial")) {
   tutorials.push(article);
   articleSection.removeChild(article);
   }
}
if (tutorials.length > 0) {
   const tutorialSection = document.createElement("section");
   tutorialSection.classList.add("tutorials");
   tutorials.forEach((tutorial) => tutorialSection.appendChild(tutorial));
   container.appendChild(tutorialSection);
}
}

main();
