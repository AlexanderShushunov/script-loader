"use strict";
(function (j$) {
	j$.beforeEach(function () {
		window.DuplicateAvoidSpecMark = "";
	});

	j$.afterEach(function () {
		delete window.DuplicateAvoidSpecMark;
	});

	j$.describe("Script Loader", function () {
		j$.it("should not load one script twice", function (done) {
			ScriptLoader.load("../avoid-duplicate-spec-resource/root.js", function() {
				j$.expect(isAllLettersAreDiferent(window.DuplicateAvoidSpecMark)).toBeTruthy();
				done();
			})
		});
	});

	function isAllLettersAreDiferent(str) {
		return _.uniq(str).length === str.length;
	}

})(j$);