// ==UserScript==
// @name         Roblox Web Play
// @version      1.0
// @description  Play a game in the experimental Roblox web client
// @author       LittleBit
// @namespace    https://tangled.org/did:plc:ba3ftueh2aewxja4dtuhi7kf
// @match        https://*.roblox.com/games/*
// @match        https://*.roblox.com/*/games/*
// @icon         https://favicon.im/roblox.com
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    function startWebPlay() {
        const match = window.location.pathname.match(/\/games\/(\d+)/);
        if (!match) {
            alert("Could not find a valid Place ID in the URL.");
            return;
        }

        const placeId = match[1];
        const newUrl = `https://play.roblox.com/games/start?placeId=${placeId}`;
        
        window.open(newUrl, "_blank", "noopener");
    }

    GM_registerMenuCommand("Start Web Play", startWebPlay);
})();