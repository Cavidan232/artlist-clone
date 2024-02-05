let list2Icon = document.querySelector('.list2');
let nav2 = document.querySelector('.nav2');

list2Icon.addEventListener("click", () => {
    if (nav2.style.transform === "translateX(100%)") {
        nav2.style.transform = "translateX(0)"
    }
    else {
        nav2.style.transform = "translateX(100%)"
    }
})

let xicon = document.querySelector(".bi-x");
xicon.addEventListener("click", () => {

    nav2.style.transform = "translateX(100%)"


})

window.addEventListener("resize", () => {
    if (window.innerWidth > 991) {
        nav2.style.transform = "translateX(100%)"

    }
})



let list3Icon = document.querySelector('.list1');
let nav3 = document.querySelector('.nav3');

list3Icon.addEventListener("click", () => {
    if (nav3.style.transform === "translateX(-100%)") {
        nav3.style.transform = "translateX(0)"
    }
    else {
        nav3.style.transform = "translateX(-100%)"
    }
})

let xicon1 = document.querySelector(".x2");
xicon1.addEventListener("click", () => {

    nav3.style.transform = "translateX(-100%)"


})

window.addEventListener("resize", () => {
    if (window.innerWidth > 991) {
        nav3.style.transform = "translateX(-100%)"

    }
})

let navLinks = document.querySelectorAll('nav ul li a');
let nav = document.querySelector("nav");

navLinks.forEach((element) => {
    element.addEventListener("click", (event) => {
        nav.style.borderBottom = '2px solid #ffda2a';
    });
});





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
});


let user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).name : null;

if(user){
    window.location = './index.html'
}
console.log(user);


let form2= document.querySelector(".sign-in-form");
form2.addEventListener('submit',(e)=>{
    e.preventDefault();

    let name =  document.querySelector("#user").value;
    let password = document.querySelector("#pas").value;

    fetch('http://localhost:3000/acount', {
      }).then(res=>res.json())
      .then(data => {
        console.log(data);
        let currentUserInfo = data.find((user)=>user.name == name)
        if(currentUserInfo){
            if(currentUserInfo.password == password){
                localStorage.setItem('currentUser', JSON.stringify(currentUserInfo));
                window.location = './index.html'
            }else{
                alert("wrong pasword")
            }      
        }else{
           alert("wrong name")
        }
      })
})