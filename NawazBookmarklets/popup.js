document.addEventListener("DOMContentLoaded", () => {
  const bookmarklets = document.querySelectorAll(".bookmarklets");
  bookmarklets.forEach((bookmarkletList) => {
    const btns = bookmarkletList.querySelectorAll("button, input");
    btns.forEach((button) => {
      const file = button.dataset.href;
      button.addEventListener("click", (e) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: [file],
          });
        });
        button.setAttribute(
          "aria-pressed",
          button.getAttribute("aria-pressed") === "true" ? "false" : "true",
        );
      });
    });
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Check if we need to reset checkboxes due to a URL change
  chrome.storage.sync.get(['shouldResetCheckboxes'], function (result) {
    if (result.shouldResetCheckboxes) {
      resetCheckboxes();
      // Clear the flag after resetting
      chrome.storage.sync.set({ shouldResetCheckboxes: false });
    } else {
      // Load saved checkbox states if no reset is needed
      chrome.storage.sync.get(['checkboxStates'], function (result) {
        const savedStates = result.checkboxStates || {};
        checkboxes.forEach((checkbox) => {
          checkbox.checked = savedStates[checkbox.id] || false;
        });
      });
    }
  });

  // Save checkbox state when checkboxes are clicked
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      const checkboxStates = {};
      checkboxes.forEach((checkbox) => {
        checkboxStates[checkbox.id] = checkbox.checked;
      });
      chrome.storage.sync.set({ checkboxStates: checkboxStates });
    });
  });

  // Function to reset checkboxes
  function resetCheckboxes() {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    chrome.storage.sync.set({ checkboxStates: {} });
  }
});



