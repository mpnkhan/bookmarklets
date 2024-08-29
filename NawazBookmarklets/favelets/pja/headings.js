(() => {
    const injectStyles = (css) => {
        const style = document.createElement("style");
        style.innerHTML = css;
        document.head.appendChild(style);
        return style;
    };
    injectStyles(
        `
.headSpan{
    color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;margin:0 2px; padding:2px;speak:literal-punctuation;
}
`,
    );
    const divs = document.querySelectorAll(".headSpan");
    if (divs.length > 0) {
        divs.forEach((div) => div.remove());
    } else {
        const newElement = document.createElement("div");
        newElement.innerHTML =
            '<strong class="headSpan" id="headInfo" role="status"></strong>';
        document.body.insertBefore(newElement, document.body.firstElementChild);
        let headingsFound = false;

        document.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach((h) => {
            headingsFound = true;
            h.innerHTML = `
        <strong class="headSpan">&lt;${h.tagName}&gt;</strong>
            ${h.innerHTML}
        <strong class="headSpan">&lt;/${h.tagName}&gt;</strong>
`;
        });
        document
            .querySelectorAll("[role=heading][aria-level]")
            .forEach((roleHeading) => {
                headingsFound = true;
                roleHeading.innerHTML = `
    <strong class="headSpan" >&lt;[role=heading][aria-level=${roleHeading.getAttribute("aria-level")}]&gt;</strong>
    ${roleHeading.innerHTML}
    <strong class="headSpan" >&lt;[role=heading][aria-level=${roleHeading.getAttribute("aria-level")}]&gt;</strong>
`;
            });
        if (!headingsFound) {
            document.getElementById("headInfo").innerHTML +=
                "No Headings Found on Page: " + document.title;
        }
    }
})();