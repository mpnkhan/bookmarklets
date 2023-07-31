$("span, strong").remove(".axSpan, .langSpan, .openSpan, .closeSpan, .inputSpan, .altSpan");
$("select").remove(".autoCompleteSuggestion");
$("style").remove("#phltsbkmklt, #a11y-css-highlight");
$("input, select").removeClass("auto-complete-candidate");
$("input, select").removeClass("auto-complete-required");
$("button[name='ps']").remove();
$("span").remove(".FocusOrder");
$("*").each(function() {
        $(this).css('outline','');
});
$('body').append('<div id="success" role="alert" style="position:absolute; width:0; height:0; clip: rect(0,0,0,0);"></div>');
$('#success').html('Success! Page Reset!');
setTimeout(function(){ $('#success').remove();}, 3000);
$("script[src$='reset.js']").remove();