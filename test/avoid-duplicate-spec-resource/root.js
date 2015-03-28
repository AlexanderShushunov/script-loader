"use strict";

(function () {
    ScriptLoader.load([
        "other.js",
        "util.js",
        "dir/subdir/other-grandchild.js"
    ], function () {
        window.DuplicateAvoidSpecMark += "r";
    });
})();