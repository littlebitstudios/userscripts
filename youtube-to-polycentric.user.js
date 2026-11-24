// ==UserScript==
// @name         YouTube to Harbor Link
// @version      1.0
// @description  Adds an "Open in Harbor" link next to the Comments heading
// @author       LittleBit
// @namespace    https://tangled.org/did:plc:ba3ftueh2aewxja4dtuhi7kf
// @match        https://www.youtube.com/*
// @icon         https://favicon.im/harbor.social
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function addHarborLink() {
        // 1. Get the Video ID from the current URL
        const urlParams = new URLSearchParams(window.location.search);
        const videoId = urlParams.get('v');

        // Only proceed if we are actually on a video page
        if (!videoId) return;

        // Look for the YouTube comments header
        const commentsHeader = document.querySelector('#title.style-scope.ytd-comments-header-renderer');

        // Check if header exists and if we haven't already added the link
        if (commentsHeader && !document.getElementById('harbor-link')) {

            const rawUrl = `www.youtube.com/watch?v=${videoId}`;
            const encodedUrl = encodeURIComponent(rawUrl);
            const harborUrl = `https://harbor.social/anywhere/u/${encodedUrl}`;

            const link = document.createElement('a');
            link.id = 'harbor-link';
            link.href = harborUrl;
            link.target = '_blank';
            link.innerText = 'Open in Harbor';

            // Styling
            link.style.marginLeft = '15px';
            link.style.fontSize = '1.4rem';
            link.style.color = '#3ea6ff';
            link.style.textDecoration = 'none';
            link.style.fontWeight = '500';

            commentsHeader.appendChild(link);
        }
    }

    // SPA Navigation handling: YouTube fires 'yt-navigate-finish' when the URL changes
    window.addEventListener('yt-navigate-finish', addHarborLink);

    // MutationObserver handles cases where the comments section is lazy-loaded
    const observer = new MutationObserver(() => {
        addHarborLink();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Run on initial load
    addHarborLink();
})();