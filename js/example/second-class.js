"use strict";

(function (Namespace) {
    console.log("SecondClass start loading");
    // constructor
    Namespace.SecondClass = function SecondClass() {
        if (!(this instanceof SecondClass)) {
            throw new Error("SecondClass is a constructor.");
        }
    };

    console.log("SecondClass  loaded");
})(window);