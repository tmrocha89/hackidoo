function Request() {
    var self = this;
    this._HTTP_METHODS = {
        POST: "POST",
        GET: "GET"
    };

    this._request = function(method, url, async, headers, data, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, async);
        if (headers) {
            for (var key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                cb(xhr.responseText);
            }
        };
        xhr.send(data);
    };

    this.get = function(url, async, headers, cb) {
        return self._request(self._HTTP_METHODS.GET, url, async, headers, null, cb);
    };

    this.post = function(url, async, headers, data, cb) {
        return self._request(self._HTTP_METHODS.POST, url, async, headers, data, cb);
    };
}