 // Get our elements
 const player = document.querySelector('.player');
 const video = player.querySelector('.viewer');
 const progress = player.querySelector('.progress');
 const progressBar = player.querySelector('.progress__filled');
 const toggle = player.querySelector('.toggle');
 const skipButtons = player.querySelectorAll('[data-skip]');
 const ranges = player.querySelectorAll('.player__slider');
 const fullscreenButton = player.querySelector('.fullscreen');

 // Build functions
 function togglePlay() {
   video.paused ? video.play() : video.pause();
 }

 function updateButton() {
   const icon = video.paused ? '►' : '❚ ❚';
   toggle.textContent = icon;
 }

 function skip() {
   video.currentTime += parseFloat(this.dataset.skip);
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

 function toggleFullscreen() {
   if (!document.fullscreenElement) {
     player.requestFullscreen().catch(err => {
       console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
     });
   } else {
     document.exitFullscreen();
   }
 }

 // Hook up the event listeners
 video.addEventListener('click', togglePlay);
 video.addEventListener('play', updateButton);
 video.addEventListener('pause', updateButton);
 video.addEventListener('timeupdate', handleProgress);

 toggle.addEventListener('click', togglePlay);
 skipButtons.forEach(button => button.addEventListener('click', skip));
 ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
 ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

 let mousedown = false;
 progress.addEventListener('click', scrub);
 progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
 progress.addEventListener('mousedown', () => mousedown = true);
 progress.addEventListener('mouseup', () => mousedown = false);

 fullscreenButton.addEventListener('click', toggleFullscreen);