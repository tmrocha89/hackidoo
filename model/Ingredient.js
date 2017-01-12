function Ingredient(ingredientArrayElement){
    var self = this;
    this._ingredient = ingredientArrayElement;


    this.getQuantity = function(){
        return self._ingredient.quantity.value;
    };

    this.getUnit = function(){
        var elem = self._ingredient.recipeIngredientUnits[0];
        if(!elem){
            return "";
        }
        return elem.notation;
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