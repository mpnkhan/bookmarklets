javascript: (function() {
	function roleReverser() {
		function swapElements(srcEl) {
			console.clear();
			const txtSource = document.querySelector("#txtSource");
			const txtAmended = document.querySelector("#txtAmended");
			const tempDOMDumpingGround = document.querySelector("#tempDOMDumpingGround");
			const log = document.querySelector("#log");
			let scopeDoc = false;
			let consoleStr = "";
			let pointlessTabindexCount = 0;
			let strChangeSummaryWrapperStart = "";
			let strChangeSummaryWrapperEnd = "";
			let strChangeSummaryItemStart = "";
			let strChangeSummaryItemEnd = "";
			let strChangeSummary = "";

			function replaceElement(parent, newElementTagName, newElementType) {
				var newDOMel = document.createElement(newElementTagName);
				if (newElementType !== "") {
					newDOMel.setAttribute("type", newElementType);
				}
				if (newElementTagName === "a") {
					newDOMel.setAttribute("href", "#");
				}
				for (var i = elAttributes.length - 1; i >= 0; i--) {
					let attrName = elAttributes[i].split("->")[0];
					let attrVal = elAttributes[i].split("->")[1];
					if (attrName !== "role") {
						if (attrName !== "aria-level") {
							newDOMel.setAttribute(attrName, attrVal);
						}
					}
				}
				if (
					(newElementTagName === "a") ||
					(newElementTagName === "button") ||
					(newElementTagName === "input") ||
					(newElementTagName === "select") ||
					(newElementTagName === "textarea")
				) {
					if (newDOMel.getAttribute("tabindex")) {
						pointlessTabindexCount++;
						newDOMel.removeAttribute("tabindex");
					}
				}
				// console.log("pointlessTabindexCount = " + pointlessTabindexCount);
				NodeList.prototype.forEach = Array.prototype.forEach;
				var children = parent.childNodes;
				children.forEach(function(item) {
					var clone = item.cloneNode(true);
					newDOMel.appendChild(clone);
				});
				parent.replaceWith(newDOMel);
			}

			let elAttributes = [];

			let src;
			if (srcEl) {
				src = srcEl;
				scopeDoc = true;
			} else {
				src = tempDOMDumpingGround;
				tempDOMDumpingGround.innerHTML = txtSource.value;
			}

			let swappedElementCount = 0;
			let allElementsWithRolesCount = 0;

			function sweepThrough() {
				const elementsWithRoles = src.querySelectorAll('[role="button"],[role="link"],[role="heading"],[role="option"],[role="listbox"],[role="listitem"],[role="list"],[role="checkbox"],[role="checkbox"],[role="radio"],[role="textbox"],[role="main"],[role="navigation"],[role="img"],[role="image"],[role="table"]');
				const elementsWithRolesThatNeedSwapping = src.querySelectorAll('[role="button"]:not(button[role="button"]),[role="link"]:not(a[role="link"]),[role="heading"]:not(h1,h2,h3,h4,h5,h6)[aria-level],[role="option"]:not(option[role="option"]),[role="listbox"]:not(select[role="listbox"]),[role="listitem"]:not(li[role="listitem"]),[role="list"]:not(ul,ol),[role="checkbox"]:not(input),[role="checkbox"]:not(input),[role="radio"]:not(input),[role="textbox"]:not(input),[role="main"]:not(main),[role="navigation"]:not(nav),[role="img"]:not(img),[role="image"]:not(img),[role="table"]:not(table)');
				if (elementsWithRolesThatNeedSwapping.length > swappedElementCount) {
					swappedElementCount = elementsWithRolesThatNeedSwapping.length;
				}
				if (elementsWithRoles.length > allElementsWithRolesCount) {
					allElementsWithRolesCount = elementsWithRoles.length;
				}
				Array.from(elementsWithRolesThatNeedSwapping).forEach((elementWithRoleThatNeedSwapping) => {
					let newElementTagName = "";
					let newElementType = "";
					let elRole = elementWithRoleThatNeedSwapping.getAttribute("role");
					newElementTagName = elRole;
					if (elRole === "link") {
						newElementTagName = "a";
					}
					if (elRole === "image") {
						newElementTagName = "img";
					}
					if (elRole === "navigation") {
						newElementTagName = "nav";
					}
					if (elRole === "list") {
						newElementTagName = "ul";
					}
					if (elRole === "listitem") {
						newElementTagName = "li";
					}
					if (elRole === "listbox") {
						newElementTagName = "select";
					}
					if (elRole === "texbox") {
						newElementTagName = "input";
						newElementType = "text";
					}
					if (elRole === "heading") {
						newElementTagName = "h" + elementWithRoleThatNeedSwapping.getAttribute("aria-level");
					}
					if (elRole === "checkbox" || elRole === "radio") {
						newElementTagName = "input";
						newElementType = elRole;
					}
					elAttributes = [];
					let thisElAttributes = elementWithRoleThatNeedSwapping.attributes;
					for (var i = thisElAttributes.length - 1; i >= 0; i--) {
						elAttributes.push(thisElAttributes[i].name + "->" + thisElAttributes[i].value);
					}
					replaceElement(elementWithRoleThatNeedSwapping, newElementTagName, newElementType);
					consoleStr += elementWithRoleThatNeedSwapping.outerHTML + "\n👉 <" + newElementTagName + ">\n----\n";
				});
			}
			sweepThrough();
			sweepThrough();
			if (scopeDoc) {
				strChangeSummaryItemStart = "• ";
				strChangeSummaryItemEnd = "\n";
			} else {
				strChangeSummaryWrapperStart = "<ul>";
				strChangeSummaryWrapperEnd = "</ul>";
				strChangeSummaryItemStart = "<li>";
				strChangeSummaryItemEnd = "</li>";
			}

			strChangeSummary += strChangeSummaryItemStart + allElementsWithRolesCount + " elements in original markup have `role` attributes." + strChangeSummaryItemEnd;
			strChangeSummary += strChangeSummaryItemStart + swappedElementCount + " elements were swapped back to native HTML equivalents." + strChangeSummaryItemEnd;
			if (allElementsWithRolesCount > swappedElementCount) {
				strChangeSummary += strChangeSummaryItemStart + (allElementsWithRolesCount - swappedElementCount) + " elements have (possibly superfluous) `role` attributes applied to native HTML elements." + strChangeSummaryItemEnd;
			}
			if (pointlessTabindexCount > 0) {
				strChangeSummary += strChangeSummaryItemStart + pointlessTabindexCount + " `tabindex` attributes removed from (now) natively focusable elements" + strChangeSummaryItemEnd;
			}
			if (!scopeDoc) {
				txtAmended.value = tempDOMDumpingGround.innerHTML;
				tempDOMDumpingGround.innerHTML = "";
				strChangeSummary = strChangeSummaryWrapperStart + strChangeSummary + strChangeSummaryWrapperEnd;
				log.innerHTML = strChangeSummary;
			} else {
				alert(strChangeSummary);
			}
			console.log(consoleStr);
		}

		swapElements(document.querySelector("body"));
	}

	roleReverser();
})()