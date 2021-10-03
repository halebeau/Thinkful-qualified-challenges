import "./styles.css";

//addHeadings()
const articles = document.querySelectorAll("article");
function addHeadings(){
  for(let article of articles.values()){
    const newEle = document.createElement("h2");
    newEle.innerText = article.innerText;
    article.innerText = '';
    article.appendChild(newEle); 
  }
}

//styleTutorialsAndArticles()
function styleTutorialsAndArticles(){
  for(let article of articles.values()){
    if(article.innerText.includes('Article')) article.classList.add('article');
    if(article.innerText.includes('Tutorial')) article.classList.add('tutorial');
  }
}

//separateAllTutorials()
function separateAllTutorials(){
  const tutorials = document.createElement('section');
  tutorials.classList.add('tutorials');
  
  for(let article of articles.values()){
    if(article.innerText.includes('Tutorial')){
      tutorials.appendChild(article);
    }
  }
  const appendDiv = document.querySelector('div.container');
  appendDiv.appendChild(tutorials);
}

function main() {
  addHeadings();
  styleTutorialsAndArticles();
  separateAllTutorials();
}

main();