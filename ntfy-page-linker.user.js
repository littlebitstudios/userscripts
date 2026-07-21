// ==UserScript==
// @name         ntfy Current Page Linker
// @version      1.0
// @author       LittleBit
// @description  Sends the current page title and URL to ntfy via the script manager menu.
// @namespace    https://gitworkshop.dev/littlebitstudios.com/userscripts
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @grant        GM_registerMenuCommand
// @run-at       document-end
// @icon         https://favicon.im/ntfy.sh
// ==/UserScript==

(function() {
    'use strict';

    // --- CONFIGURATION ---
    const NTFY_SERVER = 'https://ntfy.sh'; // you can use your own ntfy server if you want
    const NTFY_TOPIC = 'CHANGE_THIS';
    const NTFY_PRIORITY = 'default';
    // ---------------------

    const ntfyUrl = `${NTFY_SERVER}/${NTFY_TOPIC}`;

    GM_registerMenuCommand("🚀 Send Page to ntfy", () => {
        sendNtfyNotification();
    });

    function showFeedback(title, text, isSuccess) {
        if (typeof GM_notification !== 'undefined') {
            GM_notification({
                title: title,
                text: text,
                image: isSuccess ? 'https://placehold.co/60x60/22C55E/FFFFFF?text=✓' : 'https://placehold.co/60x60/EF4444/FFFFFF?text=✗',
                timeout: 3000
            });
        }
    }

    function sendNtfyNotification() {
        const pageTitle = document.title || window.location.hostname;
        const pageUrl = window.location.href;

        GM_xmlhttpRequest({
            method: "POST",
            url: ntfyUrl,
            headers: {
                "Title": `From your computer`,
                "Click": pageUrl,
                "Tags": "link,browser",
                "Priority": NTFY_PRIORITY
            },
            data: pageUrl,
            onload: function(response) {
                if (response.status >= 200 && response.status < 300) {
                    showFeedback("Success!", `Sent to topic: ${NTFY_TOPIC}`, true);
                } else {
                    showFeedback("Error!", `ntfy failed: ${response.status}`, false);
                }
            },
            onerror: function() {
                showFeedback("Connection Error", "Could not reach ntfy server.", false);
            }
        });
    }
})();