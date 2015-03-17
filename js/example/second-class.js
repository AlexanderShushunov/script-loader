"use strict";

(function (Namespace) {
    window.loadingMarks += "SeCS,";
    // constructor
    Namespace.SecondClass = function SecondClass() {
        if (!(this instanceof SecondClass)) {
            throw new Error("SecondClass is a constructor.");
        }
    };
    window.loadingMarks += "SeCE,";
})(window);