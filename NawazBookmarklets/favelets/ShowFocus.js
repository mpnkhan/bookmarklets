javascript:(function(){var ua=navigator.userAgent.toLowerCase(),ie=ua.indexOf("msie")!=-1?ua.substr(ie+5,1):0,outlineProp=ie<8?"border":"outline",activeItem;function styleFocus(e){if(activeItem){activeItem.style[outlineProp]="";}activeItem=e.target||e.srcElement;if(activeItem){activeItem.style[outlineProp]="solid 2px red";}}if(document.addEventListener){document.addEventListener("focus",styleFocus,true);}else{document.attachEvent("onfocusin",styleFocus);}}());