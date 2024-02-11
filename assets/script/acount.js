let name1 = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).name : null;
let mail1 = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).mail : null;
let id2 = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).id : null;
console.log(name1);
console.log(mail1);

// Selecting elements
const userProfileForm = document.getElementById("userProfileForm");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const editProfileBtn = document.getElementById("editProfileBtn");
const saveProfileBtn = document.getElementById("saveProfileBtn");

// Fetch user data
async function fetchUserData() {
    const response = await axios.get("http://localhost:3000/acount");
    const userData = response.data;
    return userData;
}

// Update user profile form with fetched data
async function updateUserProfileForm() {
    const userData = await fetchUserData();
    if (userData) {
        fullNameInput.value = name1;
        emailInput.value = mail1;
    }
}

// Düzenleme düğmesine tıklama olayı
editProfileBtn.addEventListener("click", () => {
    fullNameInput.disabled = !fullNameInput.disabled;
    emailInput.disabled = !emailInput.disabled;
});

// Kaydetme düğmesine tıklama olayı
saveProfileBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const fullName = fullNameInput.value;
    const email = emailInput.value;


 axios.put(`http://localhost:3000/acount/${id2}`, {
            name: fullName,
            mail: email
        });
            // Local Storage'daki kullanıcı verilerini güncelle
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            currentUser.name = fullName;
            currentUser.mail = email;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        console.log("Profile updated successfully!");
  
});

updateUserProfileForm();

// Form elemanlarını seçme
const posterFileInput = document.querySelector('#posterFile');
const previewImage = document.querySelector('#previewImage');
let sour = document.querySelector(".sour");
let audioPlayer = document.querySelector("#audioPlayer"); 
let musicFileInput= document.querySelector("#audioFile")
// Resim dosyası seçildiğinde önizleme yapma
posterFileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            previewImage.src = event.target.result;
        
        }
        reader.readAsDataURL(file);
    } 
});


musicFileInput.addEventListener("change", (e) => {
    let src1 = e.target.files[0];
    if (src1) {
        let reader = new FileReader();
        reader.readAsDataURL(src1);
        reader.onload = (e) => {
            sour.src = e.target.result;
            audioPlayer.load(); // Yüklenen kaynağı audioPlayer'a yükle
        }
    }
});

let nameInp = document.querySelector("#title");
let artistInp = document.querySelector("#artist");
let genreSelect = document.querySelector("#genre");

let formAdd = document.querySelector("#newSongForm");


formAdd.addEventListener("submit",(e)=>{
e.preventDefault();
axios.post(`http://localhost:3000/musicData`,{
    backgroundImage:   previewImage.src ,
    posterUrl:previewImage.src ,
    title: nameInp.value,
    artist: artistInp.value,
    janre: genreSelect.value,
    musicPath: sour.src
})

})
