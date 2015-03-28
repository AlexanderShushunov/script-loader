"use strict";

window.SomeUtil = window.SomeUtil || {};
(function (SomeUtil) {
    window.loadingMarks += "SomeUtil_Start,";
    ScriptLoader.load([
        "some-sub-util.js"
    ], function () {
        // public static methods
        SomeUtil.veryHelpfulFoo = function () {
        };
        // use loaded functionality
        SomeSubUtil.foo();
        window.loadingMarks += "SomeUtil_End,";
    });
})(window.SomeUtil);