"use strict";

window.SomeUtil = window.SomeUtil || {};
(function (SomeUtil) {
    console.log("SomeUtil start loading");
    ScriptLoader.load([
        "js/example/some-sub-util.js"
    ], function () {
        // public static methods
        SomeUtil.veryHelpfulFoo = function () {
        };
        // use loaded functionality
        SomeSubUtil.foo();
        console.log("SomeUtil loaded");
    });
})(window.SomeUtil);