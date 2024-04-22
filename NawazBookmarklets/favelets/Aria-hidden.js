javascript: (function (c) {
	var a =
			"[aria-hidden]{background:yellow;display:block!important;visibility:visible!important;}[aria-hidden]:before{content:attr(aria-hidden);color:red;font-weight:bold;display:inline-block;}",
		b = c.getElementById("a11y-hidden-highlight");
	if (b) {
		b.disabled = !b.disabled;
	} else {
		b = c.createElement("style");
		b.id = "a11y-hidden-highlight";
		b.type = "text/css";
		if (b.styleSheet) {
			b.styleSheet.cssText = a;
		} else {
			b.appendChild(c.createTextNode(a));
		}
		c.getElementsByTagName("head")[0].appendChild(b);
	}
})(document);