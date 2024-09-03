(() => {
    //Template
    const injectStyles = (css) => {
        const style = document.createElement("style");
        style.innerHTML = css;
        document.head.appendChild(style);
        return style;
    };
    const getReferencedContents = (arr) => {
        const Ids = arr.split(" ");
        return Ids.map((id) => {
            const labelElement = document.getElementById(id);
            return labelElement
                ? labelElement.innerText || labelElement.textContent || ""
                : "";
        })
            .join(" ")
            .trim();
    };
    injectStyles(`
    .tableSpan{
        color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;margin:0 2px; padding:2px;speak:literal-punctuation;
    }
    .outlineGreen{
        outline:green 2px solid;padding:2px;
    }
    .outlineOlive{
        outline:2px solid olive;
    }
    .outlineOrange{
        outline:orange 2px dashed;padding:2px;
    }
`);
    const divs = document.querySelectorAll(".tableSpan");
    if (divs.length > 0) {
        divs.forEach((div) => div.remove());
        document
            .querySelectorAll(".outlineGreen,.outlineOlive,.outlineOrange")
            .forEach((outlineTemp) => {
                outlineTemp.classList.remove("outlineOlive");
                outlineTemp.classList.remove("outlineGreen");
                outlineTemp.classList.remove("outlineOrange");
            });
    } else {
        const newElement = document.createElement("div");
        newElement.innerHTML =
            '<strong class="tableSpan" id="tblInfo" role="status"></strong>';
        document.body.insertBefore(newElement, document.body.firstElementChild);
        let tableFound = false;
        document.querySelectorAll("caption").forEach((caption) => {
            caption.classList.add("outlineGreen");
            caption.innerHTML = `
                <strong class="tableSpan">&lt;caption&gt;</strong>${caption.innerHTML}<strong class="tableSpan">&lt;/caption&gt;</strong> 
            `;
        });

        document.querySelectorAll("th").forEach((th) => {
            th.classList.add("outlineGreen");
            const thRole = th.getAttribute("role");
            const thScope = th.getAttribute("scope");
            const thHeaders = th.getAttribute("headers");
            let spanTxt;

            if (thRole) {
                th.insertAdjacentHTML(
                    "afterbegin",
                    `<strong class="tableSpan">th role= "${thRole}"</span>`,
                );
            }
            if (thScope) {
                th.insertAdjacentHTML(
                    "afterbegin",
                    `<strong class="tableSpan">th scope= "${thScope}"</span>`,
                );
            }
            if (thHeaders) {
                th.insertAdjacentHTML(
                    "afterbegin",
                    `<strong class="tableSpan">th Headers= "${thHeaders}"</span>`,
                );
            }
        });

        document.querySelectorAll("td").forEach((td) => {
            td.classList.add("outlineOrange");
            const tdRole = td.getAttribute("role");
            const tdScope = td.getAttribute("scope");
            const tdHeaders = td.getAttribute("headers");

            if (tdRole) {
                td.insertAdjacentHTML(
                    "afterbegin",
                    `<strong class="tableSpan">td role= "${tdRole}"</span>`,
                );
            }
            if (tdScope) {
                td.insertAdjacentHTML(
                    "afterbegin",
                    `<strong class="tableSpan">td scope= "${tdScope}"</span>`,
                );
            }
            if (tdHeaders) {
                td.insertAdjacentHTML(
                    "afterbegin",
                    `<strong class="tableSpan">td Headers= "${tdHeaders}"</span>`,
                );
            }
        });
        document.querySelectorAll("table, [role=grid]").forEach((table) => {
            const summary = table.getAttribute("summary");
            const labelledBy = table.getAttribute("aria-labelledby");
            let labelledByText;
            if (labelledBy) labelledByText = getReferencedContents(labelledBy);
            const ariaLabel = table.getAttribute("aria-label");
            const ariaRole = table.getAttribute("role");
            const title = table.getAttribute("title");

            const tagName = table.tagName.toLowerCase();
            table.classList.add("outlineOlive");
            tableFound = true;

            if (summary)
                table.insertAdjacentHTML(
                    "beforebegin",
                    `<strong class="tableSpan">&lt;${tagName} summary= "${summary}"&gt;</span>`,
                );
            else if (ariaLabel)
                table.insertAdjacentHTML(
                    "beforebegin",
                    `<strong class="tableSpan">&lt;${tagName} aria-label= "${ariaLabel}"&gt;</span>`,
                );
            else if (labelledByText)
                table.insertAdjacentHTML(
                    "beforebegin",
                    `<strong class="tableSpan">&lt;${tagName} aria-labelledby= "${labelledByText}"&gt;</span>`,
                );
            else if (ariaRole)
                table.insertAdjacentHTML(
                    "beforebegin",
                    `<strong class="tableSpan">&lt;${tagName} role= "${ariaRole}"&gt;</span>`,
                );
            else if (title)
                table.insertAdjacentHTML(
                    "beforebegin",
                    `<strong class="tableSpan">&lt;${tagName} title= "${title}"&gt;</span>`,
                );
            else
                table.insertAdjacentHTML(
                    "beforebegin",
                    `<strong class="tableSpan">&lt;${tagName}&gt;</span>`,
                );
        });
        document.querySelectorAll("tr").forEach((tr) => {
            if (tr.getAttribute("role"))
                tr.insertAdjacentHTML(
                    "beforebegin",
                    `<strong class="tableSpan">&lt;tr role= "${tr.getAttribute("role")}"&gt;</span>`,
                );
        });
        if (!tableFound) {
            document.getElementById("tblInfo").innerHTML +=
                "No tables Found on Page: " + document.title;
        }
    }
})();