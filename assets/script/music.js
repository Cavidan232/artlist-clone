let urlM = "http://localhost:3000/musicData";
const playlist = document.querySelector(".song");
let filter = [];
let copy = [];
let search = document.querySelector("#search");
let all = document.querySelector("#all");
let piano = document.querySelector("#piano");
let pop = document.querySelector("#pop");
let hip = document.querySelector("#hip");
async function musicAll() {
  let res = await axios.get(urlM);
  let data = await res.data;
  copy = data;
  playlist.innerHTML = "";

  filter = filter.length || search.value ? filter : data;
  filter.forEach((element) => {
    playlist.innerHTML += `
      <div class="item">
        <div class="img"><img src="${element.posterUrl}" alt=""></div>
        <h1>${element.title}</h1>
        <i class="bi playListPlay bi-play-circle-fill"></i>
      </div>
    `;
  });
}

async function setMusicByGenre(genre, targetElement) {
  let res = await axios.get(urlM);
  let data = await res.data;
  targetElement.innerHTML = "";
  data.forEach((element) => {
    if (element.janre === genre) {
      targetElement.innerHTML += `
        <div class="imag">
          <img src="${element.posterUrl}" alt="">
        </div>
      `;
    }
  });
}

async function filterByPiano() {
  let res = await axios.get(urlM);
  let data = await res.data;
  let filteredData = data.filter((element) => {
    return element.janre === "Piano";
  });

  playlist.innerHTML = "";
  filteredData.forEach((element) => {
    playlist.innerHTML += `
      <div class="item">
        <div class="img"><img src="${element.posterUrl}" alt=""></div>
        <h1>${element.title}</h1>
        <i class="bi playListPlay bi-play-circle-fill"></i>
      </div>
    `;
  });
}


async function filterBypop() {
  let res = await axios.get(urlM);
  let data = await res.data;
  let filteredData = data.filter((element) => {
    return element.janre === "POP";
  });

  playlist.innerHTML = "";
  filteredData.forEach((element) => {
    playlist.innerHTML += `
      <div class="item">
        <div class="img"><img src="${element.posterUrl}" alt=""></div>
        <h1>${element.title}</h1>
        <i class="bi playListPlay bi-play-circle-fill"></i>
      </div>
    `;
  });
}

async function filterByhiphop() {
  let res = await axios.get(urlM);
  let data = await res.data;
  let filteredData = data.filter((element) => {
    return element.janre === "Hip-Hop";
  });

  playlist.innerHTML = "";
  filteredData.forEach((element) => {
    playlist.innerHTML += `
      <div class="item">
        <div class="img"><img src="${element.posterUrl}" alt=""></div>
        <h1>${element.title}</h1>
        <i class="bi playListPlay bi-play-circle-fill"></i>
      </div>
    `;
  });
}





async function musicAll4() {
  await musicAll();
}
pop.addEventListener("click", async () => {
  await filterBypop();
});

hip.addEventListener("click", async () => {
  await filterByhiphop();
});

all.addEventListener("click", async () => {
  await musicAll4();
});

piano.addEventListener("click", async () => {
  await filterByPiano();
});

search.addEventListener("input", (el) => {
  filter = copy;
  filter = filter.filter((e) => {
    return e.title.toLowerCase().includes(el.target.value.toLowerCase());
  });
  musicAll();
});

async function init() {
  await setMusicByGenre("POP", document.querySelector(".pop .image"));
  await setMusicByGenre("Hip-Hop", document.querySelector(".Hiphop .image"));
  await setMusicByGenre("Piano", document.querySelector(".Piano .image"));
  await musicAll();
}

init();
