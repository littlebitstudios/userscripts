// ==UserScript==
// @name         Amazon URL Shortener
// @version      1.0
// @author       LittleBit
// @namespace    https://tangled.org/did:plc:ba3ftueh2aewxja4dtuhi7kf
// @description  Adds an option in the Tampermonkey menu to copy a link of the format "amazon.com/dp/[ASIN]"
// @match        *://*.amazon.com/*
// @match        *://*.amazon.co.uk/*
// @match        *://*.amazon.ca/*
// @match        *://*.amazon.de/*
// @match        *://*.amazon.fr/*
// @match        *://*.amazon.it/*
// @match        *://*.amazon.es/*
// @match        *://*.amazon.co.jp/*
// @grant        GM_registerMenuCommand
// @grant        GM_setClipboard
// @grant        GM_notification
// @icon         https://favicon.im/amazon.com
// ==/UserScript==

(function() {
    'use strict';

    function copyCleanLink() {
        // Regex to find the ASIN in various Amazon URL formats
        const asinMatch = window.location.href.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/);

        if (asinMatch && asinMatch[1]) {
            const cleanUrl = `${window.location.origin}/dp/${asinMatch[1]}`;

            // Copies to clipboard
            GM_setClipboard(cleanUrl);

            // Optional: Show a brief notification so you know it worked
            GM_notification({
                text: `Clean link copied: ${cleanUrl}`,
                title: "Amazon Link Cleaner",
                timeout: 3000
            });
        } else {
            alert("Could not find a product ID on this page.");
        }
    }

    // Register the command in the extension popup menu
    GM_registerMenuCommand("Copy Clean Amazon Link", copyCleanLink);
})();