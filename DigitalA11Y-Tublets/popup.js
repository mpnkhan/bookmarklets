
bookmarklets = ["aria", "aria-usage", "FocusOrder", "images", "forms", "headings", "tables", "landmarks", "lang", "tabindex", "tattrs", "iframes", "lists", "fsf", "tspacing","ocssimg","autocomp","lhref","target-size"]
chrome.storage.local.get(["sessionDataHTML"], function(result){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        if (result.sessionDataHTML != undefined)
            if(result.sessionDataHTML[tabs[0].id] != undefined)
                document.body.innerHTML = result.sessionDataHTML[tabs[0].id]
    })
})

$(document).on('click', '.toggle-button', function(){
    $(this).toggleClass('toggle-button-selected');
    const button= $(this, "button").children()[0];
    const btnId= button.id;
    const file= 'bookmarklets/'+ btnId.substring(0,btnId.length-1)+'.js';
    button.setAttribute('aria-pressed', button.getAttribute("aria-pressed") === 'true' ? 'false' : 'true');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['data/jquery.js', file]
        });
    });    
    chrome.storage.local.get(["sessionDataHTML"], function(result){
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            sessionDataHTML = {}

            if (result.sessionDataHTML!=undefined && result.sessionDataHTML[tabs[0].id] != undefined)
                sessionDataHTML = result.sessionDataHTML
            
            sessionDataHTML[tabs[0].id] = document.body.innerHTML
            chrome.storage.local.set({sessionDataHTML:sessionDataHTML}, function(){})
        })
    })

});

$(document).on("click", "#_rpage", function(){
   
    
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        console.log(tabs[0].url);
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id, allFrames: true},
            files: ["data/jquery.js", "bookmarklets/rpage.js"]
        });
    });

    var elems = document.querySelectorAll(".toggle-button-selected");

    [].forEach.call(elems, function(el) {
        el.classList.remove("toggle-button-selected");
    });

    chrome.storage.local.get(["sessionDataHTML"], function(result){
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            sessionDataHTML = {}

            if (result.sessionDataHTML!=undefined && result.sessionDataHTML[tabs[0].id] != undefined)
                sessionDataHTML = result.sessionDataHTML
            
            sessionDataHTML[tabs[0].id] = document.body.innerHTML
            chrome.storage.local.set({sessionDataHTML:sessionDataHTML}, function(){})
        })
    })
})