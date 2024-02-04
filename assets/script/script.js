let plusbtn = document.querySelectorAll(".text2 span");
let ac = document.querySelectorAll(".text2 p");
plusbtn.forEach((plsbtn, index) => {
    let param = ac[index];
    plsbtn.addEventListener("click", () => {
        ac.forEach((p, i) => {
            if (i !== index) {
                p.style.display = "none";
                plusbtn[i].textContent = "↑";
                p.classList.remove("none");
                p.classList.add("param");
            }
        });

        if (plsbtn.textContent === "↑") {

            param.style.display = "block";
            param.style.height = "0";
            plsbtn.textContent = "↓";
            setTimeout(() => {
                param.style.height = param.scrollHeight + "px";
            }, 0);

            param.classList.remove("param");
            param.classList.add("none");
        } else {

            plsbtn.textContent = "↑";
            param.style.height = "0";

            param.classList.remove("none");
            param.classList.add(".text2 p");
        }
    });
})

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

let logins = document.querySelectorAll(".login");
let logs = document.querySelectorAll(".log");

logins.forEach((login) => {
    login.addEventListener("click", (e) => {
        if (login.textContent === "Start Free Now") {
            window.location.href = "./login.html";
        } else {
            alert("Home Page");
        }
    });
});

let urll = "http://localhost:3000/acount";
let logoutBtn = document.querySelector('.logout');

async function fetchData() {
    let res = await axios.get(urll);
    return res.data;
}

let user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).name : null;

async function updateLoginText() {

    let data = await fetchData();

    logs.forEach((log23) => {
        log23.innerHTML = `${user}!`;
        if (logoutBtn.style.display === "none") {
            logoutBtn.style.display = "block";
        }
        else {
            logoutBtn.style.display = "block";
        }
    });
    logins.forEach((login) => {
        login.textContent = "Subscribe Now";
    });

}

updateLoginText();

async function logout() {
    let data = await fetchData();

    if (logoutBtn.style.display === "block") {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            logs.forEach((log23) => {
                log23.textContent = "Sign In";
            });
            logoutBtn.style.display = "none";
        });
    }

}

logout();

