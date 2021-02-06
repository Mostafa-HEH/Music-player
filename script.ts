const image: HTMLImageElement = document.querySelector("img");
const title: HTMLElement = document.getElementById("title");
const artist: HTMLElement = document.getElementById("artist");
const music: HTMLAudioElement = document.querySelector("audio");
const progressContainer: HTMLElement = document.getElementById(
  "progress-container"
);
const progress: HTMLElement = document.getElementById("progress");
const currentTimeEl: HTMLElement = document.getElementById("current-time");
const durationEl: HTMLElement = document.getElementById("duration");
const prevBtn: Element = document.querySelector("#prev");
const playBtn: Element = document.querySelector("#play");
const nextBtn: Element = document.querySelector("#next");

//Music
interface musicInfo {
  name: string;
  displayName: string;
  artist: string;
}
const songs: musicInfo[] = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Mostafa Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Mostafa Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Mostafa Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Mostafa Design",
  },
];

//check if play
let isPlaying: boolean = false;

//Play
const playSong = function (): void {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
};

//Pause
const pauseSong = function (): void {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
};

//Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

//Update DOM
const loadSong = function (song: musicInfo): void {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
};

//Current Song
let songIndex: number = 0;

//Previous song
const prevSong = (): void => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

//Next song
const nextSong = function (): void {
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
const updateProgressBar = function (e: any): void {
  if (isPlaying) {
    const {
      duration,
      currentTime,
    }: { duration: number; currentTime: number } = e.srcElement;
    //Update Progress Bar
    const progressPercent: number = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    //calculate display for duration
    const durationMinutes: number = Math.floor(duration / 60);
    let durationSeconds: number | string = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    //Delay switching duration number to avoid NAN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //calculate display for current
    const currentMinutes: number = Math.floor(currentTime / 60);
    let currentSeconds: number | string = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    //Delay switching duration number to avoid NAN
    if (durationSeconds) {
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
};
//Set progress bar
const setProgressBar = function (e: any): void {
  const width: number = this.clientWidth;
  const clickX: number = e.offsetX;
  const { duration }: { duration: number } = music;
  music.currentTime = (clickX / width) * duration;
};

//Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
