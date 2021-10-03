import "./styles.css";

/*
Add event listeners to the .expand_button buttons
*/
function expandArticleBody() {
  const expandBtns = document.querySelectorAll('.expand_button');
  for(let btn of expandBtns){
    btn.addEventListener('click', function(evt){
      let button = evt.target;
      let article = button.closest('.article');
      console.log(article);
      const articleBody = article.querySelector('.article_body');
      if (button.innerText === 'V') {
        articleBody.style.display= 'none';
        button.innerText=">"
      }else{
        articleBody.style.display= 'block';
        button.innerText='V';
      }
    })
  }
}

/*
Add event listeners to the .highlightBtn buttons
*/
function highlightArticle() {
  let highlightBtns = document.querySelectorAll('.highlightBtn');
  for(let btn of highlightBtns) {
    btn.addEventListener('click', function(evt) {
      let button = evt.target;
      let article = button.closest('.article');
      console.log(article.classList);
      if(button.innerText === '+') {
        article.classList.add('highlight');
        button.innerText = '-';
      }else{
        article.classList.remove('highlight');
        button.innerText = '+';
      }
    })
  }
}

function main() {
  expandArticleBody();
  highlightArticle();
}

main();
