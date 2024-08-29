javascript: (function(e) {
	var d = "a:not([href]) {border:3px solid red; padding:2px; }  ",
		f = e.getElementById("a11y-css-highlight");
	if (f) {
		f.disabled = !f.disabled
	} else {
		f = e.createElement("style");
		f.id = "a11y-css-highlight";
		f.type = "text/css";
		if (f.styleSheet) {
			f.styleSheet.cssText = d
		} else {
			f.appendChild(e.createTextNode(d))
		}
		e.getElementsByTagName("head")[0].appendChild(f)
	}
})(document);