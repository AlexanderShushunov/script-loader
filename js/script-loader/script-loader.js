"use strict";

window.ScriptLoader = window.ScriptLoader || {};
(function (ScriptLoader) {

    var LAST_SCRIPT_URL = getCurrentScriptPath() + "last-script.js";
    var DEFAULT_OPT = {
        logEnable: false
    };

    var loadParamsStack = [];
    var urlsToLoadStack = [];

    ScriptLoader.options = ScriptLoader.options || DEFAULT_OPT;

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

    ScriptLoader.lastScriptInBundleLoadedAndEvaluated = function () {
        var loadParam = loadParamsStack.pop();
        logLoadedScripts(loadParam.scriptUrlsBundle);
        if (loadParam.doneCallBack) {
            loadParam.doneCallBack();
        }
    };

    function pushUrlToStack(scriptUrlsBundle) {
        urlsToLoadStack.push(LAST_SCRIPT_URL);
        Array.prototype.push.apply(urlsToLoadStack, scriptUrlsBundle.reverse());
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
        var script = document.createElement('script');
        if (onload) {
            script.onload = onload;
        }
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

    // utils
    function toArray(val) {
        if (Array.isArray(val)) {
            return val;
        } else {
            return [val];
        }
    }

    function getCurrentScriptPath() {
        var scripts = document.querySelectorAll('script[src]');
        var currentScriptPath = scripts[scripts.length - 1].src;
        var lastSeparatorIndex = currentScriptPath.lastIndexOf("/");
        return currentScriptPath.substring(0, lastSeparatorIndex + 1);
    }

})(window.ScriptLoader);