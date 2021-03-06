//jshint esversion:9
const apiURL = 'https://api.lyrics.ovh';
const formEl = document.getElementById('form');
const searchEl = document.getElementById('search');
const resultEl = document.getElementById('result');
const moreEl = document.getElementById('more');

// Search by song or Artits 
async function searchSongs(term) {
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();

    showData(data);
}

// Show songs & artists in the DOM 
function showData(data){
    
}



// EVETN LISTENERS

formEl.addEventListener('submit', e => {
    e.preventDefault();
    const searchTermEl = searchEl.value.trim();

    if (!searchTermEl) {
        alert('Please type in a search Term ....')
    } else {
        searchSongs(searchTermEl);
    }
});