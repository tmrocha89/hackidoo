function Recipe(dataString){
    var self = this;
    this._data = JSON.parse(dataString);
    this._ingredients = [];
    this._preparationSteps = [];

    this._loadIngredients = function(){
        var ingredients = self._data.recipeIngredientGroups[0].recipeIngredients;
        var size = ingredients.length;
        for(var i=0; i < size; i++){
            self._ingredients.push(new Ingredient(ingredients[i]));
        }
    };

    this._loadPreparation = function(){
        var steps = self._data.recipeStepGroups[0].recipeSteps;
        var size = steps.length;
        for(var i=0; i < size; i++){
            console.log("Creatting Preparation step::"); console.log(steps[i]);
            self._preparationSteps.push(new PreparationStep(steps[i]));
        }
    };

    self._loadIngredients();
    self._loadPreparation();

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
        for(var i=0; i < self._preparationSteps.length; i++){
            text += "\t"+self._preparationSteps[i].toString()+"\n";
        }
        return text;
    };
};