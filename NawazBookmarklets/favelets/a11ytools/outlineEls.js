javascript: (function() {
	function outlineEls() {
		let e = prompt("What HTML element? [Tip: any valid CSS selector will work]"),
			l = prompt("What color? [color name or hex value works]", "red");
		var o = document.querySelectorAll(e);
		Array.from(o).forEach(e => {
			e.style.boxShadow = "0px 0px 0px 10px white", e.style.outline = "3px solid " + l, e.style.outlineOffset = "-2px"
		})
	}
	outlineEls();
})()