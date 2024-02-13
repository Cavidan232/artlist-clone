document.addEventListener("DOMContentLoaded", async function() {
    const tableBody = document.querySelector('.tbody4');
    let allSongs = []; // Tüm şarkıları saklamak için bir dizi
  
    async function fetchAndRenderSongs() {

        const response = await axios.get('http://localhost:3000/musicData');
        allSongs = response.data;
        renderSongs(allSongs); // Tüm şarkıları tabloya ekle
     
    }
  
    // Şarkıları tabloya ekle
    function renderSongs(songs) {
      tableBody.innerHTML = ''; // Tabloyu temizle
      songs.map(song => {
        tableBody.innerHTML += `
          <tr>
            <td>${song.id}</td>
            <td>${song.title}</td>
            <td>${song.janre}</td>
            <td>${song.artist}</td>
            <td><i class="deleteBtn bi bi-trash" onclick="deleteCard(${song.id})" data-id="${song.id}"></i></td>
          </tr>
        `;
      });
    }
 // Şarkıları türüne göre filtrele ve tabloya ekle
    async function filterAndRenderSongs(genre) {
      const filteredSongs = allSongs.filter(song => song.janre === genre);
      renderSongs(filteredSongs); // Filtrelenmiş şarkıları tabloya ekle
    }
  
    // Arama işlevi
document.getElementById("search2").addEventListener("input", async (el) => {
  const searchText = el.target.value.trim().toLowerCase();
  const response = await axios.get('http://localhost:3000/musicData');
  const data = await response.data;
  const filteredData = data.filter((e) => {
      return e.title.toLowerCase().includes(searchText);
  });
  if (filteredData.length === 0) {
      // Arama sonucunda şarkı bulunamazsa
      document.querySelector('.tbody4').innerHTML = '<tr><td colspan="5" style="text-align: center;">Axtarışa uyğun nətica tapılmadı ☹</td></tr>';
  } else {
      // Arama sonucunda şarkılar bulunursa
      renderSongs(filteredData);
  }
});

    // "Pop" türündeki şarkıları göster
    document.querySelector('.pop').addEventListener('click', async function() {
      await filterAndRenderSongs('POP');
    });

  
    // "Hip-Hop" türündeki şarkıları göster
    document.querySelector('.hippop').addEventListener('click', async function() {
      await filterAndRenderSongs('Hip-Hop');
    });

    
    // "Piano" türündeki şarkıları göster
    document.querySelector('.Piano').addEventListener('click', async function() {
      await filterAndRenderSongs('Piano');
    });

    
    // Tüm şarkıları göster
    document.querySelector('.All').addEventListener('click', async function() {
      renderSongs(allSongs);
    });

    
  
    // Sayfa yüklendiğinde tüm şarkıları getir ve tabloya ekle
    await fetchAndRenderSongs();
  });
  let url5='http://localhost:3000/musicData'
  function deleteCard(id) {
    axios.delete(`http://localhost:3000/musicData/${id}`)
    window.location.reload();
  }
     
const html = document.documentElement;
const body = document.body;
const menuLinks = document.querySelectorAll(".admin-menu a");
const collapseBtn = document.querySelector(".admin-menu .collapse-btn");
const toggleMobileMenu = document.querySelector(".toggle-mob-menu");
const switchInput = document.querySelector(".switch input");
const switchLabel = document.querySelector(".switch label");
const switchLabelText = switchLabel.querySelector("span:last-child");
const collapsedClass = "collapsed";
const lightModeClass = "light-mode";

/*TOGGLE HEADER STATE*/
collapseBtn.addEventListener("click", function () {
    body.classList.toggle(collapsedClass);
    this.getAttribute("aria-expanded") == "true"
        ? this.setAttribute("aria-expanded", "false")
        : this.setAttribute("aria-expanded", "true");
    this.getAttribute("aria-label") == "collapse menu"
        ? this.setAttribute("aria-label", "expand menu")
        : this.setAttribute("aria-label", "collapse menu");
});

/*TOGGLE MOBILE MENU*/
toggleMobileMenu.addEventListener("click", function () {
    body.classList.toggle("mob-menu-opened");
    this.getAttribute("aria-expanded") == "true"
        ? this.setAttribute("aria-expanded", "false")
        : this.setAttribute("aria-expanded", "true");
    this.getAttribute("aria-label") == "open menu"
        ? this.setAttribute("aria-label", "close menu")
        : this.setAttribute("aria-label", "open menu");
});

/*SHOW TOOLTIP ON MENU LINK HOVER*/
for (const link of menuLinks) {
    link.addEventListener("mouseenter", function () {
        if (
            body.classList.contains(collapsedClass) &&
            window.matchMedia("(min-width: 768px)").matches
        ) {
            const tooltip = this.querySelector("span").textContent;
            this.setAttribute("title", tooltip);
        } else {
            this.removeAttribute("title");
        }
    });
}

/*TOGGLE LIGHT/DARK MODE*/
if (localStorage.getItem("dark-mode") === "false") {
    html.classList.add(lightModeClass);
    switchInput.checked = false;
    switchLabelText.textContent = "Light";
}

switchInput.addEventListener("input", function () {
    html.classList.toggle(lightModeClass);
    if (html.classList.contains(lightModeClass)) {
        switchLabelText.textContent = "Light";
        localStorage.setItem("dark-mode", "false");
    } else {
        switchLabelText.textContent = "Dark";
        localStorage.setItem("dark-mode", "true");
    }
});
