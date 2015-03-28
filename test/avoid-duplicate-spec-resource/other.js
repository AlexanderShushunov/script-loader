"use strict";

(function () {
    ScriptLoader.load([
        "util.js",
        "dir/subdir/grandchild.js"
    ], function () {
        window.DuplicateAvoidSpecMark += "o";
    });
})();