(() => {
	const injectStyles = (css) => {
		const style = document.createElement("style");
		style.innerHTML = css;
		document.head.appendChild(style);
		return style;
	};

	injectStyles(
		`
.landmarkSpan{
    color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;
}
.outlineTemp{
    outline:green 2px solid;padding:2px;
}
`,
	);
	const divs = document.querySelectorAll(".landmarkSpan");
	if (divs.length > 0) {
		divs.forEach((div) => div.remove());
		document
			.querySelectorAll(".outlineTemp")
			.forEach((outlineTemp) =>
				outlineTemp.classList.remove("outlineTemp"),
			);
	} else {
		const newElement = document.createElement("div");
		newElement.innerHTML =
			'<strong class="landmarkSpan" id="landInfo"  role="status"></strong>';
		document.body.insertBefore(newElement, document.body.firstElementChild);
		let landFound = false;

		document
			.querySelectorAll(
				"[role=main], [role=search], [role=contentinfo], [role=banner], [role=navigation], [role=complementary], [role=application]",
			)
			.forEach((land) => {
				landFound = true;
				land.classList.add("outlineTemp");
				land.insertAdjacentHTML(
					"beforebegin",
					`<span class="landmarkSpan">role= ${land.getAttribute("role")}</span>`,
				);
			});

		document
			.querySelectorAll("main, banner, footer, header, aside, nav")
			.forEach((section) => {
				section.classList.add("outlineTemp");
				section.insertAdjacentHTML(
					"beforebegin",
					`<span class="landmarkSpan">role=&lt;${section.tagName.toLowerCase()}&gt;</span>`,
				);
			});

		if (!landFound) {
			document.getElementById("landInfo").innerHTML +=
				"No Landmarks  Found on Page: " + document.title;
		}
	}
})();
