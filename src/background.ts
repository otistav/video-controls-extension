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
        // func: () => {
        //   console.log('bebebe hui', window.location)
        //   const videoElements = document.getElementsByTagName('video');
        //   console.log(videoElements, 'in background');
        //   let mutationObserver = new MutationObserver(mutations => {
        //     const videoElements = document.getElementsByTagName('video');
        //     console.log(videoElements, 'bg elems', window.location.href);
        //     const elems = document.getElementsByTagName('video');
        //     console.log(elems, 'in background');
        //     //for (let i=0; i<videoElements.length; i++) {
        //     // videoElements[i].parentElement!.insertBefore(createControlsPanel(), videoElements[i]);
        //     // }
        //   });
        //   mutationObserver.observe(document.body, { childList: true })
        // }
      });
    }
  }
}

chrome.tabs.onUpdated.addListener(updated);
// (async () => {
//   let queryOptions = { active: true, lastFocusedWindow: true };
//   // `tab` will either be a `tabs.Tab` instance or `undefined`.
//   const [tab] = await chrome.tabs.query(queryOptions);
//   console.log(tab, 'tab');
//   if (!(tab as any).url.includes("chrome://")) {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id as number, allFrames: true },
//       files: ['./content.js'],
//     });
//   }
// })()

