javascript: (function() {
    function watchLiveRegions() {
        const config = {
            childList: true,
            subtree: true,
            characterData: true
        };
        const callback = function(mutationsList, observer) {
            for (let mutation of mutationsList) {
                console.log("---");
                console.log("Live region changed:", mutation.target.getAttribute("id"));
                if (mutation.type === 'childList') {
                    console.log('A child node has been added or removed.');
                } else if (mutation.type === 'subtree') {
                    console.log('The subtree was modified.');
                } else if (mutation.type === 'characterData') {
                    console.log('The text content of a node has changed.');
                }
                console.log("Inner content:", mutation.target.innerHTML);
            }
        };
        var a = document.createElement("style"),
            b;
        document.head.appendChild(a);
        b = a.sheet;
        b.insertRule(".identified-live-region {outline:4px solid red;outline-offset:4px;}", 0);
        const observer = new MutationObserver(callback);
        const allLiveRegions = document.querySelectorAll("[role=alert],[role=log],[role=marquee],[role=status],[aria-live]");
        if (allLiveRegions.length > 0) {
            alert(allLiveRegions.length + " live regions found. Open Dev Tools > Console for details");
            console.log("Live regions found:");
            Array.from(allLiveRegions).forEach(liveRegion => {
                liveRegion.classList.add("identified-live-region");
                observer.observe(liveRegion, config);
                console.log("id:", liveRegion.getAttribute("id"));
                console.log("role:", liveRegion.getAttribute("role"));
                console.log("aria-live:", liveRegion.getAttribute("aria-live"));
                console.log("aria-atomic:", liveRegion.getAttribute("aria-atomic"));
                console.log("aria-relevant:", liveRegion.getAttribute("aria-relevant"));
                console.log("Inner content:", liveRegion.innerHTML);
                console.log("================================================");
            });
            console.log("Changes to live region content will update below as they happen.");
        } else {
            alert("No live regions found on this page");
        }
    }
    watchLiveRegions()
})()