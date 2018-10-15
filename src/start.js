/**
 * Chrome Extensions don't have access to events when not being in the page scope.
 * So we inject the main functions into the page.
 *
 * @author    Jacob Groß
 * @date    2016-03-01
 */
(function inject(document) {
    'use strict';

    let s = document.createElement('script');
    let d = document.createElement('div');
    s.src = chrome.extension.getURL('main.js');
    let design_path = chrome.extension.getURL('index.html');
    // s.async = true // it's async by default
    s.onload = function onload() {
        this.parentNode.removeChild(this);
        s = null // GC
    };
    document.documentElement.appendChild(s);
    d.onload = function onload() {
        this.parentNode.removeChild(this);
        d = null // GC
    };
    document.documentElement.appendChild(d);


    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            setTimeout(function () {
                console.log('document.createTextNode(request.responseText)',document.createTextNode(request.responseText));
                d.innerHTML = request.responseText;
                console.log('d',d);
                document.getElementById('related').prepend(d);
            },5000)
        }
    };
    request.open('GET', design_path);
    request.send();

})(window.document);
