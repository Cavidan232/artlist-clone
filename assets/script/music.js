// Audio player element
const audioPlayer = document.createElement('audio');

// Global variables
let isPlaying = false;
let currentSongIndex = 0;
let songs = [];

// Fetch songs from the server
async function fetchSongs() {
  try {
    const response = await axios.get('http://localhost:3000/musicData');
    songs = response.data;
    renderPlaylist(songs);
    loadSong(currentSongIndex);
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
}

// Render playlist
function renderPlaylist(songs) {
  const playlist = document.querySelector('.song');
  playlist.innerHTML = '';
  songs.forEach((song, index) => {
    playlist.innerHTML += `
      <div class="item" data-index="${index}">
        <div class="img"><img src="${song.posterUrl}" alt=""></div>
        <h1>${song.title}</h1>
        <p class="artist">${song.artist}</p>
        <i class="bi playListPlay bi-play-circle-fill" data-id="${song.id}" data-music-path="${song.musicPath}"></i>
      </div>
    `;
  });
}

// Load song
function loadSong(index) {
  const song = songs[index];
  audioPlayer.src = song.musicPath;
  document.querySelector('.song-title').textContent = song.title;
  document.querySelector('.artist').textContent = song.artist;
}

// Play or pause the audio
function playPause() {
  if (isPlaying) {
    audioPlayer.pause();
  } else {
    audioPlayer.play();
  }
  isPlaying = !isPlaying;
  updatePlayPauseButton();
}

// Update play/pause button icon
function updatePlayPauseButton() {
  const playPauseButton = document.getElementById('playPause');
  playPauseButton.innerHTML = isPlaying ? '<i class="bi bi-pause-fill"></i>' : '<i class="bi bi-play-fill"></i>';
}

// Play next song
function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) {
    audioPlayer.play();
  }
}

// Play previous song
function playPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) {
    audioPlayer.play();
  }
}

// Update progress bar and time display
function updateProgress() {
  const progress = document.querySelector('.progress-bar');
  const currentTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);
  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = Math.floor(duration % 60);
  document.querySelector('.current-time').textContent = `${currentMinutes}:${currentSeconds}`;
  document.querySelector('.duration').textContent = `${durationMinutes}:${durationSeconds}`;
}

// Update volume
function updateVolume() {
  const volume = document.getElementById('volume').value;
  audioPlayer.volume = volume / 100;
}

// Toggle mute
function toggleMute() {
  audioPlayer.muted = !audioPlayer.muted;
  const muteButton = document.getElementById('mute');
  muteButton.innerHTML = audioPlayer.muted ? '<i class="bi bi-volume-mute-fill"></i>' : '<i class="bi bi-volume-up-fill"></i>';
}

// Event listeners
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', playNextSong);
document.getElementById('playPause').addEventListener('click', playPause);
document.getElementById('next').addEventListener('click', playNextSong);
document.getElementById('prev').addEventListener('click', playPreviousSong);
document.getElementById('volume').addEventListener('input', updateVolume);
document.getElementById('mute').addEventListener('click', toggleMute);

// Fetch songs on page load
fetchSongs();

// Playlist filtering and initialization
const playlist = document.querySelector(".song");
let filter = [];
let copy = [];
let search = document.querySelector("#search");
let all = document.querySelector("#all");
let piano = document.querySelector("#piano");
let pop = document.querySelector("#pop");
let hip = document.querySelector("#hip");
const urlM = "http://localhost:3000/musicData";

// Fetch all songs
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
        <p class="artist">${element.artist}</p>
        <i class="bi playListPlay bi-play-circle-fill" data-id="${element.id}" data-music-path="${element.musicPath}"></i>
      </div>
    `;
  });
}

// Set music by genre
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

// Filter by Piano genre
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
        <p class="artist">${element.artist}</p>
        <i class="bi playListPlay bi-play-circle-fill" data-id="${element.id}" data-music-path="${element.musicPath}"></i>
      </div>
    `;
  });
}

// Filter by Pop genre
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
        <p class="artist">${element.artist}</p>
        <i class="bi playListPlay bi-play-circle-fill" data-id="${element.id}" data-music-path="${element.musicPath}"></i>
      </div>
    `;
  });
}

// Filter by Hip-Hop genre
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
        <p class="artist">${element.artist}</p>
        <i class="bi playListPlay bi-play-circle-fill" data-id="${element.id}" data-music-path="${element.musicPath}"></i>
      </div>
    `;
  });
}

// Filter all songs
async function musicAll4() {
  await musicAll();
}

// Event listeners for genre filters
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

// Search functionality
search.addEventListener("input", (el) => {
  filter = copy;
  filter = filter.filter((e) => {
    return e.title.toLowerCase().includes(el.target.value.toLowerCase());
  });
  musicAll();
});

// Initialize the page
async function init() {
  await setMusicByGenre("POP", document.querySelector(".pop .image"));
  await setMusicByGenre("Hip-Hop", document.querySelector(".Hiphop .image"));
  await setMusicByGenre("Piano", document.querySelector(".Piano .image"));
  await musicAll();
}

init();

// Play music function
function playMusic(musicPath) {
  audioPlayer.src = musicPath;
  audioPlayer.play();
}

// Event listener for playListPlay clicks
document.addEventListener("click", function(event) {
  if (event.target.classList.contains("playListPlay")) {
    const musicPath = event.target.dataset.musicPath;
    if (musicPath) {
      playMusic(musicPath);
      
      // Remove 'playing' class from all playListPlay items
      const playListPlays = document.querySelectorAll('.playListPlay');
      playListPlays.forEach(item => item.classList.remove('playing'));
      
      // Add 'playing' class to the clicked item
      event.target.classList.add('playing');
      
      // Update music details in the player
      const title = event.target.parentElement.querySelector('h1').textContent;
      const artist = event.target.parentElement.querySelector('.artist').textContent;
      document.querySelector('.song-title').textContent = title;
      document.querySelector('.artist').textContent = artist;
    }
  }
});
