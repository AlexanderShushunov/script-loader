"use strict";

// wrap Jasmine global function to namespace
window.j$ = window.j$ || {};
(function (j$) {
	j$.it = it;
	j$.xit = xit;
	j$.describe = describe;
	j$.expect = expect;
	j$.beforeEach = beforeEach;
	j$.afterEach = afterEach;
	j$.unexpected = function() {
		return expect(true).toBeFalsy();
	}
})(window.j$);