import "./index.css";

function validateForm(data) {
return data.get("searchTerm").trim() !== "";
}

const form = document.querySelector("#searchForm");
form.addEventListener("submit", function (event) {
event.preventDefault();

let error = document.querySelector("#searchError");
if (!error) {
   error = document.createElement("div");
   error.classList.add("error");
   error.id = "searchError";
   error.innerHTML = "Please enter a search term";
} else {
   form.removeChild(error);
}
const formData = new FormData(form);
if (!validateForm(formData)) {
   form.appendChild(error);
} else {
   const searchTerm = formData.get("searchTerm").trim().toLowerCase();
   const titles = document.querySelectorAll("article > h2");
   for (let title of titles) {
   if (!title.innerHTML.toLowerCase().includes(searchTerm)) {
      title.parentNode.classList.add("hidden");
   } else {
      title.parentNode.classList.remove("hidden");
   }
   }
}
});