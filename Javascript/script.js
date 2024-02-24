const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const volumeSlider = document.getElementById('volume-slider');
const playlistItems = document.getElementById('playlist-items');

let currentTrackIndex = 0;
const playlist = [
  { title: 'Song 1', source: 'song1.mp3' },
  { title: 'Song 2', source: 'song2.mp3' },
  { title: 'Song 3', source: 'song3.mp3' }
];

function loadTrack(index) {
  const track = playlist[index];
  audioPlayer.src = track.source;
}

function playTrack() {
  audioPlayer.play();
}

function pauseTrack() {
  audioPlayer.pause();
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

function previousTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

function renderPlaylist() {
  playlistItems.innerHTML = '';
  playlist.forEach((track, index) => {
    const li = document.createElement('li');
    li.textContent = track.title;
    li.addEventListener('click', () => {
      currentTrackIndex = index;
      loadTrack(currentTrackIndex);
      playTrack();
    });
    playlistItems.appendChild(li);
  });
}

playBtn.addEventListener('click', playTrack);
pauseBtn.addEventListener('click', pauseTrack);
audioPlayer.addEventListener('ended', nextTrack);
audioPlayer.addEventListener('error', nextTrack);
volumeSlider.addEventListener('input', () => {
  audioPlayer.volume = volumeSlider.value;
});

loadTrack(currentTrackIndex);
renderPlaylist();
