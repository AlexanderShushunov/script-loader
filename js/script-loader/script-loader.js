"use strict";

window.ScriptLoader = window.ScriptLoader || {};
(function (ScriptLoader) {

    var LAST_SCRIPT_URL = getCurrentScriptPath() + "last-script.js";

    var loadParamStack = [];
    var loadTasks = [];

    ScriptLoader.load = function (scriptOrScripts, doneCallBack) {
        var scripts = toArray(scriptOrScripts);
        var hasLoadingAlreadyStarted = loadTasks.length != 0;
        loadParamStack.push({
            "doneCallBack": doneCallBack,
            "scripts": scripts
        });
        addTasks(scripts);
        if (!hasLoadingAlreadyStarted) {
            loadNext();
        }
    };

    ScriptLoader.lastScriptLoaded = function () {
        var loadParam = loadParamStack.pop();
        logLoadedScripts(loadParam.scripts);
        if (loadParam.doneCallBack) {
            loadParam.doneCallBack();
        }
    };

    function addTasks(scripts) {
        loadTasks.push(LAST_SCRIPT_URL);
        Array.prototype.push.apply(loadTasks, scripts.reverse());
    }

    function loadNext() {
        var task = loadTasks.pop();
        loadOneScriptSync(task, function () {
            if (loadTasks.length != 0) {
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

    function logLoadedScripts(scripts) {
        console.log("scripts loaded:");
        for (var cou = 0; cou < scripts.length; cou++) {
            console.log("  - " + scripts[cou]);
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