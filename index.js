const Base_URL = `https://itunes.apple.com/search?term=kpop` //default limit is 50

document.addEventListener('DOMContentLoaded', () => {
  getSongs()
})

let main = document.getElementById('main')
let info = document.getElementById('info')
let songList = document.getElementById('song-list')
function getSongs(){
  fetch(`https://itunes.apple.com/search?term=K-Pop&entity=song&limit=100`)
    .then(resp => resp.json())
    .then(songs => {
      songs.map(song => { //might have to write a completely seperate function for the map part then call it back
        songList.innerHTML += `
        <li>
          <a href="#" data-id="${song.id}"> ${song.trackname} </a>
        </li>` 
      })
    })
}

