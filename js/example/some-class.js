"use strict";

(function (Namespace) {
    window.loadingMarks += "SoCS,";
    ScriptLoader.load([
        "js/example/some-util.js"
    ], function () {
        // constructor
        Namespace.SomeClass = function SomeClass() {
            if (!(this instanceof SomeClass)) {
                throw new Error("SomeClass is a constructor.");
            }
        };
        // use loaded functionality
        SomeUtil.veryHelpfulFoo();

        window.loadingMarks += "SoCE,";
    });
})(window);