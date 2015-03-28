"use strict";

(function () {
    window.loadingMarks = "All_Tree_Start,";
    ScriptLoader.load([
        "html:js/logic/some-class.js",
        "logic/second-class.js"
    ], function () {
        window.loadingMarks += "All_Tree_Loaded";
        console.log(window.loadingMarks);
        window.close();
    });
})();