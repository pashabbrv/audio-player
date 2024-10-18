let isPlay = false;
const playControl = document.querySelector('#control-play');
const pauseControl = document.querySelector('#control-pause');
const audio = new Audio('assets/audio/drake - nonstop.mp3');

const songImg = document.querySelector('#song-img');
const backImg = document.querySelector('#back-img');
const singer = document.querySelector('.singer');
const songTitle = document.querySelector('.song');

let songIndex = 0;

const currentTimeElem = document.querySelector('.current-time');
const fullTimeElem = document.querySelector('.full-time');
const progressBar = document.querySelector('#progress-bar');

const songs = [
    {
        src: 'assets/audio/drake - nonstop.mp3',
        img: 'assets/img/drake-nonstop.png',
        singer: 'Drake',
        title: 'Nonstop',
    },
    {
        src: 'assets/audio/carti - rip.mp3',
        img: 'assets/img/carti-rip.jpg',
        singer: 'Playboi Carti',
        title: 'R.I.P.',
    },
    {
        src: 'assets/audio/rocky, skepta - praise the lord.mp3',
        img: 'assets/img/rocky-praise_the_lord.jpg',
        singer: 'A$AP Rocky, Skepta',
        title: 'Praise The Lord (Da Shine)',
    },
    {
        src: 'assets/audio/future, the weeknd - low life.mp3',
        img: 'assets/img/future-low_life.png',
        singer: 'Future, The Weeknd',
        title: 'Low Life',
    },
    {
        src: 'assets/audio/young thug, 21savage - want me dead.mp3',
        img: 'assets/img/young_thug-want_me_dead.png',
        singer: 'Young Thug, 21 Savage',
        title: 'Want Me Dead',
    }
];


// Play and pause audio
function playAudio() {
    if (!isPlay) {
        isPlay = true;
        audio.play();
    }

    playControl.classList.toggle('active');
    playControl.classList.toggle('inactive');
    pauseControl.classList.toggle('inactive');
    pauseControl.classList.toggle('active');
}

function pauseAudio() {
    if (isPlay) {
        isPlay = false;
        audio.pause();
    }
    
    pauseControl.classList.toggle('active');
    pauseControl.classList.toggle('inactive');
    playControl.classList.toggle('inactive');
    playControl.classList.toggle('active');
}

playControl.addEventListener('click', playAudio);
pauseControl.addEventListener('click', pauseAudio);


// Handling songs, images, titles
function uploadTrack(index) {
    audio.src = songs[index].src;
    songImg.src = songs[index].img;
    backImg.src = songs[index].img;
    singer.textContent = songs[index].singer;
    songTitle.textContent = songs[index].title;
    
    // progress bar
    progressBar.value = 0;
    currentTimeElem.textContent = "0:00";
    fullTimeElem.textContent = "0:00";

    audio.load();

    // progress bar
    audio.addEventListener('loadedmetadata', () => {
        fullTimeElem.textContent = formatTime(audio.duration);
    });
}

function nextTrack() {
    songIndex = (songIndex + 1) % songs.length;
    uploadTrack(songIndex);
    if (isPlay) {
        pauseAudio();
    }
}

function prevTrack() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    uploadTrack(songIndex);
    if (isPlay) {
        pauseAudio();
    }
}

document.querySelector('#next-arrow').addEventListener('click', nextTrack);
document.querySelector('#prev-arrow').addEventListener('click', prevTrack);

uploadTrack(songIndex);


// Progress bar handler
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
}

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    if (!isNaN(duration) && duration > 0) {
        progressBar.value = (currentTime / duration) * 100;
        currentTimeElem.textContent = formatTime(currentTime);
    } else {
        progressBar.value = 0;
        currentTimeElem.textContent = "0:00";
    }
});


progressBar.addEventListener('input', () => {
    const duration = audio.duration;
    const newTime = (progressBar.value / 100) * duration;
    audio.currentTime = newTime;
});