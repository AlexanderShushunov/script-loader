"use strict";

window.SomeUtil = window.SomeUtil || {};
(function (SomeUtil) {
    console.log("SomeUtil start loading");
    ScriptLoader.load([
        "js/some-sub-util.js"
    ], function () {
        // public static methods
        SomeUtil.veryHelpfulFoo = function () {
        };
        console.log("SomeUtil loaded");
    });
})(window.SomeUtil);