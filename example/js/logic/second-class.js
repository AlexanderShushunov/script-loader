"use strict";

(function (Namespace) {
    window.loadingMarks += "SecondClass_Start,";
    // constructor
    Namespace.SecondClass = function SecondClass() {
        if (!(this instanceof SecondClass)) {
            throw new Error("SecondClass is a constructor.");
        }
    };
    window.loadingMarks += "SecondClass_Loaded,";
})(window);