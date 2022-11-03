// video.setAttribute('playbackRate', rate);
/*
 1. Create empty container on each video
 2. Make this container appear only when video is focused
 3. Create button to control speed
*/

const createSpeedButton = (speed: number, video: HTMLVideoElement): HTMLDivElement => {
  const button = document.createElement('div');
  button.innerHTML = speed.toString();
  button.style.paddingLeft = '2px';
  button.style.height = '100%';
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('clicking element', video);
    video.playbackRate = speed;
    video.play();
  });
  return button;
}
const createControlsPanel = (video: HTMLVideoElement) => {
  const panel = document.createElement('div');
  panel.style.width = '100px';
  panel.style.height = '20px';
  panel.style.backgroundColor = 'rgba(209, 233, 144, 0.4)';
  panel.style.position = 'absolute';
  panel.style.right = '0px';
  panel.style.zIndex = '10000000';
  panel.style.display = 'flex';
  panel.className = 'hehey';
  const speed125 = createSpeedButton(1.25, video);
  const speed2 = createSpeedButton(2, video);
  panel.appendChild(speed125);
  panel.appendChild(speed2);
  return panel;
};
const panelExists = (video: HTMLVideoElement): boolean => {
  if (video.previousElementSibling?.className === 'hehey') return true;
  return false;
}
const createVideoPanels = () => {
  const videoElements = document.getElementsByTagName('video');
  for (let i = 0; i < videoElements.length; i++) {
    const video = videoElements[i];
    console.log(video, 'video');
    const hasTrack = Array.from(video.children).find((c) => c.tagName === 'TRACK');
    if (!panelExists(video) && (video.src || hasTrack)) {
      video.parentElement!.insertBefore(createControlsPanel(video), video);
    }
  }
}
createVideoPanels();
let mutationObserver = new MutationObserver(mutations => {
  console.log('mutating');
  createVideoPanels();
});
mutationObserver.observe(document.body, { childList: true })
