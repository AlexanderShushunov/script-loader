"use strict";
(function (j$) {
	var urlSimplifier;
	j$.beforeEach(function () {
		urlSimplifier = PrivateFunctionalityTester.ScriptLoader.urlSimplifier;
	});

	j$.describe("Url Simplifier", function () {
		j$.it("should not change url without ../ and ./", function () {
			var url = "path/lib/js/jasmine-2.2.0/l/jasmine.js";
			j$.expect(urlSimplifier.simplify(url)).toBe(url);
			var underscoreUrl = "http://yastatic.net/underscore/1.6.0/underscore.js";
			j$.expect(urlSimplifier.simplify(underscoreUrl)).toBe(underscoreUrl);
		});

		j$.it("should remove same level (./) subpaths", function () {
			j$.expect(urlSimplifier.simplify("./lib.././jasmine-2.2.0././.jasmine.js")).toBe("lib../jasmine-2.2.0./.jasmine.js");
		});

		j$.it("should remove level up (../) subpaths", function () {
			j$.expect(urlSimplifier.simplify("../lib/avoiddir/../jasmine-2.2.0./othoer/../.jasmine.js..")).toBe("../lib/jasmine-2.2.0./.jasmine.js..");
			j$.expect(urlSimplifier.simplify("lib/avoiddir/otheravoid/../../jasmine-2.2.0/jasmine.js")).toBe("lib/jasmine-2.2.0/jasmine.js");
			j$.expect(urlSimplifier.simplify("lib/dd/tt/../../jasmine-2.2.0/jasmine.js")).toBe("lib/jasmine-2.2.0/jasmine.js");
			j$.expect(urlSimplifier.simplify("lib/../jasmine.js")).toBe("jasmine.js");
		});

	});
})(j$);