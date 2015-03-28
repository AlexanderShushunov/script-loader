"use strict";

(function () {
    ScriptLoader.load([
        "../util.js",
        "subdir/grandchild.js"
    ], function () {
        window.DuplicateAvoidSpecMark += "c";
    });
})();