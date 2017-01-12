function Ingredient(ingredientArrayElement){
    var self = this;
    this._ingredient = ingredientArrayElement;


    this.getQuantity = function(){
        return self._ingredient.quantity[0].value;
    };

    this.getUnit = function(){
        return self._ingredient.recipeIngredientUnits[0].notation;
    };

    this.getName = function(){
        return self._ingredient.notation;
    };

    this.isOptional = function(){
        return self._ingredient.optional;
    };

    this.toString = function(){
        var text = self.isOptional() ? "[Optional] " : "";
        text += self.getQuantity()+" "+self.getUnit()+"   "+self.getName();
        return text;
    };
}