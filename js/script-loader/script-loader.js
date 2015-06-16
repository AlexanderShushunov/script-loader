"use strict";

window.ScriptLoader = window.ScriptLoader || {};
(function (ScriptLoader, PrivateFunctionalityTester) {

	var LAST_SCRIPT_URL = getCurrentScriptPath() + "last-script.js";
	var DEFAULT_OPT = {
		logEnable: false
	};

	var loadParamsStack = [];
	var urlsToLoadStack = [];

	ScriptLoader.options = ScriptLoader.options || DEFAULT_OPT;

	/**
	 * Add script to the page.
	 * @param scriptUrlsBundle Array with script urls. Can be on of 3 types:
	 * - Absolute. Started with "http:" or "https:". E.g. "http://yastatic.net/underscore/1.6.0/underscore.js",
	 * - Html relative. Started with "html:". E.g. "html:js/example/logic/some-class.js".
	 *        It can be useful for scripts which is directly included in the page.
	 * - Relative. Without prefix. Full url is found out by addition current script path and a given one.
	 * @param doneCallBack Will be invoked when the last script have been loaded.
	 */
	ScriptLoader.load = function (scriptUrlsBundle, doneCallBack) {
		scriptUrlsBundle = toArray(scriptUrlsBundle);
		var hasLoadingAlreadyStarted = urlsToLoadStack.length != 0;
		loadParamsStack.push({
			"doneCallBack": doneCallBack,
			"scriptUrlsBundle": scriptUrlsBundle
		});
		pushUrlToStack(scriptUrlsBundle);
		if (!hasLoadingAlreadyStarted) {
			loadNext();
		}
	};

	/**
	 * For private popouse.
	 */
	ScriptLoader.lastScriptInBundleLoadedAndEvaluated = function () {
		var loadParam = loadParamsStack.pop();
		logLoadedScripts(loadParam.scriptUrlsBundle);
		if (loadParam.doneCallBack) {
			loadParam.doneCallBack();
		}
	};

	function pushUrlToStack(scriptUrlsBundle) {
		urlsToLoadStack.push(LAST_SCRIPT_URL);
		var fullUrls = scriptUrlsBundle.map(urlResolver.makeFullUrl).map(urlSimplifier.simplify);
		Array.prototype.push.apply(urlsToLoadStack, fullUrls.reverse());
	}

	function loadNext() {
		var url = urlsToLoadStack.pop();
		loadOneScriptSync(url, function () {
			if (urlsToLoadStack.length != 0) {
				loadNext();
			}
		});
	}

	function loadOneScriptSync(url, onload) {
		if (loadJournal.hasScriptAlreadyLoaded(url)) {
			onload();
			return;
		}
		loadJournal.markAsLoaded(url);
		var script = document.createElement('script');
		script.onload = onload;
		script.src = url;
		script.async = false;
		document.head.appendChild(script);
	}

	function logLoadedScripts(scriptUrls) {
		if (ScriptLoader.options.logEnable) {
			console.log("scripts loaded:");
			for (var cou = 0; cou < scriptUrls.length; cou++) {
				console.log("  - " + scriptUrls[cou]);
			}
		}
	}

	function getCurrentScriptPath() {
		var scripts = document.querySelectorAll('script[src]');
		var currentScriptPath = scripts[scripts.length - 1].src;
		var lastSeparatorIndex = currentScriptPath.lastIndexOf("/");
		return currentScriptPath.substring(0, lastSeparatorIndex + 1);
	}

	var urlResolver = (function createUrlResolver() {
		var HTML_PREFIX = "html:";

		function makeFullUrl(url) {
			if (isAbsoluteUrl(url)) {
				return url;
			} else if (isHtmlRelative(url)) {
				return url.substr(HTML_PREFIX.length);
			} else {
				return getCurrentScriptPath() + url;
			}
		}

		function isAbsoluteUrl(url) {
			return url &&
					(url.indexOf("http:") === 0 ||
					url.indexOf("https:") === 0);
		}

		function isHtmlRelative(url) {
			return url &&
					url.indexOf(HTML_PREFIX) === 0;
		}

		return {
			makeFullUrl: makeFullUrl
		};
	})();

	var urlSimplifier = (function createUrlSimplifier() {
		function simplify(url) {
			var urlWithOutLevelUp = eliminateLevelUp(url);
			return eliminateSameLevel(urlWithOutLevelUp);
		}

		function eliminateLevelUp(url) {
			var ret = url;
			var regExp = new RegExp("[^/]+/\\.\\./");
			while (ret.match(regExp)) {
				ret = ret.replace(regExp, "");
			}
			return ret;
		}

		function eliminateSameLevel(url) {
			var ret = url;
			if (ret.indexOf("./") === 0) {
				ret = ret.substring("./".length);
			}
			ret = ret.replace(/\/\.\//g, "/");
			return ret;
		}

		return {
			simplify: simplify
		};
	})();

	var loadJournal = (function () {
		var loadedScript = [];

		function hasScriptAlreadyLoaded(url) {
			return loadedScript.indexOf(url) != -1;
		}

		function markAsLoaded(url) {
			if (url !== LAST_SCRIPT_URL) {
				loadedScript.push(url);
			}
		}

		return {
			hasScriptAlreadyLoaded: hasScriptAlreadyLoaded,
			markAsLoaded: markAsLoaded
		};
	})();

	//<editor-fold desc="Utils">
	function toArray(val) {
		if (Array.isArray(val)) {
			return val;
		} else {
			return [val];
		}
	}

	//</editor-fold>

	//<editor-fold desc="Share private stuff for test">
	if (PrivateFunctionalityTester) {
		PrivateFunctionalityTester.ScriptLoader = {};
		PrivateFunctionalityTester.ScriptLoader.urlResolver = urlResolver;
		PrivateFunctionalityTester.ScriptLoader.urlSimplifier = urlSimplifier;
	}
	//</editor-fold>

})(window.ScriptLoader, window.PrivateFunctionalityTester);
