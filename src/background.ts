chrome.action.onClicked.addListener((tab) => {
  console.log(tab, 'tab');
});

const updated = async (tabId: any, info: any) => {
  if (info.status === 'complete') {
    const tab = await chrome.tabs.get(tabId);
    console.log(tab, 'tab');
    if (!(tab as any).url.includes("chrome://")) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id as number, allFrames: true },
        files: ['./content.js'],
      });
    }
  }
}

chrome.tabs.onUpdated.addListener(updated);

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  // TODO: discover why few seconds later frame is being added
  setTimeout(async () => {
    console.log(sender?.tab?.id, 'idd');
    const frames = await chrome.webNavigation.getAllFrames(
      {
        tabId: sender?.tab?.id as number,
      },
    )
    console.log(frames, 'frames')
    chrome.scripting.executeScript({
      target: { tabId: sender?.tab?.id as number, frameIds: frames?.map(frame => frame.frameId) },
      files: ['./content.js'],
    });
  }, 3000)

});
