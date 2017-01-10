console.log("Background is running");
var self = this;
var token = null;

var collectionRepo = null;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "getCollections"){
        self.token = request.token;
        download.collections();
        //sendResponse();
    }
      
  });


function RecipeRepository(){ // Work in Progress
    var self = this;

    this._getRecipeSelfUrl = function(basicRecipe){
        var KEY = "self";
        var links = basicRecipe.links;
        for(var i=0; i < links.length; i++){
            if(links[i].rel == KEY){
                console.log("ok");
                return links[i].href;
            }
        }
        return null;
    }

    this._downloadRecipesFromUrlsRecursive = function(data, cb){
        if(data.toDownload.length == 0){
            return cb(data.recipes);
        }
        var url = self._getRecipeSelfUrl(data.toDownload[0]);
        data.toDownload.splice(0,1);
        var id = url.split("/");
        id = id[id.length-1];
        var mainUrl = "https://cookidoo.pt/vorwerkApiV2/apiv2/recipe/" + id;
        
        var request = new Request();
        return request.get(mainUrl, true, {"Authorization": "Bearer "+token}, function(recipeObj){
            if(!data.recipes){
                data.recipes = [];
            }
            data.recipes.push(recipeObj);
            return self._downloadRecipesFromUrlsRecursive(data,cb);
        });
    };

    this._downloadAllRecipesFromCollection = function(collectionUrl, cb){
        return self._downloadAllRecipesBasicInfoFromCollection({url: collectionUrl}, function(basicRecipes){
            return self._downloadRecipesFromUrlsRecursive({toDownload: basicRecipes}, function(recipes){
                return cb(recipes);
            });
        });
        
    };

    this._getAllRecipesFromCollection = function(collectionUrl, callback){
        self._downloadAllRecipesFromCollection( collectionUrl, function(result){
            console.log("result");
            console.log(result);
        });
    };

    this._downloadAllRecipesBasicInfoFromCollection = function(data, callback){
        if(!data.recipes){
            data.recipes = [];
        }
        if(!data.page){
            data.page = 1;
            data.limit = 20;
        }
        var request = new Request();
        console.log(data);
        var newUrl = data.url+"?page="+data.page+"&limit="+data.limit;
        console.log(newUrl);
        request.get(newUrl, true, {"Authorization": "Bearer "+token}, function(response){
            if(response){
                var recipes = JSON.parse(response);
                if(recipes){
                    data.recipes = data.recipes.concat(recipes.content);
                    if(recipes.page.number < recipes.page.totalPages){
                        data.page++;
                        return self._downloadAllRecipesBasicInfoFromCollection(data, callback);
                    } else {
                        return callback(data.recipes);
                    }
                }
                console.log(recipes);
            }
        });
    };

    this.getRecipesFromCollections = function(collections, callback){
        var recipesForCollections = [];
        for(var i=0; i < collections.length; i++){
            var collection = collections[i];
            var collectionUrl = collection.getRecipesUrl();
console.log("Collection URL::"+collectionUrl);
            var recipes = self._getAllRecipesFromCollection( collectionUrl, function(recipes){
                console.log("I got it");
                console.log(recipes);
            });

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
        collectionRepo = new CollectionRepository(token);
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