javascript: (function() {
    function navigateLikeSR() {
        let e = document.activeElement,
            t = null,
            l = 0,
            o = 0,
            a = 0,
            n = 0,
            i = document.title;
        document.querySelector(".a11y-tools-modal") && document.querySelector(".a11y-tools-modal").remove();
        let r = {
                isElementHidden: function e(t) {
                    if (!t || t.hasAttribute("hidden")) return !0;
                    let l = window.getComputedStyle(t);
                    return "none" === l.display || "hidden" === l.visibility || !!t.parentElement && e(t.parentElement)
                },
                isElementVisuallyHidden: function e(t) {
                    let l = getComputedStyle(t);
                    return Object.entries({
                        clip: "rect(1px, 1px, 1px, 1px)",
                        "clip-path": "inset(100%)",
                        height: "1px",
                        "overflow-x": "hidden",
                        "overflow-y": "hidden",
                        position: "absolute",
                        width: "1px"
                    }).every(([e, t]) => l.getPropertyValue(e) === t)
                },
                getTextContent: function e(t) {
                    return (function e(t) {
                        let l = "";
                        if (t.nodeType === Node.TEXT_NODE) return t.textContent.trim();
                        if (t.nodeType === Node.ELEMENT_NODE) {
                            let o = function e(t) {
                                let l = function e(t) {
                                    if (t.hasAttribute("aria-label")) return t.getAttribute("aria-label");
                                    if (t.hasAttribute("aria-labelledby")) {
                                        let l = t.getAttribute("aria-labelledby").split(" ");
                                        return l.map(e => (function e(t) {
                                            let l = document.getElementById(t);
                                            return l ? l.textContent.trim() : ""
                                        })(e)).filter(e => e.length > 0).join(" ")
                                    }
                                    return ""
                                }(t);
                                if (l) return l;
                                switch (t.nodeName.toLowerCase()) {
                                    case "img":
                                        return t.getAttribute("alt") || t.getAttribute("title") || "";
                                    case "svg":
                                        let o = t.querySelector("title"),
                                            a = t.querySelector("desc");
                                        return [o ? o.textContent : "", a ? a.textContent : "", t.getAttribute("aria-label") || ""].filter(e => e.length > 0).join(" ");
                                    default:
                                        return ""
                                }
                            }(t);
                            for (let a of (o && (l += o + " "), t.childNodes)) l += e(a) + " "
                        }
                        return l.trim()
                    })(t).replace(/\s+/g, " ").trim()
                },
                computeAccessibleName: function e(t) {
                    function l(e) {
                        return e.hasAttribute("hidden") || "true" === e.getAttribute("aria-hidden") || e.style && "none" === e.style.display || e.style && "hidden" === e.style.visibility
                    }

                    function o(e) {
                        let t = "";
                        for (let a of e.childNodes) a.nodeType === Node.TEXT_NODE ? t += a.textContent.trim() : a.nodeType !== Node.ELEMENT_NODE || l(a) || (t += o(a));
                        return t
                    }
                    let a = t.getAttribute("aria-labelledby");
                    if (a) {
                        var n;
                        let i = (n = a) ? n.split(/\s+/).map(e => document.getElementById(e)).filter(e => null !== e) : [];
                        if (i.length > 0) return i.map(t => e(t)).filter(e => e.length > 0).join(" ")
                    }
                    let r = t.getAttribute("aria-label");
                    if (r && r.trim()) return r.trim();
                    switch (t.tagName.toLowerCase()) {
                        case "input": {
                            let s = t.getAttribute("type")?.toLowerCase();
                            if ("button" === s || "submit" === s || "reset" === s) {
                                if (t.hasAttribute("value")) return t.value;
                                return "submit" === s ? "Submit" : "reset" === s ? "Reset" : ""
                            }
                            let d = t.labels?.[0];
                            if (d) return e(d);
                            if (t.title) return t.title;
                            if (t.placeholder) return t.placeholder;
                            break
                        }
                        case "img":
                        case "area": {
                            let c = t.getAttribute("alt");
                            if (null !== c) return c;
                            if (t.title) return t.title;
                            break
                        }
                        case "label":
                        case "button":
                            return o(t);
                        case "fieldset": {
                            let u = t.querySelector("legend");
                            if (u) return e(u);
                            break
                        }
                        case "figure": {
                            let b = t.querySelector("figcaption");
                            if (b) return e(b);
                            break
                        }
                        case "table": {
                            let p = t.querySelector("caption");
                            if (p) return e(p)
                        }
                    }
                    if (t.title) return t.title;
                    if (!["img", "area"].includes(t.tagName.toLowerCase())) {
                        let m = o(t);
                        if (m) return m
                    }
                    return ""
                },
                prepareElement: (e, t, l) => (e.classList.add("a11y-tools-focus-highlight"), e.getAttribute("id") || e.setAttribute("id", `${t}${l}`), e.getAttribute("id")),
                createListItem(e, t, l) {
                    let o = `<li><a data-source=${t} href="#${e}">${l}`;
                    return this.isElementVisuallyHidden(document.getElementById(t)) && (o += " (WARNING: visually hidden element)"), o + "</a></li>"
                },
                wrapInList(e, t = "") {
                    let l = `<ul>${e}</ul>`;
                    return t && (l += `<p>${t}</p>`), l
                }
            },
            s = {
                landmarks: `aside:not([role]:not([role=complementary])),header:not(:is(article, section) header, header header):not([role]:not([role=banner])),footer:not(:is(article, section) footer, footer footer):not([role]:not([role=contentinfo])),main:not([role]:not([role=main])),nav:not([role]:not([role=navigation])),section[aria-label]:not([role]:not([role=region])),section[aria-labelledby]:not([role]:not([role=region])),[role=complementary],[role=contentinfo],[role=banner],[role=main],[role=navigation],[role=region]`,
                headings: `h1:not([role]:not([role=heading])),h2:not(.a11y-tools-modal-content h2):not([role]:not([role=heading])),h3:not([role]:not([role=heading])),h4:not([role]:not([role=heading])),h5:not([role]:not([role=heading])),h6:not([role]:not([role=heading])),[role="heading"][aria-level="1"],[role="heading"][aria-level="2"],[role="heading"][aria-level="3"],[role="heading"][aria-level="4"],[role="heading"][aria-level="5"],[role="heading"][aria-level="6"]`,
                links: `a:not(.a11y-tools-modal a):not([role]:not([role=link])),[role=link]`,
                formControls: `input:not([type=hidden],.a11y-tools-modal input):not([role]:not([role=textbox],[role=button],[role=checkbox],[role=radio],[role=spinbutton],[role=combobox],[role=searchbox])),button:not(.a11y-tools-modal button):not([role]:not([role=button])),textarea:not([role]:not([role=textbox])),select:not([role]:not([role=listbox],[role=combobox])),[role=button]`
            };

        function d() {
            let e = "";
            n = 0;
            let t = document.querySelectorAll(s.formControls),
                l = document.querySelector("[name=levelOfDetail]:checked").getAttribute("id");
            Array.from(t).forEach((t, o) => {
                if (!r.isElementHidden(t)) {
                    n++;
                    let a = r.prepareElement(t, "formEl", o + 1),
                        i = t.tagName.toLowerCase(),
                        s = t.getAttribute("name"),
                        d = r.computeAccessibleName(t),
                        c = d ? `"${d}" ` : "";
                    "DetailedView" === l && (c += `(${i}${a?`, id: ${a}`:""}${s?`, name: ${s}`:""})`), e += r.createListItem(a, a, c)
                }
            }), document.querySelector("#tabPanel4 .tabpanel-inner").innerHTML = r.wrapInList(e)
        }

        function c() {
            document.querySelector(".a11y-tools-modal") ? (t.classList.add("a11y-tools-modal-open"), document.querySelector("#a11y-tools-hint-panel") && document.querySelector("#a11y-tools-hint-panel").remove()) : (function e() {
                let t = document.createElement("style");
                t.setAttribute("id", "a11yToolsStyles"), t.textContent = `.visually-hidden {clip-path:inset(100%); clip:rect(1px,1px,1px,1px); height:1px; overflow:hidden; position:absolute; white-space:nowrap; width:1px;}body.a11y-tools-modal-open {overflow:hidden;}.a11y-tools-modal {display:none; position:fixed; bottom:0; left:0; width:100%; height:100%; background-color:rgba(0,0,0,0.1); z-index:50000; isolation:isolate; box-sizing:border-box;}.a11y-tools-modal-open {display:block;}.a11y-tools-modal-content {position:relative; background-color:#fff; margin:0 auto; padding:20px; overflow-y:auto; border-radius:4px; box-shadow:0 4px 6px rgba(0,0,0,0.5); width:80%; height:50vh; top:40%;}.a11y-tools-modal-close {position:absolute; top:10px; right:10px; border:none; background:none; font-size:24px; line-height:1; padding:5px 10px; cursor:pointer; color:#666;}.a11y-tools-modal-close:hover, .a11y-tools-modal-close:focus {color:#000; background-color:#f0f0f0; border-radius:4px;}.a11y-tools-modal[style*="display: block"] {display:flex !important; align-items:flex-start; justify-content:center;}body.a11y-tools-modal-open > *:not(.a11y-tools-modal) {visibility:hidden;}body.a11y-tools-modal-open .a11y-tools-modal, body.a11y-tools-modal-open .a11y-tools-modal * {visibility:visible;}.a11y-tools-tabs+.a11y-tools-tabs {margin-top:1em !important;}.js .a11y-tools-tabs [role=tablist] {margin:0; padding:0;}.js .a11y-tools-tabs [role=tab] {padding:10px; display:block; text-decoration:none; color:darkslategray; font-weight:bold;}.js .a11y-tools-tabs [role=tab]:focus {outline:2px solid #fff; outline-offset:-4px; box-shadow:none;}.js .a11y-tools-tabs.horizontal>div>div {height:35vh; overflow-y:scroll; width:100%; outline:none;}.js .a11y-tools-tabs.horizontal {padding:0; margin:2em 0 1em 0; border:1px solid #000; height:35vh; overflow-y:hidden;}.js .a11y-tools-tabs.horizontal>ul {width:100%; display:table; table-layout:fixed;}.js .a11y-tools-tabs.horizontal>ul>li {list-style:none; background:#EEE; display:table-cell; border-bottom:1px solid #000; border-right:1px solid #000; margin:0; padding:0;}.js .a11y-tools-tabs.horizontal>ul>li:last-child {border-right:0;}.js .a11y-tools-tabs.horizontal>div {overflow:auto;}.js .a11y-tools-tabs [role=tabpanel] {padding:10px; box-sizing:border-box; border:2px solid transparent; transition:border 0.3s;}.js .a11y-tools-tabs [role=tabpanel][aria-hidden] {display:none;}.js .a11y-tools-tabs [aria-selected] {background:darkslategray; color:#fff; outline:none;}.js .a11y-tools-tabs [role=tabpanel]:focus {border:2px solid darkslategray;}.js .a11y-tools-tabs.horizontal>ul.grid {display:grid; grid-gap:0;}@supports (width: min(250px, 100%)) {.js .a11y-tools-tabs.horizontal>ul.grid {grid-template-columns:repeat(auto-fit, minmax(min(250px, 100%), 1fr));}}.a11y-tools-tabs label {display:inline;}.a11y-tools-tabs [role=tabpanel] a {outline:none; text-decoration:none; border-bottom:4px solid transparent;}.a11y-tools-tabs [role=tabpanel] a:focus {outline:none; color:black; background:yellow; text-decoration:none; border-bottom:4px solid black;}.a11y-tools-tabs [role=tabpanel] li {padding:0 0 0 1em; margin:.5em 0 .5em 1em; list-style:initial;}.a11y-tools-tabs a .pill {color:white; background:darkslategray; display:inline-block; padding:5px; border-radius:10px; outline:2px solid white; min-width:2em; text-align:center; font-size:0.8rem; transform:translateY(-0.1rem); margin-left:0.5em;}.a11y-tools-tabs [role=tabpanel] a .pill {font-size:0.6rem; background:#555;}* .a11y-tools-modal h2 {color:black!important;border:none!important;padding:0!important;}* .a11y-tools-modal {color:black; font-family:sans-serif; line-height:1.5;}* .a11y-tools-modal [role=tab] a {color:white!important;}* .a11y-tools-modal [role=tabpanel] a {color:blue!important;}* .a11y-tools-modal [role=tabpanel] ul,.a11y-tools-modal [role=tabpanel] li {padding:0;text-align:left;}@keyframes focus-animation {0% {outline:10px solid yellow; background:yellow; outline-offset:-10px;}100% {outline:2px solid black; background:unset; outline-offset:0;}}.temp-focus {animation:focus-animation 0.8s ease-out forwards;}/*.a11y-tools-focus-highlight:focus {outline:6px solid lime; box-shadow:0 0 0 8px black;}*/.tabs.horizontal > ul[role="tablist"] {position: sticky;top: 0;background-color: #EEE;z-index: 10;}.hint-panel {background:black;color:white;font-weight:bold;text-align:center;padding:5px;border-radius:5px;position:fixed;bottom:5px;left:5px;right:5px;}`, document.head.appendChild(t)
            }(), function e() {
                let t = document.createElement("div");
                t.className = "a11y-tools-modal", t.setAttribute("role", "dialog"), t.setAttribute("aria-modal", "true");
                let l = document.createElement("div");
                l.className = "a11y-tools-modal-content";
                let o = `<h2>Page title: ${i}</h2><div class="a11y-tools-tabs horizontal"><ul role="tablist" aria-label="Navigation options" class="roving"><li role="presentation"><a role="tab" aria-controls="tabPanel1" href="#tabPanel1" id="tab1">Landmarks</a></li><li role="presentation"><a role="tab" aria-controls="tabPanel2" href="#tabPanel2" tabindex="-1" id="tab2">Headings</a></li><li role="presentation"><a role="tab" aria-controls="tabPanel3" href="#tabPanel3" tabindex="-1" id="tab3">Links</a></li><li role="presentation"><a role="tab" aria-controls="tabPanel4" href="#tabPanel4" tabindex="-1" id="tab4">Form Controls</a></li></ul><div class="tab-panels"><div role="tabpanel" aria-labelledby="tab1" id="tabPanel1"><div class="tabpanel-inner"></div></div><div role="tabpanel" aria-labelledby="tab2" id="tabPanel2"><div class="tabpanel-inner"></div></div><div role="tabpanel" aria-labelledby="tab3" id="tabPanel3"><fieldset><legend>Link behaviour</legend><div><input type="radio" id="radShowLink" name="linkBehaviour" checked><label for="radShowLink">Go to link location on the page</label></div><div><input type="radio" id="radLinkImmediately" name="linkBehaviour"><label for="radLinkImmediately">Navigate to link destination immediately</label></div></fieldset><div class="tabpanel-inner"></div></div><div role="tabpanel" aria-labelledby="tab4" id="tabPanel4"><fieldset><legend>Level of detail</legend><div><input type="radio" id="SimpleView" name="levelOfDetail" checked><label for="SimpleView">Just show accessible name</label></div><div><input type="radio" id="DetailedView" name="levelOfDetail"><label for="DetailedView">Accessible name, element type, name and id</label></div></fieldset><div class="tabpanel-inner"></div></div></div></div><p>Note: the panel will disappear when a link is activated, but it can be shown again by pressing Shift + L</p>`;
                l.innerHTML = o, t.appendChild(l);
                let a = document.createElement("button");
                a.textContent = "\xd7", a.className = "a11y-tools-modal-close", a.setAttribute("aria-label", "Close dialog"), l.insertBefore(a, l.firstChild), a.addEventListener("click", () => {
                    u()
                }), t.classList.add("a11y-tools-modal-open"), document.body.appendChild(t), t.querySelector("a[role=tab]").focus()
            }(), function e() {
                function t(e, t, l) {
                    o = e, a = t, Array.from(o).forEach(e => {
                        e.setAttribute("hidden", "hidden")
                    }), Array.from(a).forEach(e => {
                        e.removeAttribute("aria-selected")
                    }), l.setAttribute("aria-selected", "true");
                    var o, a, n = l.getAttribute("aria-controls");
                    document.querySelector("#" + n).removeAttribute("hidden")
                }
                document.querySelector("body").classList.add("js"), Array.from(document.querySelectorAll(".a11y-tools-tabs")).forEach(e => {
                    e.querySelectorAll("[role=tablist]"), e.querySelectorAll(".tabpanels");
                    var l = e.querySelectorAll("[role=tab]"),
                        o = e.querySelectorAll("[role=tabpanel]"),
                        a = e.querySelector("[role=tab]"),
                        n = e.querySelector("[role=tabpanel]");
                    Array.from(l).forEach(e => {
                        e.addEventListener("click", a => {
                            t(o, l, e), a.preventDefault()
                        }), e.addEventListener("focus", a => {
                            t(o, l, e)
                        })
                    }), Array.from(o).forEach(e => {
                        e.setAttribute("hidden", "hidden")
                    }), a.setAttribute("aria-selected", "true"), n.removeAttribute("hidden")
                })
            }(), function e() {
                let t = !1,
                    o = "";
                l = 0;
                let a = document.querySelectorAll(s.landmarks);
                Array.from(a).forEach((e, a) => {
                    if (!r.isElementHidden(e)) {
                        l++;
                        let n = function e(t, l) {
                            let o = t.tagName.toLowerCase(),
                                a = {
                                    complementary: "aside",
                                    contentinfo: "footer",
                                    banner: "header",
                                    main: "main",
                                    navigation: "nav",
                                    region: "section"
                                },
                                n = t.getAttribute("role"),
                                i = n && a[n];
                            i && (o = a[n]);
                            let s = t.getAttribute("aria-label") || (t.getAttribute("aria-labelledby") ? r.computeAccessibleName(t) : ""),
                                d = r.prepareElement(t, "landmark", l),
                                c = `${o}${s?` (${s})`:""}`;
                            return {
                                html: r.createListItem(d, d, c),
                                convertedBack: i
                            }
                        }(e, a + 1);
                        o += n.html, t = t || n.convertedBack, e.getAttribute("tabindex") || e.setAttribute("tabindex", "-1")
                    }
                });
                let n = t ? "Note: some landmarks were defined using <code>role</code> attributes but are indicated by their native HTML equivalents for simplicity." : "";
                document.querySelector("#tabPanel1 .tabpanel-inner").innerHTML = r.wrapInList(o, n)
            }(), function e() {
                let t = "";
                o = 0;
                let l = document.querySelectorAll(s.headings);
                Array.from(l).forEach((e, l) => {
                    r.isElementHidden(e) || (o++, t += function e(t, l) {
                        let o = {
                                h1: {
                                    level: "H1",
                                    announcement: "Heading level 1"
                                },
                                h2: {
                                    level: "H2",
                                    announcement: "Heading level 2"
                                },
                                h3: {
                                    level: "H3",
                                    announcement: "Heading level 3"
                                },
                                h4: {
                                    level: "H4",
                                    announcement: "Heading level 4"
                                },
                                h5: {
                                    level: "H5",
                                    announcement: "Heading level 5"
                                },
                                h6: {
                                    level: "H6",
                                    announcement: "Heading level 6"
                                }
                            },
                            a, n, i = t.tagName.toLowerCase(),
                            s = t.getAttribute("aria-level");
                        if ("heading" === t.getAttribute("role") && s) {
                            let d = o[`h${s}`];
                            a = d.level, n = d.announcement
                        } else a = o[i].level, n = o[i].announcement;
                        let c = r.prepareElement(t, "heading", l),
                            u = `${r.getTextContent(t)}<span class="visually-hidden">${n}</span><span class="pill" aria-hidden="true">${a}</span>`;
                        return r.createListItem(c, c, u)
                    }(e, l + 1))
                }), document.querySelector("#tabPanel2 .tabpanel-inner").innerHTML = r.wrapInList(t)
            }(), function e() {
                let t = "";
                a = 0;
                let l = document.querySelectorAll(s.links);
                Array.from(l).forEach((e, l) => {
                    if (!r.isElementHidden(e)) {
                        a++;
                        let o = r.prepareElement(e, "link", l + 1);
                        t += r.createListItem(e.href, o, r.getTextContent(e))
                    }
                });
                let o = document.querySelector("#tabPanel3 .tabpanel-inner");
                o.innerHTML = r.wrapInList(t);
                let n = o.querySelectorAll("li a");
                Array.from(n).forEach(e => {
                    e.addEventListener("click", t => {
                        let l = document.querySelector("[name=linkBehaviour]:checked").getAttribute("id");
                        "radLinkImmediately" !== l && (t.preventDefault(), document.querySelector("#" + e.getAttribute("data-source")).focus())
                    })
                })
            }(), d(), function e() {
                let t = document.querySelectorAll(".a11y-tools-modal [role=tabpanel] a");
                Array.from(t).forEach(e => {
                    e.addEventListener("click", e => {
                        u()
                    })
                })
            }(), document.querySelector("#tab1").innerHTML = 'Landmarks <span class="pill">' + l + "</span>", document.querySelector("#tab2").innerHTML = 'Headings <span class="pill">' + o + "</span>", document.querySelector("#tab3").innerHTML = 'Links <span class="pill">' + a + "</span>", document.querySelector("#tab4").innerHTML = 'Form Controls <span class="pill">' + n + "</span>", t = document.querySelector(".a11y-tools-modal")), document.querySelector(".a11y-tools-modal a[role=tab]").focus()
        }

        function u() {
            t && (t.classList.remove("a11y-tools-modal-open"), function e() {
                let t = document.createElement("div");
                t.textContent = "Tool is still running in background. Press SHIFT + N to show again", t.classList.add("hint-panel"), t.setAttribute("id", "a11y-tools-hint-panel"), document.body.appendChild(t)
            }(), e.focus())
        }
        document.addEventListener("keydown", function(e) {
                "Escape" === e.key && u(), "N" === e.key && e.shiftKey && (e.preventDefault(), c()), ("ArrowLeft" === e.key || "ArrowRight" === e.key) && document.querySelector(".a11y-tools-modal.a11y-tools-modal-open") && function e(t) {
                    let l = document.querySelector('.a11y-tools-modal [role="tablist"]'),
                        o = Array.from(l.querySelectorAll('[role="tab"]')),
                        a = document.querySelector('[aria-selected="true"]');
                    if (Array.from(o).forEach(e => {
                            e.setAttribute("tabindex", "-1")
                        }), !a) return;
                    let n = o.indexOf(a),
                        i;
                    if ("ArrowLeft" === t.key) i = 0 === n ? o.length - 1 : n - 1, t.preventDefault();
                    else {
                        if ("ArrowRight" !== t.key) return;
                        i = n === o.length - 1 ? 0 : n + 1, t.preventDefault()
                    }
                    o[i].click(), o[i].focus(), o[i].removeAttribute("tabindex")
                }(e)
            }), c(),
            function e() {
                function t(e) {
                    ! function e() {
                        let t = document.querySelectorAll(".temp-focus");
                        Array.from(t).forEach(e => {
                            e.classList.remove("temp-focus")
                        })
                    }();
                    let t = e.getAttribute("data-source");
                    document.querySelector("#" + t).scrollIntoView(), document.querySelector("#" + t).classList.add("temp-focus")
                }
                let l = document.querySelectorAll(".tabpanel-inner li a");
                Array.from(l).forEach(e => {
                    e.addEventListener("focus", l => {
                        t(e)
                    }), e.addEventListener("mouseover", l => {
                        t(e)
                    })
                })
            }(),
            function e() {
                let t = document.querySelectorAll("[name=levelOfDetail]");
                console.log(t), Array.from(t).forEach(e => {
                    e.addEventListener("change", e => {
                        d()
                    })
                })
            }()
    }
    navigateLikeSR()
})()