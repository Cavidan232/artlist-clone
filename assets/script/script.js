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
