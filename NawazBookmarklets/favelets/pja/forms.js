(() => {
  //Template
  const injectStyles = (css) => {
    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);
    return style;
  };
  const getTxtContents = (elem) => {
    return Array.from(elem.childNodes)
      .filter(
        (node) => node !== elem && node.tagName?.toLowerCase() !== "title",
      )
      .map((node) => node.textContent || "")
      .join("")
      .trim();
  };
  const getReferencedContents = (arr) => {
    const Ids = arr.split(" ");
    Ids.map((id) => {
      const labelElement = document.getElementById(id);
      return labelElement
        ? labelElement.innerText || labelElement.textContent || ""
        : "";
    })
      .join(" ")
      .trim();
  };
  injectStyles(`
    .formSpan{
        color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;margin:0 2px; padding:2px;speak:literal-punctuation;
    }
    .outlineGreen{
        outline:green 2px solid;padding:2px;
    }
    .outlineRed{
        outline: red 2px solid;padding:2px;
    }    
`);
  const divs = document.querySelectorAll(".formSpan");
  if (divs.length > 0) {
    divs.forEach((div) => div.remove());
    document
      .querySelectorAll(".outlineGreen,.outlineRed")
      .forEach((outlineTemp) => {
        outlineTemp.classList.remove("outlineRed");
        outlineTemp.classList.remove("outlineGreen");
      });
  } else {
    let spanTxt, descTxt;
    const elements = document.querySelectorAll("input, textarea, select");
    const filteredElements = Array.from(elements).filter((element) => {
      return !(
        element.type === "hidden" ||
        element.type === "button" ||
        element.type === "submit" ||
        element.type === "reset"
      );
    });
    filteredElements.forEach((elem) => {
      const labelledBy = elem.getAttribute("aria-labelledby");
      const ariaLabel = elem.getAttribute("aria-label");
      let noLabel = false;
      let explicitLabel;
      if (elem.id) {
        explicitLabel = document.querySelector(`label[for="${elem.id}"]`);
      }
      const implicitLabel = elem.closest("label");
      const title = elem.getAttribute("title");
      const txtContent = elem.innerText || elem.textContent;

      const ariaRequired = elem.getAttribute("aria-required");
      const ariaInvalid = elem.getAttribute("aria-invalid");
      const ariaAC = elem.getAttribute("aria-autocomplete");
      const describedBy = elem.getAttribute("aria-describedby");

      elem.classList.add("outlineGreen");

      if (labelledBy) {
        const labelledByText = getReferencedContents(labelledBy);
        spanTxt = "Labelledby Ids: " + labelledBy;
        if (labelledByText) {
          spanTxt += " : AccName - " + labelledByText;
        }
      } else if (ariaLabel) {
        spanTxt = `AccName from aria-label="${ariaLabel}"`;
      } else if (explicitLabel) {
        spanTxt = `AccName from explicit label: "${explicitLabel.innerText || explicitLabel.textContent}"`;
      } else if (implicitLabel) {
        const labelContents = getTxtContents(implicitLabel);
        if (labelContents) {
          spanTxt = `AccName from wrapping label: "${labelContents}"`;
        }
      } else if (title) {
        spanTxt = `AccName from inner title: "${title}"`;
      } else if (txtContent) {
        spanTxt = `AccName from inner contents: "${txtContent}"`;
      } else {
        elem.classList.add("outlineRed");
        noLabel = true;
        spanTxt = `No Label`;
      }
      elem.insertAdjacentHTML(
        "afterend",
        `
                <span class="formSpan">${spanTxt}</span>
            `,
      );

      if (ariaRequired)
        elem.insertAdjacentHTML(
          "afterend",
          `<span class="formSpan">ariaRequired="${ariaRequired}"</span>`,
        );
      if (ariaInvalid)
        elem.insertAdjacentHTML(
          "afterend",
          `<span class="formSpan">ariaInvalid="${ariaInvalid}"</span>`,
        );
      if (ariaAC)
        elem.insertAdjacentHTML(
          "afterend",
          `<span class="formSpan">aria-autocomplete="${ariaAC}"</span>`,
        );

      const fieldset = elem.closest("fieldset");
      if (fieldset) {
        fieldset.classList.add("outlineGreen");
        fieldset.insertAdjacentHTML(
          "afterbegin",
          `<strong class="formSpan">&lt;legend&gt;</strong>`,
        );
        fieldset.insertAdjacentHTML(
          "beforeend",
          `<strong class="formSpan">&lt;/legend&gt;</strong>`,
        );

        const legend = fieldset.querySelector("legend");
        if (legend) {
          legend.classList.add("outlineGreen");
          legend.innerHTML = `<strong class="formSpan">&lt;legend&gt;${legend.innerHTML}<strong class="formSpan">/legend&gt;</strong>`;
          legend.insertAdjacentHTML(
            "afterbegin",
            `<strong class="formSpan">&lt;fieldset&gt;</strong>`,
          );
          legend.insertAdjacentHTML(
            "beforeend",
            `<strong class="formSpan">&lt;/fieldset&gt;</strong>`,
          );
        }
      } //end fieldset

      if (describedBy) {
        const describedByText = getReferencedContents(describedBy);
        descTxt = "Described by ids: " + describedBy;
        if (describedByText) {
          descTxt += " : AccDescription: " + describedByText;
        }
        elem.insertAdjacentHTML(
          "afterend",
          `<span class="formSpan">${descTxt}</span>`,
        );
      }
    }); //end input forEach
  }
})();