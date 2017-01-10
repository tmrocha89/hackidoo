function Request(){
    var self = this;

    this.get = function(url, async, headers, cb){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, async);
        if(headers){
            for(var key in headers){
                xhr.setRequestHeader(key, headers[key]);
            }
        }
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                cb(xhr.responseText);
            }
        };
        xhr.send();
    }
}