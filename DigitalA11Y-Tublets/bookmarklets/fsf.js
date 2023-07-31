javascript: (function() {
    function callback() {
        function l() {
			$( "<style>a:focus, *:focus { outline: 4px solid orange !important; outline-offset:1px !important; }</style>" ).appendTo( "head" );
        }
        $("script[src$='focus.js']").remove();s.remove();
        l()
    }
    var s = document.createElement("script");
    const url = chrome.runtime.getURL('data/jquery.js');
    s.setAttribute("charset", "UTF-8")
    s.setAttribute("type", "text/javascript")
    s.setAttribute("src", url)
    s.addEventListener ? s.addEventListener("load", callback, !1) : s.readyState && (s.onreadystatechange = callback), s.src = url, document.body.appendChild(s);
})()
