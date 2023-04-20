var escape = document.createElement('textarea');
function escapeHTML(html) {
	escape.textContent = html;
	return escape.innerHTML;
}
// document.querySelectorAll("[role=main], [role=search]")
var lms = document.querySelectorAll("[role=main], [role=search], [role=contentinfo], [role=banner], [role=navigation], [role=complementary], [role=application]");
if(lms.length>0)
{
		var result='<table border=\'1px\' cellpadding=\'10px\' cellspacing=\'10px\'><tr><th>Tag</th><th>InnerHTML</th></tr> ';
		for(lm in lms){
			var l = lms[lm];
			result+='<tr><td>' ;
			if(typeof l =='object'){
				result+=  escapeHTML(l.outerHTML)}result += '</td><td>';
			}result+= '</table>';
			var lw=window.open('', 'lw', '');
			lw.document.open();lw.
			document.write(result);lw.document.close();
}
