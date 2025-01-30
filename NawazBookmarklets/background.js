chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.frameId === 0) {
    // Set the flag to reset checkboxes
    chrome.storage.sync.set({ shouldResetCheckboxes: true });
  }
});
