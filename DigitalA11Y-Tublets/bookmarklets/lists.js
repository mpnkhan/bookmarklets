javascript: (function() {
    function callback() {
        function l() {
        $("strong").remove(".openSpan, .closeSpan");
		$("ul, ol, dl").attr('style','outline:green 2px solid;padding:2px;list-style-position: inside;');
		if ($('ul, ol').children('p')) {
			$('ul, ol').children('p').attr('style','outline:2px solid red;');
			$('ul, ol').children('p').parents('ul, ol').attr('style','outline:2px solid red;');
			$('ul, ol').children('p').parents('ul, ol').prepend("<strong class=\"openSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;;speak:literal-punctuation;\">❌NO CHILD LI</strong>");

		}
		$("ul").prepend("<strong class=\"openSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;;speak:literal-punctuation;\">&lt;ul&gt;📝</strong>");
        $("ul").append("<strong class=\"closeSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;/ul&gt;</strong>");
		$("ol").prepend("<strong class=\"openSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;;speak:literal-punctuation;\">&lt;ol&gt;🔢</strong>");
        $("ol").append("<strong class=\"closeSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;/ol&gt;</strong>");
		$("dl").prepend("<strong class=\"openSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;;speak:literal-punctuation;\">&lt;dl&gt;📕</strong>");
        $("dl").append("<strong class=\"closeSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;/dl&gt;</strong>");
		$("li").prepend("<strong class=\"openSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;;speak:literal-punctuation;\">&lt;li&gt;</strong>");
        $("li").append("<strong class=\"closeSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;/li&gt;</strong>");
		$("dd").prepend("<strong class=\"openSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;;speak:literal-punctuation;\">&lt;dd&gt;</strong>");
        $("dd").append("<strong class=\"closeSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;/dd&gt;</strong>");
		$("dt").prepend("<strong class=\"openSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;;speak:literal-punctuation;\">&lt;dt&gt;</strong>");
        $("dt").append("<strong class=\"closeSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;/dt&gt;</strong>");
			if (!$("ul, ol, li, dd, dt, dl").length) {
				$('body').prepend('<strong style="color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;" id="failure" role="status"></strong>');
				$('#failure').html('No Lists Found on Page: ' + document.title);
				setTimeout(function(){ $('#failure').remove(); }, 6000);
			} else {
				$('body').append('<div id="success" role="alert" style="position:absolute; width:0; height:0; clip: rect(0,0,0,0);"></div>');
				$('#success').html('Success! Lists Found on Page: ' + document.title);
				setTimeout(function(){ $('#success').remove(); }, 3000);
			}
      $("script[src$='lists.js']").remove();s.remove();

        }
        l()
    }
    var s = document.createElement("script");
	const url = chrome.runtime.getURL('data/jquery.js');

    s.setAttribute("charset", "UTF-8")
    s.setAttribute("type", "text/javascript")
    s.setAttribute("src", url)
    s.addEventListener ? s.addEventListener("load", callback, !1) : s.readyState && (s.onreadystatechange = callback), s.src = url, document.body.appendChild(s);
})()
