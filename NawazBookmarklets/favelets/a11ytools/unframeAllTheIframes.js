javascript: (function() {
	'use strict'

	function unframeAllTheIframes() {
		console.clear();
		let links = "";
		const iframes = document.querySelectorAll('iframe');
		Array.from(iframes).forEach(function(iframe) {
			if (iframe.src.indexOf("http") === 0) {
				links += "<a class=\"unframed-link\" href=\"" + iframe.src + "\" target=\"_blank\">iFrame</a>";
			}
		});
		let newDiv = document.createElement("DIV");
		newDiv.innerHTML = links;
		newDiv.setAttribute("id", "unframedLinksContainer");
		document.querySelector("body").appendChild(newDiv);
		const iframeLinks = document.querySelectorAll('.unframed-link');
		Array.from(iframeLinks).forEach(function(iframeLink) {
			iframeLink.click();
		});
		setTimeout(function() {
			document.querySelector('#unframedLinksContainer').remove();
		}, 500);

	}
	unframeAllTheIframes();
})()