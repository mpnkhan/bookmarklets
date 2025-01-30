javascript: (function() {
    function showColorsUsedOnWebPage() {
        let e = `<style>.visually-hidden {clip-path: inset(100%);clip: rect(1px, 1px, 1px, 1px);height: 1px;overflow: hidden;position: absolute;white-space: nowrap;width: 1px;}#color-dialog {font-family:sans-serif;font-size:16px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);background: white;border: 2px solid black;padding: 20px;z-index: 1000;max-width: 80%;max-height: 80%;overflow: auto;}#color-dialog h2 {font-size:24px;margin-bottom:10px;}#color-dialog h3 {font-size:20px;}#color-dialog h2, #color-dialog h3 {font-weight:bold;}#color-dialog h2, #color-dialog h3, #color-dialog p {color:black!important;border:none;padding:0;}#color-dialog li {list-style:none;}.color-swatches {display: flex;flex-wrap: wrap;list-style-type: none;padding: 0;margin: 0;}.color-swatch {width: 150px;height: 150px;margin: 5px;border: 1px solid black;position: relative;text-align: center;}.color-swatch-label {position: absolute;bottom: 0;left: 0;right: 0;background: rgba(0,0,0,0.7);color: white;font-size: 12px;padding: 2px;}.color-swatch-label,.color-swatch-label>div,.color-swatch-label>span {font-size:14px;}.color-section {margin-bottom: 20px;}#close-dialog {position:absolute;top:10px;right:10px;outline:2px solid black;padding:5px;color:black!important;background:white!important;}#close-dialog:focus {outline:4px solid black;}</style>`;
        ! function o() {
            let t = [],
                l = document.createElement("div");
            l.style.cssText = `position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.5);z-index: 999;`;
            let r = document.createElement("div");
            r.id = "color-dialog", r.setAttribute("role", "dialog"), r.setAttribute("aria-modal", "true"), r.setAttribute("aria-labelledby", "color-dialog-title"), r.innerHTML = e + `<button id="close-dialog">Close</button><h2 id="color-dialog-title">Page Color Analysis</h2><div class="color-section"><h3>Background Colors</h3><ul id="background-colors" class="color-swatches"></ul></div><div class="color-section"><h3>Foreground Colors</h3><ul id="foreground-colors" class="color-swatches"></ul></div><ul><li>Where colors match HTML color names, these are included under the hex value.</li><li>Color are 100% opacity unless stated otherwise.</li></ul>`;
            let a = {
                "#F0F8FF": "AliceBlue",
                "#FAEBD7": "AntiqueWhite",
                "#00FFFF": "Aqua",
                "#7FFFD4": "Aquamarine",
                "#F0FFFF": "Azure",
                "#F5F5DC": "Beige",
                "#FFE4C4": "Bisque",
                "#000000": "Black",
                "#FFEBCD": "BlanchedAlmond",
                "#0000FF": "Blue",
                "#8A2BE2": "BlueViolet",
                "#A52A2A": "Brown",
                "#DEB887": "BurlyWood",
                "#5F9EA0": "CadetBlue",
                "#7FFF00": "Chartreuse",
                "#D2691E": "Chocolate",
                "#FF7F50": "Coral",
                "#6495ED": "CornflowerBlue",
                "#FFF8DC": "Cornsilk",
                "#DC143C": "Crimson",
                "#00FFFF": "Cyan",
                "#00008B": "DarkBlue",
                "#008B8B": "DarkCyan",
                "#B8860B": "DarkGoldenRod",
                "#A9A9A9": "DarkGray",
                "#006400": "DarkGreen",
                "#BDB76B": "DarkKhaki",
                "#8B008B": "DarkMagenta",
                "#556B2F": "DarkOliveGreen",
                "#FF8C00": "DarkOrange",
                "#9932CC": "DarkOrchid",
                "#8B0000": "DarkRed",
                "#E9967A": "DarkSalmon",
                "#8FBC8F": "DarkSeaGreen",
                "#483D8B": "DarkSlateBlue",
                "#2F4F4F": "DarkSlateGray",
                "#00CED1": "DarkTurquoise",
                "#9400D3": "DarkViolet",
                "#FF1493": "DeepPink",
                "#00BFFF": "DeepSkyBlue",
                "#696969": "DimGray",
                "#1E90FF": "DodgerBlue",
                "#B22222": "FireBrick",
                "#FFFAF0": "FloralWhite",
                "#228B22": "ForestGreen",
                "#FF00FF": "Fuchsia",
                "#DCDCDC": "Gainsboro",
                "#F8F8FF": "GhostWhite",
                "#FFD700": "Gold",
                "#DAA520": "GoldenRod",
                "#808080": "Gray",
                "#008000": "Green",
                "#ADFF2F": "GreenYellow",
                "#F0FFF0": "HoneyDew",
                "#FF69B4": "HotPink",
                "#CD5C5C": "IndianRed",
                "#4B0082": "Indigo",
                "#FFFFF0": "Ivory",
                "#F0E68C": "Khaki",
                "#E6E6FA": "Lavender",
                "#FFF0F5": "LavenderBlush",
                "#7CFC00": "LawnGreen",
                "#FFFACD": "LemonChiffon",
                "#ADD8E6": "LightBlue",
                "#F08080": "LightCoral",
                "#E0FFFF": "LightCyan",
                "#FAFAD2": "LightGoldenRodYellow",
                "#D3D3D3": "LightGray",
                "#90EE90": "LightGreen",
                "#FFB6C1": "LightPink",
                "#FFA07A": "LightSalmon",
                "#20B2AA": "LightSeaGreen",
                "#87CEFA": "LightSkyBlue",
                "#778899": "LightSlateGray",
                "#B0C4DE": "LightSteelBlue",
                "#FFFFE0": "LightYellow",
                "#00FF00": "Lime",
                "#32CD32": "LimeGreen",
                "#FAF0E6": "Linen",
                "#FF00FF": "Magenta",
                "#800000": "Maroon",
                "#66CDAA": "MediumAquaMarine",
                "#0000CD": "MediumBlue",
                "#BA55D3": "MediumOrchid",
                "#9370DB": "MediumPurple",
                "#3CB371": "MediumSeaGreen",
                "#7B68EE": "MediumSlateBlue",
                "#00FA9A": "MediumSpringGreen",
                "#48D1CC": "MediumTurquoise",
                "#C71585": "MediumVioletRed",
                "#191970": "MidnightBlue",
                "#F5FFFA": "MintCream",
                "#FFE4E1": "MistyRose",
                "#FFE4B5": "Moccasin",
                "#FFDEAD": "NavajoWhite",
                "#000080": "Navy",
                "#FDF5E6": "OldLace",
                "#808000": "Olive",
                "#6B8E23": "OliveDrab",
                "#FFA500": "Orange",
                "#FF4500": "OrangeRed",
                "#DA70D6": "Orchid",
                "#EEE8AA": "PaleGoldenRod",
                "#98FB98": "PaleGreen",
                "#AFEEEE": "PaleTurquoise",
                "#DB7093": "PaleVioletRed",
                "#FFEFD5": "PapayaWhip",
                "#FFDAB9": "PeachPuff",
                "#CD853F": "Peru",
                "#FFC0CB": "Pink",
                "#DDA0DD": "Plum",
                "#B0E0E6": "PowderBlue",
                "#800080": "Purple",
                "#663399": "RebeccaPurple",
                "#FF0000": "Red",
                "#BC8F8F": "RosyBrown",
                "#4169E1": "RoyalBlue",
                "#8B4513": "SaddleBrown",
                "#FA8072": "Salmon",
                "#F4A460": "SandyBrown",
                "#2E8B57": "SeaGreen",
                "#FFF5EE": "SeaShell",
                "#A0522D": "Sienna",
                "#C0C0C0": "Silver",
                "#87CEEB": "SkyBlue",
                "#6A5ACD": "SlateBlue",
                "#708090": "SlateGray",
                "#FFFAFA": "Snow",
                "#00FF7F": "SpringGreen",
                "#4682B4": "SteelBlue",
                "#D2B48C": "Tan",
                "#008080": "Teal",
                "#D8BFD8": "Thistle",
                "#FF6347": "Tomato",
                "#40E0D0": "Turquoise",
                "#EE82EE": "Violet",
                "#F5DEB3": "Wheat",
                "#FFFFFF": "White",
                "#F5F5F5": "WhiteSmoke",
                "#FFFF00": "Yellow",
                "#9ACD32": "YellowGreen"
            };

            function i(e) {
                let o = function e(o) {
                        if (!o.startsWith("rgb")) {
                            let t = document.createElement("canvas").getContext("2d");
                            return t.fillStyle = o, t.fillStyle.toUpperCase()
                        }
                        let l = o.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
                        if (!l) return o;
                        let r = parseInt(l[1]),
                            a = parseInt(l[2]),
                            i = parseInt(l[3]);
                        return `#${r.toString(16).padStart(2,"0")}${a.toString(16).padStart(2,"0")}${i.toString(16).padStart(2,"0")}`.toUpperCase()
                    }(e),
                    {
                        r: t,
                        g: l,
                        b: r
                    } = function e(o) {
                        let t = document.createElement("canvas").getContext("2d");
                        t.fillStyle = o;
                        let l = t.fillStyle,
                            r, a, i;
                        if (l.startsWith("#")) r = parseInt(l.slice(1, 3), 16), a = parseInt(l.slice(3, 5), 16), i = parseInt(l.slice(5, 7), 16);
                        else {
                            let n = l.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                            n && ([, r, a, i] = n.map(Number))
                        }
                        return {
                            r,
                            g: a,
                            b: i
                        }
                    }(e),
                    i = function e(o, t, l) {
                        let r = (299 * o + 587 * t + 114 * l) / 1e3,
                            a = "";
                        if (a = r < 64 ? "dark" : r < 128 ? "medium" : r < 192 ? "light" : "bright", 40 > Math.abs(o - t) && 40 > Math.abs(t - l) && 40 > Math.abs(o - l)) return r < 32 ? "black" : r > 224 ? "pure white" : `${a} gray`;
                        let i = [];
                        return (o > t && o > l && o > 40 && i.push("red"), t > o && t > l && t > 40 && i.push("green"), l > o && l > t && l > 40 && i.push("blue"), 40 > Math.abs(o - t) && o > l && t > l && i.push("yellow"), 40 > Math.abs(o - l) && o > t && l > t && i.push("magenta"), 40 > Math.abs(t - l) && t > o && l > o && i.push("cyan"), 0 === i.length) ? `${a} gray` : 1 === i.length ? `${a} ${i[0]}` : `${a} ${i.join("-")}`
                    }(t, l, r),
                    n = a[o],
                    $ = document.createElement("li");
                $.className = "color-swatch", $.style.backgroundColor = e;
                let d = document.createElement("div");
                d.className = "color-swatch-label";
                let F = (e => {
                    if (e.startsWith("rgb(")) return "100%";
                    let o = e.match(/,\s*([\d.]+)\)/)[1];
                    return 100 * parseFloat(o) + "%"
                })(e);
                return d.innerHTML = `<div>${o}</div>${n?`<div>${n}</div>`:`<span class="visually-hidden"> ${i}</span>`}${"100%"!==F?`<div>${F}</div>`:""}`, $.appendChild(d), $
            }
            let n = {
                backgrounds: new Set,
                foregrounds: new Set
            };
            document.querySelectorAll("*").forEach(e => {
                let o = window.getComputedStyle(e),
                    t = o.backgroundColor;
                "rgba(0, 0, 0, 0)" !== t && "transparent" !== t && n.backgrounds.add(t);
                let l = o.color;
                "rgba(0, 0, 0, 0)" !== l && "transparent" !== l && n.foregrounds.add(l), [o.borderTopColor, o.borderRightColor, o.borderBottomColor, o.borderLeftColor].forEach(e => {
                    "rgba(0, 0, 0, 0)" !== e && "transparent" !== e && n.foregrounds.add(e)
                });
                let r = o.outlineColor;
                "rgba(0, 0, 0, 0)" !== r && "transparent" !== r && n.foregrounds.add(r)
            });
            let $ = r.querySelector("#background-colors");
            Array.from(n.backgrounds).forEach(e => {
                $.appendChild(i(e))
            });
            let d = r.querySelector("#foreground-colors");
            Array.from(n.foregrounds).forEach(e => {
                d.appendChild(i(e))
            });
            let F = r.querySelector("#close-dialog");

            function s() {
                document.body.removeChild(l), document.body.removeChild(r), t.forEach(e => {
                    e.removeAttribute("aria-hidden"), e.removeAttribute("inert")
                }), g.focus()
            }
            F.addEventListener("click", s);
            let c = r.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
                u = c[0],
                h = c[c.length - 1];
            r.addEventListener("keydown", e => {
                "Escape" === e.key && s(), "Tab" !== e.key || (e.shiftKey && document.activeElement === u ? (h.focus(), e.preventDefault()) : e.shiftKey || document.activeElement !== h || (u.focus(), e.preventDefault()))
            }), l.setAttribute("aria-hidden", "true"), Array.from(document.body.children).forEach(e => {
                e !== l && e !== r && (e.setAttribute("aria-hidden", "true"), e.setAttribute("inert", ""), t.push(e))
            });
            let g = document.activeElement;
            document.body.appendChild(l), document.body.appendChild(r), r.focus()
        }()
    }
    showColorsUsedOnWebPage()
})()