// ==UserScript==
// @name        ATProto Inspectors
// @version     1.0
// @author      LittleBit
// @namespace   https://tangled.org/did:plc:ba3ftueh2aewxja4dtuhi7kf
// @match       https://bsky.app/*
// @grant       GM_registerMenuCommand
// @description Inspect the raw data behind a Bluesky post or profile
// @icon        https://web-cdn.bsky.app/static/favicon.png
// ==/UserScript==

// Install this script in Tampermonkey by importing the URL https://tangled.org/strings/did:plc:big6e357j2bbrlkyms5vjkgf/3mr4ougv5ai22/raw

(function() {
    'use strict';

    function openInATPBrowser() {
        let url = window.location.href;
        let newUrl = url.replace("bsky.app/profile", "atproto-browser.vercel.app/at");
        
        if (newUrl.includes("/post/")) {
            newUrl = newUrl.replace("/post/", "/app.bsky.feed.post/");
        }

        window.open(newUrl, '_blank');
    }

    function openInClearsky() {
        let url = window.location.href;

        let urlNoProto = url.replace("https://", "")
        let urlComponents = urlNoProto.split("/")
        let handle = urlComponents[2]

        let newUrl = `https://clearsky.app/${handle}/profile`

        window.open(newUrl, '_blank');
    }

    function openInPdsls() {
        let url = window.location.href;
        let newUrl = url.replace("bsky.app/profile", "pds.ls/at://");
        
        if (newUrl.includes("/post/")) {
            newUrl = newUrl.replace("/post/", "/app.bsky.feed.post/");
        }

        window.open(newUrl, '_blank');
    }
    
    function openInAtProtoAt() {
        let url = window.location.href;
        let newUrl = url.replace("bsky.app/profile", "atproto.at/at://");
        
        if (newUrl.includes("/post/")) {
            newUrl = newUrl.replace("/post/", "/app.bsky.feed.post/");
        }
        
        window.open(newUrl, '_blank');
    }

    // This adds the button to your extension's dropdown menu
    GM_registerMenuCommand("Inspect with ATProto Browser", openInATPBrowser);
    GM_registerMenuCommand("Inspect with Clearsky", openInClearsky);
    GM_registerMenuCommand("Inspect with PDSls", openInPdsls);
    GM_registerMenuCommand("Inspect with atproto.at", openInAtProtoAt);
})();