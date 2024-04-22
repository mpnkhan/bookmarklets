(()=>{
    var l = document.links;

    let s = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>
              Set up fixed width for
            </title>
            <meta charset="UTF-8" />
            <meta name="viewport"
                  content="width=device-width, 
                           initial-scale=1.0" />
     
            <style>
                table,
                th,
                td {
                    border: 1px solid black;
                    border-collapse: collapse;
                }
                body,pre{color:#000} a[href]:empty::before {content: attr(href)} a:not([href]){border:3px solid red; padding:2px}
            </style>
        </head>
        <body>
            <h1 style="color: #00cc00;">
             Links List for : ${document.location.href}
            </h1>
            <div style="overflow-x: auto;">
            <table width="50%">
                <tr valign=top>
                    <th>Snippet</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>URL</th>
                </tr>
    `;

    for (i = 0; i < l.length; i++) {
        var lk = l[i];
        s += '<tr valign=top>';
        s += '<td width="30%"><textarea style="width:300px;height:100px">' + lk.outerHTML + '</textarea></td>';
        s += '<td  width="30%">' + lk.computedName + '</td>';
        s += '<td  width="30%">' + lk.computedRole + '</td>';    
        s += '<td width="40%"><a href=' + lk.href + '>' + lk.href + '</a></td>';
        s += '</tr>';
    }
    s += `
                </table>
            </div>
        </body>
    </html>
    `;

    var lw = window.open('', 'lw', '');
    lw.document.write(s);
    lw.document.close();
})();