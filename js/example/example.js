"use strict";

(function () {
    ScriptLoader.load([
        "js/example/some-class.js",
        "js/example/second-class.js"
    ], function () {
        console.log(">> all tree has been loaded");
    });
})();