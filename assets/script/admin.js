document.addEventListener("DOMContentLoaded", async function() {
    const tableBody = document.querySelector('.tbod');
    let allSongs = []; // Tüm şarkıları saklamak için bir dizi
  
    async function fetchAndRenderSongs() {
      try {
        const response = await axios.get('http://localhost:3000/musicData');
        allSongs = response.data;
        renderSongs(allSongs); // Tüm şarkıları tabloya ekle
      } catch (error) {
        console.error('xeta:', error);
      }
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
            <td><i class="editBtn bi bi-arrow-clockwise" data-id="${song.id}"></i></td>
            <td><i class="deleteBtn bi bi-trash" data-id="${song.id}"></i></td>
          </tr>
        `;
      });
    }

    // Şarkıları türüne göre filtrele ve tabloya ekle
    async function filterAndRenderSongs(genre) {
      const filteredSongs = allSongs.filter(song => song.janre === genre);
      renderSongs(filteredSongs); // Filtrelenmiş şarkıları tabloya ekle
    }
  
    // "Pop" türündeki şarkıları göster
    document.querySelector('.pop').addEventListener('click', async function() {
      await filterAndRenderSongs('POP');
    });
    document.querySelector('.pop1').addEventListener('click', async function() {
        await filterAndRenderSongs('POP');
      });
  
    // "Hip-Hop" türündeki şarkıları göster
    document.querySelector('.hippop').addEventListener('click', async function() {
      await filterAndRenderSongs('Hip-Hop');
    });
    document.querySelector('.hippop1').addEventListener('click', async function() {
        await filterAndRenderSongs('Hip-Hop');
      });
    
    // "Piano" türündeki şarkıları göster
    document.querySelector('.Piano').addEventListener('click', async function() {
      await filterAndRenderSongs('Piano');
    });
    document.querySelector('.Piano1').addEventListener('click', async function() {
        await filterAndRenderSongs('Piano');
      });
    
    // Tüm şarkıları göster
    document.querySelector('.All').addEventListener('click', async function() {
      renderSongs(allSongs);
    });
    document.querySelector('.All1').addEventListener('click', async function() {
        renderSongs(allSongs);
      });
    
  
    // Sayfa yüklendiğinde tüm şarkıları getir ve tabloya ekle
    await fetchAndRenderSongs();
  });
