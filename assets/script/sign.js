const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector(".btn2");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


$("#search-icon").click(function() {
  $(".nav").toggleClass("search");
  $(".nav").toggleClass("no-search");
  $(".search-input").toggleClass("search-active");
});

$('.menu-toggle').click(function(){
   $(".nav").toggleClass("mobile-nav");
   $(this).toggleClass("is-active");
});


let url = "http://localhost:3000/acount";
let nameInp = document.querySelector("#upname");
let mailInp = document.querySelector("#upmail");
let pasInp = document.querySelector("#uppasword");
let formUp = document.querySelector(".sign-up-form");
formUp.addEventListener("submit", async (e) => {
  e.preventDefault();

  await axios.post(url, {
    name: nameInp.value,
    mail: mailInp.value,
    password: pasInp.value
  });

  window.location = "./index.html";
});