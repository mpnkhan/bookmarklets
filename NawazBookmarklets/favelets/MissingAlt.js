javascript: var g = document.images;
    var s = `
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
             Missing alt attributes for:  ${document.location.href}
            </h1>
            <div style="overflow-x: auto;">
            <table width="50%">
    `;
var n = 0;
for (i = 0; i < g.length; i++) {
    if (g[i].alt.length == 0) {
        s += '<tr>';
        s += '<td><img style="width:30px;height:30px" src=' + g[i].src + '><br>' + g[i].src + '</td>';
        s += '</tr>';
        n += 1;
    }
}
if (n != 0) {
    var mw = window.open('', 'mw', '');
    mw.document.open();
    mw.document.write(s);
    mw.document.close();
} else {
    alert('No images are missing alts in this document');
}