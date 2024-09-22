// Variables Initialization
let songIndex = 0;
let currTime = 0;
let audioElement = new Audio("assets/songs/1.mp3");
let masterPlay = document.getElementById("master-play");
let myProgressbar = document.getElementById("progress-bar");
let gif = document.getElementById("gif");
let nextButton = document.getElementById("next");
let backButton = document.getElementById("backward");
// let timer = document.getElementById('current-timer').innerText;
let volume_slider = document.querySelector(".volume_slider");
let songs = [
  {
    songName: "Lost Sky - Dreams",
    songPath: "assets/songs/1.mp3",
    songCover: "assets/covers/1.png",
  },
  {
    songName: "Alone pt. II (feat Ava Max)",
    songPath: "assets/songs/2.mp3",
    songCover: "assets/covers/2.png",
  },
  {
    songName: "Daku",
    songPath: "assets/songs/3.mp3",
    songCover: "assets/covers/3.png",
  },
  {
    songName: "Faded - Alan Walker",
    songPath: "assets/songs/4.mp3",
    songCover: "assets/covers/4.png",
  },
  {
    songName: `Gangsta's Paradise`,
    songPath: "assets/songs/5.mp3",
    songCover: "assets/covers/5.png",
  },
  {
    songName: "Jadugar - By Paradox",
    songPath: "assets/songs/6.mp3",
    songCover: "assets/covers/6.png",
  },
  {
    songName: "Lela Lela le - By Rauf Faik",
    songPath: "assets/songs/7.mp3",
    songCover: "assets/covers/7.png",
  },
];

const addBackColor = () => {
  Array.from(document.getElementsByClassName("song")).forEach((element, i) => {
    if (songIndex == i) {
      element.classList.add("song" + songIndex);
    }
  });
};

const removeBack = () => {
  Array.from(document.getElementsByClassName("song")).forEach((element, i) => {
    if (songIndex == i) {
      element.classList.remove("song" + songIndex);
    }
  });
};

const playNext = () => {
  let newSong = songs[songIndex].songName;
  document.getElementById("current-song").innerText = newSong;
  audioElement.src = `assets/songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
};

// Do the play / pause clicks
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime == 0) {
    Array.from(document.getElementsByClassName("song-item-play")).forEach(
      (element) => {
        if (element.id == songIndex) {
          element.classList.remove("fa-circle-play");
          element.classList.add("fa-circle-pause");
        }
      }
    );
    gif.style.opacity = 1;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    addBackColor();
  } else {
    makeAllPlay();
    gif.style.opacity = 0;
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    removeBack();
  }
});

// Progress Bar Updates
audioElement.addEventListener("timeupdate", () => {
  let progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressbar.value = progress;
});
myProgressbar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressbar.value * audioElement.duration) / 100;
});

// song list play buttons updates
const makeAllPlay = () => {
  Array.from(document.getElementsByClassName("song-item-play")).forEach(
    (element) => {
      removeBack();
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};
Array.from(document.getElementsByClassName("song-item-play")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      let newSongIdx = parseInt(e.target.id);

      // Check if the current song is paused
      if (audioElement.paused) {
        // If paused, resume the current song
        audioElement.play();
        addBackColor();
        gif.style.opacity = 1;
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
      } else {
        // If playing, pause the current song
        currTime = audioElement.currentTime; // Store the current time when pausing
        audioElement.pause();
        removeBack();
        gif.style.opacity = 0;
        e.target.classList.remove("fa-circle-pause");
        e.target.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
      }

      // If a new song is selected
      if (songIndex !== newSongIdx) {
        // Pause the previous song
        makeAllPlay();
        audioElement.pause();
        removeBack();
        gif.style.opacity = 0;

        // Update the current song index and play the new song
        songIndex = newSongIdx;
        audioElement.src = `assets/songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        myProgressbar.value = 0;
        audioElement.play();
        addBackColor();
        gif.style.opacity = 1;
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
      }
    });
  }
);

// next and previos button updates
nextButton.addEventListener("click", () => {
  removeBack();
  if (songIndex == songs.length - 1) {
    songIndex = 0;
  } else songIndex++;
  makeAllPlay();
  addBackColor();
  Array.from(document.getElementsByClassName("song-item-play")).forEach(
    (element) => {
      if (element.id == songIndex) {
        element.classList.remove("fa-circle-play");
        element.classList.add("fa-circle-pause");
      }
    }
  );
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  playNext();
});

backButton.addEventListener("click", () => {
  removeBack();
  if (songIndex == 0) {
    songIndex = songs.length - 1;
  } else songIndex--;
  makeAllPlay();
  addBackColor();
  Array.from(document.getElementsByClassName("song-item-play")).forEach(
    (element) => {
      if (element.id == songIndex) {
        element.classList.remove("fa-circle-play");
        element.classList.add("fa-circle-pause");
      }
    }
  );
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  playNext();
});

// set volume
volume_slider.value = 10;
audioElement.volume = volume_slider.value / 100;
function setVolume() {
  audioElement.volume = volume_slider.value / 100;
}

// if the song is completed, then stop the music
audioElement.addEventListener("ended", () => {
  masterPlay.classList.add("fa-circle-play");
  masterPlay.classList.remove("fa-circle-pause");
  gif.style.opacity = 0;
  audioElement.pause();
  removeBack();
  makeAllPlay();
  myProgressbar.value = 0;
});

// timer updates
setInterval(() => {
  tt = "0";
  let Amin = Math.floor(audioElement.currentTime / 60);
  let Asec = Math.floor(audioElement.currentTime - Amin * 60);

  if (Asec < 10) {
    Asec = "0" + Asec;
  }
  if (Amin > 10) {
    tt = "";
  }
  document.getElementById("current-timer").innerText = tt + Amin + ":" + Asec;
  if (audioElement.paused) {
    document.getElementById("current-timer").innerText = "00:00";
  }
}, 1000);
