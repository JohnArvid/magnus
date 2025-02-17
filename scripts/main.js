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
  console.log(icon);
  toggle.textContent = icon;
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

/**
 * Lägg till lyssnare på spacebar och koppla till togglePlay
 */
document.addEventListener('keyup', (e) => e.code === "Space" && togglePlay )


/**
 * Timestamps på videon
 */
const timeStamps = [];
