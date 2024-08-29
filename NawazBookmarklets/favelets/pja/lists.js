(() => {
	const injectStyles = (css) => {
		const style = document.createElement("style");
		style.innerHTML = css;
		document.head.appendChild(style);
		return style;
	};
	injectStyles(`
    .listSpan{
        color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;margin:0 2px; padding:2px;speak:literal-punctuation;
    }
    .outlineRed{
        outline: red 2px solid;padding:2px;
    }
    .outlineGreen{
        outline:green 2px solid;padding:2px;
    }    
`);
	const divs = document.querySelectorAll(".listSpan");
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
			'<strong class="listSpan" id="listInfo" role="status"></strong>';
		document.body.insertBefore(newElement, document.body.firstElementChild);
		let listFound = false;
		document
			.querySelectorAll("ul > :not(li),ol > :not(li)")
			.forEach((childNotList) => {
				const parentList = childNotList.parentElement;
				childNotList.classList.add("outlineRed");
				parentList.classList.add("outlineRed");
				parentList.insertAdjacentHTML(
					"afterbegin",
					`<strong class="listSpan">❌NO CHILD LI</strong>`,
				);
			});
		document
			.querySelectorAll("ul, ol, dl")
			.forEach((listEl) => listEl.classList.add("outlineGreen"));
		document
			.querySelectorAll("ul, ol, dl, li, dd, dt")
			.forEach((listEl) => {
				listFound = true;
				listEl.insertAdjacentHTML(
					"afterbegin",
					`<strong class="listSpan">&lt;${listEl.tagName.toLowerCase()}&gt;</strong>`,
				);
				listEl.insertAdjacentHTML(
					"beforeend",
					`<strong class="listSpan">&lt;/${listEl.tagName.toLowerCase()}&gt;</strong>`,
				);
			});
		if (!listFound)
			document.getElementById("listInfo").innerHTML +=
				"No Lists  Found on Page: " + document.title;
	}
})();