"use strict";

window.SomeSubUtil = window.SomeSubUtil || {};
(function (SomeSubUtil) {
    console.log("SomeSubUtil start loading");
    // public static methods
    SomeSubUtil.foo = function() {
    };
    console.log("SomeSubUtil loaded");
})(window.SomeSubUtil);