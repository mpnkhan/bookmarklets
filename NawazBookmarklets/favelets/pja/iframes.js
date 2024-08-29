(() => {
  const injectStyles = (css) => {
    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);
    return style;
  };
  injectStyles(`
    .iframeSpan{
        color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;margin:0 2px; padding:2px;speak:literal-punctuation;
    }
    .outlineGreen{
        outline:green 2px solid;padding:2px;
    }
    .outlineRed{
        outline: red 2px solid;padding:2px;
    }    
    
`);
  const divs = document.querySelectorAll(".iframeSpan");
  if (divs.length > 0) {
    divs.forEach((div) => div.remove());
    document
      .querySelectorAll(".outlineGreen,.outlineRed")
      .forEach((outlineTemp) => {
        outlineTemp.classList.remove("outlineRed");
        outlineTemp.classList.remove("outlineGreen");
      });
  } else {
    const newElement = document.createElement("div");
    newElement.innerHTML =
      '<strong class="iframeSpan" id="iframeInfo" role="status"></strong>';
    document.body.insertBefore(newElement, document.body.firstElementChild);
    let iframeFound = false;
    document
      .querySelectorAll('iframe:not([aria-hidden="true"])')
      .forEach((iframe) => {
        const title = iframe.getAttribute("title");
        const name = iframe.getAttribute("name");
        const src = iframe.getAttribute("src");
        let spanTxt;
        iframeFound = true;
        if (!title) {
          iframe.classList.add("outlineRed");
          if (name)
            spanTxt = `
                   <span class="iframeSpan">
                       &lt;iframe❌NO TITLE name="${name}" src="${src}" &gt;</span>
                    `;
          else
            spanTxt = `
                   <span class="iframeSpan">
                       &lt;iframe❌NO TITLE src="${src}" &gt;</span>
                    `;
        } else {
          iframe.classList.add("outlineGreen");
          if (name)
            spanTxt = `
                   <span class="iframeSpan">
                       &lt;iframe 👍 title=${title} name="${name}" src="${src}" &gt;</span>
                    `;
          else
            spanTxt = `
                   <span class="iframeSpan">
                       &lt;iframe title=${title} src="${src}" &gt;</span>
                    `;
        }
        iframe.insertAdjacentHTML("beforebegin", spanTxt);
      });
    if (!iframeFound)
      document.getElementById("iframeInfo").innerHTML +=
        "No Iframes  Found on Page: " + document.title;
  }
})();