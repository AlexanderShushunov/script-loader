var script = document.createElement('script');
script.onload = function() { console.log(jQuery); console.log(arguments);};
script.onreadystatechange = function() { console.log(script.readyState); console.log(arguments); };
script.src = "https://code.jquery.com/jquery-2.1.3.js";
document.head.appendChild(script);
