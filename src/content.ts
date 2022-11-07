// video.setAttribute('playbackRate', rate);
/*
 1. Create empty container on each video
 2. Make this container appear only when video is focused
 3. Create button to control speed
*/

const SPEED_ELEMS = [1, 1.25, 1.5, 2, 4];
console.log('CONTENT LOADED HERE', window.location.href)
const handleVideoClick = (e: MouseEvent) => {
  console.log(e.target, 'target');
}

document.addEventListener('click', handleVideoClick);
const onSpeedChange = (e: MouseEvent, video: HTMLVideoElement, speed: number) => {
  e.preventDefault();
  e.stopPropagation();
  console.log('clicking element', video);
  video.playbackRate = speed;
  video.play();
}

const createSpeedButton = (speed: number, video: HTMLVideoElement): HTMLDivElement => {
  const button = document.createElement('div');
  button.innerHTML = speed.toString();
  button.style.paddingLeft = '2px';
  button.style.height = '100%';
  button.style.cursor = 'pointer';
  button.addEventListener('click', (e) => onSpeedChange(e, video, speed));
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
  for (const speed of SPEED_ELEMS) {
    const elem = createSpeedButton(speed, video);
    panel.appendChild(elem);
  }
  return panel;
};
const panelExists = (video: HTMLVideoElement): boolean => {
  if (video.previousElementSibling?.className === 'hehey') return true;
  return false;
}

const createPanel = (video: HTMLVideoElement) => {
  const hasTrack = Array.from(video.children).find((c) => c.tagName === 'TRACK');
  if (!panelExists(video) && (video.src || hasTrack)) {
    video.parentElement!.insertBefore(createControlsPanel(video), video);
  }
}
const createVideoPanels = () => {
  const videoElements = document.getElementsByTagName('video');
  for (let i = 0; i < videoElements.length; i++) {
    const video = videoElements[i];
    let videoObserver = new MutationObserver(mutations => {
      console.log(mutations, 'mutations');
      for (let mutation of mutations) {
        console.log('mutation', mutation)
        if (mutation.attributeName === 'src') {
          console.log('src changed', video);
          createPanel(video);
        }
      }
    });
    videoObserver.observe(video, { attributes: true })
    createPanel(video);
  }
}
createVideoPanels();
let mutationObserver = new MutationObserver(mutations => {
  console.log('mutating', mutations);
  for (const mutation of mutations) {
    if (Array.from(mutation.addedNodes).find(node => node.nodeName === 'IFRAME')) {
      console.log('iframe added');
      chrome.runtime.sendMessage({ shouldSendState: true });
    }
  }
  createVideoPanels();
});
mutationObserver.observe(document.body, { childList: true, subtree: true, characterData: true })
