javascript: (function() {
	"use strict";

	function WTFocus() {
		let e = 1,
			t = "",
			o = document.activeElement,
			l = document.querySelectorAll('a[href],button,select,input:not([type="hidden"]),textarea,summary,area,[tabindex]:not(#WTFocusPanel):not([tabindex^="-1"]),[contenteditable]:not([contenteditable="false"])'),
			n = "background:#fff;color:darkgreen;font-weight:bold;text-decoration:line-through",
			a = "font-weight:bold;color:#99f170;background:#333;display:inline-block;padding:3px;",
			i = "color:pink;background:#333;padding:3px;",
			r = "color:black;background:#fefbe3;font-weight:bold;",
			s = "color:#333;background:#fff;",
			u = document.createElement("div"),
			c = document.createElement("div"),
			d = "Accessible name: ",
			b = "",
			p = !1,
			m = !1,
			f = !1,
			g = !1,
			h, y = !1,
			x = !1;

		function A() {
			p = !1, m = !1
		}

		function $(e) {
			t += e
		}

		function v(e, t, o, l, n) {
			t = t.split("<").join("&lt;").split(">").join("&gt;"), b += "<li", (n || l) && (b += ' class="', n && (b += "visible"), l && (b += "outline"), b += '"'), b += ' role="listitem"><span style="' + o + '">', p && (b += '<span aria-hidden="true">\uD83D\uDC49\uD83C\uDFFD</span><span class="visually-hidden">Accessible name provided by</span> '), m && (b += '<span aria-hidden="true">\uD83D\uDEA8</span> <span class="visually-hidden">Warning</span>'), b += e + "</span>&nbsp;" + t + "</li>\n", t = t.replace("&lt;", "<").replace("&gt;", ">")
		}

		function T() {
			let e = document.createElement("button");
			e.textContent = "Close (Esc)", e.setAttribute("type", "button"), e.setAttribute("class", "panel-btn"), e.addEventListener("click", () => {
				F()
			});
			let o = document.createElement("button");
			o.textContent = "Change Mode (M)", o.setAttribute("type", "button"), o.setAttribute("class", "panel-btn"), o.addEventListener("click", e => {
				_()
			});
			let l = document.createElement("a");
			l.textContent = "Download summary (S)", l.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(t)), l.setAttribute("download", "simple-screen-reader-emulation"), l.addEventListener("click", e => {
				alert('IMPORTANT DISCLAIMER!\n\nThis text file is a *very approximate representation* \nof what this page may be like for screen reader users:\n\n• It lists all the focusable elements (at the point \n  of running the script) but may not include every \n  element. For example, any element that is temporarily \n  set to be non-focusable with `tabindex="-1"`, such as \n  an inactive tab in a group of tab controls, will not \n  be shown here.\n• It lists the accessible name and the role \n  (e.g. link, button)\n• Where there is an accessible description \n  (provided by `aria-describedby` or a `title` \n  attribute), this is included too')
			}), u.appendChild(e), u.appendChild(o), u.appendChild(l)
		}

		function _() {
			y ? (document.querySelector("#WTFocusPanel").classList.remove("curtainsMode"), document.querySelector("#WTFocusPanel").removeAttribute("style"), document.querySelector("#WTFocusCurtain").setAttribute("hidden", "hidden"), y = !1, d = "Accessible name: ") : (document.querySelector("#WTFocusPanel").classList.add("curtainsMode"), document.querySelector("#WTFocusCurtain").removeAttribute("hidden"), y = !0, d = ""), S(o), o.focus()
		}

		function F() {
			document.querySelector("#WTFocusCurtain").remove(), document.querySelector("#WTFocusPanel").remove(), document.querySelector("#panelStyles").remove(), document.querySelector("#focusStyles").remove()
		}

		function S(e) {
			let t = e.getBoundingClientRect(),
				o = document.documentElement.scrollTop,
				l = t.right + 20 + 400,
				n = u.offsetHeight,
				a = o + t.top + n,
				i = window.innerWidth,
				r = window.innerHeight;
			y ? document.querySelector("#WTFocusPanel").removeAttribute("style") : l > i ? (a > r ? (u.style.top = "auto", u.style.bottom = r - (o + t.bottom) - 10 + "px", u.classList.add("toBottom")) : (u.style.top = o + t.top + "px", u.style.bottom = "auto", u.classList.remove("toBottom")), u.style.left = "auto", u.style.right = i - t.left + 20 - 7 + "px", u.classList.add("toLeft")) : (a > r ? (u.style.top = "auto", u.style.bottom = r - (o + t.bottom) - 10 + "px", u.classList.add("toBottom")) : (u.style.top = o + t.top + "px", u.style.bottom = "auto", u.classList.remove("toBottom")), u.style.left = t.right + 20 - 7 + "px", u.style.right = "auto", u.classList.remove("toLeft"))
		}! function e() {
			let t = document.createElement("style");
			t.setAttribute("type", "text/css"), t.setAttribute("id", "panelStyles"), t.textContent = ".dupeAccName {outline:4px dashed #CC3300!important;outline-offset:7px!important;overflow:visible;} .WTFocusTempFocusStyle:focus {outline:7px solid black!important;outline-offset:7px!important;overflow:visible;/*background:yellow!important;color:black!important;*/} .WTFocusTempFocusStyle.dupeAccName:focus {outline-color:#CC3300!important;} .visually-hidden {clip-path: inset(100%);clip: rect(1px, 1px, 1px, 1px);height: 1px;overflow: hidden;position: absolute;white-space: nowrap;width: 1px;}#WTFocusCurtain {background:black;position: fixed;top: 0;bottom: 0;left: 0;right: 0;z-index:49999}", document.querySelector("body").appendChild(t)
		}(), document.querySelector("#WTFocusCurtain") && F(), b = "",
			function e(t) {
				let o = document.createElement("style");
				o.setAttribute("type", "text/css"), o.setAttribute("id", "focusStyles"), o.textContent = "#WTFocusPanel.error {background:darkred;} #WTFocusPanel.warning {background:#CC3300;} #WTFocusPanel.curtainsMode.error {background:black;} #WTFocusPanel.curtainsMode {z-index:50000;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);} #WTFocusPanel.curtainsMode.warning {background:black;} #WTFocusPanel[hidden] {display:none;} #WTFocusPanel * {text-align:left} #WTFocusPanel {border:2px solid #fff;z-index:1000;text-shadow:none;font-family:sans-serif;display:block;text-align:left;position: absolute;z-index:10000;background: black;padding: 20px 20px;width:400px;font-size:16px;} #WTFocusPanel button {font-weight:bold;background:none;color:#fff;padding:3px 10px;font-size:14px;border:1px solid #fff;display:inline-block;margin:10px 1em -10px 0;} #WTFocusPanel ul,#WTFocusPanel li {margin:0;padding:0;list-style:none} #WTFocusPanel li {margin:3px 0;background:#fff;color:#333;padding:2px} #WTFocusPanel li.outline {outline:4px solid rgb(58, 190, 58);outline-offset:-4px;padding:8px} #WTFocusPanel.error:before {background:darkred} #WTFocusPanel.warning:before {background:#CC3300} #WTFocusPanel:before {content:'';display:block;height:20px;width:20px;transform:rotate(45deg);position:absolute;background:#000;left:-12px;top:3px;border:2px solid #fff;border-right:none;border-top:none;} #WTFocusPanel.toBottom:before {top:auto;bottom:3px} #WTFocusPanel.toLeft:before {left:auto;right:-12px;border:2px solid #fff;border-left:none;border-bottom:none;} #WTFocusPanel.curtainsMode {outline:10px solid orange;} #WTFocusPanel.curtainsMode:before {display:none;} #WTFocusPanel.curtainsMode li {display:none;} #WTFocusPanel.curtainsMode li.visible {display:block;} #WTFocusPanel.curtainsMode li span {display:none!important;} #WTFocusPanel details summary {color:white} #WTFocusPanel.curtainsMode details {display:none}#WTFocusPanel a[download]{display:block;margin:0.5em 0;color:#fff;text-decoration:underline;border:none;padding:0;}", document.querySelector("head").appendChild(o)
			}(400), c.setAttribute("id", "WTFocusCurtain"), c.setAttribute("hidden", "hidden"), document.querySelector("body").appendChild(c), u.setAttribute("id", "WTFocusPanel"), y && u.setAttribute("class", "curtainsMode"), u.setAttribute("aria-live", "polite"), u.setAttribute("tabindex", "-1"), u.setAttribute("hidden", "hidden"), u.setAttribute("role", "region"), u.setAttribute("aria-label", "Accessibility properties panel"), document.querySelector("body").appendChild(u), window.addEventListener("keyup", e => {
				"Escape" === e.key && document.querySelector("#WTFocusPanel") && F()
			}), window.addEventListener("keyup", e => {
				"m" === e.key.toLowerCase() && document.querySelector("#WTFocusPanel") && _(), "d" === e.key.toLowerCase() && document.querySelector("#WTFocusPanel") && (document.querySelector("#WTFocusPanel summary").click(), x = !x), "s" === e.key.toLowerCase() && document.querySelector("#WTFocusPanel") && document.querySelector("#WTFocusPanel a[download]").click()
			}), T();
		let W = [];
		Array.from(l).forEach(function(c) {
			c.classList.add("WTFocusTempFocusStyle");
			let h = c.querySelectorAll("style");
			Array.from(h).forEach(function(e) {
				e.remove()
			}), c.addEventListener("focus", () => {
				let h = c.getAttribute("role"),
					y = c.tagName.toLowerCase();
				if (h);
				else if (("article" == y || "button" == y || "dialog" == y || "figure" == y || "img" == y || "main" == y || "math" == y) && (h = y), "summary" == y && (h = "button"), "aside" == y && (h = "complementary"), "dd" == y && (h = "definition"), "html" == y && (h = "document"), ("details" == y || "fieldset" == y || "optgroup" == y) && (h = "group"), ("menu" == y || "ol" == y || "ul" == y) && (h = "list"), "datalist" == y && (h = "listbox"), "li" == y && (h = "listitem"), "nav" == y && (h = "navigation"), "progress" == y && (h = "progressbar"), "hr" == y && (h = "separator"), "output" == y && (h = "status"), ("dfn" == y || "dt" == y) && (h = "term"), "a" == y && (h = "link"), "select" == y && (h = "listbox"), "textarea" == y && (h = "textbox"), "input" == y) {
					let $ = c.getAttribute("type").toLowerCase();
					"email" === $ && (h = "textbox"), "text" === $ && (h = "textbox"), "range" === $ && (h = "slider"), "number" === $ && (h = "spinbutton"), ("checkbox" === $ || "radio" === $) && (h = $), ("button" === $ || "image" === $ || "reset" === $ || "submit" === $) && (h = "button")
				}
				o = c, Array.from(l).forEach(function(e) {
					e.classList.remove("dupeAccName")
				});
				let _ = !1;
				p = !1, m = !1;
				let F = c.querySelectorAll("img, [role='image'][aria-label], [role='img'][aria-label]");
				(_ = F.length > 0) && Array.from(F).forEach(function(e) {
					let t = document.createElement("SPAN");
					t.setAttribute("class", "visually-hidden"), t.setAttribute("style", "clip-path: inset(100%);clip: rect(1px, 1px, 1px, 1px);height: 1px;overflow: hidden;position: absolute;white-space: nowrap;width: 1px;"), t.setAttribute("data-temp-node", "true"), e.getAttribute("alt") && (t.textContent = " " + e.getAttribute("alt") + " "), e.getAttribute("role") && e.getAttribute("aria-label") && (t.textContent = " " + e.getAttribute("aria-label") + " "),
						function e(t, o) {
							o.parentNode.insertBefore(t, o.nextSibling)
						}(t, e)
				}), setTimeout(function() {
					c.classList.add("WTFocusTempFocusStyle")
				}, 100), b = "";
				let C = c.tagName.toLowerCase(),
					N = c.getAttribute("role");
				N && (N = c.getAttribute("role").toLowerCase());
				let P = "<" + C + ">",
					w = !1,
					q = !1,
					L = !1;
				N && (P = "<" + C + ' role="' + N + '">', ("link" === N && "a" === C || "button" === N && "button" === C || "image" === N && "img" === C || "img" === N && "img" === C || "navigation" === N && "nav" === C || "heading" === N && ("h1" === C || "h2" === C || "h3" === C || "h4" === C || "h5" === C || "h6" === C)) && (w = !0), ("link" !== N || "a" === C) && ("button" !== N || "button" === C) && ("image" !== N && "image" !== N || "img" === C) && ("navigation" !== N || "nav" === C) && ("heading" !== N || "h1" === C || "h2" === C || "h3" === C || "h4" === C || "h5" === C || "h6" === C) || (L = !0)), c.getAttribute("aria-describedby") && (q = !0);
				let E = c.textContent,
					M = c.ariaLabel,
					B = c.getAttribute("aria-labelledby"),
					I = c.getAttribute("placeholder"),
					D, z, H = "",
					R = "",
					j = c.getAttribute("value"),
					V = c.getAttribute("title"),
					O = "",
					Y = "",
					G = !1,
					J = !1,
					K = "",
					Q = !1;
				S(c), E = E.trim();
				let U = function e(t, o) {
					for (;
						(t = t.parentElement) && !(t.matches || t.matchesSelector).call(t, o););
					return t
				}(c, "label");
				if (U && (G = !0, O = Y = U.textContent.trim()), c.getAttribute("id")) {
					let X = document.querySelector("[for='" + c.getAttribute("id") + "']");
					X && (J = !0, Y = X.textContent)
				}
				if (G || J || (Y = "N/A"), E || (E = "N/A"), j || (j = "N/A"), V || (V = "N/A"), I || (I = "N/A"), M || (M = "N/A"), B) {
					D = B;
					let Z = D.split(" ");
					Z.length > 1 ? (Array.from(Z).forEach(function(e) {
						document.querySelector("#" + e) ? H += document.querySelector("#" + e).textContent + " " : H += "❓❓❓ "
					}), H = H.trim()) : H = document.querySelector("#" + D).textContent
				} else B = "N/A";
				let ee = c.querySelectorAll("[aria-hidden='true'],[role='presentation']"),
					et = E;
				if (ee.length > 0 && (Q = !0, Array.from(ee).forEach(function(e) {
						let t = e.textContent;
						"" !== t && (et = et.split(t).join(" "))
					}), et = et.trim()), "input" === C) {
					let eo = c.getAttribute("type");
					"submit" === eo && "N/A" === j && (O = "Submit", K = "Not provided (using default)"), "image" === eo && "N/A" === j && (O = "Submit", K = "Not provided (using default)"), "cancel" === eo && "N/A" === j && (O = "Cancel", K = "Not provided (using default)")
				}
				if ("N/A" !== V && (O = V, K = "title attribute"), "N/A" !== j && (O = j, K = "value attribute"), "N/A" !== I && (O = I, K = "placeholder attribute"), "N/A" !== E && (O = et, K = "Inner text content"), "N/A" !== Y && (O = Y, K = "<label> text"), "N/A" !== M && (O = M, K = "aria-label"), "N/A" !== B && (O = H, K = "aria-labelledby"), g = (f = "true" === c.getAttribute("data-dupe")) && "" === O, "" === O || f) {
					if ("" === O) {
						var el, en, ea, ei;
						m = !0, u.classList.add("error"), v(d + "No accessible name!", "", i), t += "No accessible name!", v("Accessible Name Source: N/A", "", i)
					}
					if (f && "" !== O) {
						u.classList.add("warning");
						let er = document.querySelectorAll("[data-accname='" + O + "']"),
							es = er.length;
						v(d, O, i, !1, !0), t += ei = e + " " + O, e++, g || (Array.from(er).forEach(function(e) {
							e.classList.add("dupeAccName")
						}), v("Duplicate warning!", es + " elements on page have the same accessible name", i)), Array.from(er).forEach(function(e) {}), v("Accessible Name Source: ", K, i)
					}
				} else u.classList.remove("error"), u.classList.remove("warning"), v(d, O, a, !1, !0), t += el = e + " " + O, e++, v("Accessible Name Source: ", K, a);
				if (m = !1, v("Role: ", h, a, !1, !0), t += en = ", " + h, q) {
					z = c.getAttribute("aria-describedby");
					let eu = z.split(" ");
					eu.length > 1 ? (Array.from(eu).forEach(function(e) {
						document.querySelector("#" + e) ? R += document.querySelector("#" + e).textContent + " " : R += "❓❓❓ "
					}), R = R.trim()) : R = document.querySelector("#" + z).textContent, v("Accessible Description: ", R, a), t += ea = ", " + R + "\n"
				} else {
					v("Accessible Description: ", "N/A", a);
					t += "\n"
				}
				v("HTML Element: ", P, a), b += "</ul>\n", b += "<details", x && (b += " open"), b += ">\n", b += "<summary>More details (D)</summary>\n", b += '<ul role="list">\n', w && (m = !0, v("Superfluous `role` attribute", "", i)), L && (m = !0, v("Better to use a native HTML element", "", i)), E = E.trim(), Y = Y.trim(), V = V.trim(), M = M.trim(), B = B.trim(), A(), "placeholder attribute" === K ? (p = !0, v("@placeholder: ", I, r, !0)) : "N/A" === I ? v("@placeholder: ", I, s) : v("@placeholder: ", I, n), A(), "title attribute" === K ? (p = !0, v("@title: ", V, r, !0)) : "N/A" === V ? v("@title: ", V, s) : v("@title: ", V, n), A(), "value attribute" === K ? (p = !0, v("@value: ", j, r, !0)) : "N/A" === j ? v("@value: ", j, s) : v("@value: ", j, n), A(), "Inner text content" === K ? (p = !0, _ ? v("Inner text content (includes image alt): ", E, r, !0) : v("Inner text content: ", E, r, !0), Q && v("! elements hidden to AT removed", "", r)) : "N/A" === E ? v("Text Content: ", E, s) : v("Text Content: ", E, n), A(), "<label> text" === K ? (p = !0, v("Visible `label` text: ", Y, r, !0)) : "N/A" === Y ? v("Visible `label` text: ", Y, s) : v("Visible `label` text: ", Y, n), A(), "aria-label" === K ? M === E ? (m = !0, v("`aria-label` content is same as inner text content", "", i)) : (p = !0, v("@aria-label value: ", M, r, !0)) : "N/A" === M ? v("@aria-label value: ", M, s) : v("@aria-label value: ", M, n), A(), "aria-labelledby" === K ? H === E ? (m = !0, v("`aria-labelledby` source content is same as inner text content", "", i)) : (p = !0, v("@aria-labelledby value: ", B, r, !0), v("@aria-labelledby sources: ", H, r)) : (v("@aria-labelledby value: ", B, s), v("@aria-labelledby sources: ", "N/A", s)), document.querySelector("#WTFocusPanel").innerHTML = '<ul role="list">' + b + "</ul></details>", document.querySelector("#WTFocusPanel").removeAttribute("hidden"), T();
				let ec = document.querySelectorAll("[data-temp-node]");
				Array.from(ec).forEach(function(e) {
					e.remove()
				}), c.setAttribute("data-accname", O), k || function e(t, o) {
					let l = !1;
					if (Array.from(W).forEach(function(e) {
							e === t && (l = !0)
						}), l) {
						o.setAttribute("data-dupe", "true");
						let n = document.querySelector("[data-accname='" + t + "']");
						n.setAttribute("data-dupe", "true")
					} else W.push(t)
				}(O, c)
			})
		});
		let k = !1;
		! function e() {
			if (h = document.activeElement, Array.from(l).forEach(function(e) {
					document.activeElement === e && e.blur(), e.focus(), console.log("-------------------")
				}), k = !0, "BODY" === h.tagName) {
				let t = document.querySelector("body");
				t.setAttribute("tabindex", "-1"), t.focus(), document.querySelector("#WTFocusPanel").setAttribute("hidden", "hidden")
			} else h.focus()
		}(), console.log(t)
	}
	WTFocus()
})()