"use strict";

window.ScriptLoader = window.ScriptLoader || {};
(function (ScriptLoader) {

    var LAST_SCRIPT_URL = "js/script-loader/last-script.js";

    var loadParamStack = [];
    var loadTasks = [];

    ScriptLoader.load = function (scriptOrScripts, doneCallBack) {
        var scripts = toArray(scriptOrScripts);
        var isStarted = loadTasks.length != 0;
        loadParamStack.push({
            "doneCallBack": doneCallBack,
            "scripts": scripts
        });
        addTasks(scripts);
        if (!isStarted) {
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

    function toArray(val) {
        if (Array.isArray(val)) {
            return val;
        } else {
            return [val];
        }
    }

})(window.ScriptLoader);