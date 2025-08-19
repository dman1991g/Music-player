const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const volumeSlider = document.getElementById('volume-slider');
const playlistItems = document.getElementById('playlist-items');

let currentTrackIndex = 0;

// Just list your filenames in the songs folder
const playlist = [
  'songs/Amazing_Grace.mp3',
  'songs/10000_Reasons.mp3',
  'songs/I_Can_Only_Imagine.mp3'
];

function loadTrack(index) {
  audioPlayer.src = playlist[index];
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
  playlist.forEach((path, index) => {
    // Extract file name from path
    let title = path.split('/').pop().replace('.mp3', '');
    // Replace underscores with spaces and clean numbers if needed
    title = title.replace(/_/g, ' ');
    const li = document.createElement('li');
    li.textContent = title;
    li.addEventListener('click', () => {
      currentTrackIndex = index;
      loadTrack(currentTrackIndex);
      playTrack();
    });
    playlistItems.appendChild(li);
  });
}

// Event listeners
playBtn.addEventListener('click', playTrack);
pauseBtn.addEventListener('click', pauseTrack);
audioPlayer.addEventListener('ended', nextTrack);
audioPlayer.addEventListener('error', nextTrack);
volumeSlider.addEventListener('input', () => {
  audioPlayer.volume = volumeSlider.value;
});

// Initialize
loadTrack(currentTrackIndex);
renderPlaylist();