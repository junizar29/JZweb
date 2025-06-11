// Tambahkan lagu baru dengan menyalin objek berikut dan tempelkan di dalam array
let allMusic = [
  {
    name: "All the kids are debressed",
    artist: "Jeremy Zucker",
    img: "Jeremy-Zucker",
    src: "all-the-kids"
  },
  {
    name: "Nina",
    artist: "Feast",
    img: "nina",
    src: "Nina_Feast"
  },

];

// Pilih elemen-elemen dari DOM
const wrapper = document.querySelector(".wrapper"),
      musicImg = wrapper.querySelector(".img-area img"),
      musicName = wrapper.querySelector(".song-details .name"),
      musicArtist = wrapper.querySelector(".song-details .artist"),
      playPauseBtn = wrapper.querySelector(".play-pause"),
      prevBtn = wrapper.querySelector("#prev"),
      nextBtn = wrapper.querySelector("#next"),
      mainAudio = wrapper.querySelector("#main-audio"),
      progressArea = wrapper.querySelector(".progress-area"),
      progressBar = progressArea.querySelector(".progress-bar"),
      musicList = wrapper.querySelector(".music-list"),
      moreMusicBtn = wrapper.querySelector("#more-music"),
      closeMoreMusic = musicList.querySelector("#close");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
let isMusicPaused = true;

// Load lagu saat halaman dimuat
window.addEventListener("load", () => {
  loadMusic(musicIndex);
  playingSong();
});

// Fungsi untuk memuat lagu
function loadMusic(indexNumb) {
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `${allMusic[indexNumb - 1].img}.jpg`;
  mainAudio.src = `${allMusic[indexNumb - 1].src}.mp3`;
}

// Fungsi untuk memutar lagu
function playMusic() {
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

// Fungsi untuk menjeda lagu
function pauseMusic() {
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

// Fungsi untuk lagu sebelumnya
function prevMusic() {
  musicIndex--;
  if (musicIndex < 1) {
    musicIndex = allMusic.length;
  }
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}

// Fungsi untuk lagu selanjutnya
function nextMusic() {
  musicIndex++;
  if (musicIndex > allMusic.length) {
    musicIndex = 1;
  }
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}
// play or pause button event
playPauseBtn.addEventListener("click", () => {
  const isMusicPlay = wrapper.classList.contains("paused");
  // if isMusicPlay is true then pauseMusic else playMusic
  isMusicPlay ? pauseMusic() : playMusic();
  playingSong();
});

// prev music button event
prevBtn.addEventListener("click", () => {
  prevMusic();
});

// next music button event
nextBtn.addEventListener("click", () => {
  nextMusic();
});

// update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current-time"),
      musicDuration = wrapper.querySelector(".max-duration");

  // update song total duration
  mainAudio.addEventListener("loadeddata", () => {
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

  // update playing song current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// update playing song currentTime according to the progress bar width
progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = mainAudio.duration;
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic();
  playingSong();
});

// change loop, shuffle, repeat icon onclick
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
  let getText = repeatBtn.innerText;
  switch (getText) {
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});

// show music list onclick of music icon
moreMusicBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
});

closeMoreMusic.addEventListener("click", () => {
  moreMusicBtn.click();
});

const ulTag = wrapper.querySelector("ul");

// create <li> tags for each song in the array
for (let i = 0; i < allMusic.length; i++) {
  let liTag = `<li li-index="${i + 1}">
    <div class="row">
      <span>${allMusic[i].name}</span>
      <p>${allMusic[i].artist}</p>
    </div>
    <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
    <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
  </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag);

  let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

  liAudioTag.addEventListener("loadeddata", () => {
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
    liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
}

// function to highlight the playing song in the list
function playingSong() {
  const allLiTag = ulTag.querySelectorAll("li");

  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");

    if (allLiTag[j].classList.contains("playing")) {
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    if (allLiTag[j].getAttribute("li-index") == musicIndex) {
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
      allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
  }
}
// particular li clicked function
function clicked(element) {
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex; // updating current song index with clicked li index
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}