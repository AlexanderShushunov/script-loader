"use strict";
(function (j$) {
	var urlResolver;
	j$.beforeEach(function () {
		urlResolver = PrivateFunctionalityTester.ScriptLoader.urlResolver;
	});

	j$.describe("Url Resolver", function () {
		j$.it("should not change absolute urls.", function () {
			var httpAbsUrl = "http://cdn.cdn/super/lib/3.4.4/lib.js";
			var httpsAbsUrl  = "https://cdn.cdn/super/lib/3.4.4/lib.js";
			j$.expect(urlResolver.makeFullUrl(httpAbsUrl)).toBe(httpAbsUrl);
			j$.expect(urlResolver.makeFullUrl(httpsAbsUrl)).toBe(httpsAbsUrl);
		});

		j$.it("should resole html relative urls", function(){
			j$.expect(urlResolver.makeFullUrl("html:../path/to/file.js")).toBe("../path/to/file.js");
			j$.expect(urlResolver.makeFullUrl("html:html:/path to file js")).toBe("html:/path to file js");
		});

		j$.it("should resole cirent script relative urls", function(){
			j$.expect(urlResolver.makeFullUrl("../path/to/file.js")).toEndWith("test/spec/../path/to/file.js");
			j$.expect(urlResolver.makeFullUrl("other_file.js")).toEndWith("test/spec/other_file.js");
		});
	});
})(j$);