// ==UserScript==
// @name         YouTube to Polycentric Link
// @version      1.0
// @description  Adds an "Open in Polycentric" link next to the Comments heading
// @author       LittleBit
// @match        https://www.youtube.com/*
// @icon         https://favicon.im/polycentric.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function addPolycentricLink() {
        // 1. Get the Video ID from the current URL
        const urlParams = new URLSearchParams(window.location.search);
        const videoId = urlParams.get('v');

        // Only proceed if we are actually on a video page
        if (!videoId) return;

        // Look for the YouTube comments header
        const commentsHeader = document.querySelector('#title.style-scope.ytd-comments-header-renderer');

        // Check if header exists and if we haven't already added the link
        if (commentsHeader && !document.getElementById('polycentric-link')) {

            const rawUrl = `https://www.youtube.com/watch?v=${videoId}`;
            const encodedUrl = encodeURIComponent(rawUrl);
            const polycentricUrl = `https://polycentric.io/t/${encodedUrl}`;

            const link = document.createElement('a');
            link.id = 'polycentric-link';
            link.href = polycentricUrl;
            link.target = '_blank';
            link.innerText = 'Open in Polycentric';

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
    window.addEventListener('yt-navigate-finish', addPolycentricLink);

    // MutationObserver handles cases where the comments section is lazy-loaded
    const observer = new MutationObserver(() => {
        addPolycentricLink();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Run on initial load
    addPolycentricLink();
})();