javascript:var escape = document.createElement('textarea');function escapeHTML(html) {escape.textContent = html;return escape.innerHTML;};var imgs = document.getElementsByTagName('img');if(imgs.length>0){let result='<table border=\'1px\' cellpadding=\'10px\' cellspacing=\'10px\'><tr><th>Tag</th><th>Image</th></tr> ';for(i in imgs){let img = imgs[i];result+='<tr><td>' ;if(typeof img =='object'){result+=  escapeHTML(img.outerHTML)}result += '</td><td>'+ img.outerHTML + '</td></tr>'}result+= '</table>';var lw=window.open('', 'lw', '');lw.document.open();lw.document.write(result);lw.document.close();}