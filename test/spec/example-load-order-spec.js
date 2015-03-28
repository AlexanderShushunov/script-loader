"use strict";
(function (j$) {

	var originalTimeout;
	var exampleWin;
	j$.beforeEach(function () {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
	});

	j$.afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		if (exampleWin) {
			exampleWin.close();
		}
	});

	j$.describe("Script Loader", function () {
		j$.it("should load example script with right order", function (done) {
			exampleWin = window.open("../example/example.html");

			waitTillClose(exampleWin, function () {
				j$.expect(exampleWin.loadingMarks).toBe(
						"All_Tree_Start," +
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
						"All_Tree_Loaded"
				);
				done();
			});
		});
	});

	function waitTillClose(window, callback) {
		if (window.closed) {
			callback();
		} else {
			setTimeout(function () {
				waitTillClose(window, callback)
			}, 100);
		}
	}
})
(j$);