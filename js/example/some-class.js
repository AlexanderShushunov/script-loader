"use strict";

(function (Namespace) {
    console.log("SomeClass start loading");
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

        console.log("SomeClass loaded");
    });
})(window);