"use strict";

(function () {
    window.loadingMarks = "All_Tree_Start,";
    ScriptLoader.load([
        "html:js/logic/some-class.js",
        "logic/../logic/second-class.js",
        "utils/test-util.js"
    ], function () {
        window.loadingMarks += "All_Tree_Loaded";
        console.log(window.loadingMarks);
        window.close();
    });
})();