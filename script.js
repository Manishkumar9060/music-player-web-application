const audio = document.getElementById('audio');
const playlist = document.getElementById('playlist');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');

const songs = [
  { title: "Song 1", file: "songs/song1.mp3" },
  { title: "Song 2", file: "songs/song2.mp3" },
  { title: "Song 3", file: "songs/song3.mp3" },
  { title: "Song 4", file: "songs/song4.mp3" },
  { title: "Song 5", file: "songs/song5.mp3" },
];

let currentSong = 0;

// Load playlist
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = `🎵 ${song.title}`; // <-- Added music emoji 🎵 here
  li.addEventListener('click', () => loadSong(index));
  playlist.appendChild(li);
});

function loadSong(index) {
  currentSong = index;
  audio.src = songs[currentSong].file;
  document.querySelectorAll('#playlist li').forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });
  audio.play();
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
}

audio.addEventListener('loadedmetadata', () => {
  progress.max = audio.duration;
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  progress.value = audio.currentTime;
  currentTime.textContent = formatTime(audio.currentTime);
});

progress.addEventListener('input', () => {
  audio.currentTime = progress.value;
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

function showFeedback() {
  document.getElementById('feedback').style.display = 'block';
}

function sendFeedback(rating) {
  const message = `You rated this music player: "${rating}"`;
  document.getElementById('feedbackMessage').textContent = message;
}

function closeFeedback() {
  document.getElementById('feedback').style.display = 'none';
}


// Load first song on start
loadSong(currentSong);
volumeSlider.value = 0.5;
audio.volume = 0.5;
