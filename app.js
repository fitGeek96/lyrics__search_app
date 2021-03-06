//jshint esversion:9
const apiURL = 'https://api.lyrics.ovh';
const formEl = document.getElementById('form');
const searchEl = document.getElementById('search');
const resultEl = document.getElementById('result');
const moreEl = document.getElementById('more');


// Show songs & artists in the DOM 
function showData(data) {

    console.log(data.next);

    resultEl.innerHTML = `
        <ul class="songs">
            ${data.data.map(song =>   `<li>
             <span><strong>${song.artist.name}</strong> - ${song.title}</span>
             <button class="btn" data-artist="${song.artist.name}" data-songTitle="${song.title}">
                Get Lyrics
             </button>
                                   </li>
        `).join("")}
        </ul>
    `;

    if (data.prev || data.next) {
        moreEl.innerHTML = `
                            ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : '' }
                            ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : '' }

                            `;
    } else {
        moreEl.innerHTML = '';
    }

}

// Search by song or Artits 
async function searchSongs(term) {
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();

    showData(data);
}


// get prev and next songs 
async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

}

// GET LYRICS FOR SONGS 
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    resultEl.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
                          <span>${lyrics}</span>    
        `;
}

// GET LYRICS BUTTON CLICK
resultEl.addEventListener('click', e => {
    const clickedEl = e.target;
    if (clickedEl.tagName === 'BUTTON') {
        const artist = clickedEl.getAttribute('data-artist');
        const songTitle = clickedEl.getAttribute('data-songTitle');

        getLyrics(artist, songTitle);
    }
});

// EVENT LISTENERS

formEl.addEventListener('submit', e => {
    e.preventDefault();
    let searchTermEl = searchEl.value.trim();

    if (!searchTermEl) {
        alert('Please type in a search Term ....')
    } else {
        searchSongs(searchTermEl);
        searchTermEl = '';
    }
});