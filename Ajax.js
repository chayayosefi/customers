"use strict";
exports.__esModule = true;
function getData(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', cb);
    xhr.open('GET', url);
    xhr.send();
}
exports["default"] = getData;
