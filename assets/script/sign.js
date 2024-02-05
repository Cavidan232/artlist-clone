
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

// let urll = "http://localhost:3000/acount";
// async function fetchData() {
//     let res = await axios.get(urll);
//     return res.data;
// }
// fetchData()


// let logoutBtn = document.querySelector('.logout');
// async function updateLoginText() {

//     let data = await fetchData();

//     logs.forEach((log23) => {
//         if (user) {
//             log23.innerHTML = `${user}!`;  
//         }
//         if (logoutBtn.style.display === "none") {
//             logoutBtn.style.display = "block";
//         }
//         else {
//             logoutBtn.style.display = "none";
//         }
//     });
//     logins.forEach((login) => {
//         login.textContent = "Subscribe Now";
//     });

// }

// updateLoginText();

// async function logout() {
//     let data = await fetchData();

//     if (logoutBtn.style.display === "block") {
//         logoutBtn.addEventListener('click', () => {
//             localStorage.removeItem('currentUser');
//             logs.forEach((log23) => {
//                 log23.textContent = "Sign In";
//             });
//             logoutBtn.style.display = "none";
//         });
//     }

// }

// logout();