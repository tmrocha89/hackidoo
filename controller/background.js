console.log("Background is running");
var self = this;
var token = null;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "getCollections"){
        self.token = request.token;
        download.collections();
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
        var USER_URL = "https://cookidoo.pt/vorwerkApiV2/apiv2/user";
        req.get(USER_URL, true, {"Authorization": "Bearer "+token}, function(response){
            var result = JSON.parse(response);
            if(result){
                    var content = result.content;
                    if(content){
                        self.user = content[0];
                    }
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
        if(!data){
            data = {};
        }
        if(!data.collections){
            data.collections = [];
        }
        userRepo.getCollectionsUrl(function(url){
            request.get(url, true, {"Authorization": "Bearer "+token}, function(textList){
                var response = JSON.parse(textList);
                console.log("Collections List");
                if(response){
                    
                    if(response.content){
                        var contentList = response.content.map(function(collection){
                            return new Collection(collection);
                        });
                        data.collections = data.collections.concat(contentList[0]);
                    }
                }
                var pageInfo = response.page;
                if(pageInfo.number < pageInfo.totalPages){
                   //request all pages
                }
                console.log(data.collections);
                cb(data.collections);
            });
        });

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

    this.getAllCollections = function(cb){
        this._getCollectionsJson(null, cb);
    }
}

var collectionRepo = new CollectionRepository();

function RecipeRepository(){ // Work in Progress
    var self = this;

    this._getAllRecipesFromCollection = function(data, callback){

    };

    this.getRecipesFromCollections = function(collections, callback){
        for(var i=0; i < collections.length; i++){
            var collection = collections[i];
            console.log(collection.getRecipesUrl());
        }
        /*var collection = collections[0];
        collections = collections.splice(0,1);
        self._getAllRecipesFromCollection({collection: collection}, function(recipes){

        });
        if(collection.length > 0){
            self.getRecipesFromCollections(collections, function(recipes){

            });
        } else {
            
    }*/
        
    };
}

var recipeRepo = new RecipeRepository();

function Download(){
    var self = this;

    this.collections = function(callback){
        collectionRepo.getAllCollections(function(collections){
            console.log("::Collections::"); console.log(collections);
            console.log("Now its time to download recipes :)");
            recipeRepo.getRecipesFromCollections(collections, function(recipes){
                console.log("::Recipes::");
                console.log(recipes);
            })
        });
    };
}

var download = new Download();