function Recipe(dataString){
    var self = this;
    this._data = JSON.parse(dataString);
    this._ingredients = [];

    this._loadIngredients = function(){
console.log("Loading ingredients");
        var ingredients = self._data.recipeIngredientGroups[0].recipeIngredients;
console.log(ingredients);
        var size = ingredients.length;
        for(var i=0; i < size; i++){
            console.log("Creatting Ingredient::"); console.log(ingredients[i]);
            self._ingredients.push(new Ingredient(ingredients[i]));
        }
    };

    self._loadIngredients();

    this.getName = function(){
        return self._data.name;
    };
    
    this.getdifficulty = function(){
        return self._data.difficulty;
    };

    this.toString = function(){
        var text = self.getName() +"\n";
        text += "Ingredients:\n";
        for(var i=0; i < self._ingredients.length; i++){
            text += "\t"+self._ingredients[i].toString()+"\n";
        }
        text += "Preparation\n";
        return text;
    };
};