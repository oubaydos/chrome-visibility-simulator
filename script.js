// this code is copied from https://sqa.stackexchange.com/a/32355
Object.defineProperty(document, 'visibilityState', {value: 'visible', writable: true});
Object.defineProperty(document, 'hidden', {value: false, writable: true});
document.dispatchEvent(new Event("visibilitychange"));
