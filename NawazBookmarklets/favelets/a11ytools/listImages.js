javascript: (function() {
	'use strict'

	function listImages() {
		console.clear();

		function isHidden(el) {
			const style = window.getComputedStyle(el);
			return ((style.display === 'none') || (style.opacity === 0) || ((style.clipPath === 'inset(100%)') && (style
				.clip === 'rect(1px, 1px, 1px, 1px)')) || ((style.height === '1px') && (style.width === '1px') && (style
				.overflow === 'hidden')));
		}

		function attemptoToUnhide(el) {
			const style = window.getComputedStyle(el);

			if ((style.position === "absolute") && (style.overflow === 'hidden')) {
				el.style.height = 'auto';
				el.style.width = 'auto';
				el.style.position = 'relative';
				el.style.overflow = 'visible';
				el.style.display = 'block';
				el.style.opacity = 1;
			}

			if ((el.getAttribute('hidden') === "") || (el.getAttribute('hidden') === "hidden") || (el.getAttribute(
					'hidden') === "true")) {
				el.removeAttribute('hidden');
			}

			if (style.visibility === 'hidden') {
				el.style.visibility = 'visible';
			}

			if (style.display === 'none') {
				el.style.display = 'block';
			}

			if (style.opacity === 0) {
				el.style.opacity = 1;
			}
		}

		let s = '';
		let row = '';
		const imgs = document.querySelectorAll('img,[role=img]');
		let i = 1;
		let imgType;
		let issueCount = 0;
		let snippet = '';
		let consoleOutput = '';

		Array.from(imgs).forEach(function(img) {
			const wrap = document.createElement('div');
			wrap.appendChild(img.cloneNode(true));
			snippet = wrap.innerHTML;
			let notes = '';
			let noAlt = false;
			let emptyAlt = false;
			let warn = false;
			let err = false;

			const ariaHiddenEl = img.querySelector('[aria-hidden=true]');
			if (ariaHiddenEl) {
				ariaHiddenEl.classList.add('remove-from-accname');
			}

			img.setAttribute('data-img-ref', i);
			let alt = img.getAttribute('alt');

			if (alt === null) {
				alt = "NO_ALT_ATTRIBUTE";
				noAlt = true;
			} else {
				if (alt === '') {
					alt = "EMPTY_ALT_ATTRIBUTE";
					emptyAlt = true;
				}
			}
			let accName = alt;

			const imgSrc = img.getAttribute('src');

			if (isHidden(img)) {
				attemptoToUnhide(img);
				if (isHidden(img)) {
					notes += 'img is hidden.<br>';
				} else {
					notes += 'img *was* hidden but has been temporarily revealed on the page.<br>';
				}
			}
			if (noAlt) {
				if (!((img.getAttribute('role') === 'img') && (img.tagName !== 'IMG'))) {
					notes = '- img has no <code>alt</code> attribute.<br>';
					err = true;
				}
			}

			if (emptyAlt) {
				notes = '- img has an empty <code>alt</code> attribute. This will hide it from AT. Is this correct?.<br>';
				warn = true;
			}

			if ((img.getAttribute('role') === 'presentation') || (img.getAttribute('role') === 'none')) {
				notes += '- img has a <code>role</code> set (\'' + img.getAttribute('role') + '\') that will hide it from AT. Is this correct?.<br>';
				warn = true;
			}

			if (img.getAttribute('aria-hidden') === 'true') {
				notes += '- img has an <code>aria-hidden=true</code>, so it will be hidden from AT. Is this correct?.<br>';
				warn = true;
			}
			if (img.getAttribute('title')) {
				if (alt === 'EMPTY_ALT_ATTRIBUTE') {
					notes += '- img has a <code>title</code> AND an empty <code>alt</code> attribute. Because of the empty alt, the image will be hidden to AT, so the title attribute is not used/exposed.<br>';
					warn = false;
					err = true;
				} else {
					notes += '- img has a <code>title</code> attribute. This <code>title</code> content -- "' +
						img.getAttribute('title') +
						'" -- will not be perceivable to assistive tech, keyboard and touch screen users.<br>';
					if (noAlt) {
						err = true;
					} else {
						warn = true;
					}
				}
			}

			if (img.getAttribute('role') === 'button') {
				notes += '- img has a <code>role</code> of <code>button</code>. Check that it behaves like a <code>button</code>.<br>';
				warn = true;
			}
			if (img.getAttribute('role') === 'img') {
				notes += '- Not an inline img, so no <code>alt</code> attribute.<br>';
			}

			if ((img.getAttribute('role') === 'img') && (img.getAttribute('alt') !== null)) {
				if (img.tagName !== 'IMG') {
					notes += '- Background image has an <code>alt</code> attribute specified, but cannot be applied to this element; can only be applied to <code>img</code> element.<br>';
					warn = false;
					err = true;
				}
			}

			if (img.tagName !== 'IMG' && img.getAttribute('role') === 'img') {
				notes += '- This has a <code>role</code> of <code>img</code> but is not an <code>img</code> element.<br>';
			}

			if (img.getAttribute('role') === 'img') {
				let hasLabel = false;
				if (img.tagName !== 'IMG') {
					const style = img.currentStyle || window.getComputedStyle(img, false),
						imgSrc = style.backgroundImage.slice(4, -1).replace(/"/g, "");
					if (img.getAttribute('aria-label') !== null) {
						hasLabel = true;
						alt = img.getAttribute('aria-label');
						accName = alt;
						notes += '- Accessible name provided by an <code>aria-label</code> attribute.<br>';
						warn = false;
					}
					if (!hasLabel) {
						if (img.getAttribute('aria-labelledby') !== null) {
							hasLabel = true;
							const source = img.getAttribute('aria-labelledby');
							const sources = source.split(' ');
							if (sources.length > 1) {
								alt = '';
								Array.from(sources).forEach(function(source) {
									alt += document.querySelector('#' + source).textContent + ' ';
								});
								alt = alt.trim();
								notes += '- Image gets accessible name from <code>aria-labelledby</code> (multiple sources). Check that the accessible name does not contradict the image on screen<br>';
								warn = true;
							} else {
								alt = document.querySelector('#' + img.getAttribute('aria-labelledby')).textContent;
								notes += '- Image gets accessible name from <code>aria-labelledby</code> (single source). Check that the accessible name does not contradict the image on screen<br>';
								warn = true;
							}
							accName = alt;
						}
					}
				}
				if (!hasLabel) {
					notes += '- Image has no accessible name provided. It must be set using <code>aria-labelledby</code> or <code>aria-label</code> (not <code>alt</code>)<br>';
					err = true;
				}
			}

			if (accName === "") {
				if (img.getAttribute('title')) {
					accName = img.getAttribute('title');
				} else {
					accName = "‼️ No alt, no title";
				}
				notes += '‼️ No alt.<br>';
				err = true;
			}

			if (err) {
				warn = false
			}
			row += '<tr';
			row += ' data-img-ref="' + i + '"';

			if (warn) {
				row += ' class="issue warn"';
			}

			if (err) {
				row += ' class="issue err"';
			}

			row += '>';

			if (img.tagName === 'IMG') {
				imgType = '<code>&lt;img&gt;</code>';
			} else {
				imgType = '<code>role="img"</code>';
			}

			if ((accName === 'NO_ALT_ATTRIBUTE') || (accName === 'EMPTY_ALT_ATTRIBUTE')) {
				alt = '';
				accName = '';
			}

			row += '<td>' + imgType + '</td>';
			// row += '<td><img src="' + imgSrc + '" alt="" style="max-width:200px;max-height:200px;"></td>';
			row += '<td><img src="' + imgSrc + '" alt=""></td>';
			row += '<td>' + accName;
			if ((accName.trim() !== alt.trim()) && (alt.trim() !== '')) {
				row += '<div class="anDiff">Accessible name differs</div>';
			}
			row += '</td>';
			if ((accName.trim() !== alt.trim()) && (accName.trim().toLowerCase() === alt.trim()
					.toLowerCase())) {
				notes += '- Same text but case difference noted (likely not an issue)';
			}
			row += '<td>';
			if (warn) {
				row += '<div class="issues">Possible issue(s) found with this image</div>';
			}
			if (err) {
				row += '<div class="issues">Definite issue(s) found with this image</div>';
				consoleOutput = 'Image \'' + imgSrc + '\':\n' + notes + 'Markup with issue:\n' + snippet + '\n---------------\n';
			}
			row += notes + '</td>';
			row += '<td><div class="snippet"><label for="snip' + i + '">Markup snippet</label><textarea rows="10" cols="100" id="snip' + i + '" aria-label="Markup snippet for this node">' + snippet + '</textarea></div></td>';
			row += '</tr>';
			i++;
			if (warn || err) {
				issueCount++;
				consoleOutput = consoleOutput.split('<code>').join('`').split('</code>').join('`').split('<br>').join('\n').split('\n\n').join('\n');
				console.log(consoleOutput);
			}
		});
		s = '<style>[aria-pressed=true]{color:white;background:darkred;};div.issues{font-weight:bold;};textarea {margin:5px 0;}.snippet label {font-weight:bold;font-size:0.8em;color:black;}.snippet{background:#efefef;outline:1px solid #666;padding:5px;margin-top:5px;}.checkDiffs{background:PapayaWhip;}.anDiff{color:red;font-weight:bold;font-size:10px;display:block}.warn {background:lightyellow;}.err {background:PapayaWhip;color:red;}.visually-hidden,.a11y,.visuallyhidden,.sr-text,.sr-only {clip-path: inset(100%);clip: rect(1px, 1px, 1px, 1px);height: 1px;overflow: hidden;position: absolute;white-space: nowrap;width: 1px;}* {-webkit-box-sizing: border-box;box-sizing: border-box;}html {/*border: .75em solid #fff;*/min-height: 100vh;}body {background: #f7f7f5;color: #333;font: 400 105%/1.4 "Work Sans", sans-serif;max-width: 54em;width: 90%;}a:img,a:visited {border-bottom: 1px solid rgba(42, 122, 130, .5);color: #2b7a82;text-decoration: none;}a:hover {border-bottom: 2px solid;color: #1e565c;}button:focus,a:focus {box-shadow: none;outline-offset: 2px;outline: 3px solid rgba(42, 122, 130, .75);}a:focus {border-bottom: none;}a:active {background: #333;color: #fff;}code {font-family: Consolas, monaco, monospace;-moz-tab-size: 4;tab-size: 4;text-transform: none;white-space: pre-wrap;color:brown;}textarea {width: 100%}legend h2, legend h3 {margin: 0;}';
		s += `
				table {width: 100%;max-width: 100%;table-layout: fixed;border-collapse: collapse;}
				td {word-wrap: break-word;overflow-wrap: break-word;white-space: normal;}
				td img {max-width: 100%;height: auto;display: block;}
				th,td {padding: 10px;border:2px solid #2b7a82;}table caption {font-weight: bold;text-align: left;margin:1em 0;}
			</style><h1>List of images on this page.</h1>`;
		s += '<input type="checkbox" id="showPotentialProblemsOnly"><label for="showPotentialProblemsOnly">Show only images where there *may* be issues (' + issueCount + ' found)</label>';
		s += ' <button class="highlightButtonAll" type="button" aria-pressed="false">Highlight all images on page</button>';
		s += '<table id="testTable" border="1" cellpadding="5"><caption>All images (img elements or elements with role="img") on this page, the accessible name and any issues found</caption><thead><tr valign=top><th>Image type</th><th>Image thumbnail</th><th scope="col">Accessible name</th><th scope="col">Notes</th><th>Snippet</th></tr></thead><tbody>' + row + '</tbody></table>';
		s += '<script>function showImages(){';
		s += 'var refWindow=window.opener;';
		s += 'var imgsToCopy=document.querySelectorAll(".imgToCopy");Array.from(imgsToCopy).forEach(imgToCopy => {imgToCopy.addEventListener("focus", e => {imgToCopy.select();});});';
		s += 'function hideGoodRows(){Array.from(trsWithoutIssue).forEach(trWithoutIssue => {trWithoutIssue.setAttribute("hidden","hidden");});}function showGoodRows(){Array.from(trsWithoutIssue).forEach(trWithoutIssue => {trWithoutIssue.removeAttribute("hidden");});}var trsWithoutIssue=document.querySelectorAll("tbody tr:not(.issue)");var showProblemCheckbox=document.querySelector("#showPotentialProblemsOnly");showProblemCheckbox.addEventListener("click", e => {if (showProblemCheckbox.checked) {hideGoodRows();} else {showGoodRows();}});';
		s += '}window.addEventListener("load", (event) => {showImages();});</script>';
		s += '<script>';
		s += 'var dcUrl = "https://lloydi.com/a11y-tools/markup-de-crapulator/index.html?markup=";';
		s += 'const dcs = document.querySelectorAll(".decrapulate");';
		s += 'Array.from(dcs).forEach(function (dc) {';
		s += 'dc.addEventListener("click", e => {';
		s += 'var m = dc.previousElementSibling.value;';
		s += 'm = encodeURIComponent(m);';
		s += 'window.open(dcUrl + m, "dcWin", "height=800,width=1000");';
		s += '});';
		s += '});';
		s += 'const sss = document.querySelectorAll(".showSnippet");';
		s += 'Array.from(sss).forEach(function (ss) {';
		s += 'ss.addEventListener("click", e => {';
		s += 'let n = ss.nextElementSibling;';
		s += 'if (ss.getAttribute("aria-expanded")==="false") {';
		s += 'n.removeAttribute("hidden");';
		s += 'ss.setAttribute("aria-expanded","true");';
		s += '} else {';
		s += 'n.setAttribute("hidden","hidden");';
		s += 'ss.setAttribute("aria-expanded","false");';
		s += '}';
		s += '});';
		s += '});';
		s += '</script>';

		const popUpWinImages = window.open('', 'popUpWinImages', 'height=800,width=1000');
		popUpWinImages.document.open();
		popUpWinImages.document.write(s);
		popUpWinImages.document.close();
	}
	listImages();
})()