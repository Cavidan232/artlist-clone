/**
 * Tüm geçilen öğeler üzerine eventListener ekle
 */
const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
      elements[i].addEventListener(eventType, callback);
    }
  }
  
  
let player = document.querySelector(".player");





  /**
   * ÇALMA LİSTESİ
   * 
   * 'data' içinden tüm müzikleri çalma listesine ekle
   */
  let urlM = "http://localhost:3000/fav";
  const playlist = document.querySelector("[data-music-list]");
  let filter=[];
  let copy=[];
  let search= document.querySelector("#search")
  async function musicAll() {
      let res = await axios.get(urlM);
      let data = await res.data;
      copy = data;
      playlist.innerHTML=" ";
      filter= filter.length || search.value ? filter : data ; 
  

          filter.forEach(element => {
  

              playlist.innerHTML +=
                  `<li class="musical">
                      <button class="music-item ${element.id === 0 ? "playing" : ""}" data-playlist-toggler data-playlist-item="${element.id}">
                          <img src="${element.posterUrl}" width="800" height="800" alt="${element.title} Albüm Poster" class="img-cover">
                          <p style="color:#ffda2a; font-size:12px;">${element.title}</p>
                          <div class="item-icon">
                              <span class="material-symbols-rounded">equalizer</span>
                          </div>
                      </button>
                      <i onclick="deletefav(${element.id})" style="font-size: 20px; margin-left:20px;" class="bi bi-trash"></i>
                  </li>`;
          });
    
  }
  



  
  

  function deletefav(id){
    fetch("http://localhost:3000/fav/"+id)
    .then(res=>res.json())
    .then(data=>{
        axios.delete("http://localhost:3000/fav/" + id)
    })
  }
  
  
  
  musicAll();
  
  
  
  let material=document.querySelector(".material-symbols-rounded");
  
  /**
   * ÇALMA LİSTESİ MODAL YAN PANELİ AÇMA/KAPAMA
   * 
   * Üst uygulama çubuğundaki çalma listesi düğmesine tıklandığında 'playlist' modal yan panelini göster
   * ve overlay veya herhangi bir çalma listesi öğesine tıklandığında gizle
   */
  
  const playlistSideModal = document.querySelector("[data-playlist]");
  const playlistTogglers = document.querySelectorAll("[data-playlist-toggler]");
  const overlay = document.querySelector("[data-overlay]");
  
  const togglePlaylist = function () {
    playlistSideModal.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("modalActive");
  }
  
  
  addEventOnElements(playlistTogglers, "click", togglePlaylist);
  
  
  
  /**
   * ÇALAR
   * 
   * Mevcut müziğe dayalı olarak çalar üzerindeki tüm görsel bilgileri değiştir
   */
  
  const playerBanner = document.querySelector("[data-player-banner]");
  const playerTitle = document.querySelector("[data-title]");
  const playerAlbum = document.querySelector("[data-album]");
  const playerYear = document.querySelector("[data-year]");
  const playerArtist = document.querySelector("[data-artist]");
  
  async function musicAll2() {
    try {
      let res = await axios.get(urlM);
      let data = await res.data;
  
  
  
  
      const playlistItems = document.querySelectorAll("[data-playlist-item]");
      let currentMusic = 0;
      let lastPlayedMusic = 0;
  
      const audioSource = new Audio(copy[currentMusic].musicPath);
  
      const updateRangeFill = function () {
        let element = this || ranges[0];
        if (element && element.nextElementSibling) {
          const rangeValue = (element.value / element.max) * 100;
          element.nextElementSibling.style.width = `${rangeValue}%`;
        }
      };
  
  
  
  
  
      
      const changePlaylistItem = function (e) {
        if (playlistItems[lastPlayedMusic - 1] && playlistItems[currentMusic]) {
          playlistItems[lastPlayedMusic - 1].classList.remove("playing");
          playlistItems[currentMusic].classList.add("playing");
        }
      }
   
  
  
  
  
  
      const changePlayerInfo = function () {
        if (copy[currentMusic]) {
          console.log(currentMusic);
          playerBanner.src = copy[currentMusic].posterUrl;
          playerBanner.setAttribute("alt", `${copy[currentMusic].title} Albüm Poster`);
          document.body.style.backgroundImage = `url(${copy[currentMusic].backgroundImage})`;
          playerTitle.textContent = copy[currentMusic].title;
          playerAlbum.textContent = copy[currentMusic].album;
          playerYear.textContent = copy[currentMusic].year;
          playerArtist.textContent = copy[currentMusic].artist;
          audioSource.src = copy[currentMusic].musicPath;
          playMusic();
        } else {
          console.error("Belirtilen indekse sahip müzik bulunamadı.");
        }
      }
      addEventOnElements(playlistItems, "click", function () {
        lastPlayedMusic = currentMusic;
        currentMusic = Number(this.dataset.playlistItem);
        changePlaylistItem();
        changePlayerInfo();
    });
  
      addEventOnElements(playlistItems, "click", changePlayerInfo);
  
      /** çalar süresini güncelle */
      const playerDuration = document.querySelector("[data-duration]");
      const playerSeekRange = document.querySelector("[data-seek]");
  
      /** saniyeleri geçir ve zaman kodu biçimini al */
      const getTimecode = function (duration) {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.ceil(duration - (minutes * 60));
        const timecode = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        return timecode;
      }
  
      const updateDuration = function () {
        playerSeekRange.max = Math.ceil(audioSource.duration);
        playerDuration.textContent = getTimecode(Number(playerSeekRange.max));
      }
  
      audioSource.addEventListener("loadeddata", updateDuration);
  
      /**
       * MÜZİĞİ ÇAL
       * 
       * Çal düğmesine tıklandığında müziği oynat ve duraklat
       */
      const playBtn = document.querySelector("[data-play-btn]");
  
      let playInterval;
  
      const playMusic = function () {
        if (audioSource.paused) {
          audioSource.pause(); 
          audioSource.currentTime = 0;
          audioSource.play();
          playBtn.classList.add("active");
          playInterval = setInterval(updateRunningTime, 500);
        } else {
          audioSource.pause();
          playBtn.classList.remove("active");
          clearInterval(playInterval);
        }
      }
      playBtn.addEventListener("click", playMusic);
  
      /** müzik çalarken süreyi güncelle */
  
      const playerRunningTime = document.querySelector("[data-running-time]");
  
      const updateRunningTime = function () {
        if (playerSeekRange) {
          playerSeekRange.value = audioSource.currentTime;
          playerRunningTime.textContent = getTimecode(audioSource.currentTime);
          updateRangeFill.call(playerSeekRange);
          isMusicEnd();
  
        }
      }
  
      /**
       * ARALIK DOLULUK GENİRLİĞİ
       * 
       * Aralık değeri değişirken 'rangeFill' genişliğini değiştir
       */
  
      const ranges = document.querySelectorAll("[data-range]");
  
      addEventOnElements(ranges, "input", updateRangeFill);
  
      /**
       * MÜZİĞİ ARAMA
       * 
       * Çalar aralığını değiştirirken müziği ara
       */
  
      const seek = function () {
        audioSource.currentTime = playerSeekRange.value;
        playerRunningTime.textContent = getTimecode(playerSeekRange.value);
      }
  
      playerSeekRange.addEventListener("input", seek);
  
      /**
       * MÜZİĞİN SONU
       */
  
      const isMusicEnd = function () {
        if (audioSource.ended) {
          playBtn.classList.remove("active");
          audioSource.currentTime = 0;
          playerSeekRange.value = audioSource.currentTime;
          playerRunningTime.textContent = getTimecode(audioSource.currentTime);
          updateRangeFill();
        }
      }
  
      /**
       * SONRAKİ MÜZİĞE ATLA
       */
  
      const playerSkipNextBtn = document.querySelector("[data-skip-next]");
  
      const skipNext = function () {
        lastPlayedMusic = currentMusic;
  
        if (isShuffled) {
          shuffleMusic();
        } else {
          currentMusic >= data.length - 1 ? currentMusic = 0 : currentMusic++;
        }
  
        changePlayerInfo();
        changePlaylistItem();
      }
  
      playerSkipNextBtn.addEventListener("click", skipNext);
  
      /**
       * ÖNCEKİ MÜZİĞE ATLA
       */
  
      const playerSkipPrevBtn = document.querySelector("[data-skip-prev]");
  
      const skipPrev = function () {
        lastPlayedMusic = currentMusic;
  
        if (isShuffled) {
          shuffleMusic();
        } else {
          currentMusic <= 0 ? currentMusic =copy.length - 1 : currentMusic--;
        }
  
        changePlayerInfo();
        changePlaylistItem();
      }
  
      playerSkipPrevBtn.addEventListener("click", skipPrev);
  
      /**
       * MÜZİĞİ KARIŞTIR
       */
  
      /** karıştırmak için rastgele bir sayı al */
      const getRandomMusic = () => Math.floor(Math.random() * copy.length);
  
      const shuffleMusic = () => currentMusic = getRandomMusic();
  
      const playerShuffleBtn = document.querySelector("[data-shuffle]");
      let isShuffled = false;
  
      const shuffle = function () {
        playerShuffleBtn.classList.toggle("active");
  
        isShuffled = isShuffled ? false : true;
      }
  
      playerShuffleBtn.addEventListener("click", shuffle);
  
      /**
       * MÜZİĞİ TEKRARLA
       */
  
     // Tekrar düğmesini seçin
  const repeatBtn = document.querySelector("[data-repeat]");
  
  // Müziği tekrar etme durumunu izlemek için bir değişken ekleyin
  let isRepeated = false;
  
  // Tekrar düğmesine tıklandığında çalışacak fonksiyon
  const toggleRepeat = function () {
    isRepeated = !isRepeated; // Durumu tersine çevir
    audioSource.loop = isRepeated; // Ses dosyasını tekrar etme durumuna göre ayarla
  
    // Durumu göstermek için CSS sınıfını güncelle
    repeatBtn.classList.toggle("active", isRepeated);
  }
  
  // Tekrar düğmesine tıklama olayını dinleyin
  repeatBtn.addEventListener("click", toggleRepeat);
  
      /**
       * MÜZİK SESİ
       * 
       * Ses aralığını değiştirirken müziği aç veya kapa
       */
  
      const playerVolumeRange = document.querySelector("[data-volume]");
      const playerVolumeBtn = document.querySelector("[data-volume-btn]");
  
      const changeVolume = function () {
        audioSource.volume = playerVolumeRange.value;
        audioSource.muted = false;
  
        if (audioSource.volume <= 0.1) {
          playerVolumeBtn.children[0].textContent = "volume_mute";
        } else if (audioSource.volume <= 0.5) {
          playerVolumeBtn.children[0].textContent = "volume_down";
        } else {
          playerVolumeBtn.children[0].textContent = "volume_up";
        }
      }
  
      playerVolumeRange.addEventListener("input", changeVolume);
  
      /**
       * SESİ KIS
       */
  
      const muteVolume = function () {
        if (!audioSource.muted) {
          audioSource.muted = true;
          playerVolumeBtn.children[0].textContent = "volume_off";
        } else {
          changeVolume();
        }
      }
  
      playerVolumeBtn.addEventListener("click", muteVolume);
  
    } catch (error) {
      console.error(error);
    }
    
  };
  
  musicAll2()
  
  // musicAll2 fonksiyonu sonu veya hemen altına bu kod parçacığını ekleyin
  
  // Playlist öğelerine tıklandığında müzik değişikliğini izle
  
  search.addEventListener("input",(el)=>{
    filter=copy;
        filter=filter.filter((e)=>{
            return e.title.toLocaleLowerCase().includes(el.target.value.toLocaleLowerCase())
        })
      musicAll();
      musicAll2();
    })
  
 