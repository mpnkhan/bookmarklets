(function () {
	try {
		var s = document.createElement('style');
		var b = document.getElementsByTagName('body').item(0);
		var counter = 0;
		s.innerHTML = '.FocusOrder{position:absolute;border:.1rem solid #00f;border-radius:50%;background:#00f;color:#fff;padding:.25rem .5rem;font-family:\'Segoe UI\',-apple-system,BlinkMacSystemFont,Roboto,Oxygen-Sans,Ubuntu,Cantarell,\'Helvetica Neue\',sans-serif;text-align:center;min-width:1rem;line-height:1;box-shadow:.2rem .2rem .2rem rgba(0,0,0,.5);margin-left:-.5rem;margin-top:-.75rem}';
		document.getElementsByTagName('head').item(0).appendChild(s);
		for (var e = document.querySelectorAll("a[href], area[href], input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, object, embed, summary, [tabindex]:not([tabindex='-1']), [contenteditable=true], video[controls], audio[controls]"), t = 0; t < e.length; t++) ! function (t) {
			var rect = e[t].getBoundingClientRect();
			if(rect.top != 0 && rect.left != 0) {
				var sp = document.createElement('span');
				sp.classList.add('FocusOrder');
				sp.innerText = ++counter;
				sp.setAttribute('style', `top:${rect.top}px;left:${rect.left}px;z-index:3000`);
				b.appendChild(sp);

			}
		}(t);
	} catch (e) {
		console.log(e)
	}
})();