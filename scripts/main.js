'use strict';

/**
 * Uppdatera år i footer dynamiskt
 */
let year = new Date().getFullYear();
let span = document.createElement("span");
span.textContent = ` ${year}`;
let footerHead = document.querySelector("footer h3");
footerHead.appendChild(span);


/**
 * Videospelarelement
 */
const videoElement = document.querySelector('video')

/**
 * Videofunktioner
 */
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    videoElement.requestFullscreen().catch((err) => {
      alert(
        `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
      );
    });
  } else {
    document.exitFullscreen();
  }
}
/**
 * Eventlyssnare
 */



/**
 * Timestamps på videon
 */
const timeStamps = [

]
