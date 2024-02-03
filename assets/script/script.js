let plusbtn=document.querySelectorAll(".text2 span");
let ac= document.querySelectorAll(".text2 p");
plusbtn.forEach((plsbtn,index)=>{
    let param = ac[index];
    plsbtn.addEventListener("click", () => {
        ac.forEach((p, i) => {
            if (i !== index) {
                p.style.display = "none";
                plusbtn[i].textContent = "+";
                p.classList.remove("none");
                p.classList.add("param");
            }
        });
        
        if (plsbtn.textContent === "+") {
        
            param.style.display = "block";
            param.style.height = "0";
            plsbtn.textContent = "-";
            setTimeout(() => {
                param.style.height =param.scrollHeight +"px";
            }, 0);

            param.classList.remove("param");
            param.classList.add("none");
        } else {

            plsbtn.textContent = "+";
            param.style.height = "0";

            param.classList.remove("none");
            param.classList.add(".text2 p");
        }
    });
})

let list2Icon = document.querySelector('.list2');
let nav2 = document.querySelector('.nav2');

list2Icon.addEventListener("click",()=>{
    if (nav2.style.transform === "translateX(100%)") {
        nav2.style.transform = "translateX(0)"
    }
    else{
        nav2.style.transform = "translateX(100%)"
    }
})

let xicon= document.querySelector(".bi-x");
xicon.addEventListener("click",()=>{

        nav2.style.transform = "translateX(100%)"
   
  
})

window.addEventListener("resize",()=>{
    if (window.innerWidth >991) {
        nav2.style.transform = "translateX(100%)"
        
    }
})



let list3Icon = document.querySelector('.list1');
let nav3 = document.querySelector('.nav3');

list3Icon.addEventListener("click",()=>{
    if (nav3.style.transform === "translateX(-100%)") {
        nav3.style.transform = "translateX(0)"
    }
    else{
        nav3.style.transform = "translateX(-100%)"
    }
})

let xicon1= document.querySelector(".x2");
xicon1.addEventListener("click",()=>{

        nav3.style.transform = "translateX(-100%)"
   
  
})

window.addEventListener("resize",()=>{
    if (window.innerWidth >991) {
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

