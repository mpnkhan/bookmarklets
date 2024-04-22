javascript: (function() {
	'use strict'

	function isolateImages() {
		const els = document.querySelectorAll('*');
		const page = document.querySelector('body');
		console.log("els.length", els.length);
		Array.from(els).forEach(function(el) {
			el.style.color = "transparent";
			el.style.background = "transparent";
			el.style.borderColor = "transparent";
			el.style.outline = "transparent";
			el.style.fontSize = "1px";
		});
		page.style.zoom = "50%";

		const imgs = document.querySelectorAll('img,[role=img]');
		Array.from(imgs).forEach(function(img) {
			img.style.outline = "10px solid black";
			img.style.outlineOffset = "-10px";
		});
	}
	isolateImages();
})()