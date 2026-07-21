// ==UserScript==
// @name        Redirect Hey to Palus
// @version     1.0
// @author      LittleBit
// @namespace   https://tangled.org/did:plc:ba3ftueh2aewxja4dtuhi7kf
// @match       *://hey.xyz/*
// @grant       none
// @run-at      document-start
// @icon        https://favicon.im/palus.app
// @description Attempts to go to hey.xyz will instead be sent to palus.app
// ==/UserScript==

(function() {
    'use strict';
    // Replaces the domain while keeping the path and query parameters
    const newUrl = window.location.href.replace('hey.xyz', 'palus.app');
    window.location.replace(newUrl);
})();