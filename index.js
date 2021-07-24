document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('songs').addEventListener('click', getSongs)
  commentSection()
  //getSongs()
})

function getSongs() {
  let info = document.getElementById('info')
  let songList = document.getElementById('song-list')
  info.innerHTML = ""
  songList.innerHTML = ""
    fetch('https://itunes.apple.com/search?term=K-Pop')
      .then(resp => resp.json())
      .then(data => {
        data.results.map(song => { 
          //console.log(song)
          songList.innerHTML += `
            <li>
             <a href="#" data-name="${song.trackName}"
             data-id="${song.trackId}"> ${song.trackName} </a>
            </li>
          `
        })
        attachLinks()
    })
}

function attachLinks() {
  const songs = document.querySelectorAll('li a')
  songs.forEach(song => {
    song.addEventListener('click', displaySong)
  })
}

function displaySong(event) {
  //console.log(event.target)
  let a = event.target
  let songList = document.getElementById('song-list')
  let info = document.getElementById('info')
  songList.innerHTML= ""
  info.innerHTML = ""
  fetch(`https://itunes.apple.com/lookup?id=${event.target.dataset.id}`)
      .then(resp => resp.json())
      .then(data => {
        data.results.map(song => { 
          //console.log(song)
            info.innerHTML += `
              <h1>${song.trackName}</h1>
              <h2>Artist Name:</h2>
              <p>${song.artistName}</p>
              <h3>Release Date:</h3>
              <p>${song.releaseDate}</p>
            `
          })
    })
}

function commentSection() {
  const commentForm = document.getElementById('comment-form')
  const commentsContainer = document.getElementById('commentsContainer')
  
  commentForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const userInput = event.target.querySelector('#new-comment').value
    const commentPTag = document.createElement('p')
    commentPTag.innerHTML = userInput
    commentsContainer.appendChild(commentPTag)
    commentForm.reset()
  })
}
//somehow target the objects in the array. Maybe try to use a for loop like results[i].trackName, so on?
