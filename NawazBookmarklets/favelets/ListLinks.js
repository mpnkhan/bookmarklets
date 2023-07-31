javascript: var l = document.links.length;
var s = '';
for (i = 0; i < l; i++) {
    var lk = document.links[i];
    s += '<tr valign=top>';
    s += '<td>' + lk.innerHTML + '</td>';
    s += '<td>' + lk.title + '</td>';
    s += '<td><a href=' + lk.href + '>' + lk.href + '</a></td>';
    s += '</tr>';
}
s = 'Links for: ' + document.location.href + '<table border=\'1px\' cellpadding=\'10px\' cellspacing=\'10px\'><tr valign=top><th>Text</th><th>Title</th><th>URL</th></tr>' + s + '</table>';

var objCSS = document.createElement("style");
var objTitle = document.createElement("title");
objTitle.appendChild(document.createTextNode("List of Links"));

var css=`body,pre{color:#000} a[href]:empty::before {content: attr(href)} a:not([href]){border:3px solid red; padding:2px}`;
objCSS.appendChild(document.createTextNode(css));

var lw = window.open('', 'lw', '');
console.log(lw.document)
lw.document.getElementsByTagName("HTML")[0].setAttribute("lang", "en"); 
lw.document.getElementsByTagName("HEAD")[0].appendChild(objCSS); 
lw.document.getElementsByTagName("HEAD")[0].appendChild(objTitle);
lw.document.write(s);
lw.document.close();
