function Collection(cookidooCollection){
    var self = this;
    this._collection = cookidooCollection;
    this._recipes = [];


    this.setRecipes = function(recipes){
        if(recipes){
            self._recipes = recipes;
            return true;
        }
        return false;
    };

    this.addRecipe = function(recipe){
        if(recipe){
            self._recipes.push(recipe);
            return true;
        }
        return false;
    }

    this.getRecipesUrl = function(){
        var links = self._collection.links;
        for(var i=0; i < links.length; i++){
            var link = links[i];
            if(link.rel == "recipeCollectionTreasure.RecipeCollectionTreasure.recipes"){
                return link.href;
            }
        }
        return "";
    };

    this.getName = function(){
        return self._collection.name;
    }
}