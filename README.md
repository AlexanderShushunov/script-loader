# script-loader
It helps to load javascripts files from other. The main idea - make it like c++ "include" or java "import".
## How to get

### CDN
```html
<script type="text/javascript" src="https://rawgit.com/AlexanderShushunov/script-loader/0.2/js/script-loader/script-loader.js"></script>
```
Last release is [0.2](https://github.com/AlexanderShushunov/script-loader/releases/tag/0.2)
### Manual
Downloads are available on the [releases](https://github.com/AlexanderShushunov/script-loader/releases) page.
You have to include _js\script-loader\script-loader.js_ in your page. _js\script-loader\last-script.js_ has to be in the same directory.

## How to use:
```javascript
ScriptLoader.load([
 "http://yastatic.net/underscore/1.6.0/underscore.js"
 "your_stuff.js",
 "utils/your_stuff-util.js"
], function () {
 // you can use here underscore, your_stuff, your_stuff
});
```

## How to improve:
 - last-script.js replace with script.onload = function() { ... };
