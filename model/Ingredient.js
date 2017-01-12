function Ingredient(ingredientArrayElement){
    var self = this;
    this._name = null;
    this._qty = null;
    this._unit = null;
    this._isOptional = false;

    this._setName = function(name){
        self._name = name;
    };

    this._setQuantity = function(qty){
        self._qty = qty;
    };

    this._setUnity = function(unit){
        self._unit = unit ? unit.notation : "";
    };

    this._setIsOptional = function(isOptional){
        self._isOptional = isOptional;
    }

    this._setupIngredient = function(ingredient){
        self._setName(ingredient.notation);
        self._setQuantity(ingredient.quantity.value);
        self._setUnity(ingredient.recipeIngredientUnits[0]);
        self._setIsOptional(ingredient.optional);
    };

    self._setupIngredient(ingredientArrayElement);

    this.getQuantity = function(){
        return self._qty;
    };

    this.getUnit = function(){
        return self._unit;
    };

    this.getName = function(){
        return self._name;
    };

    this.isOptional = function(){
        return self._isOptional;
    };

    this.toString = function(){
        var text = self.isOptional() ? "[Optional] " : "";
        text += self.getQuantity()+" "+self.getUnit()+"   "+self.getName();
        return text;
    };
}