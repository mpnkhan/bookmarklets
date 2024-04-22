javascript: (function() {
	'use strict'
	/*
	TODO
	- flag possible heading text
	 */
	function listHeadings() {

		console.clear();
		const headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6,.h1,.h2,.h3,.h4,.h5,.h6,[role='heading'][aria-level='1'],[role='heading'][aria-level='2'],[role='heading'][aria-level='3'],[role='heading'][aria-level='4'],[role='heading'][aria-level='5'],[role='heading'][aria-level='6'],[aria-role='heading'][aria-level='1'],[aria-role='heading'][aria-level='2'],[aria-role='heading'][aria-level='3'],[aria-role='heading'][aria-level='4'],[aria-role='heading'][aria-level='5'],[aria-role='heading'][aria-level='6']");
		const bookmarkletIndicators = document.querySelectorAll(".bookmarklet-indicator");
		let headingWordCount = 0;
		let longHeading = false;
		let prevHeadingLevel = 1;
		let thisHeadingLevel = 1;
		let headingtext = "";
		let errorsFound = false;
		let headingCount = 0;
		let h1Found = false;
		let duplicateH1sFound = false;
		let headingTag = "";
		let indentStr = "";
		let errReport = "";
		let headingConsoleOutput = "";
		let headingLevelDiff;
		let thisHeadingErrDesc = "";
		let badAriaRoleHeading = false;
		let focusableHeadingsFound = false;
		let firstHeadingIsH1 = false;
		let noH1headingPresent = false;
		let noHeadingsFound = (headings.length === 0);
		let skippedHeadingLevels = false;
		let emptyHeading = false;
		let styledUsingCssHeadingClasses = false; //e.g. class="h1", "h2" etc

		Array.from(bookmarkletIndicators).forEach((bookmarkletIndicator) => {
			bookmarkletIndicator.remove();
		});

		const firstH1 = document.querySelector("h1,[aria-role='heading'][aria-level='1']");
		const title = document.title.trim().toLowerCase();
		let firstH1NotPresentInTitle = false;
		if (firstH1) {
			if (title.indexOf(firstH1.textContent.trim().toLowerCase()) == -1) {
				thisHeadingErrDesc = "First H1 on page, content not present in the page <title>";
				firstH1NotPresentInTitle = true;
				errorsFound = true;
				highlight(firstH1, thisHeadingErrDesc);
			}
		} else {
			errorsFound = true;
			noH1headingPresent = true;
		}

		function writeIndents(thisHeadingLevel) {
			indentStr = "";
			for (let i = 0; i < thisHeadingLevel - 1; i++) {
				indentStr += "    ";
			}
		}

		function highlight(heading, ERR_DESC) {
			heading.style.outline = "5px solid darkred";
			heading.style.outlineOffset = "5px solid darkred";
			const newDiv = document.createElement("DIV");
			newDiv.setAttribute('style', 'display:inline-block;color:#fff;background:darkred;padding:5px;margin-top:5px;');
			newDiv.setAttribute('aria-hidden', 'true');
			newDiv.setAttribute('class', 'bookmarklet-indicator');
			newDiv.textContent = "^ " + ERR_DESC;
			heading.parentNode.insertBefore(newDiv, heading.nextSibling);
		}

		Array.from(headings).forEach((heading) => {

			if (
				(heading.tagName !== "H1") &&
				(heading.tagName !== "H2") &&
				(heading.tagName !== "H3") &&
				(heading.tagName !== "H4") &&
				(heading.tagName !== "H5") &&
				(heading.tagName !== "H6") &&
				(!heading.getAttribute("aria-level")) &&
				(!(heading.getAttribute("role") === "heading"))
			) {
				errorsFound = true;
				noHeadingsFound = true;
				styledUsingCssHeadingClasses = true;
				headingtext = heading.textContent.trim();
				thisHeadingErrDesc = "Styled using CSS class of ";
				headingConsoleOutput += "\n" + headingtext;
				headingConsoleOutput += "\n👆 " + thisHeadingErrDesc;
				if (heading.classList.contains("h1")) {
					thisHeadingErrDesc += "`h1`";
				}
				if (heading.classList.contains("h2")) {
					thisHeadingErrDesc += "`h2`";
				}
				if (heading.classList.contains("h3")) {
					thisHeadingErrDesc += "`h3`";
				}
				if (heading.classList.contains("h4")) {
					thisHeadingErrDesc += "`h4`";
				}
				if (heading.classList.contains("h5")) {
					thisHeadingErrDesc += "`h5`";
				}
				if (heading.classList.contains("h6")) {
					thisHeadingErrDesc += "`h6`";
				}
				highlight(heading, thisHeadingErrDesc);
			} else {

				if (heading.getAttribute("aria-role") === "heading") {
					badAriaRoleHeading = true;
					errorsFound = true;
					thisHeadingErrDesc = "Invalid attribute `aria-role` applied";
					headingConsoleOutput += "\n" + indentStr + "👆 " + thisHeadingErrDesc;
					highlight(heading, thisHeadingErrDesc);
				}

				noHeadingsFound = false;
				headingCount++;
				headingtext = heading.textContent.trim();
				headingWordCount = headingtext.split(" ").length;
				if (headingtext === "") {
					thisHeadingErrDesc = "Empty heading";
					errorsFound = true;
					emptyHeading = true;
					highlight(heading, thisHeadingErrDesc);
				}
				if ((heading.tagName !== "H1") && (heading.tagName !== "H2") && (heading.tagName !== "H3") && (heading.tagName !== "H4") && (heading.tagName !== "H5") && (heading.tagName !== "H6")) {
					headingTag = "\nH" + heading.getAttribute("aria-level");
					thisHeadingLevel = parseInt(heading.getAttribute("aria-level"));
					writeIndents(thisHeadingLevel);
					headingConsoleOutput += indentStr + headingTag + ": " + headingtext;
					headingConsoleOutput += "\n" + indentStr + "👆 Not a *real* heading";
					headingConsoleOutput += "\n" + indentStr + "`aria-role=\"heading\"`";
					headingConsoleOutput += "\n" + indentStr + "`aria-level=\"" + heading.getAttribute("aria-level") + "\"`";
				} else {
					headingTag = heading.tagName;
					thisHeadingLevel = parseInt(heading.tagName.replace("H", ""));
					writeIndents(thisHeadingLevel);
					headingConsoleOutput += "\n" + indentStr + headingTag + ": " + headingtext;
				}
				if (thisHeadingLevel === 1) {
					if (thisHeadingLevel === 1 && h1Found && (heading.getAttribute("role") === "heading")) {
						duplicateH1sFound = true;
						errorsFound = true;
						thisHeadingErrDesc = "Multiple h1s";
						headingConsoleOutput += "\n" + indentStr + "👆 " + thisHeadingErrDesc;
						highlight(heading, thisHeadingErrDesc);
					} else {
						h1Found = true;
					}
				}
				if (thisHeadingLevel === 1 && headingCount === 1) {
					firstHeadingIsH1 = true;
				} else {
					if (headingCount === 1) {
						errorsFound = true;
						thisHeadingErrDesc = "First heading on the page is NOT an h1";
						headingConsoleOutput += "\n" + indentStr + "👆 " + thisHeadingErrDesc;
						highlight(heading, thisHeadingErrDesc);
					}
				}
				headingLevelDiff = thisHeadingLevel - prevHeadingLevel;
				if (headingLevelDiff > 1) {
					if (headingCount !== 1) {
						thisHeadingErrDesc = "Skipped heading levels - jumped " + headingLevelDiff + " levels (from h" + prevHeadingLevel + " to h" + thisHeadingLevel + ")";
						headingConsoleOutput += "\n" + indentStr + "👆 " + thisHeadingErrDesc;
						errorsFound = true;
						skippedHeadingLevels = true;
						highlight(heading, thisHeadingErrDesc);
					}
				}
				if (headingWordCount > 10) {
					longHeading = true;
					errorsFound = true;
					thisHeadingErrDesc = "This is a loooooooooooooong heading";
					headingConsoleOutput += "\n" + indentStr + "👆 " + thisHeadingErrDesc;
					highlight(heading, thisHeadingErrDesc);
				}
			}
			if (heading.getAttribute("tabindex") === "0") {
				errorsFound = true;
				focusableHeadingsFound = true;
				thisHeadingErrDesc = "Heading is focusable";
				headingConsoleOutput += "\n" + indentStr + "👆 " + thisHeadingErrDesc;
				highlight(heading, thisHeadingErrDesc);
			}
			prevHeadingLevel = thisHeadingLevel;
		});
		if (noHeadingsFound) {
			errorsFound = true;
		}
		console.log(headingConsoleOutput);
		if (errorsFound) {
			if (firstH1NotPresentInTitle) {
				errReport += "\n* WARNING: First H1 content is not present in the page <title> [BEST PRACTICE - SC 1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)";
			}
			if ((!firstHeadingIsH1) && (!noHeadingsFound)) {
				errReport += "\n* WARNING: First heading found on page is not an h1 [BEST PRACTICE - SC 1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)";
			}
			if (badAriaRoleHeading) {
				errReport += "\n* ERR: Invalid `aria-role=\"heading\"` used (should be `role`) [SC 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value)";
			}
			if (noHeadingsFound) {
				errReport += "\n* WARNING: No headings found on the page at all [BEST PRACTICE - SC 1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)";
			}
			if (focusableHeadingsFound) {
				errReport += "\n* ERR: Some headings were made focusable [SC 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value)";
			}
			if (noH1headingPresent) {
				errReport += "\n* WARNING: No H1 heading found on page [BEST PRACTICE - SC 1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)";
			}
			if (duplicateH1sFound) {
				errReport += "\n* WARNING: Multiple H1 headings present on page [SC 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value)";
			}
			if (skippedHeadingLevels) {
				errReport += "\n* WARNING: Skipped heading levels [SC 1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)";
			}
			if (emptyHeading) {
				errReport += "\n* WARNING: Empty heading(s) found on page [SC 1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)";
			}
			if (styledUsingCssHeadingClasses) {
				errReport += "\n* ERR: Text marked up using heading tags as class names, but no heading semantics present [SC 1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)";
			}
			if (longHeading) {
				errReport += "\n* WARNING: 1 or more headings found with long  word count (likely not suitable as a heading) [SC 1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships)";
			}
			errReport = "#Errors found" + errReport;
			console.log(errReport);
		}
	}
	listHeadings();
})()