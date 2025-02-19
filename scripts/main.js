'use strict';

/**
 * Uppdatera år i footer dynamiskt
 */
let year = new Date().getFullYear();
let span = document.createElement('span');
span.textContent = ` ${year}`;
let footerHead = document.querySelector('footer h3');
footerHead.appendChild(span);

/**
 * Videospelarelement
 */
const player = document.querySelector('.video-player');
const video = player.querySelector('video');
const playButton = player.querySelector('.play-button');
const fullscreenButton = player.querySelector('.fullscreen-button');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.volume-slider');

/**
 * Videofunktioner
 */
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    video.requestFullscreen().catch((err) => {
      alert(
        `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
      );
    });
  } else {
    document.exitFullscreen();
  }
}

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function handleSpacebar(e) {
  e.preventDefault();
  togglePlay();
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
/**
 * Eventlyssnare
 */

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

fullscreenButton.addEventListener('click', toggleFullscreen);
toggle.addEventListener('click', togglePlay);
ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener('mousemove', handleRangeUpdate)
);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));

document.addEventListener(
  'keydown',
  (e) => e.code === 'Space' && handleSpacebar(e)
);

/**
 * Timestamps på videon - UNDER ARBETE
 */
video.addEventListener('loadedmetadata', () =>
  timeStamps.forEach((timeStamp) => createTimeStampNode(timeStamp))
);

const timeStamps = [
  { time: '00:00:00', title: 'sveket' },
  { time: '00:06:04', title: 'sviterna' },
  { time: '00:09:41', title: 'ovissheten' },
  { time: '00:14:33', title: 'tiden' },
  { time: '00:20:30', title: 'rösten' },
  { time: '00:25:30', title: 'hemligheten' },
  { time: '00:37:08', title: 'öppningen' },
  { time: '00:41:17', title: 'tankarna' },
  { time: '00:51:10', title: 'beslutet' },
  { time: '00:54:54', title: 'saknaden' },
  { time: '00:59:43', title: 'frågorna' },
  { time: '01:04:32', title: 'målet' },
  { time: '01:13:11', title: 'läget' },
];

function createTimeStampNode(timeStamp) {
  let node = document.createElement('div');
  node.setAttribute('title', timeStamp.title);
  node.classList.add('marker');
  node.style.left = `${
    (convertTimeStampToSeconds(timeStamp.time) / video.duration) * 100
  }%`;

  progress.appendChild(node);
  node.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log(timeStamp.time)
    video.currentTime = convertTimeStampToSeconds(timeStamp.time)
  })
  console.log('timestamp', convertTimeStampToSeconds(timeStamp.time));
  console.log('videolängd', video.duration);
  console.log('progress', progress.offsetWidth);
}

function convertTimeStampToSeconds(timeStamp) {
  let a = timeStamp.split(':');
  return +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
}
