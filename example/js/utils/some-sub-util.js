"use strict";

window.SomeSubUtil = window.SomeSubUtil || {};
(function (SomeSubUtil) {
    window.loadingMarks += "SomeSubUtil_Start,";
    ScriptLoader.load([
        "test-util.js"
    ], function () {
        // public static methods
        SomeSubUtil.foo = function () {
        };
        if (TestUtil) {
            TestUtil.doSomethingLongTime();
            window.loadingMarks += "TestUtil_Available,";
        }
        window.loadingMarks += "SomeSubUtil_End,";
    });
})(window.SomeSubUtil);