!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=null;t.addEventListener("click",(function(){n=setInterval((function(){var n="#".concat(Math.floor(16777215*Math.random()).toString(16));document.body.style.backgroundColor=n,t.setAttribute("disabled",""),e.removeAttribute("disabled")}),1e3)})),e.addEventListener("click",(function(){clearInterval(n),e.setAttribute("disabled",""),t.removeAttribute("disabled")})),e.setAttribute("disabled","")}();
//# sourceMappingURL=01-color-switcher.6fbab404.js.map
