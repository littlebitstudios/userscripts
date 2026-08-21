// ==UserScript==
// @name        Bluesky Replacer
// @version     1.0
// @author      LittleBit
// @namespace   https://tangled.org/did:plc:ba3ftueh2aewxja4dtuhi7kf
// @match       *://bsky.app/*
// @grant       none
// @run-at      document-start
// @icon        https://favicon.im/bsky.app
// @description Attempts to go to bsky.app can be redirected to any similar client of your choosing (default witchsky.app)
// ==/UserScript==

const clientDomain = "witchsky.app" // Replace with the domain of the Bluesky client you want to use

(function() {
    'use strict';
    // Replaces the domain while keeping the path and query parameters
    const newUrl = window.location.href.replace('bsky.app', clientDomain);
    window.location.replace(newUrl);
})();