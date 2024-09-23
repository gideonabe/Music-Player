const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const volume = document.getElementById('volume');
const shuffle = document.getElementById('shuffle');
const repeat = document.getElementById('repeat');

// Song titles
const songs = ['Peaches - Justin Bieber','Need me - Fireboy DML','Stronger - Young John','Big Big Things - Young John', 'Friendzone - Adekunle Gold', 'hey', 'Summer', 'Ukulele'];

// Keep track of song
let songIndex = 4;
let isShuffled = false;
let isRepeating = false;

// Initially load song details
loadSong(songs[songIndex]);

function loadSong(song) {

  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;

}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();

  
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();
}


function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;

}

function shuffleSongs(){
  if (isShuffled) {
    for (let i = songs.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
  }
  console.log(songs)
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

shuffle.addEventListener('click', () => {
  isShuffled = !isShuffled;
  shuffle.classList.toggle('active', isShuffled);
  shuffleSongs();
});

repeat.addEventListener('click', () => {
  isRepeating = !isRepeating;
  repeat.classList.toggle('active', isRepeating);
  // console.log(isRepeating ? 'ON' : 'OFF')
});

audio.addEventListener('ended', () => {
  if (isRepeating) {
    audio.currentTime = 0;
    audio.play();
  } else {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
  }
});
// audio.addEventListener('ended', () => {
  
// })
volume.addEventListener('change', () => (audio.volume = volume.value));