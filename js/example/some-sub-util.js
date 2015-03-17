"use strict";

window.SomeSubUtil = window.SomeSubUtil || {};
(function (SomeSubUtil) {
    window.loadingMarks += "SsCS,";
    ScriptLoader.load([
        "js/example/test-util.js"
    ], function () {
        // public static methods
        SomeSubUtil.foo = function () {
        };
        TestUtil.doSomethingLongTime();
        window.loadingMarks += "SsCE,";
    });
})(window.SomeSubUtil);