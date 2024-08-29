(() => {
	const injectStyles = (css) => {
		const style = document.createElement("style");
		style.innerHTML = css;
		document.head.appendChild(style);
		return style;
	};
	injectStyles(`
    .langSpan{
        color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;margin:0 2px; padding:2px;speak:literal-punctuation;
    }
`);
	const divs = document.querySelectorAll(".langSpan");
	if (divs.length > 0) {
		divs.forEach((div) => div.remove());
	} else {
		const newElement = document.createElement("div");
		newElement.innerHTML =
			'<strong class="langSpan" id="langInfo" role="status"></strong>';
		document.body.insertBefore(newElement, document.body.firstElementChild);
		if (
			document.getElementsByTagName("html")[0].getAttribute("xml:lang") &&
			document.documentElement.lang
		) {
			document.getElementById("langInfo").innerHTML +=
				'HTML document has lang="' +
				document.documentElement.lang +
				'" AND? xml:lang="' +
				document
					.getElementsByTagName("html")[0]
					.getAttribute("xml:lang") +
				'" on page titled: ' +
				document.title;
		} else if (document.documentElement.lang) {
			document.getElementById("langInfo").innerHTML +=
				'HTML document has lang="' +
				document.documentElement.lang +
				'" on page titled: ' +
				document.title;
		} else if (
			document.getElementsByTagName("html")[0].getAttribute("xml:lang")
		) {
			document.getElementById("langInfo").innerHTML +=
				'HTML document has xml:lang="' +
				document
					.getElementsByTagName("html")[0]
					.getAttribute("xml:lang") +
				'" on page titled: ' +
				document.title;
		} else {
			document.getElementById("langInfo").innerHTML +=
				"HTML document has no lang or xml:lang attributes on page titled: " +
				document.title;
		}
		let langEls = document.querySelectorAll("[lang]:not(html)");
		if (langEls.length > 0) {
			langEls.forEach((langEl) => {
				langEl.insertAdjacentHTML(
					"afterend",
					`
            <span class="langSpan">lang="${langEl.getAttribute("lang")}"</span>
        `,
				);
			});
		}
	}
})();