"use strict";

(function () {
    ScriptLoader.load([
        "js/some-class.js",
        "js/second-class.js"
    ], function () {
        console.log(">> all tree has been loaded");
    });
})();