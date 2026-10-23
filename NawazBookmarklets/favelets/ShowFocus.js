javascript: (function () {
	if (window.__showTabFocus) return;
	window.__showTabFocus = true;

	var WHITE = { r: 255, g: 255, b: 255, a: 1 };
	var rgbPattern = /rgba?\(([^)]+)\)/;
	var splitPattern = /[\s,\/]+/;
	var active = null;

	// Same rgba() parsing cca.js uses for getComputedStyle colors.
	function parseAlpha(value) {
		var amount = parseFloat(value);
		if (isNaN(amount)) return 1;
		return value.indexOf("%") === -1 ? amount : amount / 100;
	}

	function parseColor(value) {
		var match = String(value).match(rgbPattern);
		if (!match) return null;
		var parts = match[1].split(splitPattern).filter(function (part) {
			return part.length > 0;
		});
		if (parts.length < 3) return null;
		return {
			r: parseFloat(parts[0]),
			g: parseFloat(parts[1]),
			b: parseFloat(parts[2]),
			a: parts.length > 3 ? parseAlpha(parts[3]) : 1,
		};
	}

	function nextBackgroundNode(node) {
		if (node.parentElement) return node.parentElement;
		var root = node.getRootNode && node.getRootNode();
		return root && root.host ? root.host : null;
	}

	// Outline is drawn outside the box, so the adjacent color is the first
	// painted ancestor — the same walk as cca.js, starting at the parent.
	// Translucent layers are flattened onto that backdrop so the ratio uses
	// the color actually on screen.
	function backgroundBehind(el) {
		var layers = [];
		var unreliable = false;
		for (var node = nextBackgroundNode(el); node; node = nextBackgroundNode(node)) {
			var style = getComputedStyle(node);
			var image = style.backgroundImage;
			if (image && image !== "none") unreliable = true;
			var bg = parseColor(style.backgroundColor);
			if (bg && bg.a > 0) layers.push(bg);
			if (bg && bg.a >= 1) break;
		}
		var color = WHITE;
		for (var i = layers.length - 1; i >= 0; i--) color = composite(layers[i], color);
		return { color: color, unreliable: unreliable };
	}

	function composite(fg, bg) {
		var alpha = fg.a + bg.a * (1 - fg.a);
		if (alpha === 0) return WHITE;
		return {
			r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
			g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
			b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
			a: alpha,
		};
	}

	// WCAG relative luminance (same coefficients as cca.js).
	function channel(value) {
		var srgb = value / 255;
		return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
	}

	function luminance(color) {
		return 0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b);
	}

	function contrast(a, b) {
		var lighter = luminance(a) + 0.05;
		var darker = luminance(b) + 0.05;
		return lighter > darker ? lighter / darker : darker / lighter;
	}

	// 1.4.11 and 2.4.13 need 3:1. Black or white always clears that on a solid color.
	function outlineColor(bg) {
		var black = { r: 0, g: 0, b: 0, a: 1 };
		var white = { r: 255, g: 255, b: 255, a: 1 };
		var onBlack = contrast(black, bg);
		var onWhite = contrast(white, bg);
		if (onWhite >= 3 && onWhite > onBlack) return "#ffffff";
		return "#000000";
	}

	function remember(el) {
		return {
			el: el,
			props: ["outline", "outline-offset", "box-shadow"].map(function (name) {
				return {
					name: name,
					value: el.style.getPropertyValue(name),
					priority: el.style.getPropertyPriority(name),
				};
			}),
		};
	}

	function restore(record) {
		if (!record) return;
		record.props.forEach(function (prop) {
			if (prop.value) record.el.style.setProperty(prop.name, prop.value, prop.priority);
			else record.el.style.removeProperty(prop.name);
		});
	}

	function styleFocus(e) {
		var path = e.composedPath && e.composedPath();
		var el = (path && path[0]) || e.target || e.srcElement;
		if (!el || el.nodeType !== 1) return;
		if (active && active.el === el) return;
		restore(active);
		var behind = backgroundBehind(el);
		active = remember(el);
		// 2px meets the 2.4.13 perimeter. Offset keeps the ring off the control
		// so it is judged against the surrounding background.
		el.style.setProperty("outline-offset", "2px", "important");
		if (behind.unreliable) {
			el.style.setProperty("box-shadow", "0 0 0 2px #ffffff", "important");
			el.style.setProperty("outline", "2px solid #000000", "important");
			return;
		}
		el.style.setProperty("outline", "2px solid " + outlineColor(behind.color), "important");
	}

	document.addEventListener("focus", styleFocus, true);
})();
