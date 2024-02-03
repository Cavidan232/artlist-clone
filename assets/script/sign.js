const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
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


// let url = "http://localhost:3000/acount";
// let userinp = document.querySelector("#user");
// let pasinp = document.querySelector("#pas");
// let form = document.querySelector(".sign-in-form");
// let login = document.querySelector(".log2");
// window.addEventListener('load', () => {
//     const savedUsername = localStorage.getItem('username');
//     if (savedUsername) {
//         login.innerText = savedUsername;
//     }
// });

// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     axios.post(url, {
//         name: userinp.value,
//         password: pasinp.value,
//     })
//     .then(response => {
//         console.log(response.data);
//         const username = userinp.value;
//         login.innerText = username;
//         localStorage.setItem('username', username);
//     })
// });


