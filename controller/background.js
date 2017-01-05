console.log("Background is running");
var self = this;
var token = null;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "getCollections"){
        self.token = request.token;
        collectionRepo.getAllCollections(request, sendResponse);
        //sendResponse();
    }
      
  });

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


function UserRepository(){
    var self = this;
    var req = new Request();
    var user = null;

    this.getUser = function(token, cb){
console.log("Getting user");
        var USER_URL = "https://cookidoo.pt/vorwerkApiV2/apiv2/user";
        req.get(USER_URL, true, {"Authorization": "Bearer "+token}, function(response){
            console.log("Response..");
            var result = JSON.parse(response);
            if(result){
                    var content = result.content;
                    self.user = content[0];
                }
            cb(self.user);
        });        
    }

    this.getCollectionsUrl = function(cb){
        var key = "user.User.collections";

        var extractUrl = function(user){
            for(var i=0; i < user.links.length; i++){
                var urlObj = user.links[i];
                if(urlObj.rel == key){
                    cb(urlObj.href);
                    return ;
                }
            }
        };

        if(user){
            return extractUrl(user);
        } else {
            this.getUser(token, function(user){
                return extractUrl(user);
            })
        }
    }
}

var userRepo = new UserRepository();


function CollectionRepository(){
    var self = this;
    var request = new Request();

    this._getCollectionsJson = function(data, cb){
        var COLLECTION_MAIN_URL = "";
        userRepo.getCollectionsUrl(function(url){
            console.log("URL = " + url);
            request.get(url, true, {"Authorization": "Bearer "+token}, function(textList){
                var list = JSON.parse(textList);
                console.log("Collections List");
                console.log(list);
            });
        })
        //userRepo.getUser(data.token, function(){
//
//        });
        /*var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://cookidoo.pt/vorwerkWebapp/app#/collection/8796125921281", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
            }
        };*/
    };

    this.getAllCollections = function(data, cb){
        console.log("Getting all collections");
        this._getCollectionsJson(data, cb);
        //if(cb){
        //    cb();
        //}
    }
}

var collectionRepo = new CollectionRepository();