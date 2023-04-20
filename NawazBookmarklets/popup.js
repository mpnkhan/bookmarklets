const bookmarklets = [
  {
    name: "Show Tab Focus ",
    file: "favelets/ShowFocus.js"
  }
  ,{
    name: "Log Focus",
    file: "favelets/LogFocus.js"
  }
  ,{
    name: "Focus Order",
    file: "favelets/FocusOrder.js"
  }
  ,{
    name: "Missing Alternate text",
    file: "favelets/MissingAlt.js"
  }
  ,{
    name: "List of Links",
    file: "favelets/ListLinks.js"
  }
  ,{
    name: "List of Headings",
    file: "favelets/ListHeadings.js"
  }
  ,{
    name: "List of Images",
    file: "favelets/ListImages.js"
  }
  ,{
    name: "List of Landmark Roles",
    file: "favelets/ListLandMarks.js"
  }
  ,{
    name: "Target Size",
    file: "favelets/TargetSize.js"
  }
  ,{
    name: "Text Spacing",
    file: "favelets/TextSpacing.js"
  }
  ,{
    name: "Aria Hidden",
    file: "favelets/Aria-hidden.js"
  }
  ,{
    name: "Validate with W3C",
    file: "favelets/W3CValidation.js"
  }

];

const createBookmarkletListItem = (bookmarklet, index) => {
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.setAttribute("aria-pressed","false");
  button.classList.add("btn");
  button.textContent = bookmarklet.name;
  button.addEventListener("click", (e) => {
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: [bookmarklet.file]
      });
    });
  
    const elem =e.target;
    // console.log(elem.getAttribute("aria-pressed"))
    elem.setAttribute('aria-pressed', elem.getAttribute("aria-pressed") === 'true' ? 'false' : 'true');
  });
  li.appendChild(button);
  return li;
};

document.addEventListener("DOMContentLoaded", () => {
  const bookmarkletList = document.getElementById("bookmarklets");
  bookmarklets.forEach((bookmarklet, index) => {
    const listItem = createBookmarkletListItem(bookmarklet, index);
    bookmarkletList.appendChild(listItem);
  });
});