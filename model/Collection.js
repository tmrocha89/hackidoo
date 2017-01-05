function Collection(cookidooCollection){
    var self = this;
    this.collection = cookidooCollection;

    this.getRecipesUrl = function(){
        var links = self.collection.links;
        for(var i=0; i < links.length; i++){
            var link = links[i];
            if(link.rel == "recipeCollectionTreasure.RecipeCollectionTreasure.recipes"){
                return link.href;
            }
        }
        return "";
    };
}