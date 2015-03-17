"use strict";

window.SomeUtil = window.SomeUtil || {};
(function (SomeUtil) {
    window.loadingMarks += "SuCS,";
    ScriptLoader.load([
        "js/example/some-sub-util.js"
    ], function () {
        // public static methods
        SomeUtil.veryHelpfulFoo = function () {
        };
        // use loaded functionality
        SomeSubUtil.foo();
        window.loadingMarks += "SuCE,";
    });
})(window.SomeUtil);