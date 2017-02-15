// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function(tabs) {
        var tab = tabs[0];

        // A tab is a plain object that provides information about the tab.
        // See https://developer.chrome.com/extensions/tabs#type-Tab
        var url = tab.url;

        // tab.url is only available if the "activeTab" permission is declared.
        // If you want to see the URL of other tabs (e.g. after removing active:true
        // from |queryInfo|), then the "tabs" permission is required to see their
        // "url" properties.
        console.assert(typeof url == 'string', 'tab.url should be a string');

        callback(url);
    });
}

var self = this;

this._URL_DATA = [{
    urlRegEx: /^http(s)?:\/\/cookidoo.pt\/vorwerkWebapp\/app#\/mytreasure\/collections/i,
    type: "Collections",
    url: ""
}, {
    urlRegEx: /^http(s)?:\/\/cookidoo.pt\/vorwerkWebapp\/app#\/collection\/[0-9]+$/i,
    type: "Recipes",
    url: ""
}, {
    urlRegEx: /^http(s)?:\/\/cookidoo.pt\/vorwerkWebapp\/app#\/collection\/[0-9]+\/recipe\/[0-9]+/i,
    type: "Recipe",
    url: ""
}];

var getActualViewingPage = function(url) {
    for (var i = 0; i < self._URL_DATA.length; i++) {
        var urlData = self._URL_DATA[i];
        if (url.match(urlData.urlRegEx)) {
            return urlData;
        }
    }
    return null;
};

var notifyScripts = function(callback) {
    console.log("Calling scripts");
    var cb = callback ? callback : function() {};
    return cb;
};

getCurrentTabUrl(function(url) {
    console.log(url);
    var urlObject = getActualViewingPage(url);
    var textToShow = "UNKNOWN";
    if (urlObject) {
        textToShow = urlObject.type;
        notifyScripts({ action: "download", url: urlObject.url, type: urlObject.type });
    }
    $("#status").text(textToShow);

});