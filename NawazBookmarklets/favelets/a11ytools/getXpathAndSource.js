javascript: (function() {
	"use strict";
	let currentEl, parentEl, mdFileDownloadLink, strDownloadContent = "",
		strDownloadContentStart = "",
		strDownloadContentItem = "",
		useIDRefs = !1,
		xpathList = "";

	function removeDuplicates() {
		let t = xpathList.split("\n"),
			e = [];
		for (let n = 0; n < t.length; n++) e.indexOf(t[n]) < 0 && e.push(t[n]);
		xpathList = e.join("\n")
	}

	function getXpath(t) {
		let e, n = t,
			o = t.tagName.toLowerCase(),
			i = "",
			r = "",
			a = "",
			l = "";
		for (; n.parentNode;) {
			if ((e = n.parentNode).tagName) {
				i = e.tagName.toLowerCase();
				const t = e.querySelectorAll(":scope > " + n.tagName);
				a = t.length > 1 ? "[" + parseInt(Array.from(t).indexOf(n) + 1) + "]" : "", o = n.tagName.toLowerCase();
				let d = n.getAttribute("id");
				r = d && useIDRefs ? '/*[@id="' + d + '"]' + l + r : o + a + l + r, l = "/"
			}
			n = e
		}
		"" === i && (i = o);
		const d = (r = "//" + i + a + l + r).split("//*");
		return d.length > 1 && (r = "//*" + (r = d[d.length - 1])), r
	}

	function getXpathAndSource() {
		let t, e, n, o = !1;
		const i = document.querySelectorAll("*");

		function r(t) {
			strDownloadContentStart = "#Targets selected for " + t + "\n", strDownloadContent = "";
			const e = xpathList.split("\n");
			for (let t = 0; t < e.length; t++) {
				const n = e[t];
				"" !== n && (strDownloadContent += "* " + n + "\n")
			}! function(t, e) {
				const n = document.querySelector("#mdFileDownloadLink");
				n.textContent = "Download the Markdown file", n.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(e)), n.setAttribute("download", t)
			}("xpaths-targets-selected.md", strDownloadContent = strDownloadContentStart + strDownloadContent)
		}

		function a() {
			Array.from(i).forEach(t => {
				d(t)
			})
		}

		function l(e, n) {
			t = e, n.stopPropagation(), o || s(e), p(t)
		}

		function d(t) {
			t.classList.remove("tempHighlight")
		}

		function s(t) {
			t.classList.add("tempHighlight")
		}

		function p(t) {
			console.log(getXpath(t)), n.innerHTML = getXpath(t)
		}
		a(), Array.from(i).forEach(t => {
				t.addEventListener("click", e => {
					"mdFileDownloadLink" !== t.getAttribute("id") && (e.stopPropagation(), e.preventDefault(), xpathList += getXpath(t) + "\n", removeDuplicates(), function(t, e) {
						d(t), r(location.href)
					}(t), n.innerHTML = "Added to list " + getXpath(t))
				}), t.addEventListener("focus", e => {
					l(t, e)
				}), t.addEventListener("mouseover", e => {
					l(t, e)
				}), t.addEventListener("mouseout", t => {
					a()
				}), t.addEventListener("blur", t => {
					a()
				})
			}),
			function() {
				const t = document.createElement("style");
				t.setAttribute("id", "xpathGetterStyles"), t.textContent = "#outputPanelForARC button {border:1px solid white;color:white;background:black;} .tempHighlight{outline:4px solid black!important;outline-offset:-4px!important;-webkit-box-shadow: 0px 0px 0px 4px #fff; box-shadow: 0px 0px 0px 4px #fff;}#infoPanel {z-index:10000;font-size:20px;background:rgba(0,0,0,0.8);color:#fff;font-weight:bold;padding:10px;position:fixed;bottom:20px;left:20px;font-family:sans-serif;max-width:45vw;overflow:hidden;} #infoPanel:empty {visibility:hidden;} #infoPanel code {color:lime} #mdFileDownloadLink {position:fixed;bottom:10px;right:10px;background:rgba(41, 98, 24,0.9);color:white;font-weight:bold;padding:10px;font-family:sans-serif;} #mdFileDownloadLink:empty{visibility:hidden}", document.head.appendChild(t)
			}(), (n = document.createElement("div")).setAttribute("id", "infoPanel"), n.setAttribute("role", "status"), document.body.appendChild(n),
			function() {
				const t = document.createElement("a");
				t.setAttribute("id", "mdFileDownloadLink"), t.addEventListener("click", t => {
					r(location.href), t.stopPropagation()
				}), document.body.appendChild(t)
			}(), document.addEventListener("keydown", function(o) {
				if ("Escape" === o.key && (outputPanelForARC.remove(), document.querySelector("#xpathGetterStyles").remove()), "ArrowUp" === o.key && (o.preventDefault(), t.parentNode && "HTML" !== t.tagName && (d(t), e = t.parentNode, s(t = e)), p(t), n.textContent = n.textContent + " (Press Return to get this element's details)"), "ArrowLeft" === o.key && (o.preventDefault(), t.previousElementSibling && (d(t), l(t = t.previousElementSibling, o))), "ArrowRight" === o.key && (o.preventDefault(), t.nextElementSibling && (d(t), l(t = t.nextElementSibling, o))), "ArrowDown" === o.key && (o.preventDefault(), t.childNodes.length > 1)) {
					d(t);
					let e, n = !1;
					Array.from(t.childNodes).forEach(t => {
						1 !== t.nodeType || n || (n = !0, e = t)
					}), e && l(t = e, o)
				}
				"x" === o.key && (useIDRefs = !useIDRefs, console.log("useIDRefs = ", useIDRefs)), "Enter" === o.key && (o.preventDefault(), t.click())
			})
	}
	getXpathAndSource();
})()