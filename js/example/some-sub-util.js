"use strict";

window.SomeSubUtil = window.SomeSubUtil || {};
(function (SomeSubUtil) {
    console.log("SomeSubUtil start loading");
    ScriptLoader.load([
        "js/example/test-util.js"
    ], function () {
        // public static methods
        SomeSubUtil.foo = function () {
        };
        TestUtil.doSomethingLongTime();
        console.log("SomeSubUtil loaded");
    });
})(window.SomeSubUtil);