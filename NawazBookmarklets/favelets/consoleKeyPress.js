javascript: (function() {
    console.log('%cRecord Keypress', 'background-color: yellow;color:black;font-size:1em;');
    let style = 'background-color: black; color: white; font-style: italic; padding: 5px; font-size: 1.5em;';
    document.addEventListener('keydown', e => {
        console.info(`%cKey Press: ${e.key}`, style);
    });
})();