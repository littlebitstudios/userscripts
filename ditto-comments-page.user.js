// ==UserScript==
// @name         Open Comments Page on Ditto
// @version      1.0
// @author       LittleBit
// @description  Leave comments on a web page using Ditto.
// @namespace    https://gitworkshop.dev/littlebitstudios.com/userscripts
// @match        *://*/*
// @icon         https://favicon.im/ditto.pub
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    function dittoOpenWebPage() {
        const encodedUrl = encodeURIComponent(window.location.href);
        window.open(`https://ditto.pub/i/${encodedUrl}`, "_blank");
    }

    GM_registerMenuCommand("Open Comments Page on Ditto", dittoOpenWebPage)
})();