document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('songs').addEventListener('click', getSongs)
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
  let songList = document.getElementById('song-list')
  let info = document.getElementById('info')
  songList.innerHTML= ""
  info.innerHTML = ""
  fetch(`https://itunes.apple.com/lookup?id=${event.target.dataset.id}`)
      .then(resp => resp.json())
      .then(data => {
        let s = data.results[0]
        console.log(data)
        console.log(s)
            info.innerHTML += `
              <h1>${s.trackName}</h1>
              <h2>Artist Name:</h2>
              <p>${s.artistName}</p>
              <h3>Release Date:</h3>
              <p>${s.releaseDate}</p>
            
              <hr>
              <br> 

              <div id="comments">
                <h2>Write a comment!</h2>

              <form id="comment-form">
                <div class="field">
                    <input id="new-comment" type="text" placeholder="New Comment" />
                    <input type="submit" class="btn" value="Submit"/>
                </div>
              </form>
            
              <div id="commentsContainer">
                <h3>Comments</h3>
                <data-comment="">
              </div>
              </div>
            `
          
        commentSection()
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



