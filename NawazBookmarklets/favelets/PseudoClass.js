/*
https://www.w3.org/TR/WCAG20-TECHS/F87.html
F87: Failure of Success Criterion 1.3.1 due to 
inserting non-decorative content by using 
:before and :after pseudo-elements and the 'content' property in CSS
*/
(() => {
	const injectStyles = (css) => {
		const style = document.createElement("style");
		style.innerHTML = css;
		document.head.appendChild(style);
		return style;
	};
	injectStyles(`
    .psuedoContentSpan{
        color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;margin:0 2px; padding:2px;speak:literal-punctuation;
    }
    .outlineRed{
        outline: red 2px solid;padding:2px;
    }    
`);
	const isVisible = (element) => {
		while (element) {
			const style = window.getComputedStyle(element);
			const ariaHidden = element.getAttribute("aria-hidden");
			if (
				style.display === "none" ||
				style.visibility === "hidden" ||
				style.opacity === "0" ||
				ariaHidden === "true"
			) {
				return false;
			}
			element = element.parentElement;
		}
		return true;
	};
	const divs = document.querySelectorAll(".psuedoContentSpan");
	if (divs.length > 0) {
		divs.forEach((div) => div.remove());
		document
			.querySelectorAll(".outlineRed")
			.forEach((outlineTemp) =>
				outlineTemp.classList.remove("outlineRed"),
			);
	} else {
		document.querySelectorAll("*").forEach((element) => {
			if (isVisible(element)) {
				const before = window.getComputedStyle(element, "::before");
				const after = window.getComputedStyle(element, "::after");
				const parentElement = element.parentElement;

				// Check if the content property of ::before or ::after is not 'none' or empty
				if (
					before.content &&
					before.content !== "none" &&
					before.content !== '""'
				) {
					parentElement.classList.add("outlineRed");
					parentElement.insertAdjacentHTML(
						"afterend",
						`<span class="psuedoContentSpan">before:: "${before.content}"</span>`,
					);
				}
				if (
					after.content &&
					after.content !== "none" &&
					after.content !== '""'
				) {
					parentElement.classList.add("outlineRed");
					parentElement.insertAdjacentHTML(
						"afterend",
						`<span class="psuedoContentSpan">after:: "${after.content}"</span>`,
					);
				}
			}
		});
	}
})();