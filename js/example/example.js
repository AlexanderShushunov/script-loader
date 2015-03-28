"use strict";

(function () {
    window.loadingMarks = "";
    ScriptLoader.load([
        "html:js/example/logic/some-class.js",
        "logic/second-class.js"
    ], function () {
        window.loadingMarks += "All_Tree_Loaded";
        checkLoadingOrder();
    });

    var checkLoadingOrder = function () {
        if (window.loadingMarks ==
                    "SomeClass_Start," +
                        "SomeUtil_Start," +
                            "SomeSubUtil_Start," +
                                "TestUtil_Available," +
                            "SomeSubUtil_End," +
                        "SomeUtil_End," +
                        "Underscore_Available," +
                    "SomeClass_Loaded," +
                    "SecondClass_Start," +
                    "SecondClass_Loaded," +
                "All_Tree_Loaded") {
            console.log("ОК");
        } else {
            console.log("Something is wrong");
            console.log("loadingMarks: " + window.loadingMarks);
        }
    };
})();