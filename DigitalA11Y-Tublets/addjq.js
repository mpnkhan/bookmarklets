console.log("hellooooo")

const url = chrome.runtime.getURL('data/jquery.js');

var s = document.createElement("script");
	s.setAttribute("charset", "UTF-8")
	s.setAttribute("type", "text/javascript")
	s.setAttribute("src", url)

document.head.appendChild(s)