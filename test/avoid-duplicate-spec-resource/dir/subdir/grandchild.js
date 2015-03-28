"use strict";

(function () {
    ScriptLoader.load([
        "../../util.js",
        "other-grandchild.js",
        "http://yastatic.net/underscore/1.6.0/underscore.js",
        "../child.js"
    ], function () {
        window.DuplicateAvoidSpecMark += "g";
    });
})();