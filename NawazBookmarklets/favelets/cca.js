javascript: ! function() {
    var e = window,
        t = document,
        n = "__a11yContrastChecker";
    if (e[n]) e[n].clear();
    else {
        var a, r, o, i = {
                green: "#1a7d4f",
                gold: "#8b6800",
                red: "#be412a"
            },
            l = {
                green: "5px solid",
                gold: "6px dotted",
                red: "5px dashed"
            },
            s = {
                green: "#3fbf7f",
                gold: "#e0b84f",
                red: "#e06a4f"
            },
            d = {
                aaa: "green",
                aa: "gold",
                fail: "red"
            },
            p = {
                aaa: "passes AAA",
                aa: "passes AA, not AAA",
                fail: "fails AA"
            },
            u = {
                large: {
                    aa: 3,
                    aaa: 4.5
                },
                normal: {
                    aa: 4.5,
                    aaa: 7
                }
            },
            c = /rgba?\(([^)]+)\)/,
            f = /[\s,\/]+/,
            g = {
                r: 255,
                g: 255,
                b: 255,
                a: 1
            },
            x = [],
            b = {
                green: 0,
                gold: 0,
                red: 0
            },
            h = null;
        Array.prototype.slice.call(t.querySelectorAll("body *")).filter(function(e) {
            return function(e) {
                return Array.prototype.some.call(e.childNodes, function(e) {
                    return 3 === e.nodeType && y(e.textContent)
                })
            }(e) && function(e) {
                var t = e.getBoundingClientRect();
                return t.width > 0 && t.height > 0
            }(e)
        }).forEach(function(e) {
            var t = getComputedStyle(e),
                n = m(t.color);
            if (n) {
                var a, r, o, s, p = (a = n, r = function(e) {
                        for (var t = e; t;) {
                            var n = m(getComputedStyle(t).backgroundColor);
                            if (n && n.a > 0) return n;
                            t = t.parentElement
                        }
                        return g
                    }(e), o = C(a) + .05, s = C(r) + .05, o > s ? o / s : s / o),
                    c = function(e, t) {
                        var n = t ? u.large : u.normal;
                        return e < n.aa ? "fail" : e < n.aaa ? "aa" : "aaa"
                    }(p, function(e) {
                        var t = parseFloat(e.fontSize),
                            n = parseInt(e.fontWeight, 10) || 400;
                        return t >= 24 || t >= 18.66 && n >= 700
                    }(t));
                ! function(e, t, n) {
                    var a = d[t],
                        r = {
                            el: e,
                            outline: e.style.outline,
                            offset: e.style.outlineOffset,
                            position: e.style.position,
                            badge: w(t, n)
                        };
                    b[a] += 1, e.style.outline = l[a] + " " + i[a], e.style.outlineOffset = "3px", "static" === getComputedStyle(e).position && (e.style.position = "relative"), e.insertBefore(r.badge, e.firstChild), x.push(r)
                }(e, c, p)
            }
        }), a = t.createElement("div"), r = t.createElement("strong"), o = t.createElement("button"), a.setAttribute("data-a11y-contrast-check", "panel"), a.setAttribute("role", "status"), a.style.cssText = ["position:fixed", "right:16px", "bottom:16px", "max-width:300px", "padding:12px 32px 12px 16px", "border-radius:6px", "background:#1b2430", "color:#e7eaed", "font:400 14px/1.5 Arial, Helvetica, \"Helvetica Neue\", sans-serif", "box-shadow:0 8px 24px rgba(0,0,0,0.35)", "z-index:2147483647"].join(";"), r.textContent = "Text Contrast Checker", r.style.cssText = "display:block;margin-bottom:4px", a.appendChild(r), a.appendChild(N("green", "AAA")), a.appendChild(N("gold", "AA only")), a.appendChild(N("red", "fail")), o.type = "button", o.textContent = "×", o.setAttribute("aria-label", "Clear the contrast results"), o.style.cssText = ["position:absolute", "top:6px", "right:6px", "width:24px", "height:24px", "padding:2px 6px", "border:none", "background:transparent", "color:#e7eaed", "font:16px/1 Arial, Helvetica, \"Helvetica Neue\", sans-serif", "cursor:pointer"].join(";"), o.addEventListener("click", k), a.appendChild(o), h = a, t.body.appendChild(h), e[n] = {
            clear: k
        }
    }

    function y(e) {
        return (e || "").replace(/\s+/g, " ").trim()
    }

    function v(e) {
        var t = parseFloat(e);
        return isNaN(t) ? 1 : -1 === e.indexOf("%") ? t : t / 100
    }

    function m(e) {
        var t = String(e).match(c);
        if (!t) return null;
        var n = t[1].split(f).filter(function(e) {
            return e.length > 0
        });
        return n.length < 3 ? null : {
            r: parseFloat(n[0]),
            g: parseFloat(n[1]),
            b: parseFloat(n[2]),
            a: n.length > 3 ? v(n[3]) : 1
        }
    }

    function A(e) {
        var t = e / 255;
        return t <= .03928 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
    }

    function C(e) {
        return .2126 * A(e.r) + .7152 * A(e.g) + .0722 * A(e.b)
    }

    function w(e, n) {
        var a = t.createElement("span");
        return a.setAttribute("data-a11y-contrast-check", "badge"), a.setAttribute("aria-hidden", "true"), a.textContent = function(e, t) {
            return t.toFixed(2) + ":1, " + p[e]
        }(e, n), a.style.cssText = ["position:absolute", "top:0", "left:0", "transform:translateY(-100%)", "max-width:min(90vw, 24rem)", "padding:4px 8px", "border-radius:4px", "background:" + i[d[e]], "color:#fff", "font:500 16px/1.2 Arial, Helvetica, \"Helvetica Neue\", sans-serif", "pointer-events:none", "white-space:nowrap", "z-index:2147483646"].join(";"), a
    }

    function N(e, n) {
        var a = t.createElement("p"),
            r = t.createElement("span");
        return a.style.cssText = "margin:0;padding:0", r.textContent = "●", r.style.cssText = "color:" + s[e] + ";margin-right:6px", a.appendChild(r), a.appendChild(t.createTextNode(b[e] + " " + n)), a
    }

    function k() {
        x.forEach(function(e) {
            e.el.style.outline = e.outline, e.el.style.outlineOffset = e.offset, e.el.style.position = e.position, y(e.el.getAttribute("style")) || e.el.removeAttribute("style"), e.badge.parentNode && e.badge.parentNode.removeChild(e.badge)
        }), x = [], h && h.parentNode && h.parentNode.removeChild(h), h = null, delete e[n]
    }
}();