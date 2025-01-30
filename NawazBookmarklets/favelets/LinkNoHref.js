(() => {
    const injectStyles = (css) => {
        const style = document.createElement("style");
        style.innerHTML = css;
        document.head.appendChild(style);
        return style;
    };
    injectStyles(`
    .hrefSpan{
        color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;margin:0 2px; padding:2px;speak:literal-punctuation;
    }
    .outlineRed{
        outline: red 2px solid;padding:2px;
    }    
`);
    const divs = document.querySelectorAll(".hrefSpan");
    if (divs.length > 0) {
        divs.forEach((div) => div.remove());
        document.querySelectorAll(".outlineRed").forEach((outlineTemp) => outlineTemp.classList.remove("outlineRed"));
    } else {
        document.querySelectorAll("a").forEach((link) => {
            if (link.textContent.trim() === "") {
                link.classList.add("outlineRed");
                link.insertAdjacentHTML(
                    "afterbegin",
                    `<strong class="hrefSpan">Empty link</strong>`,
                );
            }
            if (!link.hasAttribute("href") && !link.hasAttribute("name")) {
                link.classList.add("outlineRed");
                link.insertAdjacentHTML(
                    "afterbegin",
                    `<strong class="hrefSpan">Nohref</strong>`,
                );
            }
        });
    }
})();