(() => {
	const injectStyles = (css) => {
		const style = document.createElement("style");
		style.innerHTML = css;
		document.head.appendChild(style);
		return style;
	};
	const getTxtContents = (elem) => {
		return Array.from(elem.childNodes)
			.filter((node) => node !== elem)
			.map((node) => node.textContent || "")
			.join("")
			.trim();
	};
	injectStyles(
		`
.imageSpan{
    color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;margin:0 2px; padding:2px;speak:literal-punctuation;
}
    .outlineGreen{
        outline:green 2px solid;padding:2px;
    }
    .outlineRed{
        outline: red 2px solid;padding:2px;
    }
`,
	);
	const divs = document.querySelectorAll(".imageSpan");
	if (divs.length > 0) {
		divs.forEach((div) => div.remove());
		document
			.querySelectorAll(".outlineGreen,.outlineRed")
			.forEach((outlineTemp) => {
				outlineTemp.classList.remove("outlineRed");
				outlineTemp.classList.remove("outlineGreen");
			});
	} else {
		document
			.querySelectorAll("a[alt], button[alt], label[alt]")
			.forEach((invalidAlt) => {
				invalidAlt.insertAdjacentHTML(
					"beforebegin",
					`
        <span class="imageSpan">
           INVALID❌alt=$(invalidAlt.getAttribute('alt')  on ${invalidAlt.tagName}
        </span>
`,
				);
			});
		document.querySelectorAll("img, [role=img], svg").forEach((elem) => {
			// Check for aria-labelledby
			const labelledBy = elem.getAttribute("aria-labelledby");
			const ariaLabel = elem.getAttribute("aria-label");
			// const alt = elem.alt;
			const alt = elem.getAttribute("alt");
			let title = elem.getAttribute("title");
			if (elem.tagName.toLowerCase() === "svg") {
				title = elem.querySelector("title")?.textContent;
			}
			const imgRole = elem.getAttribute("role");
			let parentFigure = elem.closest("figure");

			let spanTxt,
				hidden = false;
			if (imgRole) {
				elem.insertAdjacentHTML(
					"afterend",
					`
            <span class="imageSpan">
               ❓role= "${imgRole}"
            </span>            
        `,
				);
			}
			if (elem.getAttribute("aria-hidden") === "true") {
				elem.insertAdjacentHTML(
					"afterend",
					`
            <span class="imageSpan">Hidden</span>            
        `,
				);
			}
			if (labelledBy) {
				elem.classList.add("outlineGreen");
				const labelIds = labelledBy.split(" ");
				const labelledByText = labelIds
					.map((id) => {
						const labelElement = document.getElementById(id);
						return labelElement
							? labelElement.innerText ||
									labelElement.textContent ||
									""
							: "";
					})
					.join(" ")
					.trim();
				spanTxt = "Labelledby Ids: " + labelledBy;
				if (labelledByText) {
					spanTxt += " : AccName - " + labelledByText;
				}
				elem.insertAdjacentHTML(
					"afterend",
					`
            <span class="imageSpan">
               ${spanTxt}
            </span>            
        `,
				);
			} else if (ariaLabel) {
				elem.classList.add("outlineGreen");
				elem.insertAdjacentHTML(
					"afterend",
					`
            <span class="imageSpan">
               ❓AccName from aria-label="${ariaLabel}"
            </span>            
        `,
				);
			} else if (alt != null) {
				elem.classList.add("outlineGreen");
				if (alt.trim() === "") {
					elem.insertAdjacentHTML(
						"afterend",
						'<span class="imageSpan">Empty alt:Presentation </span>',
					);
				} else {
					elem.insertAdjacentHTML(
						"afterend",
						`
                <span class="imageSpan">
                   ❓AccName from alt="${elem.getAttribute("alt")}"
                </span>            
            `,
					);
				}
			} else if (title) {
				elem.classList.add("outlineGreen");
				elem.insertAdjacentHTML(
					"afterend",
					`
            <span class="imageSpan">
               ❓AccName from title="${title}"
            </span>            
        `,
				);
			} else if (parentFigure) {
				elem.classList.add("outlineGreen");
				const figcaption = parentFigure.querySelector("figcaption");
				if (figcaption) {
					elem.insertAdjacentHTML(
						"afterend",
						`
                <span class="imageSpan">
                   ❓AccName from figcaption="${figcaption.textContent.trim()}"
                </span>            
            `,
					);
				}
			} else {
				if (elem.tagName.toLowerCase() === "img") {
					elem.classList.add("outlineRed");
					elem.insertAdjacentHTML(
						"afterend",
						`
                    <span class="imageSpan">No Alt text</span>            
                `,
					);
				}
			}
			if (elem.tagName.toLowerCase() === "svg") {
				if (imgRole) {
					const svgTxt = getTxtContents(elem);
					if (svgTxt) {
						elem.classList.add("outlineGreen");
						elem.insertAdjacentHTML(
							"afterend",
							`
                    <span class="imageSpan">❓AccName from innerText: ${svgTxt}</span>
                `,
						);
					}
				} else {
					elem.classList.add("outlineRed");
					elem.insertAdjacentHTML(
						"afterend",
						`
                <span class="imageSpan">Missing image role for SVG</span>            
            `,
					);
				}
			}
		});
	}
})();