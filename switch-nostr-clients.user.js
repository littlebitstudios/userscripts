// ==UserScript==
// @name         Switch Nostr Clients
// @namespace    https://tangled.org/did:plc:ba3ftueh2aewxja4dtuhi7kf
// @version      1.0
// @description  Switch between different Nostr clients when viewing Nostr posts or profiles on the web
// @author       LittleBit
// @match        *://*/*
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    // Client entries require "name", and either an allUrl or separate profileUrl and eventUrl
    // profileUrl is used for npub/nprofile, eventUrl is used for nevent/naddr
    // allUrl takes priority
    // The NIP19 string will go in place of %n
    const clients = [
        {name:"Ditto", allUrl:"https://ditto.pub/%n"},
        {name:"Primal", profileUrl:"https://primal.net/p/%n", eventUrl:"https://primal.net/e/%n"},
        {name:"Nostria", profileUrl:"https://nostria.app/p/%n", eventUrl:"https://nostria.app/e/%n"},
        {name:"Nosotros", allUrl:"https://nosotros.app/%n"},
        {name:"Nosotros Dev", allUrl:"https://dev.nosotros.app/%n"}
    ];

    const NIP19_REGEX = /(npub|nprofile|nevent|naddr)1[a-z0-9]+/i;

    function getNip19FromUrl() {
        const match = window.location.href.match(NIP19_REGEX);
        return match ? match[0] : null;
    }

    function openInClient(clientObject) {
        const nip19 = getNip19FromUrl();
        if (!nip19) {
            window.alert("You aren't viewing a supported Nostr object; there's no NIP19 string in the URL.");
            return;
        }

        const isProfile = /^(npub|nprofile)/i.test(nip19);
        const clientUrlTemplate = clientObject.allUrl || (isProfile ? clientObject.profileUrl : clientObject.eventUrl);

        window.location.href = clientUrlTemplate.replace("%n", nip19);
    }

    clients.forEach((client) => {
        GM_registerMenuCommand(`Open in ${client.name}`, ()=>{openInClient(client)})
    })
})();