javascript: (function() {
	if (confirm("Make sure dev tools is open before running:\n\nOK = Dev Tools is running\nCancel = Give me a minute, I'll open it up and then try again")) {
		function addAppStyles() {
			const e = document.createElement("style");
			e.textContent = "#DOMfreezeTimer {line-height:1;text-align:center;position:fixed;top:50%;left:50%;background:black;opacity:0.8;color:white;font-size:5em;padding:1em;border-radius:10px;transform: translate(-50%,-50%);}#DOMfreezeTimer.frozen{font-size:3em}", document.head.appendChild(e)
		}

		function addActionFloatingPanelToBody() {
			const e = document.createElement("div");
			e.setAttribute("id", "DOMfreezeTimer"), e.setAttribute("role", "alert"), document.body.appendChild(e)
		}
		addAppStyles(), addActionFloatingPanelToBody();
		const e = document.querySelector("#DOMfreezeTimer");

		function countdown(t) {
			console.clear(), console.log(t), e.textContent = t
		}
		countdown("3"), setTimeout(() => {
			countdown("2")
		}, 1e3), setTimeout(() => {
			countdown("1")
		}, 2e3), setTimeout(() => {
			e.classList.add("frozen"), countdown("DOM Frozen for inspection"), setTimeout(() => {
				e.remove()
			}, 5e3)
		}, 3e3)
	}
})()