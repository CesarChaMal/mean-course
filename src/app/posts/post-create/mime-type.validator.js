"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
exports.mimeType = function (control) {
    if (typeof (control.value) === 'string') {
        return rxjs_1.of(null);
    }
    var file = control.value;
    var fileReader = new FileReader();
    // const frObs = Observable.create((observer: Observer<{ [key: string]: any }>) => {
    var frObs = new rxjs_1.Observable(function (observer) {
        fileReader.addEventListener('loadend', function () {
            var arr = new Uint8Array(fileReader.result).subarray(0, 4);
            var header = '';
            var isValid = false;
            for (var i = 0; i < arr.length; i++) {
                header += arr[i].toString(16);
            }
            switch (header) {
                case '89504e47':
                    isValid = true;
                    break;
                case 'ffd8ffe0':
                case 'ffd8ffe1':
                case 'ffd8ffe2':
                case 'ffd8ffe3':
                case 'ffd8ffe8':
                    isValid = true;
                    break;
                default:
                    isValid = false;
                    break;
            }
            if (isValid) {
                observer.next(null);
            }
            else {
                observer.next({ InvalidMimeType: true });
            }
            observer.complete();
        });
        fileReader.readAsArrayBuffer(file);
    });
    return frObs;
};
