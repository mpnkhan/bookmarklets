javascript: (function() {
  var e = document.getElementById("colorblind-styling");
  var t = document.getElementById("colorblind-filters");
  if (!e) {
    e = document.createElement("style");
    document.body.appendChild(e)
  }
  if (!t) {
    t = document.createElement("div");
    t.setAttribute('style', 'height: 0; padding: 0; margin: 0; line-height: 0;');
    t.innerHTML = '<svg id="colorblind-filters" width="0" height="0"><title>Color blind filters</title> <defs> <filter id="protanopia"> <feColorMatrix type="matrix" values="0.567,0.433,0,0,0  0.558,0.442,0,0,0  0 0.242,0.758,0,0  0,0,0,1,0" in="SourceGraphic" /> </filter> <filter id="protanomaly"> <feColorMatrix type="matrix" values="0.817,0.183,0,0,0  0.333,0.667,0,0,0  0,0.125,0.875,0,0  0,0,0,1,0" in="SourceGraphic" /> </filter> <filter id="deuteranopia"> <feColorMatrix type="matrix" values="0.625,0.375,0,0,0  0.7,0.3,0,0,0  0,0.3,0.7,0,0  0,0,0,1,0" in="SourceGraphic" /> </filter> <filter id="deuteranomaly"> <feColorMatrix type="matrix" values="0.8,0.2,0,0,0  0.258,0.742,0,0,0  0,0.142,0.858,0,0  0,0,0,1,0" in="SourceGraphic" /> </filter> <filter id="tritanopia"> <feColorMatrix type="matrix" values="0.95,0.05,0,0,0  0,0.433,0.567,0,0  0,0.475,0.525,0,0  0,0,0,1,0" in="SourceGraphic" /> </filter> <filter id="tritanomaly"> <feColorMatrix type="matrix" values="0.967,0.033,0,0,0  0,0.733,0.267,0,0  0,0.183,0.817,0,0  0,0,0,1,0" in="SourceGraphic" /> </filter> <filter id="achromatopsia"> <feColorMatrix type="matrix" values="0.299,0.587,0.114,0,0  0.299,0.587,0.114,0,0  0.299,0.587,0.114,0,0  0,0,0,1,0" in="SourceGraphic" /> </filter> <filter id="achromatomaly"> <feColorMatrix type="matrix" values="0.618,0.320,0.062,0,0  0.163,0.775,0.062,0,0  0.163,0.320,0.516,0,0  0,0,0,1,0" in="SourceGraphic" /> </filter> </defs> </svg>';
    document.body.appendChild(t)
  }
  var n = ["protanopia", "protanomaly", "deuteranopia", "deuteranomaly", "tritanopia", "tritanomaly", "achromatopsia", "achromatomaly"];
  var r = "";
  for (var i in n) r += parseInt(i) + 1 + ": " + n[i] + "\n";
  var s = parseInt(prompt("0: off\n" + r)) - 1;
  if (isNaN(s)) return;
  if (s >= n.length) return;
  if (s == -1) {
    e.innerHTML = "body{-webkit-filter:none;-moz-filter:none;-ms-filter:none;-o-filter:none;filter:none;}";
    return
  }
  s = n[s];
  if (document.getElementById(s)) e.innerHTML = "body{-webkit-filter:!!;-moz-filter:!!;-ms-filter:!!;-o-filter:!!;filter:!!;}".replace(/!!/g, "url(#" + s + ")");
  else e.innerHTML = "body{-webkit-filter:none;-moz-filter:none;-ms-filter:none;-o-filter:none;filter:none;}"
})()