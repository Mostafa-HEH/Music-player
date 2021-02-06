var image = document.querySelector("img");
var title = document.getElementById("title");
var artist = document.getElementById("artist");
var music = document.querySelector("audio");
var progressContainer = document.getElementById("progress-container");
var progress = document.getElementById("progress");
var currentTimeEl = document.getElementById("current-time");
var durationEl = document.getElementById("duration");
var prevBtn = document.querySelector("#prev");
var playBtn = document.querySelector("#play");
var nextBtn = document.querySelector("#next");
var songs = [
    {
        name: "jacinto-1",
        displayName: "Electric Chill Machine",
        artist: "Mostafa Design"
    },
    {
        name: "jacinto-2",
        displayName: "Seven Nation Army (Remix)",
        artist: "Mostafa Design"
    },
    {
        name: "jacinto-3",
        displayName: "Goodnight, Disco Queen",
        artist: "Mostafa Design"
    },
    {
        name: "metric-1",
        displayName: "Front Row (Remix)",
        artist: "Metric/Mostafa Design"
    },
];
//check if play
var isPlaying = false;
//Play
var playSong = function () {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
};
//Pause
var pauseSong = function () {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
};
//Play or Pause Event Listener
playBtn.addEventListener("click", function () { return (isPlaying ? pauseSong() : playSong()); });
//Update DOM
var loadSong = function (song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = "music/" + song.name + ".mp3";
    image.src = "img/" + song.name + ".jpg";
};
//Current Song
var songIndex = 0;
//Previous song
var prevSong = function () {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
};
//Next song
var nextSong = function () {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
};
//On Load
loadSong(songs[songIndex]);
//Update Progress Bar & Time
var updateProgressBar = function (e) {
    if (isPlaying) {
        var _a = e.srcElement, duration = _a.duration, currentTime = _a.currentTime;
        //Update Progress Bar
        var progressPercent = (currentTime / duration) * 100;
        progress.style.width = progressPercent + "%";
        //calculate display for duration
        var durationMinutes = Math.floor(duration / 60);
        var durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        //Delay switching duration number to avoid NAN
        if (durationSeconds) {
            durationEl.textContent = durationMinutes + ":" + durationSeconds;
        }
        //calculate display for current
        var currentMinutes = Math.floor(currentTime / 60);
        var currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        //Delay switching duration number to avoid NAN
        if (durationSeconds) {
            currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
        }
    }
};
//Set progress bar
var setProgressBar = function (e) {
    var width = this.clientWidth;
    var clickX = e.offsetX;
    var duration = music.duration;
    music.currentTime = (clickX / width) * duration;
};
//Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
