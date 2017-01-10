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

function Download(){
    var self = this;
    var recipeRepo = null;
    var collectionRepo = null;
    
    this.collections = function(callback){
        collectionRepo = new CollectionRepository(token);
        recipeRepo =  new RecipeRepository(token);
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