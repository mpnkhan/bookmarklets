document.addEventListener("DOMContentLoaded", () => {
  const bookmarkletList = document.getElementById("bookmarklets");
  const btns= bookmarkletList.querySelectorAll('button')
  btns.forEach((button) => {
    const file= button.dataset.href;
    button.addEventListener("click", (e) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: [file]
        });
      });
      button.setAttribute('aria-pressed', button.getAttribute("aria-pressed") === 'true' ? 'false' : 'true');
    });

  });
});