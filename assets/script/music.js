// Ses çalar öğesi oluştur
const audioPlayer = document.createElement('audio');

// Global değişkenler
let isPlaying = false;
let currentSongIndex = 0;
let songs = [];
let isShuffle = false;

// Sunucudan şarkıları al
async function fetchSongs() {
  try {
    const response = await axios.get('http://localhost:3000/musicData');
    songs = response.data;
    renderPlaylist(songs);
    loadSong(currentSongIndex);
  } catch (error) {
    console.error('xeta:', error);
  }
}

// Oynatma listesini oluştur
function renderPlaylist(songs) {
  const playlist = document.querySelector('.song');
  playlist.innerHTML = '';
  songs.forEach((song, index) => {
    playlist.innerHTML += `
      <div class="item">
        <div class="img"><img src="${song.posterUrl}" alt=""></div>
        <h1>${song.title}</h1>
        <p class="artist">${song.artist}</p>
        <i class="bi playListPlay bi-play-circle-fill" data-id="${song.id}" data-music-path="${song.musicPath}"></i>
      </div>
    `;
  });
}

// Şarkıyı yükle
function loadSong(index) {
  const song = songs[index];
  audioPlayer.src = song.musicPath;
  document.querySelector('.song-title').textContent = song.title;
  document.querySelector('.artist').textContent = song.artist;
  // İlerleme çubuğunu sıfırla ve müziği başlat
  document.querySelector('.progress-bar').style.width = '0%';
  audioPlayer.play();
  isPlaying = true;
  updatePlayPauseButton();
}

// Oynat veya duraklat
function playPause() {
  if (isPlaying) {
    audioPlayer.pause();
  } else {
    audioPlayer.play();
  }
  isPlaying = !isPlaying;
  updatePlayPauseButton();
}

// Oynat/Duraklat düğmesinin simgesini güncelle
function updatePlayPauseButton() {
  const playPauseButton = document.getElementById('playPause');
  playPauseButton.innerHTML = isPlaying ? '<i class="bi bi-pause-fill"></i>' : '<i class="bi bi-play-fill"></i>';
}

// Sonraki şarkıyı oynat
function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
}

// Önceki şarkıyı oynat
function playPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
}

// İlerleme çubuğunu ve süre görüntüsünü güncelle
function updateProgress() {
  const progress = document.querySelector('.progress-bar');
  const currentTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;

  // Eğer duration değeri sınırsız değilse ve doğru bir değer döndürüyorsa
  if (!isNaN(duration) && isFinite(duration)) {
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);
    document.querySelector('.current-time').textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    document.querySelector('.duration').textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
  }
}

// Müzik süresini el ile kontrol etmek için
function manualSeek(e) {
  const seekBar = document.getElementById('progress-bar');
  const duration = audioPlayer.duration;

  // Eğer duration değeri sınırsız değilse ve doğru bir değer döndürüyorsa
  if (!isNaN(duration) && isFinite(duration)) {
    const seekPosition = (e.offsetX / seekBar.offsetWidth);
    audioPlayer.currentTime = seekPosition * duration;

    // İlerleme çubuğunu ve süre görüntüsünü güncelle
    const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
    const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);
    document.querySelector('.current-time').textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    document.querySelector('.duration').textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
  }
}

// Ses düzeyini güncelle
function updateVolume() {
  const volume = document.getElementById('volume').value;
  audioPlayer.volume = volume / 100;
}

// Sesi aç/kapat
function toggleMute() {
  audioPlayer.muted = !audioPlayer.muted;
  const muteButton = document.getElementById('mute');
  muteButton.innerHTML = audioPlayer.muted ? '<i class="bi bi-volume-mute-fill"></i>' : '<i class="bi bi-volume-up-fill"></i>';
}

// Shuffle düğmesine basıldığında sıra
function toggleShuffle() {
  isShuffle = !isShuffle;
  if (isShuffle) {
    shuffleSongs();
  }
}

// Shuffle Songs
function shuffleSongs() {
  for (let i = songs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [songs[i], songs[j]] = [songs[j], songs[i]];
  }
  renderPlaylist(songs);
}

// Müzik çalma işlevi
function playMusic(musicPath, title, artist, posterUrl) {
  audioPlayer.src = musicPath;
  audioPlayer.play();
  document.querySelector('.song-title').textContent = title;
  document.querySelector('.artist').textContent = artist;
}

// playListPlay öğeleri için olay dinleyicisi
document.addEventListener("click", function(event) {
  if (event.target.classList.contains("playListPlay")) {
    const musicPath = event.target.dataset.musicPath;
    const title = event.target.parentElement.querySelector('h1').textContent;
    const artist = event.target.parentElement.querySelector('.artist').textContent;
    const posterUrl = event.target.parentElement.querySelector('.img img').src;

    const allPlayListPlays = document.querySelectorAll('.playListPlay');
    allPlayListPlays.forEach(item => {
      if (item !== event.target) {
        item.classList.remove("playing", "bi-pause");
        item.classList.add("bi-play-circle-fill");
      }
    });

    if (musicPath) {
      if (event.target.classList.contains("playing")) {
        audioPlayer.pause();
        event.target.classList.remove("playing", "bi-pause");
        event.target.classList.add("bi-play-circle-fill");
      } else {
        playMusic(musicPath, title, artist, posterUrl);
        event.target.classList.add('playing', 'bi-pause');
      }
    }
  }
});

// Olay dinleyiciler
audioPlayer.addEventListener('timeupdate', updateProgress); // Zaman güncellendiğinde ilerlemeyi güncelle
audioPlayer.addEventListener('ended', playNextSong); // Müzik bittiğinde bir sonraki şarkıyı çal
audioPlayer.addEventListener('play', updateProgress); // Müzik başladığında ilerlemeyi güncelle
audioPlayer.addEventListener('pause', updateProgress); // Müzik durduğunda ilerlemeyi güncelle
document.getElementById('playPause').addEventListener('click', playPause); // Oynat/Duraklat düğmesine tıklandığında çal veya duraklat
document.getElementById('next').addEventListener('click', playNextSong); // Sonraki şarkı düğmesine tıklandığında bir sonraki şarkıyı çal
document.getElementById('prev').addEventListener('click', playPreviousSong); // Önceki şarkı düğmesine tıklandığında bir önceki şarkıyı çal
document.getElementById('volume').addEventListener('input', updateVolume); // Ses seviyesi değiştiğinde sesi güncelle
document.getElementById('mute').addEventListener('click', toggleMute); // Sesi aç/kapat düğmesine tıklandığında sesi aç veya kapat
document.querySelector('.progress').addEventListener('click', manualSeek); // İlerleme çubuğuna tıklandığında manuel olarak zamanı değiştir
document.getElementById('shuffle').addEventListener('click', toggleShuffle); // Shuffle düğmesine tıklandığında karışık çalma modunu aç veya kapat

// Türüne göre müziği ayarla
async function setMusicByGenre(genre, targetElement) {
  let res = await axios.get('http://localhost:3000/musicData');
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

// Piyano türüne göre filtrele
async function filterByPiano() {
  let res = await axios.get('http://localhost:3000/musicData');
  let data = await res.data;
  let filteredData = data.filter((element) => {
    return element.janre === "Piano";
  });

  renderPlaylist(filteredData);
}

// Pop türüne göre filtrele
async function filterByPop() {
  let res = await axios.get('http://localhost:3000/musicData');
  let data = await res.data;
  let filteredData = data.filter((element) => {
    return element.janre === "POP";
  });

  renderPlaylist(filteredData);
}

// Hip-Hop türüne göre filtrele
async function filterByHipHop() {
  let res = await axios.get('http://localhost:3000/musicData');
  let data = await res.data;
  let filteredData = data.filter((element) => {
    return element.janre === "Hip-Hop";
  });

  renderPlaylist(filteredData);
}

// Tüm şarkıları filtrele
async function filterAllSongs() {
  let res = await axios.get('http://localhost:3000/musicData');
  let data = await res.data;
  renderPlaylist(data);
}

// Tür filtreleri için olay dinleyicileri
document.getElementById("pop").addEventListener("click", filterByPop);
document.getElementById("hip").addEventListener("click", filterByHipHop);
document.getElementById("all").addEventListener("click", filterAllSongs);
document.getElementById("piano").addEventListener("click", filterByPiano);

// Arama işlevi
document.getElementById("search").addEventListener("input", async (el) => {
  let res = await axios.get('http://localhost:3000/musicData');
  let data = await res.data;
  let filteredData = data.filter((e) => {
    return e.title.toLowerCase().includes(el.target.value.toLowerCase());
  });
  renderPlaylist(filteredData);
});

// Sayfayı başlat
async function init() {
  await setMusicByGenre("POP", document.querySelector(".pop .image"));
  await setMusicByGenre("Hip-Hop", document.querySelector(".Hiphop .image"));
  await setMusicByGenre("Piano", document.querySelector(".Piano .image"));
  await fetchSongs();
}

init();
