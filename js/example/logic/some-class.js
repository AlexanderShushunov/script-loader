"use strict";

(function (Namespace) {
    window.loadingMarks += "SomeClass_Start,";
    ScriptLoader.load([
        "http://yastatic.net/underscore/1.6.0/underscore.js",
        "../utils/some-util.js"
    ], function () {
        // constructor
        Namespace.SomeClass = function SomeClass() {
            if (!(this instanceof SomeClass)) {
                throw new Error("SomeClass is a constructor.");
            }
        };
        // use loaded functionality
        SomeUtil.veryHelpfulFoo();

        if (_) {
            window.loadingMarks += "Underscore_Available,";
        }

        window.loadingMarks += "SomeClass_Loaded,";
    });
})(window);