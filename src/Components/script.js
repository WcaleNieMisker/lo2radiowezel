const api = '$2b$10$gz7nVI4wKIwFD5lyJX6jB.PdIR.nnf6lnW8Xtvda7s7R/g5jt2VlW';
const ToggleBtnId = document.getElementById("toggle_btn");
const CloseBtnId = document.getElementById("close_btn");
const template = document.querySelector("[data-template]");
const list = document.querySelector("[data-list]");
const searchInput = document.querySelector("[data-search]");
const image = document.querySelector("[data-image]");
const logo = document.querySelector(".logo");
const upButton = document.querySelector('.noselect');
songs = []
output = {"tracks": []}
random = Math.round(Math.random() * 1) * 1
images = ["musician-man.svg", "musician-woman.svg"]
image.src = "./img/" + images[random];
let counter = 0
let l1o3g2 = []
const themeButton = document.getElementById('theme')
let elements = document.querySelectorAll('*')
elements.forEach(element => {
  if (themeButton.checked === true) {
    element.classList.add('dark-theme');
    logo.style.backgroundImage = "url(img/logo_black.png)";
  } else {
    element.classList.remove('dark-theme')
    logo.style.backgroundImage = "url(img/logo.png)"
  }
})

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    upButton.classList.remove("hide");
  } else {
    upButton.classList.add("hide");
  }
}

upButton.addEventListener("click", function () {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
})

themeButton.addEventListener('click', () => {
  const logo = document.querySelector(".logo")
  let elements = document.querySelectorAll('*')
  elements.forEach(element => {
    if (themeButton.checked === true) {
      element.classList.add('dark-theme');
      logo.style.backgroundImage = "url(img/logo_black.png)";
    } else {
      element.classList.remove('dark-theme');
      logo.style.backgroundImage = "url(img/logo.png)"
    }
  })
})

fetch('https://api.jsonbin.io/v3/b/6379e12565b57a31e6bcbae6', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json', 'X-Master-Key': api }
})
  .then((response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response);
})
  .then((data) => {
      songs = data.record.tracks.map(song => {
        const card = template.content.cloneNode(true).children[0];
        const title = card.querySelector('[data-title]');
        const artist = card.querySelector('[data-artist]');
        const album = card.querySelector('[data-album]');
        const duration = card.querySelector('[data-duration]');
        const popularity_desc = card.querySelector('[data-popularity-desc]');
        const progress = card.querySelector('[data-progress]');
        const progress_value = progress.querySelector('[data-progress-value]');
        const icon = card.querySelector('[data-icon]');
        const likeinput = icon.querySelector('[data-input-like]');
        const dislikeinput = icon.querySelector('[data-input-dislike]');
        const likeinputlabel = icon.querySelector('[data-label-like]');
        const dislikelabel = icon.querySelector('[data-label-dislike]');
        icon.style.backgroundImage = "url(" + song.album_img_link + ")";
        title.textContent = song.name;
        title.href = song.track_link;
        artist.textContent = song.artist;
        artist.href = song.artist_link;
        album.textContent = song.album;
        album.href = song.album_link;
        likes = song.likes
        icon.children[1].children[1].innerText = `${likes}`
        likeinput.id = `like${counter}`;
        dislikeinput.id = `dislike${counter}`;
        likeinputlabel.setAttribute("for", `like${counter}`);
        dislikelabel.setAttribute("for", `dislike${counter}`);
        likeinputlabel.setAttribute("onclick", `like(like${counter})`);
        dislikelabel.setAttribute("onclick", `dislike(dislike${counter})`);
        likeinput.name = `like_or_dislike${counter}`;
        dislikeinput.name = `like_or_dislike${counter}`;
        popularity_desc.textContent = "Popularność: " + song.popularity;
        progress_value.style.width = song.popularity + '%';
        list.append(card);
        counter++
        let link = song.track_link;
        let uri = link.slice(31);
        let value = song.duration_in_mins
        let value_in_seconds = Math.round(value * 60)
        letwhilecounter = 0;
        let equal;
        while (value_in_seconds > 60) {
          whilecounter += 1;
          value_in_seconds -= 60;
          equal = `${whilecounter} minut(y) i ${value_in_seconds} sekund(y)`
          if (whilecounter === 1 && value_in_seconds === 1) {
            equal = `${whilecounter} minuta i ${value_in_seconds} sekunda`
          } else if (value_in_seconds === 0) {
            equal = `${whilecounter} minut(y)`
          } else if (whilecounter === 1 && value_in_seconds === 0) {
            equal = `${whilecounter} minuta`
          } else if (whilecounter > 1 && value_in_seconds === 1) {
            equal = `${whilecounter} minut(y) i ${value_in_seconds} sekunda`
          } else if (whilecounter === 1 && value_in_seconds > 1) {
            equal = `${whilecounter} minuta i ${value_in_seconds} sekund(y)`
          }
        }
        duration.textContent = "Długość: " + equal;
        return {
          name: song.name,
          track_link: song.track_link,
          artist: song.artist,
          artist_link: song.artist_link,
          album: song.album,
          album_img_link: song.album_img_link,
          album_link: song.album_link,
          id: uri,
          likes: song.likes,
          popularity: song.popularity,
          duration_in_mins: song.duration_in_mins,
          element: card
        }
  })
    localStorageSetting()
})

addLike = function (song) {
  output.tracks.forEach(function (track) {
    if (track.id == song) {
      track.likes += 1
    }
  })
  songs.forEach(function (track) {
    if (track.id == song) {
      track.element.children[0].children[1].children[1].innerHTML = parseFloat(track.element.children[0].children[1].children[1].innerHTML) + 1
    }
  })
  
  fetch(`https://api.jsonbin.io/v3/b/6379e12565b57a31e6bcbae6`, {
    method: 'PUT',
    body: JSON.stringify(output),
    headers: {'Content-Type': 'application/json', 'X-Master-Key': api}
  })
    .then(response => response.json())
    .then(json => l1o3g2.push(json))
      
}

unLike = function (song) {
  output.tracks.forEach(function (track) {
    if (track.id == song) {
      track.likes -= 1
    }
  })
  songs.forEach(function (track) {
    if (track.id == song) {
      track.element.children[0].children[1].children[1].innerHTML = parseFloat(track.element.children[0].children[1].children[1].innerHTML) - 1
    }
  })
  
  fetch(`https://api.jsonbin.io/v3/b/6379e12565b57a31e6bcbae6`, {
    method: 'PUT',
    body: JSON.stringify(output),
    headers: {'Content-Type': 'application/json', 'X-Master-Key': api}
  })
    .then(response => response.json())
    .then(json => l1o3g2.push(json))
      
}

ToggleBtnId.addEventListener("click", () => {
  const navId = document.querySelector(".nav_menu")
  navId.classList.add("show");
});

CloseBtnId.addEventListener("click", () => {
  const navId = document.querySelector(".nav_menu")
  navId.classList.remove("show");
});

searchInput.addEventListener('input', e => {
  const value = e.target.value.toLowerCase()
  songs.forEach(song => {
    const isVisible = song.name.toLowerCase().includes(value) || song.artist.toLowerCase().includes(value) || song.album.toLowerCase().includes(value)
    song.element.classList.toggle("hide", !isVisible)
  })
});

like = function (element) {
  const card = element.parentNode.parentNode;
  const title = card.querySelector('[data-title]');
  let link = title.href
  let uri = link.slice(31);
  window.localStorage.setItem(uri, true);
  if (element.checked === false) {
    addLike(uri)
  }
}

dislike = function (element) {
  const card = element.parentNode.parentNode;
  const title = card.querySelector('[data-title]');
  let link = title.href
  let uri = link.slice(31);
  window.localStorage.setItem(uri, false)
  if (element.checked === false) {
    unLike(uri);
  }
}

localStorageSetting = function () {
  Object.keys(localStorage).forEach(data => {
    songs.forEach(song => {
      const isInList = song.id.includes(data)
      if (isInList) {
        if (localStorage.getItem(data) === "true") {
          song.element.children[0].children[0].checked = true
        } else if (localStorage.getItem(data) === "false") {
          song.element.children[0].children[2].checked = true
        }
      }
    })
  })

  output.tracks = songs.map(function (song) {
    return {
        name: song.name,
        track_link: song.track_link,
        artist: song.artist,
        artist_link: song.artist_link,
        album: song.album,
        album_img_link: song.album_img_link,
        album_link: song.album_link,
        id: song.id,
        likes: song.likes,
        popularity: song.popularity,
        duration_in_mins: song.duration_in_mins
    }
  })
}