function RecipeRepository(token){
    var self = this;
    var token = token;

    this._getRecipeSelfUrl = function(basicRecipe){
        var KEY = "self";
        var links = basicRecipe.links;
        for(var i=0; i < links.length; i++){
            if(links[i].rel == KEY){
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
            data.recipes.push(new Recipe(recipeObj));
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
        return self._downloadAllRecipesFromCollection( collectionUrl, function(recipes){
console.log("result");
console.log(recipes);
            return callback(recipes);
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

    this._getRecipesFromAllCollections = function(data, cb){
        if(data.collections.length == 0){
            return cb(data.collectionsWithRecipes);
        }
        var collection = data.collections[0];
        data.collections.splice(0,1);
        var collectionUrl = collection.getRecipesUrl();
        return self._getAllRecipesFromCollection(collectionUrl, function(recipes){
console.log("I got it");
console.log(recipes);
            if(!data.collectionsWithRecipes){
                data.collectionsWithRecipes = [];
            }
            collection.setRecipes(recipes);
console.log(collection);
            data.collectionsWithRecipes.push(collection);
            return self._getRecipesFromAllCollections(data, cb);
        });
        
    }

    this.getRecipesFromCollections = function(collections, callback){
       /* var recipesForCollections = [];
        for(var i=0; i < collections.length; i++){
            var collection = collections[i];
            var collectionUrl = collection.getRecipesUrl();
console.log("Collection URL::"+collectionUrl);
            var recipes = self._getAllRecipesFromCollection( collectionUrl, function(recipes){
                console.log("I got it");
                console.log(recipes);
            });

        }*/
        return self._getRecipesFromAllCollections({collections: collections}, callback);
    };
}