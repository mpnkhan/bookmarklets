javascript: var headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6,[role=heading],[aria-level]');
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
         Headings List for:  ${document.location.href}
        </h1>
        <div style="overflow-x: auto;">
        <table width="50%">
            <tr valign=top>
                <th>Snippet</th>
                <th>Name</th>
                <th>Role</th>
            </tr>
`;

 headings.forEach(h => {
    s += '<tr valign=top>';
    s += '<td width="30%"><textarea style="width:300px;height:100px">' + h.outerHTML + '</textarea></td>';
    s += '<td  width="30%">' + h.computedName + '</td>';
    s += '<td  width="30%">' + h.computedRole + '</td>';    
    s += '</tr>';
})
s += `
            </table>
        </div>
    </body>
</html>
`;

var hw = window.open('', 'hw', '');
hw.document.write(s);
hw.document.close();
