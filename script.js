// these 3 lines are copied from https://sqa.stackexchange.com/a/32355
Object.defineProperty(document, 'visibilityState', { value: 'visible', writable: true });
Object.defineProperty(document, 'hidden', { value: false, writable: true });
document.dispatchEvent(new Event("visibilitychange"));
// check if isAd by checking if there is a span with the text "Ad"
const isAd = () => ([...document.querySelectorAll("span")].filter(function (e) {
    return e.innerText.toLowerCase().includes("ad");
}).length >= 1);
// add on change listener taken from https://stackoverflow.com/questions/3219758/detect-changes-in-the-dom
var observeDOM = (function () {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    return function (obj, callback) {
        if (!obj || obj.nodeType !== 1) return;

        if (MutationObserver) {
            // define a new observer
            var mutationObserver = new MutationObserver(callback)

            // have the observer observe for changes in children
            mutationObserver.observe(obj, { childList: true, subtree: true })
            return mutationObserver
        }

        // browser support fallback
        else if (window.addEventListener) {
            obj.addEventListener('DOMNodeInserted', callback, false)
            obj.addEventListener('DOMNodeRemoved', callback, false)
        }
    }
})()


//watch for changes in the DOM (aka html tag) 
observeDOM(document.querySelector("html"), function (m) {
    // mute if isAd
    if (isAd()) {
        document.querySelectorAll('video').forEach(item => {
            item.muted = true;
        });
    }
    else {
        // unmute elsewhise
        document.querySelectorAll('video').forEach(item => {

            item.muted = false;
        });
    }
});