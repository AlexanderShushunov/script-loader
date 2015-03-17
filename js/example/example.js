"use strict";

(function () {
    window.loadingMarks = "";
    ScriptLoader.load([
        "js/example/some-class.js",
        "js/example/second-class.js"
    ], function () {
        window.loadingMarks += "AllE";
        checkLoadingOrder();
    });

    var checkLoadingOrder = function () {
        if (window.loadingMarks == "SoCS,SuCS,SsCS,SsCE,SuCE,SoCE,SeCS,SeCE,AllE") {
            console.log("ОК");
        } else {
            console.log("Something is wrong");
            console.log("loadingMarks: " + window.loadingMarks);
        }
    };
})();