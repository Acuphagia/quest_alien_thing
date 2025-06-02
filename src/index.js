/* This file is not intended for manual editing, please do not mess with this file.
This file is here to loop the audio, & ensure compatibility for Firefox, Google, & Microsoft Edge; do not ask me how this code works, because I do not know */

  document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("bgmusic");
    const musicButton = document.getElementById("music-button");

    let sigma = false;

    // This is the code that will be used to loop the audio
    document.addEventListener("DOMContentLoaded", () => {
        const audio = document.getElementById("bgmusic");
        audio.loop = true; // Set the loop property to true
        audio.play(); // Start playing the audio
    });

    musicButton.addEventListener("click", () => {
      if (audio.paused && sigma == false) {
        audio.play();
        sigma = true;
        musicButton.textContent = "Music: ON";
      } else if (sigma == true) {
        audio.pause();
        musicButton.textContent = "Music: OFF";
        sigma = false;
      }
    });
  });

/*

*/

