"use strict";

window.TestUtil = window.TestUtil || {};
(function (TestUtil) {
    // public static methods
    TestUtil.doSomethingLongTime = function() {
        var s = "";
        for (var cou = 0; cou < 10e6; cou++) {
            s = String(cou);
        }
    };
    
})(window.TestUtil);